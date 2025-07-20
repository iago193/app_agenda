export function login(req, res) {
    res.render('layout', {
        title: 'Login',
        page: 'login'
    });
}