import express from 'express';
import { home } from './src/controllers/homeController.js';
import { login,register } from './src/controllers/loginController.js';
import { checkCsrfError } from './src/middleware/middleware.js';

const route = express.Router();

route.get('/', home);

//rotas login
route.get('/login', login);
route.get('/404', checkCsrfError);

route.post('/login/register', register);

export { route as Router };
