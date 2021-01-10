const { transporter } = require("../routes/mailer");

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { JWT_SECRET } = require("../keys");






exports.singUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({
            error: "Please fil all the feilds.",
        });
    }
   
    try {
        const savedUser = await User.findOne({ email: email });
        
        if (savedUser) return res.status(409).json({
            error: "User already saved",
        });

        const hashedPassword = bcrypt.hashSync(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        const mailOptions = {
            from: 'workera@gmail.com',//replace with your email
            to: newUser.email,//replace with your email
            subject: 'Account created Successfully.',
            html: "Hi,"+newUser.name+"<br> Welcome to workera. <br> You can no explore and volunteer to new opportunities and also can refer events of your own.<br>Thankyou."
        };

        try {
            await transporter.sendMail(mailOptions)
            console.log("Email sent Successfully!")
        } catch (err) {
            console.log("error occured while sending email!", err)
        }

        return res.status(200).json({
            message: "user saved successfully."
        });

    } catch (error) {
        console.log("Error Occured!", error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please add Email or Password." })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password." })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        const { _id, name, email } = savedUser;
                        res.json({ token, user: { _id, name, email } })
                    } else {
                        return res.status(422).json({ error: "Invalid email or password." })
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        })
        .catch(err => {
            console.log(err)
        })

}

exports.resetPassword = async (req,res)=>{
    const {email} =req.body;
    if(!email){
        return res.json({error:"please enter email."})
    }
    crypto.randomBytes(32,async(err,Buffer)=>{
        if(err){
            console.log(err);
        }
        const token=Buffer.toString("hex")
        User.findOne({email:email})
        .then(async(user)=>{
            if(!user){
                return res.json({error:"USer does'nt exists."})
            }
            user.resetToken=token;
            user.expireToken= Date.now()+3600000;
            await user.save();
            const mailOptions = {
                from: 'workera@gmail.com',//replace with your email
                to: user.email,//replace with your email
                subject: 'Password reset.',
                html: "Hi,"+user.name+'<br> you have requested for password reset<br>click on <a href="https://workera.herokuapp.com/reset/'+token+'">link</a> to reset password.'
            };
    
            try {
                await transporter.sendMail(mailOptions)
                console.log("Email sent Successfully!")
            } catch (err) {
                console.log("error occured while sending email!", err)
            }
            return res.status(200).json({
                message: "we have sent password rest link to your mail."
            });
        })
    })

}

exports.newPassword = async (req,res)=>{
    const {password,token} = req.body;
    User.findOne({expireToken:token,expireToken:{$gt:Date.now()}})
    .then(async (user)=>{
        if(!user){
            return res.json({errro:"Session expired try again."})
        }
        const hashedPassword = bcrypt.hashSync(password,12);
        user.password=hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        await user.save();
        return res.status(200).json({
            message: "Password updated successfully."
        });


    }).catch(err=>{
        console.log(err);
    })
}