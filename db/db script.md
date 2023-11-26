## Monter la base de données

Pour construire la DB avec docker, exécuter les commandes suivantes :

```
docker build -t todo-mysql:0.1 .

docker run --detach --name=todo-mysql --publish 6603:3306 todo-mysql:0.1
```

À noter que le port de connexion devient le `6603`.

## Modifier les identifiants de la DB

Pour modifier les identifiants, éditer directement le `Dockerfile` situé à la racine du projet
