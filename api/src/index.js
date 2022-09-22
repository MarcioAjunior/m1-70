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

server.get('/', (req, res) => {
    connection.query("SELECT * FROM produtos;", (results, err)=>{
        if(err){
            res.send(err)
        }else{
            res.send(results.map(item => (
                {
                    nome : item.nome,
                    preco : item.preco
                }
            ) 
            ))
        }
    })

})


server.listen(port, () => {
    console.log(`Api rodando => http://localhost:${port}`)
  })