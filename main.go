package main

import (
	"embed"
	"encoding/xml"
	"fmt"
	"html/template"
	"io/fs"
	"log"
	"net/http"
	"sort"
	"time"

	"github.com/kengru/kengru.do/internal/md"
)

//go:embed posts views static
var content embed.FS

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
	dir, err := fs.ReadDir(content, dirName)
	if err != nil {
		return slugs
	}
	for _, entry := range dir {
		if entry.IsDir() {
			continue
		}
		fileName := fmt.Sprintf("%s/%s", dirName, entry.Name())
		fil, err := content.Open(fileName)
		if err != nil {
			continue
		}
		mdFile, err := md.ParseMD(fil)
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

func main() {
	mux := http.NewServeMux()
	site := newSite()
	staticFS, err := fs.Sub(content, "static")
	if err != nil {
		log.Fatal(err)
	}
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServer(http.FS(staticFS))))

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, `{"status":"ok"}`)
	})

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		t, _ := template.New("index").ParseFS(content, "views/layout.html", "views/index.html")
		err := t.ExecuteTemplate(w, "layout", site.sortedSlugs)
		check(err)
	})

	mux.HandleFunc("GET /category/{category}", func(w http.ResponseWriter, r *http.Request) {
		category := r.PathValue("category")
		_, ok := site.tags[category]
		if !ok {
			t, _ := template.ParseFS(content, "views/layout.html", "views/404.html")
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
		t, _ := template.ParseFS(content, "views/layout.html", "views/index.html")
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
			t, _ := template.ParseFS(content, "views/layout.html", "views/404.html")
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

		t, _ := template.ParseFS(content, "views/layout.html", templateFile)
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
				t, _ := template.ParseFS(content, "views/layout.html", "views/404.html")
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

		t, _ := template.ParseFS(content, "views/layout.html", templateFile)
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

	log.Println("Running at http://localhost:42069")
	log.Fatal(http.ListenAndServe(":42069", mux))
}
