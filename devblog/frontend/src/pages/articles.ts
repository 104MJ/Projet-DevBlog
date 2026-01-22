import { api } from "../api";

export async function List(type: string) {
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
      await api.create({ title, content, type });
      window.location.reload();
    });
  }, 0);

  return `
    <div style="max-width: 800px; margin: 0 auto;">
      <header style="text-align:center; padding: 2rem 0;">
        <h1 style="text-transform: capitalize;">Espace ${type}s</h1>
        <p>Découvrez nos derniers partages ou publiez le vôtre.</p>
      </header>

      <form id="post-form">
        <h3>Nouvelle Publication</h3>
        <input type="text" id="title" placeholder="Titre de votre ${type}" required />
        <textarea id="content" placeholder="Contenu..." rows="5" required></textarea>
        <button type="submit" class="btn" style="width:100%">Publier</button>
      </form>

      <div class="list-container" style="margin-top: 3rem;">
        ${posts
          .map(
            (p: any) => `
          <div class="card" style="margin-bottom: 1.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
               <h3>${p.title}</h3>
               <span class="tag">${type}</span>
            </div>
            <p style="color: #94a3b8;">Cliquez pour lire la suite...</p>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}
