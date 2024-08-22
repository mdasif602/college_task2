const {Schema, model, default: mongoose} = require("mongoose")

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        min : 6,
        max : 30
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    token : {
        type : String,
        default : ""
    },
    favorites: [
        {
            type: String,
            default: [],
        },
    ],
})

const User = model('user', UserSchema)

module.exports = User