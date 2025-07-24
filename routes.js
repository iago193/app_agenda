import express from 'express';
import { home } from './src/controllers/homeController.js';
import { index, register, login, logout } from './src/controllers/loginController.js';
import { indexContato, registerContato, editIndex, edit } from './src/controllers/contatoController.js'
import { loginRequired } from './src/middleware/middleware.js';

const route = express.Router();

// Página inicial
route.get('/', home);

// Rotas de login
route.get('/login/index', index);
route.post('/login/register', register);
route.post('/login/login', login);
route.get('/login/logout', logout);

// Rotas de contato
route.get('/contato/index',loginRequired, indexContato);
route.post('/contato/register', registerContato);
route.get('/contato/index/:id', editIndex);
route.post('/contato/edit/:id', edit);

export { route as Router };
