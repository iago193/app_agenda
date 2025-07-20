export function  middleware(req, res, next) {
    res.locals.umaVariavelLocal = 'um teste de variavel local';
    next();
}

export function checkCsrfError(err, req, res, next) {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).send('❌ CSRF inválido ou expirado.');
  }
  next(err);
}

export function csrfMiddleware(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}
