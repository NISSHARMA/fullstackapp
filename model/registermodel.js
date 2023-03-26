const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
    email: String,
    password: String,
    location: String,
    age: Number
}, {
    versionKey: false
})

const RegisterModel = mongoose.model("register", registerSchema)


module.exports = {
    RegisterModel
}

