import JWT from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  try {
    const Authorize = req.headers.token;

    if (!Authorize) {
      res.status(401).send("You are not authorized...");
    }

    const token = Authorize.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRETE_KEY, (err, user) => {
      if (err) {
        res.status(401).send("Invalid token....");
      }

      req.user = user;

      next();
    });
  } catch (e) {
    res.status(401).send("You are not authorized...");
  }
};

export const VeriftTokenAndUser = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).send("Invalid Token....");
    }
  });
};

export const VerifyTokenAndAdmin = (req, res) => {
  VerifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).send("Invalid Token....");
    }
  });
};
