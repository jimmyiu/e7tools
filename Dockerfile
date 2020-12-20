FROM node:12-alpine as builder
# ENV NODE_ENV production
WORKDIR /usr/local/src
COPY . .
RUN yarn && yarn build

FROM nginx:stable-alpine
LABEL version="1.0" maintainer="IUHH <me@iuhh.dev>"
RUN rm -rf /usr/share/nginx/html/* && \
    rm /etc/nginx/conf.d/default.conf && \
    echo '\
server {\
  listen 80;\
  location / {\
    root /usr/share/nginx/html;\
    try_files $uri $uri/ @rewrites;\
    location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {\
      # Some basic cache-control for static files to be sent to the browser\
      expires max;\
      add_header Pragma public;\
      add_header Cache-Control "public, must-revalidate, proxy-revalidate";\
    }\
  }\
  location @rewrites {\
    rewrite ^(.+)$ /index.html last;\
  }\
}' >> /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/local/src/dist /usr/share/nginx/html/
