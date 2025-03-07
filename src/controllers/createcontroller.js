import dbConnection from '../database/db.js';
import bcrypt from 'bcrypt';
import { errorMessages } from '../error/httpErros.js';
import { sucessMessages } from '../error/httpErros.js';

export const createUser = async (req, res) => {
    const { nome, email, senha, confirmarSenha, cpf, empresa, cargo } = req.body;

    if (cpf.length !== 11) {
        return res.status(400).json({
            message: 'CPF inválido',
        }); 
    }

    if (senha !== confirmarSenha){
        return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    try {
        const [existingUser] = await dbConnection.query(
            'SELECT * FROM users WHERE cpf = ?',
            [cpf]
        );
        if (existingUser.length > 0) {
            return res.status(409).json({
                message: 'CPF já cadastrado',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        const [userResults] = await dbConnection.query(
            'INSERT INTO users (nome, email, cpf, senha) VALUES (?, ?, ?, ?)',
            [nome, email, cpf, hashedPassword]
        );

        const userId = userResults.insertId;

        res.status(sucessMessages.created.status).json({
            message: sucessMessages.created.message,
            users: {
                id: userId.insertId,
                nome,
                email,
                cpf,
            },
            profile: { empresa, cargo },
        });
    } catch (error) {
        console.error(error);
        res.status(errorMessages.internalServerError.status).json({
            message: errorMessages.internalServerError.massage,
        });
    }
};
