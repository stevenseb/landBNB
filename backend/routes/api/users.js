// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { validateSignup } = require('../../utils/validation');
const { User } = require('../../db/models');


// USER SIGN UP
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  try {

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  } catch (error) {
    if (error.message.includes('Email already exists')) {
      return res.status(500).json({
          message: "User already exists",
          errors: {
              email: "User with that email already exists"
          }
      });
  } else if (error.message.includes('Username already exists')) {
    return res.status(500).json({
        message: "User already exists",
        errors: {
            username: "User with that username already exists"
        }
    });
}

}
  } 
);



module.exports = router;
