import User from "../model/User.js";
import JWT from "jsonwebtoken";
import cryptoJS from "crypto-js";

//Register User

export const RegisterUser = async (req, res) => {
  const { username, password, isAdmin } = req.body;

  const HashedPassword = cryptoJS.AES.encrypt(
    password,
    process.env.PASSWORD_SECRETE_KEY
  ).toString();

  try {
    const newUser = new User({
      username: username,
      password: HashedPassword,
      isAdmin: isAdmin,
    });

    await newUser.save();

    res.status(200).send("User is registered Now login...");
  } catch (e) {
    res.status(401).send("Something went wrong");
  }
};

export const Login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  try {
    if (!user) {
      return res.status(401).send("Username is not found...");
    }

    const HashedPassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRETE_KEY
    );

    const OriginalPassword = HashedPassword.toString(cryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      return res.status(401).send("Password is wrong...");
    }
    const accessToken = JWT.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "1D" }
    );

    const { password, ...others } = user._doc;

    res.status(200).send({ ...others, accessToken });
  } catch (e) {
    res.status(200).send("Something went wrong...");
  }
};
