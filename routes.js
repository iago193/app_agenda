import express from 'express';
import { paginaInicial, tratarPost } from './src/controllers/homeController.js';
import { paginaInicialContato } from './src/controllers/contatoControllers.js';

const route = express.Router();

route.get('/', paginaInicial);

route.get('/contato', paginaInicialContato);

route.post('/', tratarPost);

export { route as Router };
