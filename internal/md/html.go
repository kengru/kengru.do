package md

import (
	"bufio"
	"strings"
)

func MDtoHTML(content string) {
	scn := bufio.NewScanner(strings.NewReader(content))
	for scn.Scan() {
	}
}

func heading(line string) string {
	return ""
}
