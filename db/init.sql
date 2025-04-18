-- Crée la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

-- Suppression des tables existantes (si elles sont là, ça peut poser problème au redémarrage)
DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS users;

-- Création de la table utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Création de la table des notes
CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    grade INT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

-- Insertion de données de test dans la table `users`
INSERT INTO users (username, password) VALUES
('alice', 'password123'),
('bob', 'azerty123'),
('admin', 'adminpass');

-- Insertion de données de test dans la table `grades`
INSERT INTO grades (username, grade) VALUES
('alice', 17),
('alice', 14),
('bob', 12),
('bob', 15),
('admin', 20);