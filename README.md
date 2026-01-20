# Devblog

> **⚠️ MEMBRES DU GROUPE :**
>
> - **NOM Prénom** koagne Ngankam Danielle Jamila , Role: Dev
> - **NOM Prénom** MAPENZI IGULU Jacqueline, Role: Infra
> - **NOM Prénom** Aya Sghaier, Role: Dev

---

## 1. Présentation du Projet

_Ce projet est une stack permettant de gérer un blog de développement "DevBlog" où les visiteurs peuvent lire des articles et voir des tutos de dev. L’application combine un frontend web, une API backend, une base de données pour stocker le contenue et un proxy inverse pour router les requêtes._

**Fonctionnalités principales :**

- Publication de contenu de développement
- Recherche et filtre

**Lien accessible (si tunnel actif) :** [https://votre-url-random.trycloudflare.com](https://votre-url-random.trycloudflare.com)

**Screenshot de l'application déployée** : ![](screenshot.jpg)

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

| Service | Image Docker | Rôle | Port Interne |
| :--------- | :------------- | :---------------------- | :----------- |
| **Proxy** | `caddy:latest` | Reverse Proxy & Routing | 80 |
| **App** | `wordpress` | CMS | 80 |
| **DB** | `mysql:5.7` | Base de données | 3306 |
| **Tunnel** | `cloudflared` | Exposition Internet | N/A |

## 3. Guide d'installation

Pour lancer le projet localement :

1. Cloner le dépôt :

```bash
git clone [https://github.com/votre-user/votre-repo.git](https://github.com/votre-user/votre-repo.git)
cd votre-repo
```

2. Lancer la stack :

```bash
docker compose up -d
```

3. Accéder aux services :
- Web : `http://localhost`
- Admin : `http://localhost/adminer` (exemple)

4. Obtenir l'URL publique :
```bash
docker compose logs -f tunnel
```

## 4. Méthodologie & Transparence IA

### Organisation

_Expliquez rapidement comment vous avez travaillé (Pair programming, répartition des tâches...)_

### Utilisation de l'IA (Copilot, ChatGPT, Cursor...)

_Soyez honnêtes, c'est valorisé !_

- **Outils utilisés :** (Ex: ChatGPT 4, GitHub Copilot)
- **Usage :**
- _Génération de code :_ (Ex: "Nous avons utilisé Copilot pour générer le boilerplate du Docker Compose")
- _Débuggage :_ (Ex: "ChatGPT nous a aidé à comprendre l'erreur 502 Bad Gateway")
- _Documentation :_ (Ex: "Nous avons reformulé l'intro avec l'IA")
- **Apprentissage :** (Ce que l'IA a fait vs ce que vous avez compris).

## 5. Difficultés rencontrées & Solutions

- _Problème 1 :_ La base de données ne gardait pas les données.
- _Solution :_ Ajout d'un volume nommé dans le docker-compose.