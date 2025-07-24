import Contato from "../model/contatoModel.js";


export async function home(req, res) {
    const contatos = await Contato.buscaContato();
    res.render('home', {contatos});
}
