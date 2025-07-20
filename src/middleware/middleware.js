export function  middleware(req, res, next) {
    res.locals.umaVariavelLocal = 'um teste de variavel local';
    next();
}

export function checkCsrfError(err, req, res, next) {
  if (err) {
    res.render('layout', {
        title: 'Error',
        page: '404'
    });
  }
  next();
}

export function csrfMiddleware(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}
