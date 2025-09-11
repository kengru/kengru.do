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
	Draft       bool
}

type MD struct {
	Content string
	Metadata
}

func ParseMDFile(file *os.File) (MD, error) {
	md := MD{}
	content := ""
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if scanner.Text() == "---" {
			metaText := GetMetadataText(scanner)
			meta, err := GetMetadata(metaText)
			if err != nil {
				return md, err
			}
			md.Metadata = meta
		} else {
			content += fmt.Sprintln(scanner.Text())
		}
	}
	if len(content) > 1 {
		md.Content = content[:len(content)-1]
	} else {
		md.Content = content
	}

	if strings.HasPrefix(strings.TrimSpace(md.Content), "DRAFT") {
		md.Metadata.Draft = true
		md.Content = strings.TrimSpace(strings.TrimPrefix(strings.TrimSpace(md.Content), "DRAFT"))
	}

	return md, nil
}

func GetMetadataText(scn *bufio.Scanner) string {
	scn.Scan()
	metaText := ""
	for scn.Text() != "---" {
		metaText += fmt.Sprintln(scn.Text())
		scn.Scan()
	}
	return metaText[:len(metaText)-1]
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
			if len(sep) > 2 {
				metaData.Title = strings.Join(sep[1:], ": ")
			} else {
				metaData.Title = value
			}
		case "description":
			metaData.Description = value
		case "slug":
			metaData.Slug = value
		case "tags":
			metaData.Tags = strings.Split(value, ", ")
		case "published":
			date, err := time.Parse("02-01-2006", value)
			if err != nil {
				return metaData, err
			}
			metaData.Published = date
		}
	}
	return metaData, nil
}
