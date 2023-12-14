import React, { FC, useState } from 'react';
import Link from 'next/link';
import '../styles/style.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

interface SignupPageProps {}

const validationSchema = Yup.object({
    firstName: Yup.string().required('Firstname is required'),
    lastName: Yup.string().required('Lastname is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

const SignupPage: FC<SignupPageProps> = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");

      const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
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

                const response = await axios.post(baseUrl + "/admin/register", values);

                
                setTimeout(()  => {
                    setResponseMessage(response.data.message);
                    console.log(response.data.message);
                    if(response.data.status === true){
                        setIsRegister(true);
                    }
                    
                    router.push('/login');
                }, 2000)
               
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
  

    return (
        <div className="auth-container">
              <div className="main auth-signup animate__animated animate__fadeIn">
                <p className="sign">Sign Up</p>
                <form className="form1" onSubmit={formik.handleSubmit}>
                    <div className="input-container">
                        <span className="input-icon">
                        <span className="input-error">{formik.touched.firstName && formik.errors.firstName}</span>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                        </span>
                        <input 
                            className="un" 
                            type="text"
                            id="firstName" 
                            name="firstName" 
                            placeholder="First Name"
                            value={formik.values.firstName} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="input-container">
                        <span className="input-icon">
                        <span className="input-error">{formik.touched.lastName && formik.errors.lastName}</span>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                        </span>
                        <input 
                            className="un" 
                            type="text" 
                            id="lastName"
                            name="lastName" 
                            placeholder="Last Name" 
                            value={formik.values.lastName} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="input-container">
                        <span className="input-icon">
                            <span className={isRegister ? ("success-error") : ("input-error")}>
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
                            {isRegister ? (
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
                            'Sign Up'
                            )
                        }
                    </button>
                </form>
                <p className="signup"><Link href="login">Log In?</Link></p> 
                <p className="forgot"><Link href="#">Forgot Password?</Link></p>      
            </div>
        </div>
    );
  };
  
  export default SignupPage;