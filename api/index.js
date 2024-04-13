import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config(); 
// function call typically used to load environment variables from a .env file into process.env

mongoose
    .connect(process.env.MONGO)
    .then( () => {
        console.log('MongoDB is Connected');
    })
    .catch((err) => {
        console.log(err); 
    });

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// err- error coming, req- user input, res- response to request, next- go to next middleware 
app.use((err, req, res, next )=>{
    const statusCode = err.statusCode || 500; // if there is no status code it show 500 otherwise show status code

    const message = err.message || 'Internal Server Error'; //if there is any error show error otherwise show internal server error

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});