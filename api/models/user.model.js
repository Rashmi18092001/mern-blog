import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true //this is to make usernames of each user unique
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, //password can be same of users
    },
}, {timestamps: true} //to save 2 things while adding a new user, the time of creation and time of update
);

const User = mongoose.model('User', userSchema);

export default User;