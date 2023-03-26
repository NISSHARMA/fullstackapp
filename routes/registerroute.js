const express = require("express")
const registerRoute = express.Router()
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const { RegisterModel } = require("../model/registermodel")


registerRoute.post("/register", async (req, res) => {
    const { email, password, location, age } = req.body
   
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const newUser = new RegisterModel({ email, password: hash, location, age })
            await newUser.save()
            res.status(200).send({ "msg": "User has been registered" })
        })

    } catch (err) {
        res.status(400).send({ "error": err.message })
    }
})

registerRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await RegisterModel.findOne({ email })
        
        if (user) {
           
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login Successfull", "token": jwt.sign({ "userID": user._id }, 'masai') })
                } else {
                    res.status(400).send({ "msg": "Wrong Credential" })
                }
            })
        }
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


module.exports = {
    registerRoute
}


/*registerRoute.get("/register", async (req, res) => {
    const query = req.query
    try {
        const users = await RegisterModel.find(query)
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})*/


/*registerRoute.get("/details", (req, res) => {
    const  token  = req.headers.authorisation
    jwt.verify(token, 'shhhhh', function (err, decoded) {
        decoded?res.status(200).send("User Details"): 
        res.status(400).send({"msg":"Login required"})
    })
})*/