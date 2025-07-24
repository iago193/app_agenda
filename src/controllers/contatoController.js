import Contato from '../model/contatoModel.js';

export function indexContato(req, res) {
    res.render('contato', { contato: {} });
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
        return req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

export async function editIndex(req, res) {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);

    if (!contato) return res.render('404');
    res.render('contato', {
        contato: contato
    });
}

export async function edit(req, res) {
    try {
        if (!req.params.id) return res.render('404');

        const contatoInstance = new Contato(req.body);
        await contatoInstance.edit(req.params.id);

        if (contatoInstance.errors.length > 0) {
            req.flash('errors', contatoInstance.errors);
            return req.session.save(() => res.redirect('/contato/index'));
        }

        req.flash('success', 'Contato editado com sucesso.');
        return req.session.save(() => res.redirect(`/contato/index/${contatoInstance.contato._id}`));
        
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

export async function deleteIndex(req, res) {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if (!contato) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso.');
    return req.session.save(() => res.redirect('/'));
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
}

