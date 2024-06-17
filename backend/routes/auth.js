const express = require("express");
const router = express.Router();
const user = require("../models/User");
const jwt = require("jsonwebtoken")
const jwtSecret = "123456"
const bcrypt = require ("bcryptjs")
const fetchUser = require("../Middlewear/fetch")

const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("email", "Please Enter a valid Email").isEmail(),
    body("name", "name must be required 3 character ").isLength({ min: 3 }),
    body("password", "Passowrd must be required 5 charactor").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10) 
    let secPassword = await bcrypt.hash(req.body.password , salt)
    try {
      const { name, email} = req.body;
      response = await user.create({ name, email, password:secPassword });
      const data = {
        user:{
          id:user.id 
        }
      }
      const authtoken = jwt.sign(data,jwtSecret)
      return res.json({success:true,authtoken:authtoken});
       

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  }
);
router.post(
    "/login",
    [
      body("email", "Please Enter a valid Email").isEmail(),
      body("password", "password cannot be blank").exists(),
    ],
    async (req, res) => { 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let email = req.body.email;
      try {  
       let userData = await user.findOne({email})                                                                                                   
          if(!userData){
           return res.status(400).json({error:"Please Enter a Valid Credential"})
          }                                            
  
          const passCompare = await bcrypt.compare(req.body.password , userData.password)
          if(!passCompare){
          return  res.status(400).json({error:"Invalid Credtendionsal"}) 
        }
        const data = {
          user:{
            id:userData.id
           
          }
        }
        const authtoken = jwt.sign(data,jwtSecret)
        return res.json({success:true,authtoken:authtoken});
        
    } catch (error) {
        console.log(error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);
router.post("/getUser",fetchUser,async (req, res) => { 
try {
      Userid = req.user.id
    const user = await user.findById(Userid).select("-password")
    res.send(id)
   
} catch (error) {
    console.log(error);
      res.status(500).json({ error: "internal server error" });
}
    })

module.exports = router;
