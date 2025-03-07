import dbConnection from '../database/db';
import jwt from 'jsonwebtoken';
import { errorMessages } from '../error/httpErros.js';
import { sucessMessages } from '../error/httpErros.js';

export const loginUser = async (req, res) => {
    const { cpf, senha } = req.body;

    const [results] = await dbConnection.query(
        'SELECT * FROM users WHERE cpf = ?, senha = ?',
        [cpf, senha]
    );
    try {
        const [existingUser] = await dbConnection.query(
            'SELECT * FROM users WHERE cpf = ?',
            [cpf]
        );

        if (existingUser.length === 0) {
            return res
                .status(404)
                .json({ error: 'CPF nao encontrado. Cadastre-se' });
        }

        const user = existingUser[0];

        const validPassword = await bcrypt.compare(senha, user.senha);

        if (!validPassword) {
            return res.status(401).json('Senha inválida');
        }

        const token = jwt.sign({ id: user.id, cpf: user.cpf }, 'JWT', {
            expiresIn: '1h',
        });
        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
};
