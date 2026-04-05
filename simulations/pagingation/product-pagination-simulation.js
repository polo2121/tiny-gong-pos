/**
 * Product-level pagination simulation (step-by-step).
 *
 * Goal:
 * - Match by variant attributes (or product name)
 * - Page by product (not variant row)
 * - Hydrate full variants for products in current page
 *
 * This is a simulation only, using in-memory arrays.
 */

const db = {
  categories: [
    { id: "C-SHOE", prefix: "SH", name: "Shoes" },
    { id: "C-TEE", prefix: "TS", name: "T-Shirts" },
  ],
  products: [
    { id: "P300", name: "Runner Pro", series_code: "RP-01", category_id: "C-SHOE" },
    { id: "P200", name: "Runner Lite", series_code: "RL-02", category_id: "C-SHOE" },
    { id: "P100", name: "Classic Tee", series_code: "CT-09", category_id: "C-TEE" },
  ],
  product_variants: [
    { id: "V9", product_id: "P300", created_at: "2026-04-04T10:00:00.000Z", gender: "male", color: "red", size: "43" },
    { id: "V8", product_id: "P300", created_at: "2026-04-04T09:58:00.000Z", gender: "male", color: "blue", size: "44" },
    { id: "V7", product_id: "P200", created_at: "2026-04-04T09:56:00.000Z", gender: "male", color: "black", size: "43" },
    { id: "V6", product_id: "P200", created_at: "2026-04-04T09:55:00.000Z", gender: "male", color: "black", size: "44" },
    { id: "V5", product_id: "P100", created_at: "2026-04-04T09:54:00.000Z", gender: "female", color: "white", size: "M" },
    { id: "V4", product_id: "P100", created_at: "2026-04-04T09:53:00.000Z", gender: "male", color: "white", size: "L" },
  ],
};

const ctePieces = {
  params: `
select trim(coalesce(p_query,'')) as q, lower(p_search_by) as search_by, p_limit as page_size ...
  `.trim(),
  matched_products: `
select pv.product_id, max(pv.created_at) as matched_at
from product_variants pv
join products p on p.id = pv.product_id
where (...)
group by pv.product_id
  `.trim(),
  page_probe: `
select product_id, matched_at
from matched_products
where cursor is null or (matched_at, product_id) < (cursor_created_at, cursor_id)
order by matched_at desc, product_id desc
limit page_size + 1
  `.trim(),
  current_page: `
select * from page_probe
order by matched_at desc, product_id desc
limit page_size
  `.trim(),
  next_cursor: `
-- has_more ကို page_probe (limit+1) နဲ့စစ်
-- cursor ကိုတော့ current_page ရဲ့ နောက်ဆုံး row ကိုသတ်မှတ်
select product_id as id, matched_at as createdAt
from current_page
order by matched_at asc, product_id asc
limit 1
  `.trim(),
  full_variants: `
select pv.*, p.*, c.*
from current_page cp
join products p on p.id = cp.product_id
join categories c on c.id = p.category_id
join product_variants pv on pv.product_id = p.id
  `.trim(),
};

function printSection(title, value) {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(value, null, 2));
}

function normalizeParams(input) {
  return {
    q: (input.query ?? "").trim(),
    searchBy: (input.searchBy ?? "name").toLowerCase(),
    pageSize: Math.max(Number(input.limit ?? 20), 1),
    cursor: input.cursor ?? null, // { id, createdAt } | null
  };
}

function matchVariant(row, product, params) {
  if (!params.q) return true;

  if (params.searchBy === "name") {
    return product.name.toLowerCase().includes(params.q.toLowerCase());
  }
  if (params.searchBy === "gender") return row.gender === params.q;
  if (params.searchBy === "color") return row.color === params.q;
  if (params.searchBy === "size") return row.size === params.q;
  return false;
}

function applyCursor(rows, cursor) {
  if (!cursor) return rows;
  return rows.filter(
    (r) =>
      r.matched_at < cursor.createdAt ||
      (r.matched_at === cursor.createdAt && r.product_id < cursor.id),
  );
}

function runSearchSimulation(input) {
  console.log("\n\n############################################");
  console.log("SIMULATION INPUT");
  console.log("############################################");
  console.log(JSON.stringify(input, null, 2));

  // (1) params
  const params = normalizeParams(input);
  printSection("CTE: params (code)", ctePieces.params);
  printSection("CTE: params (output)", params);

  // (2) matched_products
  const productById = new Map(db.products.map((p) => [p.id, p]));
  const matchedMap = new Map(); // product_id -> matched_at (max)

  for (const row of db.product_variants) {
    const product = productById.get(row.product_id);
    if (!product) continue;

    if (!matchVariant(row, product, params)) continue;

    const prev = matchedMap.get(row.product_id);
    if (!prev || row.created_at > prev) matchedMap.set(row.product_id, row.created_at);
  }

  let matchedProducts = Array.from(matchedMap.entries()).map(([product_id, matched_at]) => ({
    product_id,
    matched_at,
  }));

  matchedProducts.sort((a, b) => {
    if (a.matched_at !== b.matched_at) return a.matched_at < b.matched_at ? 1 : -1;
    return a.product_id < b.product_id ? 1 : -1; // DESC
  });

  printSection("CTE: matched_products (code)", ctePieces.matched_products);
  printSection("CTE: matched_products (output)", matchedProducts);

  // (3) page_probe
  const afterCursor = applyCursor(matchedProducts, params.cursor);
  const pageProbe = afterCursor.slice(0, params.pageSize + 1);
  printSection("CTE: page_probe (code)", ctePieces.page_probe);
  printSection("CTE: page_probe (output)", pageProbe);

  // (4) current_page
  const currentPage = pageProbe.slice(0, params.pageSize);
  printSection("CTE: current_page (code)", ctePieces.current_page);
  printSection("CTE: current_page (output)", currentPage);

  // (5) next_cursor
  const hasMore = pageProbe.length > params.pageSize;
  const lastCurrent = currentPage[currentPage.length - 1] ?? null;
  const nextCursor = hasMore && lastCurrent
    ? {
        id: lastCurrent.product_id,
        createdAt: lastCurrent.matched_at,
      }
    : null;
  printSection("CTE: next_cursor (code)", ctePieces.next_cursor);
  printSection("CTE: next_cursor (output)", nextCursor);

  // (6) full_variants
  const currentIds = new Set(currentPage.map((p) => p.product_id));
  const categoryById = new Map(db.categories.map((c) => [c.id, c]));
  const matchedAtByProduct = new Map(currentPage.map((p) => [p.product_id, p.matched_at]));

  const fullVariants = db.product_variants
    .filter((v) => currentIds.has(v.product_id))
    .map((v) => {
      const p = productById.get(v.product_id);
      const c = p ? categoryById.get(p.category_id) : null;
      return {
        variant_id: v.id,
        variant_created_at: v.created_at,
        gender: v.gender,
        color: v.color,
        size: v.size,
        product_id: p?.id ?? null,
        product_name: p?.name ?? null,
        product_series_code: p?.series_code ?? null,
        category_id: c?.id ?? null,
        category_prefix: c?.prefix ?? null,
        category_name: c?.name ?? null,
        matched_at: matchedAtByProduct.get(v.product_id) ?? null,
        next_cursor_id: nextCursor?.id ?? null,
        next_cursor_created_at: nextCursor?.createdAt ?? null,
      };
    })
    .sort((a, b) => {
      if (a.matched_at !== b.matched_at) return a.matched_at < b.matched_at ? 1 : -1;
      if (a.product_id !== b.product_id) return a.product_id < b.product_id ? 1 : -1;
      if (a.variant_created_at !== b.variant_created_at) return a.variant_created_at < b.variant_created_at ? 1 : -1;
      return a.variant_id < b.variant_id ? 1 : -1;
    });

  printSection("CTE: full_variants (code)", ctePieces.full_variants);
  printSection("FINAL OUTPUT (variant rows + next cursor)", fullVariants);

  return {
    rows: fullVariants,
    nextCursor,
  };
}

function main() {
  console.log("Product Pagination Simulation (CTE style)");
  console.log("Folder: simulations/pagingation");

  // Page 1
  const page1 = runSearchSimulation({
    query: "43",
    searchBy: "size",
    limit: 1,
    cursor: null,
  });

  // Page 2 (using nextCursor from page 1)
  runSearchSimulation({
    query: "43",
    searchBy: "size",
    limit: 1,
    cursor: page1.nextCursor,
  });
}

main();
