import dbConnection from '../database/db.js';
import { errorMessages } from '../error/httpErros.js';
import { sucessMessages } from '../error/httpErros.js';

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await dbConnection.query('DELETE FROM users WHERE id = ?', [id]);
       
        res.status(sucessMessages.deleted.status).json({
            message: sucessMessages.deleted.message,
        });
    } catch (error) {
        console.error('erro', error);
        res.status(errorMessages.internalServerError.status).json({
            message: errorMessages.internalServerError.massage,
        });
    }
};
