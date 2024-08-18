package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/kengru/kengru.do/internal/md"
)

type Slugs map[string]md.MD
type Tags map[string]bool

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

func main() {
	mux := http.NewServeMux()
	slugs := translateMDIntoSlugs("posts")
	tags := getTagsFromSlugs(slugs)
	fs := http.FileServer(http.Dir("./static"))

	mux.Handle("GET /static/", http.StripPrefix("/static/", fs))

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		t, _ := template.ParseFiles("views/layout.html", "views/index.html")
		err := t.ExecuteTemplate(w, "layout", slugs)
		check(err)
	})
	mux.HandleFunc("GET /category/{category}", func(w http.ResponseWriter, r *http.Request) {
		category := r.PathValue("category")
		_, ok := tags[category]
		if !ok {
			w.WriteHeader(http.StatusNotFound)
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
		_, ok := slugs[slug]
		if !ok {
			w.WriteHeader(http.StatusNotFound)
			return
		}
		w.WriteHeader(http.StatusOK)
	})
	log.Fatal(http.ListenAndServe(":42069", mux))
}
