package md

import (
	"bufio"
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
			final += heading(scn.Text())
		}
	}
}

func heading(line string) string {
	return "<h1>" + line + "</h1>"
}
