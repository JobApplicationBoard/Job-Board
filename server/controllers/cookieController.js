const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('userId', user.user_id, { httpOnly: true, sameSite: 'strict' });
  return next();
};
