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
	headingToken    = "#"
	listToken       = "-"
	boldToken       = "**"
	italicToken     = "_"
	inlineCodeToken = "`"
	spaceToken      = "  "
	blockToken      = "```"
	imageToken      = "!["
)

const (
	headingTemplate   = `<h{{.Level}}>{{.Title}}</h{{.Level}}>`
	listItemTemplate  = `<li>{{.}}</li>`
	paragraphTemplate = `<p>{{.}}</p>`
	codeBlockTemplate = `<pre><code>{{.}}</code></pre>`
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
		if strings.HasPrefix(scn.Text(), blockToken) {
			codeBlock(scn, &final)
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
	if len(parts) < 2 {
		return
	}
	altText := strings.Replace(parts[0], "![", "", 1)
	urlAndTitle := strings.ReplaceAll(parts[1], "(", "")
	urlAndTitle = strings.ReplaceAll(urlAndTitle, ")", "")
	uT := strings.SplitN(urlAndTitle, " ", 2)

	img := imageValue{
		Url:     uT[0],
		AltText: altText,
	}
	// Handle optional title
	if len(uT) > 1 {
		img.Title = strings.Trim(uT[1], `"`)
	}

	t, err := template.New("image").Parse(imageTemplate)
	if err != nil {
		log.Println(err)
		return
	}
	err = t.Execute(w, img)
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
	// Process the first line (current scanner position)
	renderListItem(scn.Text(), w)

	// Continue processing while we have more list items
	for scn.Scan() {
		if len(scn.Text()) < 1 {
			return
		}
		if string(scn.Text()[0]) != listToken {
			return
		}
		renderListItem(scn.Text(), w)
	}
}

func renderListItem(line string, w io.Writer) {
	processed := processLine(line)
	_, content, _ := strings.Cut(processed, " ")
	t, err := template.New("listItem").Parse(listItemTemplate)
	if err != nil {
		log.Println(err)
		return
	}
	err = t.Execute(w, template.HTML(content))
	if err != nil {
		log.Println(err)
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

func codeBlock(scn *bufio.Scanner, w io.Writer) {
	lines := []string{}
	for scn.Scan() {
		if strings.HasPrefix(scn.Text(), blockToken) {
			break
		}
		lines = append(lines, template.HTMLEscapeString(scn.Text()))
	}
	t, err := template.New("codeBlock").Parse(codeBlockTemplate)
	if err != nil {
		log.Println(err)
		return
	}
	err = t.Execute(w, template.HTML(strings.Join(lines, "\n")))
	if err != nil {
		log.Println(err)
	}
}

func processLine(text string) string {
	final := replaceToken(text, boldToken, "<b>", "</b>")
	final = replaceToken(final, italicToken, "<i>", "</i>")
	final = replaceToken(final, inlineCodeToken, "<code>", "</code>")
	final = replaceLinks(final)
	return final
}

func replaceToken(text string, token string, sub1 string, sub2 string) string {
	split := strings.Split(text, token)
	// If odd number of parts, we have unclosed tokens - handle gracefully
	if len(split) == 1 {
		return text
	}

	final := split[0]
	for i := 1; i < len(split); i += 2 {
		if i+1 < len(split) {
			// We have a matching pair
			final += sub1 + split[i] + sub2 + split[i+1]
		} else {
			// Unclosed token - just append it as-is with the token
			final += token + split[i]
		}
	}
	return final
}

// replaceLinks recursively replaces all markdown links in the text
func replaceLinks(text string) string {
	result := replaceLink(text)
	// Keep replacing until no more links are found
	for result != text {
		text = result
		result = replaceLink(text)
	}
	return result
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
	if fidx == -1 {
		return text
	}
	lidx := strings.Index(second, ")")
	if lidx == -1 {
		return text
	}
	if lidx+1 < len(second) && second[lidx+1] == ')' {
		lidx++
	}
	tx := first[fidx+1:]
	ur := second[:lidx]
	link := linkValue{
		Text: tx,
		Url:  ur,
	}
	t, err := template.New("link").Parse(linkTemplate)
	if err != nil {
		log.Println(err)
		return text
	}
	err = t.Execute(&buf, link)
	if err != nil {
		log.Println(err)
		return text
	}
	firstPart := text[0:fidx]
	secondPart := text[len(first)+len(ur)+3:]
	return firstPart + buf.String() + secondPart
}
