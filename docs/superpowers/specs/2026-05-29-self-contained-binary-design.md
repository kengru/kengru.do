# Self-Contained Binary — Design

**Date:** 2026-05-29
**Status:** Approved

## Goal

Produce a single statically-linked binary that runs anywhere with **no** `posts/`,
`views/`, or `static/` directories beside it. The public site must keep working
identically — home, category pages, individual posts (ES + EN), static pages
(`/about`, `/now`, `/uses`, …), the RSS feed, and all CSS/JS/image assets.

This unblocks a binary-based CD pipeline: build once, ship one file, run it.

## Scope

In scope:
- Embed `posts/`, `views/`, `static/` into the binary via `go:embed`.
- Switch all runtime filesystem reads to the embedded `embed.FS`.
- Refactor `md.ParseMDFile(*os.File)` → reader-based so embedded files work.
- Remove the admin subsystem entirely (unused).
- Add a default `make build` target.
- Delete the Docker deploy path (Dockerfile, `.dockerignore`, `docker-compose.yml`).
- Delete the now-obsolete `.github/workflows/docker-publish.yml`.

Out of scope:
- The new CD workflow itself (the user will author it separately).
- Any content, styling, or feature changes to the public site.

## Architecture

### Embedding

In `main.go`, declare one embedded filesystem covering all three trees:

```go
import "embed"

//go:embed posts views static
var content embed.FS
```

Because `go:embed` snapshots files at compile time, the dev workflow is unchanged:
`air` already rebuilds the binary on any `.md` / `.html` / `.go` change
(`include_ext = ["go", "html", "md"]`), so every rebuild re-snapshots content.

### Runtime reads → embedded FS

| Concern | Before | After |
|---|---|---|
| Markdown dirs | `os.ReadDir(dir)` / `os.Open(path)` | `fs.ReadDir(content, dir)` / `content.Open(path)` |
| Static assets | `http.FileServer(http.Dir("./static"))` | `http.FileServer(http.FS(staticFS))` where `staticFS, _ = fs.Sub(content, "static")` |
| HTML templates | `template.ParseFiles("views/...")` | `template.ParseFS(content, "views/...")` |

Embedded paths always use forward slashes and are relative to the module root
(e.g. `posts/en`, `views/layout.html`) — which matches the existing string
literals, so no path rewriting is needed beyond the API swap.

`fs.ReadDir` returns `[]fs.DirEntry` and `content.Open` returns an `fs.File`
(an `io.Reader`); both integrate with the parser refactor below.

### Parser refactor

`internal/md/parser.go` currently exposes:

```go
func ParseMDFile(file *os.File) (MD, error)
```

`*os.File` is too concrete — embedded files are `fs.File`, not `*os.File`. The
function only ever reads sequentially via `bufio.NewScanner`, which needs only an
`io.Reader`. Change the signature to:

```go
func ParseMD(r io.Reader) (MD, error)
```

Rename for clarity (it no longer requires a "file"). Both `*os.File` (dev/tests)
and `fs.File` (embedded) satisfy `io.Reader`, so callers pass the opened handle
directly. `ParseMDString` is unchanged. Drop the now-unused `os` import from the
package if nothing else needs it.

Callers updated: `translateMDIntoSlugs` in `main.go` (the only remaining caller
after admin removal).

### Admin removal

The admin subsystem is unused and is the only source of runtime writes. Removing
it makes the embedded (read-only) FS sufficient. Delete:

- **Routes:** `GET /admin`, `GET /admin/new`, `POST /admin/new`,
  `GET /admin/edit`, `POST /admin/save`, `POST /admin/delete`.
- **Functions:** `adminAuth`, `validateFilePath`, `getAdminPosts`.
- **Types:** `AdminPost`, `AdminEditData`.
- **Views:** `views/admin-layout.html`, `views/admin-edit.html`,
  `views/admin-list.html`.
- **Env:** `ADMIN_PASS` (no longer referenced anywhere).

After removal, prune unused imports from `main.go`: `os` and `path/filepath`
become unused (`os` was used only by admin + the old direct file reads;
`filepath` only by `validateFilePath`). Verify with the compiler.

### Build & deploy

**Makefile** — add a native default target, keep the cross-compile target:

```make
build:
	CGO_ENABLED=0 go build -trimpath -ldflags='-s -w' -o ./bin/kengru-blog .

build-linux-amd64:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags='-s -w' -o ./bin/kengru-blog-linux-amd64 .
```

`make` (which runs the first target) now produces the self-contained binary.

**Delete the Docker path entirely:**
- `Dockerfile`
- `.dockerignore`
- `docker-compose.yml`
- `.github/workflows/docker-publish.yml` (builds the now-deleted Dockerfile on
  every push to `main`; would fail otherwise — the user will add new CD).

## Data Flow (unchanged externally)

Request → `mux` → handler → `site.slugs` / `site.staticSlugs` / `site.enSlugs`
(populated at startup from embedded markdown) → `md.MDtoHTML` → `template.ParseFS`
render. Static assets served straight from the embedded `static` sub-FS. The only
change is the *source* of bytes (embedded vs. disk); routes, templates, and output
are identical.

## Error Handling

- `fs.ReadDir` on a missing embedded dir returns an error; `translateMDIntoSlugs`
  keeps its existing "return empty on error" behavior, so a missing optional tree
  (e.g. `posts/en`) degrades gracefully exactly as today.
- Template parse errors surface the same way (existing `check`/`log` paths).
- Embedding is validated at compile time: if a referenced directory is missing,
  the build fails fast rather than the binary failing at runtime.

## Testing

1. **Unit:** `go test ./...` — the `internal/md` tests must pass after the
   `ParseMDFile` → `ParseMD(io.Reader)` rename. `TestParseMDFile` is updated to
   pass a reader (e.g. wrap the opened file or use `strings.NewReader`).
2. **Build:** `make` succeeds and emits `./bin/kengru-blog`.
3. **Self-contained run:** copy *only* the binary into an empty temp directory,
   run it, and confirm HTTP 200 + correct content for:
   - `/` (home), `/category/books` (category)
   - a real post slug (ES) and its `/en/<slug>` counterpart
   - a static page (`/about`)
   - `/feed/rss` (valid RSS XML)
   - `/static/css/layout.css` and an image (asset serving)
   - a missing slug → 404 template
4. **No stray references:** grep confirms zero remaining mentions of `admin`,
   `ADMIN_PASS`, or `http.Dir` in Go sources.

## Risks / Notes

- `go:embed` requires the directories to exist at build time and be within the
  module — they are.
- Binary size grows by the size of `static/` (images/webp) + posts + views.
  Acceptable for a personal blog; this is the explicit tradeoff for a single-file
  deploy.
- `tmp/` and `bin/` are already git-ignored / build outputs; not embedded.
