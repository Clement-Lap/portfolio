# https://just.systems

tool := "bun"

# tool := "npm"

# run dev server
dev:
    {{ tool }} run dev

# run vitest
test:
    {{ tool }} run test
