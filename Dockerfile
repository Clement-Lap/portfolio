FROM ghcr.io/nubjs/nub AS build
WORKDIR /app
COPY package.json nub.lock ./
RUN nub ci
COPY . .
RUN nub run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
