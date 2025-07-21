export function  middleware(req, res, next) {
      res.locals.errors = req.flash('errors');
      res.locals.success = req.flash('success');
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
