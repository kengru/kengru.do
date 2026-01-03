package md

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strconv"
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
	Type        string // e.g., "review" for book reviews
	Rating      int    // 1-10 scale for reviews
	Image       string // Path to OG/cover image
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
			metaText, err := GetMetadataText(scanner)
			if err != nil {
				return md, err
			}
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

func GetMetadataText(scn *bufio.Scanner) (string, error) {
	metaText := ""
	for scn.Scan() {
		if scn.Text() == "---" {
			break
		}
		metaText += fmt.Sprintln(scn.Text())
	}
	if err := scn.Err(); err != nil {
		return "", err
	}
	if len(metaText) == 0 {
		return "", nil
	}
	return metaText[:len(metaText)-1], nil
}

func GetMetadata(meta string) (Metadata, error) {
	metaData := Metadata{}
	for _, line := range strings.Split(meta, "\n") {
		if len(line) < 3 {
			continue
		}
		sep := strings.SplitN(line, ": ", 2)
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
		case "published":
			date, err := time.Parse("02-01-2006", value)
			if err != nil {
				return metaData, err
			}
			metaData.Published = date
		case "type":
			metaData.Type = value
		case "rating":
			rating, err := strconv.Atoi(value)
			if err != nil {
				return metaData, err
			}
			if rating < 1 || rating > 10 {
				return metaData, errors.New("rating must be between 1 and 10")
			}
			metaData.Rating = rating
		case "image":
			metaData.Image = value
		}
	}
	return metaData, nil
}
