const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Authmiddle = require('../Middleware/Loginmiddle')

const { body, validationResult } = require('express-validator');
const User = require('../models/User')

let JWT_secret = "mynamei$#sname"

// ROUTE -1 --Creating route for -using POST request---  creating account --endpoint--/api/user/create--

router.post('/createuser',
   //Applying validation to make sure proper data is entered by user as user cannot be trusted--
   [
      body('name', 'enter name of atleast 3 character').isLength({ min: 3 }),
      body('email', 'enter a valid email').isEmail(),
      body('password', 'enter password of atleast  5 digit').isLength({ min: 5 }),
   ],
   async (req, res) => {
      //Wraping code in try ,catch syntax for unwanted errors--
      try {
         //Appling conditions in case validation in not satisfied--
         const result = validationResult(req);
         //In case there is no validation problem--
         if (result.isEmpty()) {
            let user = await User.findOne({ "email": req.body.email });
            //Conditiion to make sure that email is not repeated --
            if (user) {
               res.json({"success":false, "error": "email of this name already exists" });
            }
            else {
               //Generating hash of password--By adding salt in it--
               let salt = await bcrypt.genSalt(10);
               let hash = await bcrypt.hash(req.body.password, salt);

               user = new User({
                  name: req.body.name,
                  email: req.body.email,
                  password: hash
               });
               await user.save();
               //Sending jwt token to user for varifying user--when user is logined--After signing secret in jwt--
               // To only get id from database use : .id  not ._id-- 
               let token = jwt.sign({ id: user.id }, JWT_secret);
               res.json({"success":true, token });
            }
         }
         //In case validation  is not satisfied --
         else {
            res.json({"success":false, "errors": result.array() });
         }
      }
      catch (error) {
         res.status(500);
         res.json({"success":false, "error": "intenal server error", "message": error.message });
      }
   })

// ROUTE-2 --route for login -using POST request---endpoint--/api/user/login--
router.post('/login', [
   body('email', 'enter a valid email').isEmail(),
   body('password', 'enter a valid password').isLength({ min: 5 }),
],
   async (req, res) => {
      try {
         //Appling conditions in case validation in not satisfied--
         const result = validationResult(req);
         //In case there is no validation problem--
         if (result.isEmpty()) {
            const { email, password } = req.body;
            let findemail = await User.findOne({ email });
            //If user entered email does not match any email in database--
            if (!findemail) {
               return res.status(400).json({ "error": "please enter valid credentials" });
            }
            let passwordcheck = await bcrypt.compare(password, findemail.password);
            //If password of email does not match password stored in database--
            if (!passwordcheck) {
               return res.status(400).json({"success":false, "error": "Please enter valid credentials" });
            }
            // For an ideal situation--where both password and email are correct--
            let token = jwt.sign({ id: findemail.id }, JWT_secret);
            res.json({"success":true ,token });
         }
         //If there is validation problem--
         else {
            res.json({"success":false, "errors": result.array() });
         }
      }
      catch (error) {
         res.status(500);
         res.json({"success":false, "error": "intenal server error", "message": error.message });
      }
   })

// ROUTE-3--for getting user login details-using POST request--route-/api/user/getuser --login required

router.post("/getuser", Authmiddle,
   async (req, res) => {
      try {
         const id = req.user.id;
         const userdata = await User.findById(id).select("-password");
         res.json(userdata);
      }
      catch (error) {
         res.status(500);
         res.json({ "error": "intenal server error", "message": error.message });
      }
   })

module.exports = router;