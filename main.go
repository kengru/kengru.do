package main

import (
	"encoding/xml"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"sort"
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

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func translateMDIntoSlugs(dirName string) Slugs {
	slugs := Slugs{}
	dir, err := os.ReadDir(dirName)
	check(err)
	for _, entry := range dir {
		if entry.IsDir() {
			continue
		}
		fileName := fmt.Sprintf("%s/%s", dirName, entry.Name())
		fil, err := os.Open(fileName)
		check(err)
		mdFile, err := md.ParseMDFile(fil)
		check(err)
		fil.Close()

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

func main() {
	mux := http.NewServeMux()
	slugs := translateMDIntoSlugs("posts")
	sortedSlugs := slugs.getSortedSlugs()
	staticSlugs := translateMDIntoSlugs("posts/static")
	tags := getTagsFromSlugs(slugs)
	tags.appendMoreTags(getTagsFromSlugs(staticSlugs))
	fs := http.FileServer(http.Dir("./static"))

	mux.Handle("GET /static/", http.StripPrefix("/static/", fs))

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		t, _ := template.New("index").ParseFiles("views/layout.html", "views/index.html")
		err := t.ExecuteTemplate(w, "layout", sortedSlugs)
		check(err)
	})
	mux.HandleFunc("GET /category/{category}", func(w http.ResponseWriter, r *http.Request) {
		category := r.PathValue("category")
		_, ok := tags[category]
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
		for k, v := range slugs {
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
		for _, kd := range sortedSlugs {
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
				Language:      "en-us",
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

	mux.HandleFunc("GET /{slug}", func(w http.ResponseWriter, r *http.Request) {
		slug := r.PathValue("slug")
		mark, ok := slugs[slug]
		if !ok {
			check, ok := staticSlugs[slug]
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

		// Choose template based on post type
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
