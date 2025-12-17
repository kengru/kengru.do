# Build stage
FROM golang:1.22.0-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum* ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Runtime stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/main .

# Copy necessary directories
COPY --from=builder /app/posts ./posts
COPY --from=builder /app/static ./static
COPY --from=builder /app/views ./views

# Expose the port the app runs on
EXPOSE 42069

# Run the application
CMD ["./main"]
