# Devblog

> **⚠️ MEMBRES DU GROUPE :**
>
> - **NOM Prénom** koagne Ngankam Danielle Jamila , Role:Dev
> - **NOM Prénom** MAPENZI IGULU Jacqueline, Role:Infra
> - **NOM Prénom** Aya Sghaier, Role:Dev

---

## 1. Présentation du Projet

_DevBlog est une plateforme web moderne dédiée au partage de connaissances et de tutoriels autour du développement informatique. Le projet repose sur une architecture complète : un frontend réactif (Vite/TypeScript), une API backend (Flask/Python), une base de données PostgreSQL pour la persistance, et un reverse proxy Caddy pour la gestion centralisée des accès. L’ensemble est orchestré via Docker, ce qui garantit portabilité, isolation et simplicité de déploiement._

**Fonctionnalités principales :**

- Création et publication d’articles de blog techniques
- Ajout et partage de tutoriels vidéo (YouTube)
- Consultation rapide des derniers articles et tutos
- Interface utilisateur moderne et responsive
- Administration de la base via Adminer
- Accès sécurisé et centralisé via un reverse proxy (Caddy)
- Déploiement local ou distant facilité grâce à Docker et Cloudflare Tunnel

**Lien accessible (si tunnel actif) :** [https://votre-url-random.trycloudflare.com](https://votre-url-random.trycloudflare.com)

**Screenshot de l'application déployée** : ![](screenshot.jpg)
[![Aperçu Application](./images/app1.png)]
[![Aperçu Application](./images/app2.png)]
[![Aperçu Application](./images/app3.png)]
[![Aperçu Application](./images/app4.png)]

## 2. Architecture Technique

### Schéma d'infrastructure

_Ce schéma est généré dynamiquement à partir du fichier `architecture.puml` présent dans ce dépôt._

![Architecture du Projet](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/VOTRE_USERNAME_GITHUB/NOM_DU_REPO/main/architecture.puml)

_(Note aux étudiants : Pour que l'image ci-dessus s'affiche :_

1. _Créez un fichier `architecture.puml` à la racine de votre repo._
2. _Mettez votre code PlantUML dedans._
3. _Remplacez `VOTRE_USERNAME_GITHUB` et `NOM_DU_REPO` dans l'URL ci-dessus par les vôtres._
4. _Assurez-vous que votre repo est Public.)_

### Description des services

| Service    | Image Docker         | Rôle                    | Port Interne |
| :--------- | :------------------- | :---------------------- | :----------- |
| **Proxy**  | `caddy:2.10`         | Reverse Proxy & Routing | 80           |
| **App**    | `devblog  `          | CMS                     | 80           |
| **DB**     | `postgres:15-alpine` | Base de données.        | 5432         |
| **Tunnel** | `cloudflared`        | Exposition Internet     | N/A          |

## 3. Guide d'installation

Pour lancer le projet localement :

1. Cloner le dépôt :

```bash
git clone [https://github.com/104MJ/Projet-DevBlog](https://github.com/104MJ/Projet-DevBlog)
cd Projet-DevBlog/
```

2. Lancer la stack :

```bash
task build
task up
cd infra (pour obtenir le lien cloudflared )
docker compose logs cloudflared
```

**Screenshot de terminal**
[![Aperçu terminal](./images/terminal1.png)]
[![Aperçu terminal](./images/terminal2.png)]
[![Aperçu terminal](./images/terminal3.png)]

3. Accéder aux services :

- Web : `http://frontend.localhost`
- Admin : `http://localhost:28080`

**Screenshot de terminal**
[![Aperçu web](./images/frontendlocal.png)]
[![Aperçu adminer](./images/adminer1.png)]
[![Aperçu adminer](./images/adminer2.png)]

4. Obtenir l'URL publique :

```bash
docker compose logs -f tunnel
```

## 4. Méthodologie & Transparence IA

### Organisation

_Expliquez rapidement comment vous avez travaillé (Pair programming, répartition des tâches...)_

### Utilisation de l'IA (Copilot, ChatGPT, Cursor...)

_Soyez honnêtes, c'est valorisé !_

- **Outils utilisés :** Gemini , Chatgpt, Copilot
- **Usage :**
- _Génération de code :_ "Nous avons utilisé Gemini pour générer le code frontend de notre application, afin d’optimiser le temps de développement. "
- _Débuggage :_ "ChatGPT et Copilot nous ont aidé à comprendre les erreurs suivantes:
  - conflits de ports Docker (port 80 déjà utilisé),
  - mauvais routage des requêtes API entraînant des réponses HTML au lieu de JSON
  - erreurs liées à l’ordre des directives dans le Caddyfile
  - problèmes de communication entre conteneurs dus à une mauvaise configuration du réseau Docker
  - limitations de Cloudflare Tunnel (rate limiting)
  - absence de prise en compte des modifications due à l’oubli de reconstruction des images Docker."
- _Documentation :_ ("Nous avons reformulé l'intro avec l'IA")
- **Apprentissage :** (Ce que l'IA a fait vs ce que vous avez compris).

## 5. Difficultés rencontrées & Solutions

- _Problème 1 :_ La base de données ne gardait pas les données.
- _Solution :_ Ajout d'un volume nommé dans le docker-compose.
