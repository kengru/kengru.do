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
	italicToken  = "__"
	spaceToken   = "  "
	blockToken   = "```"
	imageToken   = "!["
)

const (
	headingTemplate   = `<h{{.Level}}>{{.Title}}</h{{.Level}}>`
	listItemTemplate  = `<li>{{.}}</li>`
	paragraphTemplate = `<p>{{.}}</p>`
	blockTemplate     = `<blockquote>{{.}}</blockquote>`
	imageTemplate     = `<img src="{{.Url}}" alt="{{.AltText}}" title="{{.Title}}"/>`
	linkTemplate      = `<a href="{{.Url}}">{{.Text}}</a>`
)

type headingValue struct {
	Level int
	Title string
}

type imageValue struct {
	Url     string
	AltText string
	Title   string
}

type linkValue struct {
	Url  string
	Text string
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
		if strings.Contains(scn.Text(), blockToken) {
			block(scn, &final)
			continue
		}
		if strings.Contains(scn.Text(), imageToken) {
			image(scn.Text(), &final)
			continue
		}
		paragraph(scn, &final)
	}
	return final
}

func image(line string, w io.Writer) {
	parts := strings.Split(line, "]")
	altText := strings.Replace(parts[0], "![", "", 1)
	urlAndTitle := strings.ReplaceAll(parts[1], "(", "")
	urlAndTitle = strings.ReplaceAll(urlAndTitle, ")", "")
	uT := strings.Split(urlAndTitle, " ")
	image := imageValue{
		Title:   strings.Replace(uT[1], `"`, "", 1),
		Url:     uT[0],
		AltText: altText,
	}
	t, err := template.New("image").Parse(imageTemplate)
	if err != nil {
		log.Println(err)
	}
	err = t.Execute(w, image)
	if err != nil {
		log.Println(err)
	}
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

func block(scn *bufio.Scanner, w io.Writer) {
	final := ""
	for scn.Scan() {
		if strings.Contains(scn.Text(), blockToken) {
			break
		}
		final += scn.Text() + `<br>`
	}
	t, err := template.New("block").Parse(blockTemplate)
	if err != nil {
		log.Println(err)
	}
	err = t.Execute(w, template.HTML(final))
	if err != nil {
		log.Println(err)
	}
}

func processLine(text string) string {
	final := replaceToken(text, boldToken, "<b>", "</b>")
	final = replaceToken(final, italicToken, "<i>", "</i>")
	final = replaceLink(final)
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

func replaceLink(text string) string {
	buf := bytes.Buffer{}
	textAndUrl := strings.Split(text, "](")
	if len(textAndUrl) < 2 {
		return text
	}
	first := textAndUrl[0]
	second := textAndUrl[1]
	fidx := strings.LastIndex(first, "[")
	lidx := strings.Index(second, ")")
	tx := first[fidx+1:]
	ur := second[:lidx]
	link := linkValue{
		Text: tx,
		Url:  ur,
	}
	t, err := template.New("link").Parse(linkTemplate)
	if err != nil {
		log.Println(err)
	}
	err = t.Execute(&buf, link)
	if err != nil {
		log.Println(err)
	}
	firstPart := text[0:fidx]
	secondPart := text[len(first)+len(ur)+3:]
	return firstPart + buf.String() + secondPart
}
