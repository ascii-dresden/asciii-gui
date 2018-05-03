# Stage 0, based on Node.js, to build and compile Angular
FROM node:8 as node

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY ./ /app/

ARG env=prod
ARG lang=en

RUN npm run build:$lang -- --prod --environment $env


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx

COPY --from=node /app/dist/ /usr/share/nginx/html

RUN ( \
    echo 'server {'; \
    echo '  listen 80;'; \
    echo '  location / {'; \
    echo '    root /usr/share/nginx/html;'; \
    echo '    index index.html index.htm;'; \
    echo '    try_files $uri $uri/ /index.html =404;'; \
    echo '  }'; \
    echo '}'; \
    ) >  /etc/nginx/conf.d/default.conf
