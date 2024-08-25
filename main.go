package main

import (
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
	Title     string
	Published time.Time
	Tags      []string
	Content   template.HTML
}

type KeyData struct {
	Key  string
	Data md.MD
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
		slugs[mdFile.Metadata.Slug] = mdFile
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
		t, _ := template.ParseFiles("views/layout.html", "views/index.html")
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
		t, _ := template.ParseFiles("views/layout.html", "views/index.html")
		err := t.ExecuteTemplate(w, "layout", categorySlugs)
		check(err)
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
		t, _ := template.ParseFiles("views/layout.html", "views/post.html")
		postData := PostData{
			Title:     mark.Title,
			Published: mark.Published,
			Tags:      mark.Tags,
			Content:   template.HTML(final.String()),
		}
		err := t.ExecuteTemplate(w, "layout", postData)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	})
	log.Fatal(http.ListenAndServe(":42069", mux))
}
