
export async function getIndexStats() {
  const response = await fetch('http://localhost:8000/stats');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Could not load index statistics");
  }

  return data;
}
