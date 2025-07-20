import express from 'express';
import { home } from './src/controllers/homeController.js';
import { login } from './src/controllers/loginController.js';
import { checkCsrfError } from './src/middleware/middleware.js';

const route = express.Router();

route.get('/', home);

//rotas login
route.get('/login', login);
route.get('/404', checkCsrfError);

export { route as Router };
