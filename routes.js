import express from 'express';
import { home } from './src/controllers/homeController.js';
import { index, register, login } from './src/controllers/loginController.js';

const route = express.Router();

// Página inicial
route.get('/', home);

// Rotas de login
route.get('/login/index', index);
route.post('/login/register', register);
route.post('/login/login', login);

export { route as Router };
