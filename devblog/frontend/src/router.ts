import { Home } from "./pages/home";
import { List } from "./pages/articles";

const routes: any = {
  "#/": Home,
  "#/articles": () => List("article"),
  "#/tutos": () => List("tuto"),
};

export async function router() {
  const view = routes[location.hash || "#/"];
  document.getElementById("app")!.innerHTML = view ? await view() : "404";
}
