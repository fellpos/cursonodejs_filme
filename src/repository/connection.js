import mysql from 'mysql2/promise';


let con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    typeCast: function (field, next) {
    
        if (field.type === 'TINY' && field.length === 1) { //verifica se é um campo booleano
            return (field.string() === '1'); 
            // o campo tyne e o numero de caracteres for igual a 1, vai retornar true ou false
        }
        else if (field.type.includes('DECIMAL')) { //tipo decimal
          return Number(field.string()); // pega ele na string e coneverte em numero
        }
        else {
            return next();
        }
        
      }
})

console.log('---> Conexão com BD realizada')

export default con;