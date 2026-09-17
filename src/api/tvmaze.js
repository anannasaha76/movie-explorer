const BASE_URL = "https://api.tvmaze.com";

export async function getAllShows() {
  const res = await fetch(`${BASE_URL}/shows`);
  if (!res.ok) {
    throw new Error(`Failed to load shows (${res.status})`);
  }
  return res.json();
}

export async function searchShows(query) {
  const res = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
  );
  if (!res.ok) {
    throw new Error(`Search failed (${res.status})`);
  }
  const data = await res.json();
  return data.map((entry) => entry.show);
}
