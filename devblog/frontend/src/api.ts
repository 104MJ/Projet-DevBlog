// const API_URL = "http://api.blog.localhost";
const API_URL = "/api";

export async function pingBackend() {
  const response = await fetch(`${API_URL}/ping`);
  return response.json();
}
