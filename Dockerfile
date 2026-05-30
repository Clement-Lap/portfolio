FROM dhi.io/bun:1-debian13-dev
WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

EXPOSE 4321

CMD ["bun", "./dist/server/entry.mjs"]
