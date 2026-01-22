import { api } from "../api";

export async function Home() {
  const articles = await api.list("article", 3);
  const tutos = await api.list("tuto", 3);

  return `
    <section class="hero">
      <h1>Bienvenue sur DevBlog</h1>
      <p>Partage de connaissances en développement et infrastructure.</p>
      <div style="margin-top: 2rem;">
        <a href="#/articles" class="btn">Lire les Articles</a>
        <a href="#/tutos" class="btn" style="background:transparent; border: 2px solid var(--primary); color: var(--primary);">Voir les Tutos</a>
      </div>
    </section>

    <div class="grid">
      <div>
        <h2><span class="tag">Derniers Articles</span></h2>
        ${articles
          .map(
            (a: any) => `
          <div class="card" style="margin-bottom: 1rem;">
            <h3>${a.title}</h3>
            <small>Publié le ${new Date(a.created_at).toLocaleDateString()}</small>
          </div>
        `,
          )
          .join("")}
      </div>

      <div>
        <h2><span class="tag">Derniers Tutos</span></h2>
        ${tutos
          .map(
            (t: any) => `
          <div class="card" style="margin-bottom: 1rem;">
            <h3>${t.title}</h3>
            <small>Publié le ${new Date(t.created_at).toLocaleDateString()}</small>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}
