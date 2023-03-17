const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = require('../models/user')
const router = require('express').Router();

const secret_token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


router.post("/register", async (req, res) => {

  try {
    // Get user input
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserSchema.create({
      name,
      email: email.toLowerCase(), 
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      secret_token,
      {
        expiresIn: "2h",
      }
    );
    res.status(201).json(user)
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;