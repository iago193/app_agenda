// Middleware global para popular variáveis nas views
export function middleware(req, res, next) {
  res.locals.errors = req.flash('errors') || [];
  res.locals.success = req.flash('success') || [];
  res.locals.user = req.session.user || null;
  next();
}

// Middleware para tratamento de erros CSRF
export function checkCsrfError(err, req, res, next) {
  if (err.code === 'EBADCSRFTOKEN') {
    // Token CSRF inválido ou ausente
    return res.status(403).render('404');
  }
  next(err);
}

// Middleware para injetar token CSRF nas views
export function csrfMiddleware(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

// Middleware para proteger rotas privadas
export function loginRequired(req, res, next) {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login');
    return req.session.save(() => res.redirect('/login/index'));
  }
  next();
}
