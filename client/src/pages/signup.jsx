import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput , Button, Alert, Spinner} from 'flowbite-react';

export default function signUp() {
  const [formData, setformData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() }) //trim method so that blank space is removed
  }
  // ...formData -> stores the previous data such as written uersname or email
  
  // as sending data to database takes time we are using await
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields.');
    }
    try{
      setLoading(true);
      setErrorMessage(null); //dont show any message till it is loading, message from previous request

      const res = await fetch('/api/auth/signup', { //check vite.config.js file
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //data is converted into json format in request body
        body: JSON.stringify(formData) //json data is converted to JSON string
      });
      const data = await res.json(); //convert into json
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false); //when everything is ok then stop loading
      if(res.ok){
        navigate('/sign-in'); //navigate to signin page after login successfully
      }
    } catch(error){
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span>Blog
          </Link>

          <p className='text-sm mt-5'>
            This is demo project. You can signup with your email and password.
            Or with Google
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
         
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className=''>
                <Label value='Your username' />
                <TextInput type='text' placeholder='Username' id='username'  onChange={handleChange}/>
              </div>

              <div className=''>
                <Label value='Your email' />
                <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
              </div>

              <div className=''>
                <Label value='Your password' />
                <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
              </div>

              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}> 
              {/* disabled  - when it is loading the button is disabled so that person cannot submit form*/}
              {/* while it is loading the button is disabled */}
                {
                  loading ? (
                    <>
                      <Spinner size='sm'/>
                      <span className='pl-3'>Loading...</span>
                    </>
                  ) : 'Sign up'
                }
              </Button>
            </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account?</span>
          <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
        </div>

        {
          errorMessage && (
            <Alert className='mt-5' color= 'failure'>
              {errorMessage}
            </Alert>
          )
        }
        </div>
      </div>
      </div>
  )
}
