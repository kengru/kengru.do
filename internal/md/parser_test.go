package md

import (
	"bufio"
	"fmt"
	"strings"
	"testing"
	"time"
)

var testCorrectContent = `title: the good old test
description: the new descriptions are good
published: 12-08-2024
tags: books, thoughts, tech, more
slug: the-one-slug`
var testUnparsedMeta = `---
title: the good old test
description: the new descriptions are good
published: 12-08-2024
tags: books, thoughts, tech, more
slug: the-one-slug
---`

func TestGetMetadataText(t *testing.T) {
	scn := bufio.NewScanner(strings.NewReader(testUnparsedMeta))
	scn.Scan()
	metaText := GetMetadataText(scn)
	fmt.Println(metaText)
	if metaText != testCorrectContent {
		t.Fatal("got the wrong parsed text")
	}
}

func TestGetMetadata(t *testing.T) {
	correctMetadata := Metadata{
		Title:       "the good old test",
		Description: "the new descriptions are good",
		Published:   time.Date(2024, 8, 12, 0, 0, 0, 0, time.UTC),
		Tags:        []string{"books", "thoughts", "tech", "more"},
		Slug:        "the-one-slug",
	}
	t.Run("should get the correct title", func(t *testing.T) {
		meta, err := GetMetadata(testCorrectContent)
		if err != nil {
			t.Fatalf("couldn't parse a correct content")
		}
		if meta.Title != correctMetadata.Title {
			t.Fatalf(`wanted "%s" got "%s"`, correctMetadata.Title, meta.Title)
		}
	})
	t.Run("should get the correct description", func(t *testing.T) {
		meta, err := GetMetadata(testCorrectContent)
		if err != nil {
			t.Fatalf("couldn't parse a correct content")
		}
		if meta.Description != correctMetadata.Description {
			t.Fatalf(`wanted "%s" got "%s"`, correctMetadata.Description, meta.Description)
		}
	})
	t.Run("should get the correct slug", func(t *testing.T) {
		meta, err := GetMetadata(testCorrectContent)
		if err != nil {
			t.Fatalf("couldn't parse a correct content")
		}
		if meta.Slug != correctMetadata.Slug {
			t.Fatalf(`wanted "%s" got "%s"`, correctMetadata.Slug, meta.Slug)
		}
	})
	t.Run("should get the correct tags", func(t *testing.T) {
		meta, err := GetMetadata(testCorrectContent)
		if err != nil {
			t.Fatalf("couldn't parse a correct content")
		}
		amountTags := len(meta.Tags)
		correctTags := len(correctMetadata.Tags)
		if amountTags != correctTags {
			t.Fatalf(`wanted %d got %d`, correctTags, amountTags)
		}
	})
	t.Run("should get the correct published date", func(t *testing.T) {
		meta, err := GetMetadata(testCorrectContent)
		if err != nil {
			t.Fatal(err)
		}
		if meta.Published != correctMetadata.Published {
			t.Fatalf(`wanted "%s" got "%s"`, correctMetadata.Published, meta.Published)
		}
	})
}

func TestParseMDFile(t *testing.T) {
	
}