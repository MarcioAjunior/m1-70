const express = require('express')
const mysql = require('mysql')

const server = express();

const aws_connect = mysql.createConnection({
    host : 'database-1.cu0xyidhcnvv.us-west-2.rds.amazonaws.com',
    user : 'aluno',
    password : 'topicos',
    database : 'clientes',
    port : 3306
});

const db_connect = mysql.createConnection({
    host : 'mysql_db',
    user : 'root',
    password : 'root',
    database : 'm1'
});

aws_connect.connect();
db_connect.connect();

const port = 5001


//str.replace(/[!-#-\--\.]{1}/g, "");
//replace para regra geral de REMOVER - # .
server.get('/oi', (req, res) => {
    aws_connect.query("SELECT * FROM cliente;", (err, results)=>{ 
          if(err){
            console.log('EROOOOOOOOO', err)
          }
           console.log(results, 'AAAAAAAAAAAAAAa')
           console.log(typeof results, 'AAAAAAAAAAAAAAa')    
    })
})


server.listen(port, () => {
    console.log(`Api rodando => http://localhost:${port}`)
  })