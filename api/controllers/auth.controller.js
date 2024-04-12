import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';


// function is asyncronous because we are going to wait for some time to get the data from mongodb and give it to the user
export const signup = async(req,res) =>{
    const {username, email, password} = req.body;


if(!username || !email || !password || username === '' || password === '' || email === ''){
    return res.status(400).json({message: 'All fields are required'});
}

const hashedPassword = bcryptjs.hashSync(password, 10);


const newUser = new User({
    // if key  and value is same then we can remove one from it
    // usrname: username
    username,
    email,
    password: hashedPassword,
});

try{
    await newUser.save();
res.json('Signup successful');
} catch(err){
    res.status(500).json({message : err.message});
}

};