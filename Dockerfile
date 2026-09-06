FROM denoland/deno:2.8.0 AS build
WORKDIR /app
COPY deno.lock deno.json ./

RUN deno ci

COPY . .

RUN deno task build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
