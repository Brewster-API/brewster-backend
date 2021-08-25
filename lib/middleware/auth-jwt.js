import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  try {
    const { session } = req.cookies;
    const payload = jwt.verify(session, process.env.API_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    error.status = 401;
    error.message = 'please login';
    next(error);
  }
}
