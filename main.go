package main

import (
	"encoding/xml"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/kengru/kengru.do/internal/md"
)

type Slugs map[string]md.MD
type Tags map[string]bool
type PostData struct {
	Content     template.HTML
	Description string
	Url         string
	Published   time.Time
	Tags        []string
	Title       string
	Type        string
	Rating      int
	Image       string
	AltLangURL  string
	AltLangName string
}

type KeyData struct {
	Key  string
	Data md.MD
}

// RSS Feed types
type RSS struct {
	XMLName xml.Name   `xml:"rss"`
	Version string     `xml:"version,attr"`
	Channel RSSChannel `xml:"channel"`
}

type RSSChannel struct {
	Title         string    `xml:"title"`
	Link          string    `xml:"link"`
	Description   string    `xml:"description"`
	Language      string    `xml:"language"`
	LastBuildDate string    `xml:"lastBuildDate"`
	Items         []RSSItem `xml:"item"`
}

type RSSItem struct {
	Title       string `xml:"title"`
	Link        string `xml:"link"`
	Description string `xml:"description"`
	PubDate     string `xml:"pubDate"`
	GUID        string `xml:"guid"`
}

// Admin types
type AdminPost struct {
	Path      string
	Title     string
	Slug      string
	Published time.Time
	Draft     bool
}

type AdminEditData struct {
	Path    string
	Content string
	IsNew   bool
	Today   string
}

// Site holds all reloadable state
type Site struct {
	slugs       Slugs
	sortedSlugs []KeyData
	enSlugs     Slugs
	staticSlugs Slugs
	tags        Tags
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func translateMDIntoSlugs(dirName string) Slugs {
	slugs := Slugs{}
	dir, err := os.ReadDir(dirName)
	if err != nil {
		return slugs
	}
	for _, entry := range dir {
		if entry.IsDir() {
			continue
		}
		fileName := fmt.Sprintf("%s/%s", dirName, entry.Name())
		fil, err := os.Open(fileName)
		if err != nil {
			continue
		}
		mdFile, err := md.ParseMDFile(fil)
		fil.Close()
		if err != nil {
			continue
		}

		if !mdFile.Metadata.Draft {
			slugs[mdFile.Metadata.Slug] = mdFile
		}
	}
	return slugs
}

func getTagsFromSlugs(slugs Slugs) Tags {
	tags := Tags{}
	for _, v := range slugs {
		for _, t := range v.Tags {
			_, ok := tags[t]
			if !ok {
				tags[t] = true
			}
		}
	}
	return tags
}

func (t Tags) appendMoreTags(tags Tags) {
	for k, v := range tags {
		t[k] = v
	}
}

func (s Slugs) getSortedSlugs() []KeyData {
	var ss []KeyData
	for k, v := range s {
		ss = append(ss, KeyData{k, v})
	}
	sort.Slice(ss, func(i, j int) bool {
		return ss[i].Data.Published.After(ss[j].Data.Published)
	})
	return ss
}

func newSite() *Site {
	s := &Site{}
	s.reload()
	return s
}

func (s *Site) reload() {
	s.slugs = translateMDIntoSlugs("posts")
	s.sortedSlugs = s.slugs.getSortedSlugs()
	s.enSlugs = translateMDIntoSlugs("posts/en")
	s.staticSlugs = translateMDIntoSlugs("posts/static")
	s.tags = getTagsFromSlugs(s.slugs)
	s.tags.appendMoreTags(getTagsFromSlugs(s.staticSlugs))
}

func adminAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		pass := os.Getenv("ADMIN_PASS")
		if pass == "" {
			http.Error(w, "Admin not configured", http.StatusServiceUnavailable)
			return
		}
		_, p, ok := r.BasicAuth()
		if !ok || p != pass {
			w.Header().Set("WWW-Authenticate", `Basic realm="admin"`)
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next(w, r)
	}
}

func validateFilePath(path string) bool {
	clean := filepath.Clean(path)
	return strings.HasPrefix(clean, "posts/") && !strings.Contains(clean, "..")
}

func getAdminPosts() []AdminPost {
	var posts []AdminPost
	dirs := []string{"posts", "posts/en", "posts/static"}
	for _, dir := range dirs {
		entries, err := os.ReadDir(dir)
		if err != nil {
			continue
		}
		for _, entry := range entries {
			if entry.IsDir() {
				continue
			}
			path := dir + "/" + entry.Name()
			f, err := os.Open(path)
			if err != nil {
				continue
			}
			mdFile, err := md.ParseMDFile(f)
			f.Close()
			if err != nil {
				continue
			}
			posts = append(posts, AdminPost{
				Path:      path,
				Title:     mdFile.Title,
				Slug:      mdFile.Slug,
				Published: mdFile.Published,
				Draft:     mdFile.Draft,
			})
		}
	}
	sort.Slice(posts, func(i, j int) bool {
		return posts[i].Published.After(posts[j].Published)
	})
	return posts
}

func main() {
	mux := http.NewServeMux()
	site := newSite()
	fs := http.FileServer(http.Dir("./static"))

	mux.Handle("GET /static/", http.StripPrefix("/static/", fs))

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		t, _ := template.New("index").ParseFiles("views/layout.html", "views/index.html")
		err := t.ExecuteTemplate(w, "layout", site.sortedSlugs)
		check(err)
	})

	mux.HandleFunc("GET /category/{category}", func(w http.ResponseWriter, r *http.Request) {
		category := r.PathValue("category")
		_, ok := site.tags[category]
		if !ok {
			t, _ := template.ParseFiles("views/layout.html", "views/404.html")
			err := t.ExecuteTemplate(w, "layout", "")
			if err != nil {
				log.Println(err)
				w.WriteHeader(http.StatusInternalServerError)
			}
			return
		}
		categorySlugs := Slugs{}
		for k, v := range site.slugs {
			for _, t := range v.Tags {
				if category == t {
					categorySlugs[k] = v
				}
			}
		}
		orderedSlugs := categorySlugs.getSortedSlugs()
		t, _ := template.ParseFiles("views/layout.html", "views/index.html")
		err := t.ExecuteTemplate(w, "layout", orderedSlugs)
		check(err)
	})

	// RSS Feed
	mux.HandleFunc("GET /feed/rss", func(w http.ResponseWriter, r *http.Request) {
		items := []RSSItem{}
		for _, kd := range site.sortedSlugs {
			item := RSSItem{
				Title:       kd.Data.Title,
				Link:        fmt.Sprintf("https://kengru.do/%s", kd.Data.Slug),
				Description: kd.Data.Description,
				PubDate:     kd.Data.Published.Format(time.RFC1123Z),
				GUID:        fmt.Sprintf("https://kengru.do/%s", kd.Data.Slug),
			}
			items = append(items, item)
		}

		rss := RSS{
			Version: "2.0",
			Channel: RSSChannel{
				Title:         "kengru.do",
				Link:          "https://kengru.do",
				Description:   "Personal blog by kengru - tech, books, and thoughts",
				Language:      "es",
				LastBuildDate: time.Now().Format(time.RFC1123Z),
				Items:         items,
			},
		}

		w.Header().Set("Content-Type", "application/rss+xml; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		enc := xml.NewEncoder(w)
		enc.Indent("", "  ")
		if err := enc.Encode(rss); err != nil {
			log.Println(err)
		}
	})

	mux.HandleFunc("GET /en/{slug}", func(w http.ResponseWriter, r *http.Request) {
		slug := r.PathValue("slug")
		mark, ok := site.enSlugs[slug]
		if !ok {
			t, _ := template.ParseFiles("views/layout.html", "views/404.html")
			err := t.ExecuteTemplate(w, "layout", "")
			if err != nil {
				log.Println(err)
				w.WriteHeader(http.StatusInternalServerError)
			}
			return
		}
		final := md.MDtoHTML(mark.Content)

		templateFile := "views/post.html"
		if mark.Type == "review" {
			templateFile = "views/review.html"
		}

		t, _ := template.ParseFiles("views/layout.html", templateFile)
		postData := PostData{
			Content:     template.HTML(final.String()),
			Description: mark.Description,
			Url:         fmt.Sprintf("https://kengru.do/en/%s", mark.Slug),
			Published:   mark.Published,
			Tags:        mark.Tags,
			Title:       mark.Title,
			Type:        mark.Type,
			Rating:      mark.Rating,
			Image:       mark.Image,
			AltLangURL:  fmt.Sprintf("/%s", mark.Slug),
			AltLangName: "Español",
		}
		err := t.ExecuteTemplate(w, "layout", postData)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	})

	mux.HandleFunc("GET /{slug}", func(w http.ResponseWriter, r *http.Request) {
		slug := r.PathValue("slug")
		mark, ok := site.slugs[slug]
		if !ok {
			check, ok := site.staticSlugs[slug]
			if !ok {
				t, _ := template.ParseFiles("views/layout.html", "views/404.html")
				err := t.ExecuteTemplate(w, "layout", "")
				if err != nil {
					log.Println(err)
					w.WriteHeader(http.StatusInternalServerError)
				}
				return
			}
			mark = check
		}
		final := md.MDtoHTML(mark.Content)

		templateFile := "views/post.html"
		if mark.Type == "review" {
			templateFile = "views/review.html"
		}

		t, _ := template.ParseFiles("views/layout.html", templateFile)
		postData := PostData{
			Content:     template.HTML(final.String()),
			Description: mark.Description,
			Url:         fmt.Sprintf("https://kengru.do/%s", mark.Slug),
			Published:   mark.Published,
			Tags:        mark.Tags,
			Title:       mark.Title,
			Type:        mark.Type,
			Rating:      mark.Rating,
			Image:       mark.Image,
		}
		if _, hasEn := site.enSlugs[slug]; hasEn {
			postData.AltLangURL = fmt.Sprintf("/en/%s", slug)
			postData.AltLangName = "English"
		}
		err := t.ExecuteTemplate(w, "layout", postData)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	})

	// Admin routes
	mux.HandleFunc("GET /admin", adminAuth(func(w http.ResponseWriter, r *http.Request) {
		posts := getAdminPosts()
		t, err := template.ParseFiles("views/admin-layout.html", "views/admin-list.html")
		if err != nil {
			log.Println(err)
			http.Error(w, "Template error", http.StatusInternalServerError)
			return
		}
		t.ExecuteTemplate(w, "admin-layout", posts)
	}))

	mux.HandleFunc("GET /admin/new", adminAuth(func(w http.ResponseWriter, r *http.Request) {
		data := AdminEditData{
			IsNew: true,
			Today: time.Now().Format("02-01-2006"),
		}
		t, err := template.ParseFiles("views/admin-layout.html", "views/admin-edit.html")
		if err != nil {
			log.Println(err)
			http.Error(w, "Template error", http.StatusInternalServerError)
			return
		}
		t.ExecuteTemplate(w, "admin-layout", data)
	}))

	mux.HandleFunc("POST /admin/new", adminAuth(func(w http.ResponseWriter, r *http.Request) {
		r.ParseForm()
		content := r.FormValue("content")
		dir := r.FormValue("dir")

		if dir != "posts" && dir != "posts/en" && dir != "posts/static" {
			http.Error(w, "Invalid directory", http.StatusBadRequest)
			return
		}

		// Parse frontmatter to derive filename
		parsed, err := md.ParseMDString(content)
		if err != nil {
			http.Error(w, "Invalid frontmatter: "+err.Error(), http.StatusBadRequest)
			return
		}

		var filename string
		if dir == "posts/static" {
			filename = fmt.Sprintf("%s/%s.md", dir, parsed.Slug)
		} else {
			datePrefix := parsed.Published.Format("060102")
			filename = fmt.Sprintf("%s/%s-%s.md", dir, datePrefix, parsed.Slug)
		}

		if _, err := os.Stat(filename); err == nil {
			http.Error(w, "File already exists: "+filename, http.StatusConflict)
			return
		}

		err = os.WriteFile(filename, []byte(content), 0644)
		if err != nil {
			http.Error(w, "Failed to write file", http.StatusInternalServerError)
			return
		}

		site.reload()
		http.Redirect(w, r, "/admin", http.StatusSeeOther)
	}))

	mux.HandleFunc("GET /admin/edit", adminAuth(func(w http.ResponseWriter, r *http.Request) {
		file := r.URL.Query().Get("file")
		if !validateFilePath(file) {
			http.Error(w, "Invalid file path", http.StatusBadRequest)
			return
		}

		content, err := os.ReadFile(file)
		if err != nil {
			http.Error(w, "File not found", http.StatusNotFound)
			return
		}

		data := AdminEditData{
			Path:    file,
			Content: string(content),
		}
		t, err := template.ParseFiles("views/admin-layout.html", "views/admin-edit.html")
		if err != nil {
			log.Println(err)
			http.Error(w, "Template error", http.StatusInternalServerError)
			return
		}
		t.ExecuteTemplate(w, "admin-layout", data)
	}))

	mux.HandleFunc("POST /admin/save", adminAuth(func(w http.ResponseWriter, r *http.Request) {
		file := r.URL.Query().Get("file")
		if !validateFilePath(file) {
			http.Error(w, "Invalid file path", http.StatusBadRequest)
			return
		}

		r.ParseForm()
		content := r.FormValue("content")

		err := os.WriteFile(file, []byte(content), 0644)
		if err != nil {
			http.Error(w, "Failed to write file", http.StatusInternalServerError)
			return
		}

		site.reload()
		http.Redirect(w, r, "/admin", http.StatusSeeOther)
	}))

	mux.HandleFunc("POST /admin/delete", adminAuth(func(w http.ResponseWriter, r *http.Request) {
		file := r.URL.Query().Get("file")
		if !validateFilePath(file) {
			http.Error(w, "Invalid file path", http.StatusBadRequest)
			return
		}

		err := os.Remove(file)
		if err != nil {
			http.Error(w, "Failed to delete file", http.StatusInternalServerError)
			return
		}

		site.reload()
		http.Redirect(w, r, "/admin", http.StatusSeeOther)
	}))

	log.Println("Running at http://localhost:42069")
	log.Fatal(http.ListenAndServe(":42069", mux))
}
