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
          <a href="#/tutos" class="btn" style="background:transparent; border: 2px solid var(--primary); color: var(--primary);"> 📹  Voir les Tutos</a>
        </div>
      </div>
    </section>

    <div class="grid">
      <div class="section-container">
        <h2 style="display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem;">
          <span class="tag" style="background: rgba(56, 189, 248, 0.1);">📝 Derniers Articles</span>
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${
            articles.length > 0
              ? articles
                  .map(
                    (a: any) => `
            <a href="#/posts/${a.id}" class="card-link">
              <div class="card">
                <h3 style="margin:0; font-size: 1.1rem;">${a.title}</h3>
                <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                  <small style="color: var(--primary); font-weight: bold;">Lire la suite →</small>
                  <small style="opacity: 0.5;">${new Date(a.created_at).toLocaleDateString()}</small>
                </div>
              </div>
            </a>
          `,
                  )
                  .join("")
              : `<p style="opacity:0.5; text-align:center;">Aucun article publié.</p>`
          }
        </div>
      </div>

      <div class="section-container">
        <h2 style="display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem;">
          <span class="tag" style="background: rgba(239, 68, 68, 0.1); color: #ef4444;">🎬 Dernières Vidéos</span>
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${
            tutos.length > 0
              ? tutos
                  .map(
                    (t: any) => `
            <a href="${t.video_url}" target="_blank" class="card-link">
              <div class="card" style="border-left: 4px solid #ef4444;">
                <h3 style="margin:0; font-size: 1.1rem;">${t.title}</h3>
                <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                  <small style="color: #ef4444; font-weight: bold;">Regarder sur YouTube ▶</small>
                  <small style="opacity: 0.5;">${new Date(t.created_at).toLocaleDateString()}</small>
                </div>
              </div>
            </a>
          `,
                  )
                  .join("")
              : `<p style="opacity:0.5; text-align:center;">Aucun tutoriel disponible.</p>`
          }
        </div>
      </div>
    </div>
  `;
}
