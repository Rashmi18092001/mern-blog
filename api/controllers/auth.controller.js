import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


// function is asyncronous because we are going to wait for some time to get the data from mongodb and give it to the user
export const signup = async(req,res, next) =>{
    const {username, email, password} = req.body;


if(!username || !email || !password || username === '' || password === '' || email === ''){
    next(errorHandler(400, 'All fields are required'));
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
    next(err);
}

};

// next is to handle error
export const signin = async(req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    try{
        const validUser = await User.findOne({ email });
        // if user is not found
        if(!validUser){
            return next(errorHandler(404, 'User not found'));
        }
        // compare passwords
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        // if password is not valid
        if(!validPassword){
            return next(errorHandler(400, 'Invalid Password'));
        }

        // create token - this creates encrypted/hashed password
        const token = jwt.sign(
            { id: validUser._id }, process.env.JWT_SECRET //we can also add expiry time. like one hr or if site is closed session is complete. if we dont add anything the session completes as the window is closed.
        );

        const { password: pass, ...rest } = validUser._doc;

        // add token to create cookie using res
        res.status(200).cookie('access_token', token, {
            httpOnly : true,
        }).json(rest) // this will not show password now and cookie is also created
        
    } catch(error){
        next(error);
    }
}