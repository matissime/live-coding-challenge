# 🧠 HINTS

Ce fichier contient des **indices** pour aiguiller sur la bonne réalisation de ce challenge

---

## 🕵️‍♂️ Partie 1 — Identifier la vulnérabilité

> Regarde comment `username` est inséré dans la requête SQL dans `GET /grades`  
> Une simple modification de la query dans l’URL permet d’accéder à d’autres données.

💬 Exemple :
```bash
curl "http://localhost:3000/grades?username=admin' OR 1=1 -- "
```

## 🔐 Partie 2 — Sécuriser la requête

Utilise des requêtes préparées via ? dans les requêtes SQL avec mysql.

💡 Exemple :
```js
const query = 'SELECT * FROM grades WHERE username = ?';
db.query(query, [username], ...);
```

## 🧱 Partie 3 — Ajouter une note

Crée une route POST /grades pour insérer un username et un grade dans la base.

🔒 Pense à valider :
	•	Que les champs ne sont pas vides
	•	Que le grade est bien un nombre (ex : parseInt, Number.isInteger, etc.)
	•	Que tu ne réintroduis pas d’injection dans la requête

💡 Astuce bonus :

Tu peux simuler des tests simples avec curl ou Insomnia/Postman pour vérifier tes routes.

```bash
curl -X POST http://localhost:3000/grades \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "grade": 15}'
  ```