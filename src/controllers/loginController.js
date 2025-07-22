import Login from "../model/loginModel.js";


export function index(req, res) {
    res.render('login');
}

export async function register(req, res) {
    try{
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login/index'));
            return;
        }

        req.flash('success', 'Usuário registrado com sucesso!');
        req.session.save(() => res.redirect('/login/index'));

    }catch(e) {
        console.log(e);
        return res.render('404');
    }
}

export async function login(req, res) {
    try{
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login/index'));
            return;
        }

        req.flash('success', 'você logou com sucesso!');
        req.session.user = login.user;
        req.session.save();
        req.session.save(() => res.redirect('/'));

    }catch(e) {
        console.log(e);
        return res.render('404');
    }
}

export function logout(req, res) {
    req.session.destroy(() => res.redirect('/login/index'));
}

