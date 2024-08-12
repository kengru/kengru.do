package main

import (
	"net/http"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	_ = http.NewServeMux()
	fil, err := os.Open("posts/initial.md")
	check(err)
	defer fil.Close()
}
