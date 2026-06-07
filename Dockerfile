FROM oven/bun:alpine
WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

EXPOSE 4321

CMD ["bun", "./dist/server/entry.mjs"]
