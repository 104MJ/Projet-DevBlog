const API_URL = "http://localhost:8000";

export async function pingBackend() {
  const response = await fetch(`${API_URL}/`);
  return response.json();
}
