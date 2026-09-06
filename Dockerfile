FROM denoland/deno:2.8.0 AS build
WORKDIR /app
COPY deno.lock deno.json ./

RUN deno ci

COPY . .

RUN deno task build
