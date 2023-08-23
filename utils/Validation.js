import { check, validationResult } from "express-validator";

const manageErrors = (cb) => (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  cb(errors.array(), req, res);
};

export const SigupValidation = [
  check("username").notEmpty().withMessage("username is empty").trim().escape(),
  check("password")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6 })
    .withMessage("Password must have atleast 6 characters..")
    .trim()
    .escape(),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];

export const LoginValidation = [
  check("username").notEmpty().withMessage("username is empty").trim().escape(),
  check("password")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6 })
    .withMessage("Password must have atleast 6 characters..")
    .trim()
    .escape(),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];

// export const PostValidation = [
//   check("title").notEmpty().withMessage("title is empty").trim().escape(),
//   check("author").notEmpty().withMessage("author is empty").trim().escape(),
//   check("image").notEmpty().withMessage("image link is empty").trim(),
//   check("content").notEmpty().withMessage("content is empty").trim().escape(),
//   manageErrors((error, req, res) => res.status(422).json({ error })),
// ];
