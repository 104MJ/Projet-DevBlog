// const API_URL = "http://api.blog.localhost";
// const API = "/api";
// const API = "/api/posts"; // On pointe directement vers la route Flask

const API = "/api/posts";

export const api = {
  list: (type?: string, limit?: number) => {
    const url = new URL(window.location.origin + API);
    if (type) url.searchParams.append("type", type);
    if (limit) url.searchParams.append("limit", limit.toString());
    return fetch(url).then((r) => r.json());
  },

  create: (data: any) =>
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
