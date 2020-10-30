FROM nginx:1.19.3-alpine

COPY build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
