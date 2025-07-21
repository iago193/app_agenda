import Login from "../model/loginModel.js";


export function login(req, res) {
    res.render('login');
}

export async function register(req, res) {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(() => res.redirect(req.get('referer') || '/login'));
        return;
    }

    req.flash('success', 'Usuário registrado com sucesso!');
    req.session.save(() => res.redirect('/login'));
}

