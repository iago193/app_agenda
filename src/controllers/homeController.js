export function home(req, res) {
    res.render('layout', {
        title: 'APP agenda',
        page: 'home'
    });
}
