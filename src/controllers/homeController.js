export function paginaInicial(req, res) {
    console.log(req.session.usuario);
    res.render('layout', {
        title: 'Document express',
        page: 'home'
    });
}
