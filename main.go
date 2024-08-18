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

func main() {
	mux := http.NewServeMux()
	slugs := translateMDIntoSlugs("posts")

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		t, _ := template.ParseFiles("views/index.html")
		err := t.Execute(w, slugs)
		check(err)
	})
	mux.HandleFunc("/{slug}", func(w http.ResponseWriter, r *http.Request) {
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
