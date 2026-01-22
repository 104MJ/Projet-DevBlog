# 🌐 Réseaux Docker - Guide Complet

## Qu'est-ce qu'un réseau Docker privé ?

Un **réseau Docker privé** permet aux conteneurs de communiquer entre eux **sans exposer leurs ports sur l'hôte**. C'est essentiel pour la sécurité et l'isolation.

## Méthode 1 : Créer un réseau externe (Manuel)

### Créer le réseau

```bash
docker network create nom_du_reseau
```

### Exemples concrets

```bash
# Réseau public (pour les services accessibles depuis Internet)
docker network create public

# Réseau privé (pour les services internes uniquement)
docker network create private

# Réseau pour l'application
docker network create app_network
```

### Vérifier que le réseau existe

```bash
docker network ls
```

### Utiliser le réseau dans docker-compose.yml

```yaml
networks:
  public:
    name: public
    external: true  # Indique que le réseau existe déjà
  private:
    name: private
    external: true
```

### Avantages

- ✅ Réseau partagé entre plusieurs fichiers `compose.yml`
- ✅ Contrôle total sur le nom et la configuration
- ✅ Peut être créé une fois et réutilisé

### Inconvénients

- ⚠️ Doit être créé manuellement avant de lancer les services
- ⚠️ Si le réseau n'existe pas, `docker compose up` échouera

---

## Méthode 2 : Laisser Docker Compose créer le réseau (Automatique)

### Dans docker-compose.yml

```yaml
networks:
  app_network:
    driver: bridge  # Type de réseau (bridge est le plus courant)
    # Pas de "external: true" = Docker Compose le crée automatiquement
```

### Exemple complet

```yaml
services:
  frontend:
    networks:
      - app_network

  backend:
    networks:
      - app_network

networks:
  app_network:
    driver: bridge
    # Docker Compose créera automatiquement: projet-devblog_app_network
```

### Avantages

- ✅ Création automatique lors de `docker compose up`
- ✅ Nom généré automatiquement (préfixé par le nom du projet)
- ✅ Suppression automatique avec `docker compose down`

### Inconvénients

- ⚠️ Nom généré automatiquement (peut être long)
- ⚠️ Pas partagé entre plusieurs fichiers compose par défaut

---

## Types de réseaux Docker

### 1. Bridge (par défaut)

```bash
docker network create --driver bridge mon_reseau
```

- **Usage** : Communication entre conteneurs sur la même machine
- **Isolation** : Conteneurs isolés de l'hôte
- **Performance** : Bonne pour la plupart des cas

### 2. Host

```bash
docker network create --driver host mon_reseau
```

- **Usage** : Conteneur utilise directement le réseau de l'hôte
- **Isolation** : Aucune isolation réseau
- **Performance** : Meilleure performance, moins de sécurité

### 3. Overlay

```bash
docker network create --driver overlay mon_reseau
```

- **Usage** : Communication entre conteneurs sur plusieurs machines (Docker Swarm)
- **Isolation** : Réseau distribué
- **Performance** : Pour les clusters

### 4. Macvlan

```bash
docker network create --driver macvlan mon_reseau
```

- **Usage** : Conteneur a sa propre adresse MAC (apparaît comme un périphérique physique)
- **Isolation** : Conteneur directement sur le réseau physique
- **Performance** : Pour des besoins réseau spécifiques

---

## Exemple Pratique : Réseau Privé pour DevBlog

### Créer les réseaux nécessaires

```bash
# Réseau public (pour Caddy et Cloudflared)
docker network create public

# Réseau privé (pour les services internes)
docker network create private

# Réseau pour l'application (frontend, backend, db)
docker network create app_network
```

### Configuration dans compose.yml

```yaml
services:
  # Services publics (accessibles depuis Internet)
  caddy-public:
    networks:
      - public

  cloudflared:
    networks:
      - public

  # Services privés (internes uniquement)
  caddy-private:
    networks:
      - private

  dockge:
    networks:
      - private

  # Services applicatifs
  frontend:
    networks:
      - app_network

  backend:
    networks:
      - app_network

  db:
    networks:
      - app_network
    # Pas de ports exposés = accessible uniquement via le réseau Docker

networks:
  public:
    name: public
    external: true
  private:
    name: private
    external: true
  app_network:
    driver: bridge
    # Créé automatiquement par Docker Compose
```

---

## Commandes Utiles

### Lister tous les réseaux

```bash
docker network ls
```

### Inspecter un réseau

```bash
docker network inspect nom_du_reseau
```

### Voir les conteneurs connectés à un réseau

```bash
docker network inspect nom_du_reseau | grep -A 10 "Containers"
```

### Supprimer un réseau

```bash
docker network rm nom_du_reseau
```

⚠️ **Attention** : Ne peut supprimer un réseau que s'il n'a aucun conteneur connecté.

### Supprimer tous les réseaux non utilisés

```bash
docker network prune
```

---

## Bonnes Pratiques

### 1. Isolation par fonction

- **Réseau public** : Services exposés (Caddy, Cloudflared)
- **Réseau privé** : Services internes (Adminer, monitoring)
- **Réseau app** : Services applicatifs (Frontend, Backend, DB)

### 2. Ne pas exposer la DB

```yaml
db:
  networks:
    - app_network
  # Pas de ports: - "5432:5432"  ❌
  # La DB est accessible uniquement via le réseau Docker ✅
```

### 3. Utiliser des noms de services

Dans Docker, les conteneurs peuvent se parler via leur **nom de service** :

```yaml
# Backend peut accéder à la DB via:
DATABASE_URL=postgresql://user:pass@db:5432/dbname
#                                    ^^
#                                    Nom du service, pas localhost!
```

---

## Résolution de Problèmes

### Erreur : "network not found"

```bash
# Créer le réseau manquant
docker network create nom_du_reseau
```

### Erreur : "network already exists"

```bash
# Vérifier si le réseau existe
docker network ls | grep nom_du_reseau

# Si oui, c'est normal, le réseau est déjà créé
```

### Conteneurs ne peuvent pas communiquer

1. Vérifier qu'ils sont sur le même réseau :
   ```bash
   docker network inspect nom_du_reseau
   ```

2. Vérifier les noms de services (utiliser le nom du service, pas `localhost`)

3. Vérifier les healthchecks (les dépendances attendent que les services soient healthy)

---

## Exemple Complet pour DevBlog

```bash
# 1. Créer les réseaux
docker network create public
docker network create private

# 2. Lancer les services (app_network sera créé automatiquement)
docker compose up -d

# 3. Vérifier
docker network ls
docker network inspect public
docker network inspect private
docker network inspect projet-devblog_app_network
```


