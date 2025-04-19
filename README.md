# 🛡️ Live Coding Challenge : Sécurisation d'une mini-app

## 🎯 Contexte :

Tu as une petite application Node.js/Express qui permet à un utilisateur de s'inscrire et de consulter ses notes sur une plateforme. Cependant, l'application est vulnérable à une **SQL Injection** à cause de la manière dont les requêtes SQL sont faites.

L'objectif est de **corriger la faille de sécurité**, et d'implémenter une **fonctionnalité pour ajouter des nouvelles notes** de manière sécurisée.

## ⚙️ Environnement

Ce dépôt est configuré pour être lancé dans **GitHub Codespaces** avec :

- Node.js (18+)
- MySQL 8 (automatiquement lancé via Docker Compose)
- Express.js

Une base de données est automatiquement initialisée grâce à un script SQL (`/db/init.sql`).

## 🧪 Jeu de données initial

Lors de l'initialisation de la base de données `student_db`, un jeu de données de test est automatiquement inséré. Trois utilisateurs sont créés avec des identifiants simples : `alice`, `bob` et `admin`, chacun avec un mot de passe respectif (`password123`, `azerty123`, `adminpass`). Ces utilisateurs possèdent également des notes associées stockées dans la table `grades`. Par exemple, `alice` a obtenu les notes 17 et 14, `bob` a reçu 12 et 15, et `admin` a une seule note de 20. Ces données permettent de tester directement l’API sans avoir à ajouter d’utilisateurs ou de notes manuellement.

## 📚 **Documentation de l'API** 
Tu peux te renseigner sur le fonctionnement de l'API avec la documentation dans le fichier API.md

## 🧠 **Indices**
Si tu as besoin d'indice pour t'orienter sur les bonnes pistes, le fichier HINTS.md est disponible

## **🌐 Usage d’Internet & des outils d’IA**
L’usage d’Internet est autorisé pour la recherche, tout comme les outils d’IA (Stackoverflow, Google, ChatGPT, Copilot, etc.). Ils peuvent être utilisés pour comprendre, documenter ou débloquer un point, **mais pas pour générer directement la solution du challenge**. Le but est d’évaluer tes compétences et tes capacités à comprendre, adapter et implémenter des solutions, pas déléguer le travail à un assistant automatisé.

🚫 Tout de même, l'usage direct du **copier-coller du code source dans un LLM est interdit**.



## 💻 Code initial de l'app vulnérable :

```javascript
const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student_db'
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
  });

// Inscription d'un utilisateur
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send('User registered successfully!');
  });
});

// Récupération des notes
app.get('/grades', (req, res) => {
  const { username } = req.query;
  const query = `SELECT * FROM grades WHERE username = '${username}'`;
  console.log('Executing query:', query);
  
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error('SQL Error:', err.message);
        return res.status(500).json({ error: err.message, query: query });
      }
      res.json(result);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```



## **🚨 Vulnérabilité :**

L’application est vulnérable à une **SQL Injection**.



Cela permet à un utilisateur malveillant d’injecter du code SQL via les input, ce qui pourrait compromettre la sécurité de l’application.



## **🎯 Objectifs du challenge :**

1. **Corriger la vulnérabilité SQL Injection** : Utilise les bonnes pratiques SQL lié au développement web pour corriger la faille dans le code source.
2. **Ajouter une fonctionnalité** permettant à un utilisateur d’ajouter une nouvelle note de manière sécurisée via un endpoint **POST /grades**.
3. **Valider les entrées** : Assure-toi que le grade est bien un nombre valide et inférieur ou égale à 20 avant de l’ajouter à la base de données.


## **⏰ Temps estimé pour le challenge :**

**10 minutes** : Pour corriger la vulnérabilité SQL et ajouter l’endpoint d’ajout de notes.

- **Bonus** : Ajouter des tests unitaires pour vérifier que l’application fonctionne comme prévu, ou mettre en place un mécanisme pour vérifier que la base de données existe avant de lancer le serveur.

## **🚀 Bonne chance !**

🧠 L’idée n’est pas de piéger mais de comprendre comment tu réfléchis, et comment tu codes en sécurité 🫶 
N’hésite pas à consulter le fichier HINTS.md si tu as besoin d’indices ou à me demander tout simplement ! 👩‍💻👨‍💻