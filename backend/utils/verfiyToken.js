const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return next(createError(401, "Unauthorized !"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(createError(403, "Invalid Token"));
    }
    req.user = user;
    next();
  });
};

const verfiyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Unauthorized"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Unauthorized"));
    }
  });
};

module.exports = { verfiyUser, verifyAdmin, verifyToken };
