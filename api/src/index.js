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


const adjustName = (name) => {
    let nomes = name.split(' ')
    let ldka = nomes.map((nome)=>{
        return nome.charAt(0).toUpperCase() + nome.substr(1).toLowerCase();
    })
    let txt_name = '';
    for (let i = 0; i < ldka.length; i++) {
        txt_name += ldka[i] + ' '; 
    }
    return txt_name.trim();
}

server.get('/oi', (req, res) => {
    aws_connect.query("SELECT * FROM cliente;", (err, results)=>{ 
          if(err){
            console.err('ERROOOOOOOOO', err)
          }
        results.forEach(pessoa => {
             pessoa.nome = adjustName(pessoa.nome.trim())
             pessoa.cpf = pessoa.cpf.replace(/[!-#-\--\.]{1}/g, "").trim();
             pessoa.telefone = pessoa.telefone.replace(/[(-)-\--\.]{1}/g, "").trim()
             pessoa.email = pessoa.email.replace("!","@").replace("#","@").trim().toLowerCase();
        })
        console.log(results)
    })
}) 

server.listen(port, () => {
    console.log(`Api rodando => http://localhost:${port}`)
  })