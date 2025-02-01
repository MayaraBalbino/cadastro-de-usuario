import mysql from 'mysql2/promise';

const dbConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`);


export default dbConnection;

