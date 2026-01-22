import { api } from "../api";

export async function ListTutos() {
  const type = "tuto";
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
      const video_url = (
        document.getElementById("video_url") as HTMLInputElement
      ).value;

      try {
        await api.create({ title, content, type, video_url });
        form.innerHTML =
          "<h3 style='color: #4ade80; text-align:center;'>🎓 Tutoriel ajouté à la base !</h3>";
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        alert("Erreur lors de la création du tutoriel");
      }
    });
  }, 0);

  return `
    <div class="container-page">
      <header class="page-header">
        <h1>📹 Tutoriels</h1>
        <p>Apprenez pas à pas de nouvelles technologies et méthodologies.</p>
      </header>

      <form id="post-form" class="modern-form">
        <h3>🛠️ Créer un guide pratique</h3>
        <input type="text" id="title" placeholder="Titre du tutoriel" required />
        <input type="url" id="video_url" placeholder="Lien YouTube (https://...)" required /> 
        <textarea id="content" placeholder="Description courte..." rows="4" required></textarea>
        <button type="submit" class="btn-publish">Partager le tutoriel</button>
      </form>

      <div class="list-container">
        <h2 class="section-title">Guides disponibles</h2>
        <div class="posts-grid">
          ${
            posts.length > 0
              ? posts
                  .map(
                    (p: any) => `
            <a href="${p.video_url}" class="card-link" target="_blank" rel="noopener">
              <div class="card">
                <div class="card-header">
                   <h3>${p.title}</h3>
                   <span class="tag">Tuto • ${new Date(p.created_at).toLocaleDateString()}</span>
                </div>
                <p class="post-excerpt">${p.content || "Suivre ce guide..."}</p>
                <div class="card-footer">Voir la vidéo <span>▶️</span></div>
              </div>
            </a>
          `,
                  )
                  .join("")
              : `<p class="empty-msg">Aucun tutoriel disponible. Créez le premier !</p>`
          }
        </div>
      </div>
    </div>
  `;
}
