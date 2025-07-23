import { render } from 'ejs';
import Contato from '../model/contatoModel.js';

export function indexContato(req, res) {
    res.render('contato');
}

export async function registerContato(req, res) {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            return req.session.save(() => res.redirect('/contato/index'));
        }

        req.flash('success', 'contato registrado com sucesso.');
        return req.session.save(() => res.redirect('/'));
    } catch (e) {
        console.log(e);
        return render('404');
    }
}