import dbConnection from '../database/db.js';
import { errorMessages } from '../error/httpErros.js';
import { sucessMessages } from '../error/httpErros.js';

export const createUser = async (req, res) => {
    const { nome, email, cargo, cpf } = req.body;

    if (cpf.length !== 11) {
        return res.status(400).json({
            message: 'CPF inválido',
        });
    }

    try {
        const [existingUser] = await dbConnection.query(
            'SELECT * FROM users WHERE cpf = ?',
            [cpf]
        );
        if (existingUser.length > 0) {
            return res.status(400).json({
                message: 'CPF já cadastrado',
            });
        }

        const [results] = await dbConnection.query(
            'INSERT INTO users (nome, email, cargo, cpf) VALUES (?, ?, ?, ?)',
            [nome, email, cargo, cpf]
        );

        res.status(sucessMessages.created.status).json({
            message: sucessMessages.created.message,
            users: {
                id: results.insertId,
                nome,
                email,
                cargo,
                cpf,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(errorMessages.internalServerError.status).json({
            message: errorMessages.internalServerError.massage,
        });
    }
};
