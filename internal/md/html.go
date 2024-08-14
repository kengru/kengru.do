package md

import (
	"bufio"
	"fmt"
	"strings"
)

func MDtoHTML(content string) {
	final := ""
	scn := bufio.NewScanner(strings.NewReader(content))
	for scn.Scan() {
		if len(scn.Text()) < 1 {
			continue
		}
		if scn.Text()[0] == '#' {
			final += fmt.Sprintln(heading(scn.Text()))
		}
	}
}

func heading(line string) string {
	// tmpl := template.New("templates/heading.tmpl")
	// err = tmpl.Execute()
	// // sp := strings.Cut(line, " ")
	return "<h1>"
}
