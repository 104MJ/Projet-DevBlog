import { api } from "../api";

export async function PostView(id: string) {
  const post = await api.get(id);

  if (!post || post.error) {
    return `<div class="container-page"><h1>Oups ! Article introuvable.</h1></div>`;
  }

  return `
    <div class="container-page" style="animation: fadeIn 0.5s ease-in;">
      <a href="#/articles" style="color: var(--primary); text-decoration: none; font-weight: bold;">
        ← Retour aux articles
      </a>
      
      <article style="margin-top: 3rem;">
        <header style="margin-bottom: 3rem; border-bottom: 1px solid #334155; padding-bottom: 1.5rem;">
          <h1 style="font-size: 3rem; line-height: 1.2; margin-bottom: 1rem;">${post.title}</h1>
          <div style="display: flex; align-items: center; gap: 15px; opacity: 0.7;">
            <span class="tag">${post.type === "article" ? "📝 Article" : "📹 Tuto"}</span>
            <span>•</span>
            <span>Publié le ${new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </header>

        <div style="font-size: 1.25rem; line-height: 1.8; color: #cbd5e1; white-space: pre-wrap;">
          ${post.content}
        </div>

        ${
          post.video_url
            ? `
          <div style="margin-top: 4rem; padding: 2rem; background: rgba(239, 68, 68, 0.1); border-radius: 12px; border: 1px solid #ef4444; text-align: center;">
            <h3 style="margin-bottom: 1rem;">Ce tutoriel est accompagné d'une vidéo</h3>
            <a href="${post.video_url}" target="_blank" class="btn" style="background: #ef4444; color: white;">
              Regarder sur YouTube ▶
            </a>
          </div>
        `
            : ""
        }
      </article>
    </div>
  `;
}
