import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const { session } = req.cookies;
  const payload = jwt.verify(session, process.env.API_SECRET);
  req.user = payload;

  next();
}
