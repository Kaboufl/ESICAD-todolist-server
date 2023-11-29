# L'application Todo List

L'application tourne sous docker et utilise mon registre de conteneurs personnels `syndr0m-registry`

Pour se connecter au registre, il faut authentifier docker auprès du registre de conteneurs ( via l'outil CLI de digital ocean [doctl](https://docs.digitalocean.com/reference/doctl/how-to/install/) ). Les instructions sont détaillées dans le dashboard de Digital Ocean.

## Mettre à jour les images Docker

### La base de données

Le Dockerfile ainsi que le fichier de configuration de la base de données se situent dans le dossier `db` à la racine du projet.
Avec un shell situé à la racine du projet, exécuter les commandes :

```bash
$ docker build . -t todo-mysql -f db.Dockerfile
$ docker tag todo-mysql registry.digitalocean.com/syndr0m-registry/todo-mysql
$ docker push registry.digitalocean.com/syndr0m-registry/todo-mysql
```

### L'API express

Le Dockerfile se situe à la racine du projet, il compile automatiquement les fichiers du projet.
Avec un shell situé à la racine du projet, exécuter les commandes :

```bash
$ docker build . -t todo-express-api -f express.Dockerfile
$ docker tag todo-express-api registry.digitalocean.com/syndr0m-registry/todo-express-api
$ docker push registry.digitalocean.com/syndr0m-registry/todo-express-api
```

### L'application Vue.js

Le Dockerfile se situe à la racine du projet de l'app vue.js ( [github](https://github.com/Kaboufl/todolist-vue3-app) ).
Il faut prendre en compte le nom d'hôte au sein des conteneurs pour le `proxy_pass` de NGINX dans le fichier `./nginx.conf`.

Se placer à la racine du projet et exécuter les commandes suivantes :

```bash
$ docker build . -t todo-list-app -f vue.Dockerfile
$ docker tag todo-list-app registry.digitalocean.com/syndr0m-registry/todo-list-app
$ docker push registry.digitalocean.com/syndr0m-registry/todo-list-app
```
