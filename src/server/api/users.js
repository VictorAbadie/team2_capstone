const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");



const {
  createUser,
  getUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
} = require("../db");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Get single user by ID
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply an email, password and birthday",
    });
  }
  try {
    const user = await getUser({ email, password, /*birthday*/ });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful!",
        token,
        user
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { name, email, password, birthday } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }

    const user = await createUser({
      name,
      email,
      password,
      birthday,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
      user
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
