import dbConnection from '../database/db.js';
import { errorMessages } from '../error/httpErros.js';
import { sucessMessages } from '../error/httpErros.js';

export const findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await dbConnection.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (results.length === 0) {
            return res.status(errorMessages.notFound.status).json({
                message: errorMessages.notFound.message,
            });
        }
        const { nome, email, salario, cpf } = results[0];
        res.status(sucessMessages.found.status).json({
            message: sucessMessages.found.message,
            users: {
                id,
                nome,
                email,
                cargo,
                cpf,
            },
        });
    } catch (error) {
        res.status(errorMessages.internalServerError.status).json({
            message: errorMessages.internalServerError.massage,
        });
    }
};
