import Contato from '../model/contatoModel.js';

export function indexContato(req, res) {
    res.render('contato');
}

export async function registerContato(req, res) {
    const contato = new Contato(req.body);
    await contato.register();
    res.send('oi')
}