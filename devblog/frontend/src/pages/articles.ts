import { api } from "../api";

export async function ListArticles() {
  const type = "article";
  const posts = await api.list(type);

  setTimeout(() => {
    const form = document.getElementById("post-form") as HTMLFormElement;
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = (document.getElementById("title") as HTMLInputElement)
        .value;
      const content = (
        document.getElementById("content") as HTMLTextAreaElement
      ).value;

      try {
        await api.create({ title, content, type });
        form.innerHTML =
          "<h3 style='color: #4ade80; text-align:center;'>✨ Article publié avec succès !</h3>";
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        alert("Erreur lors de la publication de l'article");
      }
    });
  }, 0);

  return `
    <div class="container-page">
      <header class="page-header">
        <h1>✍️ Articles</h1>
        <p>Pensées, actualités et réflexions sur le monde du développement.</p>
      </header>

      <form id="post-form" class="modern-form">
        <h3>🚀 Rédiger un nouvel article</h3>
        <input type="text" id="title" placeholder="Titre de l'article..." required />
        <textarea id="content" placeholder="Exprimez-vous..." rows="6" required></textarea>
        <button type="submit" class="btn-publish">Publier l'article</button>
      </form>

      <div class="list-container">
        <h2 class="section-title">Flux des articles</h2>
        <div class="posts-grid">
          ${
            posts.length > 0
              ? posts
                  .map(
                    (p: any) => `
            <a href="#/posts/${p.id}" class="card-link">
              <div class="card">
                <div class="card-header">
                   <h3>${p.title}</h3>
                   <span class="tag">${new Date(p.created_at).toLocaleDateString()}</span>
                </div>
                <p class="post-excerpt">${p.content || "Lire cet article..."}</p>
                <div class="card-footer">Continuer la lecture <span>→</span></div>
              </div>
            </a>
          `,
                  )
                  .join("")
              : `<p class="empty-msg">Aucun article pour le moment.</p>`
          }
        </div>
      </div>
    </div>
  `;
}
