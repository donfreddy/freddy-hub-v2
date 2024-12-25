---
title: Optimisation des requêtes de base de données pour des performances élevées
description : Apprenez à optimiser vos requêtes de base de données pour des performances maximales et des temps de réponse réduits.
slug: building-restful-apis-node-express
tags: ["Node.js", "Express", "Restful API", "backend"]
readingTime: 11
published: false
publishedAt: 2023/11/2
updatedAt: 2023/11/2
---

# Authorization

Les API REST utilisent l'autorisation pour s'assurer qu'un client a un accès sécurisé uniquement aux ressources autorisées par ses rôles. Si vous construisez ou intégrez une API tierce, vous pouvez choisir entre l'authentification de base (Basic Auth), les jetons porteurs (Bearer Tokens) et OAuth2.0.

Les détails d'authentification peuvent être ajoutés dans l'en-tête, le corps ou en tant que paramètres d'une requête. Cependant, si vous saisissez vos informations d'authentification dans l'onglet Autorisation, Hoppscotch modifiera automatiquement les parties pertinentes de la requête en fonction de votre type d'authentification choisi. Stocker les informations d'authentification de base ou les jetons porteurs en tant que variables d'environnement vous permet de les réutiliser de manière plus sécurisée et efficace.

## Authentification de base (Basic Auth)

Si l'API prend en charge l'authentification de base, vous devrez ajouter un nom d'utilisateur vérifié et un mot de passe à votre requête. Dans l'onglet Autorisation, sélectionnez l'authentification de base et ajoutez vos informations d'identification.

## Jetons porteurs (Bearer Tokens)

Les jetons porteurs permettent une authentification de la requête à l'aide d'une clé d'accès, telle qu'une chaîne opaque ou JWT (JSON Web Token). Dans l'onglet Autorisation, sélectionnez Basic Auth et ajoutez votre jeton, ou pour une sécurité accrue, stockez-le dans une variable et référencez-le par son nom.

Hoppscotch ajoutera la valeur de la clé API au texte 'Bearer' et l'ajoutera à l'en-tête d'autorisation de la requête.

```bash
Bearer <Votre clé API>
```

## OAuth 2.0

Dans ce modèle d'authentification, vous récupérez d'abord un jeton d'accès pour l'API, puis utilisez ce jeton pour authentifier les futures requêtes.

Un exemple de flux OAuth 2.0 pourrait se dérouler comme suit :
