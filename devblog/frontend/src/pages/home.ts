import { api } from "../api";

export async function Home() {
  const articles = await api.list("article", 3);
  const tutos = await api.list("tuto", 3);

  return `
    <section class="hero">
      <div style="animation: fadeIn 1s ease-out;">
        <h1>Bienvenue sur DevBlog</h1>
        <p style="font-size: 1.2rem; opacity: 0.8;">L'espace dédié aux passionnés de code et d'infrastructure.</p>
        <div style="margin-top: 2.5rem;">
          <a href="#/articles" class="btn">🚀 Lire les Articles</a>
          <a href="#/tutos" class="btn" style="background:transparent; border: 2px solid var(--primary); color: var(--primary);"> Voir les Tutos</a>
        </div>
      </div>
    </section>

    <div class="grid">
      <div class="section-container">
        <h2 style="display: flex; align-items: center; gap: 10px;">
          <span class="tag">Derniers Articles</span>
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
          ${
            articles.length > 0
              ? articles
                  .map(
                    (a: any) => `
            <a href="#/posts/${a.id}" class="post-link">
              <div class="card">
                <h3>${a.title}</h3>
                <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                  <small style="color: var(--primary);">Lire l'article →</small>
                  <small style="opacity: 0.5;">${new Date(a.created_at).toLocaleDateString()}</small>
                </div>
              </div>
            </a>
          `,
                  )
                  .join("")
              : `<p style="opacity:0.5;">Aucun article pour le moment.</p>`
          }
        </div>
      </div>

      <div class="section-container">
        <h2 style="display: flex; align-items: center; gap: 10px;">
          <span class="tag">Derniers Tutos</span>
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
          ${
            tutos.length > 0
              ? tutos
                  .map(
                    (t: any) => `
            <a href="#/posts/${t.id}" class="post-link">
              <div class="card">
                <h3>${t.title}</h3>
                <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                  <small style="color: var(--primary);">Voir le tuto →</small>
                  <small style="opacity: 0.5;">${new Date(t.created_at).toLocaleDateString()}</small>
                </div>
              </div>
            </a>
          `,
                  )
                  .join("")
              : `<p style="opacity:0.5;">Aucun tuto pour le moment.</p>`
          }
        </div>
      </div>
    </div>
  `;
}
