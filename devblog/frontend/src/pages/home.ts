import { api } from "../api";

export async function Home() {
  const articles = await api.list("article", 3);
  const tutos = await api.list("tuto", 3);

  return `
<h2>Derniers articles</h2>
<ul>${articles.map((a: any) => `<li>${a.title}</li>`).join("")}</ul>


<h2>Derniers tutos</h2>
<ul>${tutos.map((t: any) => `<li>${t.title}</li>`).join("")}</ul>
`;
}
