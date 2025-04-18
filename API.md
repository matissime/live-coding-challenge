# 📚 **Documentation de l'API**

Cette API permet d'ajouter des utilisateurs et de récupérer leurs notes. Voici comment interagir avec les endpoints de l'API en utilisant un jeu de données d'exemple.

------

## **1. Ajouter un utilisateur 📝**

### **Endpoint : `POST /register`**

Ajoute un utilisateur à la base de données. Utilise ce point d'entrée pour inscrire un étudiant.

#### **Exemple de requête** :

```bash
POST /register
Content-Type: application/json

{
  "username": "alice",
  "password": "password123"
}
```

#### **Réponse** :

```json
"User registered successfully!"
```

#### **Jeu de données** :

- **Username** : `alice`
- **Password** : `password123`

------

## **2. Récupérer les notes d'un utilisateur 📊**

### **Endpoint : `GET /grades`**

Récupère les notes d'un étudiant en fonction de son `username`. **Attention** : Cette route est vulnérable à l'injection SQL.

#### **Exemple de requête** :

```bash
GET /grades?username=alice
```

#### **Réponse (si l'utilisateur a des notes)** :

```json
[
  {
    "id": 1,
    "username": "alice",
    "grade": 17
  },
  {
    "id": 2,
    "username": "alice",
    "grade": 14
  }
]
```

#### **Jeu de données** :

- **Username** : `alice`
- **Notes** : `17`, `14`

#### **Réponse (si l'utilisateur n'a pas de notes)** :

```json
{
  "error": "Aucune note trouvée pour l'utilisateur 'alice'."
}
```

------

### **Données de test dans la base :**

- **Utilisateurs** :
  - `alice`, mot de passe `password123`
  - `bob`, mot de passe `azerty123`
  - `admin`, mot de passe `adminpass`
- **Notes** :
  - `alice` : 17, 14
  - `bob` : 12, 15
  - `admin` : 20

------

## **3. Exemple d'usage avec cURL**

### Ajouter un utilisateur :

```bash
curl -X POST "http://localhost:3000/register" \
-H "Content-Type: application/json" \
-d '{"username": "alice", "password": "password123"}'
```

### Récupérer les notes d'un utilisateur :

```bash
curl "http://localhost:3000/grades?username=alice"
```