package md

import (
	"bufio"
	"bytes"
	"html/template"
	"io"
	"log"
	"strings"
)

const (
	headingToken = "#"
	listToken    = "-"
	boldToken    = "**"
	italicToken  = "_"
)

var headingTemplate = `<h{{.Level}}>{{.Title}}</h{{.Level}}>`
var listItemTemplate = `<li>{{.}}</li>`
var paragraphTemplate = `<p>{{.}}</p>`

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
		if string(scn.Text()[0]) == headingToken {
			heading(scn.Text(), &final)
			continue
		}
		if string(scn.Text()[0]) == listToken {
			ul(&final, true)
			list(scn, &final)
			ul(&final, false)
			continue
		}
		paragraph(scn, &final)
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

func ul(w io.Writer, opening bool) {
	templ := "<ul>"
	if !opening {
		templ = "</ul>"
	}
	t, err := template.New("list").Parse(templ)
	if err != nil {
		log.Println(err)
	}
	err = t.Execute(w, heading)
	if err != nil {
		log.Println(err)
	}
}

func list(scn *bufio.Scanner, w io.Writer) {
	line := processLine(scn.Text())
	for scn.Scan() {
		_, af, _ := strings.Cut(line, " ")
		t, err := template.New("listItem").Parse(listItemTemplate)
		if err != nil {
			log.Println(err)
		}
		err = t.Execute(w, template.HTML(af))
		if err != nil {
			log.Println(err)
		}
		if len(scn.Text()) < 1 {
			return
		}
		line = processLine(scn.Text())
	}
}

func paragraph(scn *bufio.Scanner, w io.Writer) {
	p := []string{}
	p = append(p, processLine(scn.Text()))
	for scn.Scan() {
		if len(scn.Text()) < 1 {
			break
		}
		p = append(p, processLine(scn.Text()))
	}
	t, err := template.New("paragraph").Parse(paragraphTemplate)
	if err != nil {
		log.Println(err)
	}
	err = t.Execute(w, template.HTML(strings.Join(p, " ")))
	if err != nil {
		log.Println(err)
	}
}

func processLine(text string) string {
	final := replaceToken(text, boldToken, "<b>", "</b>")
	final = replaceToken(final, italicToken, "<i>", "</i>")
	return final
}

func replaceToken(text string, token string, sub1 string, sub2 string) string {
	final := ""
	idx := 0
	split := strings.Split(text, token)
	final += split[idx]
	for idx < len(split)-1 {
		final += sub1 + split[idx+1] + sub2
		final += split[idx+2]
		idx += 2
	}
	return final
}
