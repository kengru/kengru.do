package main

import (
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

func main() {
	mux := http.NewServeMux()
	slugs := Slugs{}
	fil, err := os.Open("posts/initial.md")
	check(err)
	mdFile, err := md.ParseMDFile(fil)
	check(err)
	fil.Close()
	slugs[mdFile.Metadata.Slug] = mdFile
	mux.HandleFunc("/{slug}", func(w http.ResponseWriter, r *http.Request) {
		slug := r.PathValue("slug")
		md, ok := slugs[slug]
		if !ok {
			w.WriteHeader(http.StatusNotFound)
		}
		log.Println(md)
		w.WriteHeader(http.StatusOK)
	})
	log.Fatal(http.ListenAndServe(":42069", mux))
}
