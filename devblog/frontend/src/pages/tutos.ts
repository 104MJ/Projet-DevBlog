import { api } from "../api";

export async function List(type: string) {
  const posts = await api.list(type);
  return `
    <h2>${type}</h2>
    <form id="form">
    <input placeholder="Titre" id="title" />
    <textarea id="content"></textarea>
    <button>Publier</button>
    </form>
    <ul>${posts.map((p: any) => `<li>${p.title}</li>`).join("")}</ul>
`;
}
