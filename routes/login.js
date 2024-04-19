const express     = require('express');
const mongoose    = require('mongoose');
const bcrypt      = require('bcryptjs');
const jwt         = require('jsonwebtoken');

const User        = require('../models/userSchema');

const router      = express.Router();

router.post('/', async (req, res)=>{
    const {email, password} = req.body;
    try{
         const user = await User.findOne({email})
         if(!user){
            res.status(404).json({message: 'User not found'});
         }
         const validPassword = await bcrypt.compare(password, user.password)
         console.log('Password match:', validPassword);

         if(!validPassword) {
            return res.status(401).json({message:'Invalid credentials'})
         }

         const secretKey = "12345";
         const token = jwt.sign({_id: user._id}, secretKey, {expiresIn: '1h'})
         console.log('Generated token:', token);

         return res.status(200).json({message:'login successful',_id:user._id })
    } catch (err){
         return res.status(500).json({message:'Internal error'})
    }
})

module.exports = router;