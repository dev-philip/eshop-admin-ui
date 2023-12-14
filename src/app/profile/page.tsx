'use client'
import "/public/assets/vendors/mdi/css/materialdesignicons.min.css";
import "/public/assets/vendors/css/vendor.bundle.base.css";
import "/public/assets/css/style.css";
import "/public/assets/css/appstyle.css";
import "/public/assets/images/favicon.ico";

import React, { useEffect, useState } from "react";
import {isJwtTokenExpired, logout, getJwtTokenData } from "../../utils/auth";
import { useRouter } from "next/navigation";

// redux files
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser, logoutWithRedux } from "../../store/useSlice/userSlice";

//component
import Footer from "../../components/footer/footer";
import Header from "@/components/header/header";
import SideBar from "@/components/sidebar/sidebar";


const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const user = useSelector(selectUser);
    // const user = useSelector((state: RootState) => state.user.user);

    const baseUrl = process.env.NEXT_API_BASE_URL || "http://localhost:3000";
    if(!baseUrl){
        console.log("ENV not loaded! - Dashboard Page");
        return;
    }

    useEffect(() => {
        if(isJwtTokenExpired()){ //if expired
            history.pushState(null, "", '/'); 
            window.location.href = baseUrl
            return;
        }else{
            const userLoggedIn = getJwtTokenData()
            dispatch(setUser(userLoggedIn.username));
            // dispatch(setUser({
            //     name: "olamide",
            //     email: "tunde@gmail.com"
            // }));
        }
    }, []);

    return (
        <div className="container-scroller">
           <Header />
            
            <div className="container-fluid page-body-wrapper">
                <SideBar />
        
                <div className="main-panel">
                    <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="fa fa-user-o"></i>
                            </span> 
                            Profile
                        </h3>
                    </div>
                    
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
  };
  
  export default Profile;