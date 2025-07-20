export function paginaInicial(req, res) {
    req.session.usuario = {nome: 'iago', logado: true};
    console.log(req.session.usuario);
    res.render('layout', {
        title: 'Document express',
        page: 'home'
    });
}

export function tratarPost(req, res) {
    res.send('ei sou sua nova rota de post');
}
