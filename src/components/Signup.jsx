import React, {useState} from "react";
import {login} from '../store/authslice'
import {Link, matchPath, useNavigate} from 'react-router-dom'
import {Button, Input, Logo} from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth'
import {set, useForm} from 'react-hook-form'

function Signup(){
   const navigate=useNavigate()
   const [error, setError]=useState(" ")
   const dispatch =useDispatch()
   const {register, handleSubmit}=useForm()

   const create=async(data)=>{
    setError("")
   }

   try {
    const userData= authService.createAccount(data)

    if(userData){
        const userData= authService.getCurrentUser()
        if(userData) dispatch (login(userData));
        navigate("/")
    }
    
   }
   
   catch (error) {
     setError(error.message)
   }


return(
    <div className='flex items-center justify-center w-full'>
                <div className={`mx-auto w-full mx-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    
                 <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-100px">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">
                {error}
                </p>}
    
    
            <form onSubmit={handleSubmit(create)}
              className='mt-8'>
                <div className='space-y-5'>
                    <Input label="FullName" placeholder="Enter your Full Name"
                    {...register ("name", {
                        required:true,
                    })}
                    />

                    <Input label="Email:"
                      placeholder="Enter your Email"
                      type="email" {
                        ...register("email"),{
                            required:true,
                            validate:{
                                 matchPattern:(value)=> /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.
                                 test(value)|| "Email address must be a valid address",
                            }
                        }
                      }/>

              <Input label="Password:" type="password"
               placeholder="Enter your Password"
              {...register ("password", {
                required:true,
              })}
              
              />

              <button type="submit" className="w-full">
                Create Account
              </button>
             </div>
           </form>
        </div>
     </div>
    )
}

export default Signup


