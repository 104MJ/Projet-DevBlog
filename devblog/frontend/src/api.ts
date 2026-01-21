// const API_URL = "http://api.blog.localhost";
const API = "/api";

// export async function pingBackend() {
//   const response = await fetch(`${API_URL}/ping`);
//   return response.json();
// }

export const api = {
  list: (type?: string, limit?: number) =>
    fetch(
      `${API}?${type ? `type=${type}&` : ""}${limit ? `limit=${limit}` : ""}`,
    ).then((r) => r.json()),

  get: (id: number) => fetch(`${API}/${id}`).then((r) => r.json()),

  create: (data: any) =>
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
