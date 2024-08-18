package md

import (
	"bufio"
	"io"
	"strings"
	"text/template"
)

type FinalContent struct {
	data []byte
}

func (fc FinalContent) Write(p []byte) (n int, err error) {
	l := len(p)
	newLine := []byte("\n")
	fc.data = append(fc.data, p...)
	fc.data = append(fc.data, newLine...)
	return l, nil
}

func MDtoHTML(content string) {
	final := FinalContent{}
	scn := bufio.NewScanner(strings.NewReader(content))
	for scn.Scan() {
		if len(scn.Text()) < 1 {
			continue
		}
		if scn.Text()[0] == '#' {
			heading(scn.Text(), final)
		}
	}
}

func heading(line string, w io.Writer) {
	tmpl := template.New("templates/heading.tmpl")
	err := tmpl.Execute(w, line)

	// // sp := strings.Cut(line, " ")
	return "<h1>"
}
