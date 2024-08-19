package md

import (
	"bufio"
	"bytes"
	"html/template"
	"io"
	"log"
	"strings"
)

var headingTemplate = `<h{{.Level}}>{{.Title}}</h{{.Level}}>`

type headingValue struct {
	Level int
	Title string
}

func MDtoHTML(content string) bytes.Buffer {
	final := bytes.Buffer{}
	scn := bufio.NewScanner(strings.NewReader(content))
	for scn.Scan() {
		if len(scn.Text()) < 1 {
			continue
		}
		if scn.Text()[0] == '#' {
			heading(scn.Text(), &final)
		}
	}
	return final
}

func heading(line string, w io.Writer) {
	bf, af, _ := strings.Cut(line, " ")
	heading := headingValue{
		Level: len(bf),
		Title: af,
	}
	t, err := template.New("heading").Parse(headingTemplate)
	if err != nil {
		log.Println(err)
	}
	err = t.Execute(w, heading)
	if err != nil {
		log.Println(err)
	}
}
