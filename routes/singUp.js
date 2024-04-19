const express     = require('express');
const mongoose    = require('mongoose');
const bcrypt      = require('bcryptjs');
const User        = require('../models/userSchema');

const router      = express.Router();

router.post('/', async(req, res)=>{
    const {username, email, password} = req.body;
try{
    const userExist = await User.findOne({email})    
    if(userExist){
            return res.status(400).json({message: 'user with this email already exist'})
        }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
        console.log(hashedPassword);

    const user = new User({
        username, email, password:hashedPassword
    });

    const savedUser = await user.save()
        console.log('User signed up successfully!')
        res.status(200).json({
            message: 'User details:',
                User:{
                    username:savedUser.username,
                    email: savedUser.email,
                    password: savedUser.password
                }
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
});

module.exports = router;