'use client'
import React, { FC, useState } from "react";
import Link from "next/link";
import "../../styles/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import {saveJwtToken, logout, isJwtTokenExpired, getJwtToken, getJwtTokenData } from "../../utils/auth";

import type { RootState } from "../../store/store";
import {useSelector, useDispatch } from "react-redux";
import { setUser} from "../../store/useSlice/userSlice";

interface LoginPageProps {}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

const LoginPage: FC<LoginPageProps> = () => {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");

    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
  

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Handle form submission
            try {
                // Set loading to true to show the spinner
                setIsLoading(true);
                const baseUrl = process.env.NEXT_API_URL_ADMIN;
                if(!baseUrl){
                    return;
                }

                const response = await axios.post(baseUrl + "/admin/login", values);

                setResponseMessage(response.data.message);
                
                if(response.data.status === true){
                    setIsLogin(true);
                    console.log(response.data.token.accessToken);
                    console.log(response.data);
                    saveJwtToken(response.data.token.accessToken);
                    const userLoggedIn = getJwtTokenData()
                    dispatch(setUser(userLoggedIn.username));
                    router.push('/dashboard');
                }
            
               
            } catch (error) {
                console.error('Error during form submission:', error);
                alert('Error submitting form');
            } finally {
                // Set loading back to false after the action completes
                setIsLoading(false);
            }
        },
      });

      const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

     const getTokens = () => {
        console.log(getJwtToken());
     }

     const logOut = () => {
        console.log(logout());
     }

     const checkExpired = () => {
        console.log(isJwtTokenExpired());
     }

     const checkTokenData = () => {
        console.log(getJwtTokenData());
     }

    return (
        <div className="auth-container">
            <div className="main auth-signin animate__animated animate__fadeIn">
                <p className="sign">Sign in</p>
                <form className="form1" onSubmit={formik.handleSubmit}>
                    <div className="input-container">
                        <span className="input-icon">
                            <span className={isLogin ? ("success-error") : ("input-error")}>
                                {formik.touched.email && formik.errors.email}
                                {responseMessage}
                            </span>
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </span>
                        <input 
                            className="un" 
                            type="email" 
                            id="email"
                            name="email" 
                            placeholder="Email" 
                            value={formik.values.email} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="input-container">
                        <span className="input-icon">
                            <span className="input-error">
                                {formik.touched.password && formik.errors.password}
                            </span>
                            {isLogin ? (
                                    <i className="fa fa-unlock animate__animated animate__fadeIn" aria-hidden="true"></i> 
                                ) : (
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                )
                            }
                        </span>
                        <input 
                            className="pass" 
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password" 
                            placeholder="Password"
                            value={formik.values.password} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="eye-password" onClick={togglePasswordVisibility}>
                        {showPassword ? (
                            <i className="fa fa-eye-slash" aria-hidden="true" title="Hide Password"></i>
                            ) : (
                            <i className="fa fa-eye" aria-hidden="true" title="Show Password"></i>
                            )
                        }
                        </span>
                    </div>
                    <button type="submit" className="submit">
                        {isLoading ? (
                            <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '24px' }}></i>
                            ) : (
                            'Sign In'
                            )
                        }
                    </button>
                </form>
                <p className="signup"><Link href="/signup">Signup?</Link></p> 
                <p className="forgot"><Link href="/dashboard">Forgot Password?</Link></p>   

                <button onClick={getTokens}>Get Token</button><br />
                <button onClick={logOut}>Logout</button><br />
                <button onClick={checkExpired}>Is expired</button><br />
                <button onClick={checkTokenData}>Check Data</button><br />
            </div>
        </div>
       
    );
  };
  
  export default LoginPage;