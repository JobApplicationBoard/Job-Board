const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('userId', res.locals.user.id, {
    httpOnly: true,
    sameSite: 'strict',
  });
  return next();
};

module.exports = cookieController;
