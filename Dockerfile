FROM node:8 as node

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY ./ /app/

ARG env=prod
ARG lang=en

RUN npm run build:$lang -- --prod --environment $env

FROM nginx:latest

COPY --from=node /app/dist/asciii-gui /usr/share/nginx/html

RUN ( \
  echo 'server {'; \
  echo '  listen 80;'; \
  echo '  sendfile on;'; \
  echo '  default_type application/octet-stream;'; \
  echo '  gzip on;'; \
  echo '  gzip_http_version 1.1;'; \
  echo '  gzip_disable      "MSIE [1-6]\.";'; \
  echo '  gzip_min_length   256;'; \
  echo '  gzip_vary         on;'; \
  echo '  gzip_proxied      expired no-cache no-store private auth;'; \
  echo '  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;'; \
  echo '  gzip_comp_level   9;'; \
  echo '  location / {'; \
  echo '    root /usr/share/nginx/html;'; \
  echo '    index index.html index.htm;'; \
  echo '    try_files $uri $uri/ /index.html =404;'; \
  echo '  }'; \
  echo '}'; \
  ) > /etc/nginx/conf.d/default.conf
