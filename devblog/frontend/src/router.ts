import { Home } from "./pages/home";
import { ListArticles } from "./pages/articles";
import { ListTutos } from "./pages/tutos";

const routes: Record<string, () => Promise<string>> = {
  "#/": Home,
  "#/articles": ListArticles,
  "#/tutos": ListTutos,
};

export async function router() {
  const hash = location.hash || "#/";
  const view = routes[hash];

  const app = document.getElementById("app");

  if (app) {
    if (view) {
      app.innerHTML = `<div class="loader">Chargement...</div>`;
      app.innerHTML = await view();
    } else {
      app.innerHTML = `
        <div style="text-align:center; padding: 5rem;">
          <h1>404</h1>
          <p>Désolé, cette page n'existe pas.</p>
          <a href="#/" class="btn">Retour à l'accueil</a>
        </div>
      `;
    }
  }
}
