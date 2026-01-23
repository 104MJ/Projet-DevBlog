import { Home } from "./pages/home";
import { ListArticles } from "./pages/articles";
import { ListTutos } from "./pages/tutos";
import { PostView } from "./pages/post";

export async function router() {
  const hash = location.hash || "#/";
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `<div class="loader">Chargement...</div>`;

  if (hash.startsWith("#/posts/")) {
    const id = hash.split("/")[2];
    if (id) {
      app.innerHTML = await PostView(id);
      return;
    }
  }

  const routes: Record<string, () => Promise<string>> = {
    "#/": Home,
    "#/articles": ListArticles,
    "#/tutos": ListTutos,
  };

  const view = routes[hash];

  if (view) {
    app.innerHTML = await view();
  } else {
    app.innerHTML = `<div style="text-align:center; padding: 5rem;"><h1>404</h1><a href="#/" class="btn">Retour</a></div>`;
  }
}
