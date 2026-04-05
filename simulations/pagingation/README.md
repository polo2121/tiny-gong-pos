# Pagination Simulation

This folder is **simulation-only** and does not touch app code.

## File

- `product-pagination-simulation.js`
  - Simulates product-level pagination with CTE-style steps:
    - `params`
    - `matched_products`
    - `page_probe` (`limit + 1`)
    - `current_page`
    - `next_cursor`
    - `full_variants`

## Run

```bash
node simulations/pagingation/product-pagination-simulation.js
```

## What you will see

For each run:

1. Input payload
2. Code snippet for each step
3. Output of each step (JSON)
4. Final output rows (variants + repeated next cursor fields)

The script runs:

- Page 1 (`cursor: null`)
- Page 2 (using page 1 `nextCursor`)

