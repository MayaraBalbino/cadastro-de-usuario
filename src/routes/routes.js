import { Router } from 'express';
import { getUser } from '../controllers/userController.js';
import { createUser } from '../controllers/createcontroller.js';
import { deleteUser } from '../controllers/deletecontroller.js';
import { updateUser } from '../controllers/updatecontroller.js';
import { findOne } from '../controllers/findonecontroller.js';

const routes = Router();

routes.get('/users', getUser);
routes.post('/users', createUser);
routes.delete('/users/:id', deleteUser);
routes.put('/users/:id', updateUser);
routes.get('/users/:id', findOne)

export default routes;
