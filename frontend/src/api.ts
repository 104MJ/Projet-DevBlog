// const API_URL = "/api";

// export async function pingBackend() {
//   const response = await fetch(`${API_URL}/`);
//   return response.json();
// }
const API_URL = "http://api.blog.localhost"; // URL absolue

export async function pingBackend() {
  const response = await fetch(`${API_URL}/ping`); // Ajoute /ping si c'est ta route Flask
  return response.json();
}
