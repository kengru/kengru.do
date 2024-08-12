package md

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"
)

type Metadata struct {
	Title       string
	Description string
	Published   time.Time
	Tags        []string
	Slug        string
}

type MD struct {
	Content string
	Metadata
}

func ParseMDFile(file *os.File) (MD, error) {
	md := MD{}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if scanner.Text() == "---" {
			scanner.Scan()
			metaText := ""
			for scanner.Text() != "---" {
				metaText += fmt.Sprintln(scanner.Text())
				scanner.Scan()
			}
			meta, err := GetMetadata(metaText)
			if err != nil {
				return md, err
			}
			md.Metadata = meta
		}
	}
	return md, nil
}

func GetMetadata(meta string) (Metadata, error) {
	metaData := Metadata{}
	for _, line := range strings.Split(meta, "\n") {
		if len(line) < 3 {
			continue
		}
		sep := strings.Split(line, ": ")
		if len(sep) < 2 {
			continue
		}
		property := sep[0]
		value := sep[1]
		switch property {
		case "title":
			metaData.Title = value
		case "description":
			metaData.Description = value
		case "slug":
			metaData.Slug = value
		case "tags":
			metaData.Tags = strings.Split(value, ", ")
		}
	}
	return metaData, nil
}
