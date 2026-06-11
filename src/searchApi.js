function emptyCategory(error = "") {
  return {
    total: 0,
    page: 1,
    per_page: 10,
    total_pages: 0,
    results: [],
    error,
  };
}

export function createEmptyResults() {
  return {
    species: emptyCategory(),
    genes: emptyCategory(),
    transcripts: emptyCategory(),
    variants: emptyCategory(),
  };
}


async function search(request) {
  const response = await fetch('http://localhost:8000/search', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Search failed");
  }

  return data;
}

export async function searchCategory(
  category,
  query,
  page = 1,
  genomeUuids = null,
) {
  const data = await search({
    query,
    page,
    category,
    genome_uuids: genomeUuids,
  });

  return data[category];
}

export function searchAll(query, genomeUuids = null) {
  return search({
    query,
    page: 1,
    genome_uuids: genomeUuids,
  });
}
