import dbConnection from '../database/db.js';
import { errorMessages } from '../error/httpErros.js';
import { sucessMessages } from '../error/httpErros.js';

export const updateUser = async (req, res) => {
    const { nome, email, salario, cpf} = req.body
    const { id } = req.params;
    try {
        const [results] = await dbConnection.query(
            'UPDATE users SET nome=?, email = ?, salario = ?, cpf = ?  WHERE id = ?',
            [nome, email, salario, cpf, id]
        );
        res.status(sucessMessages.updated.status).json({
            message: sucessMessages.updated.message,
            users: {
                id,
                nome,
                email,
                salario,
                cpf,
            },
        });
    } catch (error) {
        res.status(errorMessages.internalServerError.status).json({
            message: errorMessages.internalServerError.massage,
            error: error.message
        })
    }
};
