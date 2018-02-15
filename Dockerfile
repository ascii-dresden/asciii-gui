FROM docker.io/lalyos/upx AS upx

FROM node:8 AS asset-builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN  npm install && npm cache clean --force

COPY .angular-cli.json /usr/src/app/
COPY build.js          /usr/src/app/
COPY tsconfig.json     /usr/src/app/
COPY tslint.json       /usr/src/app/

COPY src               /usr/src/app/src

RUN npm run build

FROM golang AS asset-compiler
RUN go get github.com/elazarl/go-bindata/...
RUN go get github.com/elazarl/go-bindata-assetfs/...

COPY --from=asset-builder /usr/src/app/dist /dist
RUN go-bindata-assetfs -nomemcopy -nocompress /dist/... \
 && ( grep -q '"os"' bindata_assetfs.go \
      || sed -e 's|"github.com/elazarl/go-bindata-assetfs"|"github.com/elazarl/go-bindata-assetfs"\n\t"os"|' -i bindata_assetfs.go ) \
 && cp bindata_assetfs.go /bindata_assetfs.go


FROM golang AS server-builder

RUN go get github.com/heptiolabs/healthcheck/...
RUN go get github.com/gorilla/handlers/...
RUN go get github.com/hkwi/h2c/...
RUN go get github.com/elazarl/go-bindata-assetfs/...
RUN go get github.com/heptiolabs/healthcheck/...

COPY --from=upx /bin/upx /bin/upx
RUN  ( \
     echo 'package main'; \
     echo ''; \
     echo 'import ('; \
     echo '    "github.com/gorilla/handlers"'; \
     echo '    "github.com/hkwi/h2c"'; \
     echo '    "log"'; \
     echo '    "net/http"'; \
     echo '    "os"'; \
     echo ')'; \
     echo ''; \
     echo 'func getEnv(key, fallback string) string {'; \
     echo '    if value, ok := os.LookupEnv("SERVER_" + key); ok {'; \
     echo '        return value'; \
     echo '    }'; \
     echo '    return fallback'; \
     echo '}'; \
     echo ''; \
     echo 'type hookedResponseWriter struct {'; \
     echo '    http.ResponseWriter'; \
     echo '    ignore bool'; \
     echo '}'; \
     echo ''; \
     echo 'func (hrw *hookedResponseWriter) WriteHeader(status int) {'; \
     echo '    if status == 404 {'; \
     echo '        hrw.ignore = true'; \
     echo '        fallbackDocument, err := Asset("dist/index.html")'; \
     echo '        if err != nil {'; \
     echo '            log.Fatal("cannot process 404-handler", err)'; \
     echo '        }'; \
     echo '        hrw.ResponseWriter.Header().Set("Content-Type", "text/html; charset=utf-8");'; \
     echo '        hrw.ResponseWriter.WriteHeader(200)'; \
     echo '        hrw.ResponseWriter.Write(fallbackDocument)'; \
     echo '    } else {'; \
     echo '        hrw.ResponseWriter.WriteHeader(status)'; \
     echo '    }'; \
     echo '}'; \
     echo ''; \
     echo 'func (hrw *hookedResponseWriter) Write(p []byte) (int, error) {'; \
     echo '    if hrw.ignore {'; \
     echo '        return len(p), nil'; \
     echo '    }'; \
     echo '    return hrw.ResponseWriter.Write(p)'; \
     echo '}'; \
     echo ''; \
     echo 'type NotFoundHook struct {'; \
     echo '    h http.Handler'; \
     echo '}'; \
     echo ''; \
     echo 'func (nfh NotFoundHook) ServeHTTP(w http.ResponseWriter, r *http.Request) {'; \
     echo '    nfh.h.ServeHTTP(&hookedResponseWriter{ResponseWriter: w}, r)'; \
     echo '}'; \
     echo ''; \
     echo 'func main() {'; \
     echo '    http.Handle("/", handlers.ProxyHeaders(handlers.LoggingHandler(os.Stdout, NotFoundHook{http.FileServer(assetFS())})))'; \
     echo '    log.Fatal(http.ListenAndServe(getEnv("BIND", ":8080"), &h2c.Server{}))'; \
     echo '}'; \
     ) > web.go
COPY --from=asset-compiler /bindata_assetfs.go bindata_assetfs.go
ARG GOOS=linux
ENV GOOS=$GOOS

ARG CGO_ENABLED=0
ENV CGO_ENABLED=$CGO_ENABLED

RUN go build -o /server bindata_assetfs.go web.go

ARG UPX_ARGS=-6
RUN upx ${UPX_ARGS} /server

FROM scratch
ENTRYPOINT ["server"]
COPY --from=server-builder /server /bin/server