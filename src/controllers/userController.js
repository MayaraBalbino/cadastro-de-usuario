import  dbConnection  from '../database/db.js';
import { errorMessages } from '../error/httpErros.js';
import { sucessMessages } from '../error/httpErros.js';

export const getUser = async (req, res) => {
    try {
        const [results] = await dbConnection.query('SELECT * FROM users');
        res.json(results);
    } catch (error) {
        res.status(errorMessages.internalServerError.status).json({
            message: errorMessages.internalServerError.massage,
        });
    }
};
