# Self-Contained Binary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a single statically-linked binary that serves the kengru.do blog with `posts/`, `views/`, and `static/` embedded via `go:embed`, requiring no sibling directories at runtime.

**Architecture:** Embed the three asset trees into one `embed.FS` in `main.go`. Switch all runtime filesystem reads (markdown loading, static serving, template parsing) to that FS. Refactor the markdown parser to accept `io.Reader` so embedded files work. Remove the unused admin subsystem (the only source of runtime writes) and delete the Docker deploy path in favor of the binary.

**Tech Stack:** Go 1.22 (stdlib only: `embed`, `io/fs`, `net/http`, `html/template`). No external deps, no `go.sum`.

---

## File Structure

- `internal/md/parser.go` — **Modify.** Rename `ParseMDFile(*os.File)` → `ParseMD(io.Reader)`; drop the `os` import.
- `internal/md/parser_test.go` — **Modify.** Fill in the empty `TestParseMDFile` to test `ParseMD` via an `io.Reader`.
- `main.go` — **Modify.** Add `//go:embed`, switch reads to the embedded FS, delete admin routes/functions/types, prune unused imports.
- `Makefile` — **Modify.** Add a default `build` target.
- `views/admin-layout.html`, `views/admin-edit.html`, `views/admin-list.html` — **Delete.**
- `Dockerfile`, `.dockerignore`, `docker-compose.yml` — **Delete.**
- `.github/workflows/docker-publish.yml` — **Delete.**

---

## Task 1: Refactor the markdown parser to accept io.Reader

**Files:**
- Modify: `internal/md/parser.go`
- Test: `internal/md/parser_test.go:94` (the empty `TestParseMDFile` stub)

- [ ] **Step 1: Write the failing test**

Replace the empty `TestParseMDFile` function (lines 94-96) in `internal/md/parser_test.go` with a test that drives the new `ParseMD(io.Reader)` signature:

```go
func TestParseMDFile(t *testing.T) {
	input := `---
title: the good old test
description: the new descriptions are good
published: 12-08-2024
tags: books, thoughts, tech, more
slug: the-one-slug
---
Hello body.`
	md, err := ParseMD(strings.NewReader(input))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if md.Title != "the good old test" {
		t.Fatalf(`wanted title "the good old test" got "%s"`, md.Title)
	}
	if md.Slug != "the-one-slug" {
		t.Fatalf(`wanted slug "the-one-slug" got "%s"`, md.Slug)
	}
	if md.Content != "Hello body." {
		t.Fatalf(`wanted content "Hello body." got "%s"`, md.Content)
	}
}
```

(`strings` is already imported in the test file.)

- [ ] **Step 2: Run test to verify it fails**

Run: `go test ./internal/md/ -run TestParseMDFile -v`
Expected: FAIL — compile error `undefined: ParseMD` (the function is still named `ParseMDFile` and takes `*os.File`).

- [ ] **Step 3: Rename and re-type the function**

In `internal/md/parser.go`, change the signature at line 61 from:

```go
func ParseMDFile(file *os.File) (MD, error) {
	md := MD{}
	content := ""
	scanner := bufio.NewScanner(file)
```

to:

```go
func ParseMD(r io.Reader) (MD, error) {
	md := MD{}
	content := ""
	scanner := bufio.NewScanner(r)
```

The rest of the function body is unchanged. Then update the imports block (lines 3-11): remove `"os"` and add `"io"`:

```go
import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"strconv"
	"strings"
	"time"
)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `go test ./internal/md/ -run TestParseMDFile -v`
Expected: PASS.

Note: the full package (`go test ./internal/md/`) will still fail to build at this point only if something else references `ParseMDFile` — but the sole other caller is `main.go`, a different package, so `go test ./internal/md/` passes now. `main.go` is fixed in Task 2.

- [ ] **Step 5: Commit**

```bash
git add internal/md/parser.go internal/md/parser_test.go
git commit -m "Refactor md parser to accept io.Reader"
```

---

## Task 2: Embed assets and switch main.go to the embedded FS

**Files:**
- Modify: `main.go`

This task makes `main.go` read everything from an embedded `embed.FS`. It also removes the admin subsystem in the same pass, because admin is the only code that writes to disk and pulls in the `os`/`path/filepath` imports we're dropping. After this task the project builds again.

- [ ] **Step 1: Update imports and add the embedded FS**

Replace the import block (lines 3-16) in `main.go` with:

```go
import (
	"embed"
	"encoding/xml"
	"fmt"
	"html/template"
	"io/fs"
	"log"
	"net/http"
	"sort"
	"time"

	"github.com/kengru/kengru.do/internal/md"
)

//go:embed posts views static
var content embed.FS
```

Removed: `os`, `path/filepath`, `strings`. Added: `embed`, `io/fs`. (`strings` was used only by `validateFilePath`, which is being deleted.)

- [ ] **Step 2: Delete the admin types**

Remove the `AdminPost` struct (lines 63-70) and the `AdminEditData` struct (lines 72-77), including the `// Admin types` comment.

- [ ] **Step 3: Switch markdown loading to the embedded FS**

In `translateMDIntoSlugs`, replace the disk reads. Change:

```go
func translateMDIntoSlugs(dirName string) Slugs {
	slugs := Slugs{}
	dir, err := os.ReadDir(dirName)
	if err != nil {
		return slugs
	}
	for _, entry := range dir {
		if entry.IsDir() {
			continue
		}
		fileName := fmt.Sprintf("%s/%s", dirName, entry.Name())
		fil, err := os.Open(fileName)
		if err != nil {
			continue
		}
		mdFile, err := md.ParseMDFile(fil)
		fil.Close()
		if err != nil {
			continue
		}

		if !mdFile.Metadata.Draft {
			slugs[mdFile.Metadata.Slug] = mdFile
		}
	}
	return slugs
}
```

to:

```go
func translateMDIntoSlugs(dirName string) Slugs {
	slugs := Slugs{}
	dir, err := fs.ReadDir(content, dirName)
	if err != nil {
		return slugs
	}
	for _, entry := range dir {
		if entry.IsDir() {
			continue
		}
		fileName := fmt.Sprintf("%s/%s", dirName, entry.Name())
		fil, err := content.Open(fileName)
		if err != nil {
			continue
		}
		mdFile, err := md.ParseMD(fil)
		fil.Close()
		if err != nil {
			continue
		}

		if !mdFile.Metadata.Draft {
			slugs[mdFile.Metadata.Slug] = mdFile
		}
	}
	return slugs
}
```

- [ ] **Step 4: Delete admin helper functions**

Remove these three functions entirely:
- `adminAuth` (currently lines 167-182)
- `validateFilePath` (currently lines 184-187)
- `getAdminPosts` (currently lines 189-224)

- [ ] **Step 5: Switch static serving to the embedded FS**

In `main`, replace:

```go
	fs := http.FileServer(http.Dir("./static"))

	mux.Handle("GET /static/", http.StripPrefix("/static/", fs))
```

with:

```go
	staticFS, err := fs.Sub(content, "static")
	if err != nil {
		log.Fatal(err)
	}
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServer(http.FS(staticFS))))
```

(The local variable is renamed from `fs` to `staticFS` to avoid shadowing the `io/fs` package.)

- [ ] **Step 6: Switch every template.ParseFiles to template.ParseFS**

There are several call sites in the public handlers. Make these exact replacements (each `template.ParseFiles(content, ...)` does not exist — the FS arg goes first in `ParseFS`):

| Location | Before | After |
|---|---|---|
| `GET /` | `template.New("index").ParseFiles("views/layout.html", "views/index.html")` | `template.New("index").ParseFS(content, "views/layout.html", "views/index.html")` |
| `GET /category/{category}` 404 branch | `template.ParseFiles("views/layout.html", "views/404.html")` | `template.ParseFS(content, "views/layout.html", "views/404.html")` |
| `GET /category/{category}` success | `template.ParseFiles("views/layout.html", "views/index.html")` | `template.ParseFS(content, "views/layout.html", "views/index.html")` |
| `GET /en/{slug}` 404 branch | `template.ParseFiles("views/layout.html", "views/404.html")` | `template.ParseFS(content, "views/layout.html", "views/404.html")` |
| `GET /en/{slug}` success | `template.ParseFiles("views/layout.html", templateFile)` | `template.ParseFS(content, "views/layout.html", templateFile)` |
| `GET /{slug}` 404 branch | `template.ParseFiles("views/layout.html", "views/404.html")` | `template.ParseFS(content, "views/layout.html", "views/404.html")` |
| `GET /{slug}` success | `template.ParseFiles("views/layout.html", templateFile)` | `template.ParseFS(content, "views/layout.html", templateFile)` |

A fast way to do all of them: replace every occurrence of `template.ParseFiles(` with `template.ParseFS(content, ` and every `.ParseFiles("views/` chained after `template.New(...)` likewise. After editing, confirm zero `ParseFiles` remain (Step 8).

- [ ] **Step 7: Delete all admin routes**

Remove the entire `// Admin routes` block in `main` — all six handlers:
- `GET /admin`
- `GET /admin/new`
- `POST /admin/new`
- `GET /admin/edit`
- `POST /admin/save`
- `POST /admin/delete`

(Currently lines 389-516, from the `// Admin routes` comment through the closing `}))` of the delete handler, leaving the `log.Println` / `ListenAndServe` lines intact.)

- [ ] **Step 8: Build and verify no stray references**

Run: `go build ./... && echo OK`
Expected: `OK` (compiles with no unused-import or undefined-symbol errors).

Run: `grep -nE "admin|ADMIN_PASS|http.Dir|ParseFiles|os\.|ParseMDFile" main.go || echo CLEAN`
Expected: `CLEAN` (no remaining admin code, disk reads, or old template calls).

- [ ] **Step 9: Run the unit tests**

Run: `go test ./...`
Expected: all packages PASS (`internal/md` tests green; root package builds).

- [ ] **Step 10: Commit**

```bash
git add main.go
git commit -m "Embed assets via go:embed and remove admin subsystem"
```

---

## Task 3: Delete admin views and the Docker deploy path

**Files:**
- Delete: `views/admin-layout.html`, `views/admin-edit.html`, `views/admin-list.html`
- Delete: `Dockerfile`, `.dockerignore`, `docker-compose.yml`
- Delete: `.github/workflows/docker-publish.yml`

- [ ] **Step 1: Remove the files**

```bash
git rm views/admin-layout.html views/admin-edit.html views/admin-list.html \
       Dockerfile .dockerignore docker-compose.yml \
       .github/workflows/docker-publish.yml
```

- [ ] **Step 2: Verify the build still embeds cleanly**

The `//go:embed views` directive embeds the whole `views/` dir; removing admin templates is fine since no code references them.

Run: `go build ./... && echo OK`
Expected: `OK`.

- [ ] **Step 3: Commit**

```bash
git commit -m "Delete admin views and Docker deploy path"
```

---

## Task 4: Add a default Makefile build target

**Files:**
- Modify: `Makefile`

- [ ] **Step 1: Add the `build` target**

Prepend a native `build` target above the existing `build-linux-amd64` target so bare `make` builds the self-contained binary. The full `Makefile` becomes:

```make
build:
	CGO_ENABLED=0 go build -trimpath -ldflags='-s -w' -o ./bin/kengru-blog .

build-linux-amd64:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags='-s -w' -o ./bin/kengru-blog-linux-amd64 .
```

- [ ] **Step 2: Run the default build**

Run: `make`
Expected: produces `./bin/kengru-blog` with no errors.

- [ ] **Step 3: Commit**

```bash
git add Makefile
git commit -m "Add default make build target"
```

---

## Task 5: Verify the binary is truly self-contained

**Files:** none (verification only).

- [ ] **Step 1: Run the binary from an empty directory**

Copy only the binary into an empty temp dir and start it there, proving it needs no sibling `posts/`/`views/`/`static/`:

```bash
rm -rf /tmp/kengru-selftest && mkdir -p /tmp/kengru-selftest
cp ./bin/kengru-blog /tmp/kengru-selftest/
( cd /tmp/kengru-selftest && ./kengru-blog ) &
sleep 1
```

Expected log: `Running at http://localhost:42069`.

- [ ] **Step 2: Hit every route class and assert success**

```bash
base=http://localhost:42069
for path in "/" "/category/books" "/milo-1" "/en/milo-1" "/about" "/feed/rss" "/static/css/layout.css" "/static/favicon.svg"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$base$path")
  echo "$code  $path"
done
echo "--- 404 check ---"
curl -s -o /dev/null -w "%{http_code}  /no-such-slug\n" "$base/no-such-slug"
echo "--- RSS sanity ---"
curl -s "$base/feed/rss" | head -5
```

Expected: `200` for all eight listed paths; the missing slug returns `200` (the app renders the 404 *template* with a 200 status — current behavior, unchanged); the RSS output begins with `<?xml` / `<rss version="2.0">`.

- [ ] **Step 3: Stop the test server**

```bash
kill %1 2>/dev/null; rm -rf /tmp/kengru-selftest
```

- [ ] **Step 4: Final regression check**

Run: `go test ./... && go vet ./...`
Expected: tests PASS, vet clean.

No commit needed (verification only). If any check fails, return to the relevant task.

---

## Notes for the implementer

- **Port:** the server listens on `:42069` (hardcoded in `main`). The self-test assumes that port is free.
- **Sample slugs** used in Task 5 are real as of this plan: `milo-1` (post, has EN), `about` (static page), `books` (category tag).
- **404 status quirk:** the existing handlers render `views/404.html` with the default 200 status for unknown slugs/categories. This plan preserves that behavior exactly — do not "fix" it here.
- **No `go.sum`:** the module uses only stdlib + the internal package; do not add dependencies.
