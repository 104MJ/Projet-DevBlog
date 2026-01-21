// import { pingBackend } from "./api";

// const button = document.getElementById("load")!;
// const result = document.getElementById("result")!;

// button.addEventListener("click", async () => {
//   try {
//     const data = await pingBackend();
//     result.textContent = JSON.stringify(data, null, 2);
//   } catch (err) {
//     result.textContent = "Backend non disponible";
//   }
// });

import { router } from "./router";
window.addEventListener("hashchange", router);
router();
