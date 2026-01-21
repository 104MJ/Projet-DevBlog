const API_URL = "/api";

export async function pingBackend() {
  const response = await fetch(`${API_URL}/`);
  return response.json();
}
