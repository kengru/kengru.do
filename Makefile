build:
	CGO_ENABLED=0 go build -trimpath -ldflags='-s -w' -o ./bin/kengru-blog .

build-linux-amd64:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags='-s -w' -o ./bin/kengru-blog-linux-amd64 .
