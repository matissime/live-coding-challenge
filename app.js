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
  if (err){
    console.error('Database connection failed:',err);
    process.exit(1);
  }

console.log('connection database ');

});

// Inscription d'un utilisateur
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  
  db.query(query, [username,password],(err,result) => {
    if (err) return res.status(500).send(err);
      res.status(201).send('user registred succesfully');
  });
});

// Récupération des notes
app.get('/grades', (req, res) => {
  const { username } = req.query;
  const query = `SELECT * FROM grades WHERE username = ?`;
  db.query(query, [username],(err ,result)=>{
    if (err){
      console.error('SQL Error:',err.message);
      return res.status(500).json({error:err.message});
    }
    res.json(result);
    });

  });

  app.post('/grades',(req,res)=>{
     const{username,grade}=req.body;

     if (typeof grade !== 'number' || grade <0 || grade >20){
      return res.status(400).json({message:'grade incorect '});
      
     }

    const query ='INSERT USERNAME ,grades (username,grade) VALUES (?,?)'; 

      db.query = (query, [username, grade],(err, result)=>{
        if(err) throw err ;

      res.status(201).json({message: 'grade ajouter',id:result.insertId});
      
    });
 
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});