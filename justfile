# https://just.systems

tool := "bun"

# tool := "npm"

# run dev server
dev host="":
    {{ tool }} run dev {{ if host == "host" { "--host" } else { "" } }}

# run vitest
test:
    {{ tool }} run test
