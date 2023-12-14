
import {isJwtTokenExpired, logout } from "../../utils/auth";
import Link from 'next/link';

import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser, logoutWithRedux } from "../../store/useSlice/userSlice";

const SideBar = () => {

    const user = useSelector(selectUser);

    const baseUrl = process.env.NEXT_API_BASE_URL || "http://localhost:3000";
    if(!baseUrl){
        console.log("ENV not loaded! - Dashboard Page");
        return;
    }

    const logOutUser = () => {
        logout();
        window.location.href = baseUrl
        // history.pushState(null, "", '/'); 
    }
    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="nav-item nav-profile">
                        <a href="#" className="nav-link">
                            <div className="nav-profile-image">
                            <img src="https://images.rawpixel.com/image_png_1100/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjc5MS10YW5nLTM1LnBuZw.png" alt="profile" />
                            <span className="login-status online"></span>
                            
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2 t-capitalise">{`${user.firstName} ${user.lastName}`}</span>
                            <span className="text-secondary text-small">Eshop Manager</span>
                            </div>
                            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" href="/profile">
                            <span className="menu-title">Profile</span>
                            <i className="fa fa-user-o menu-icon" aria-hidden="true"></i>
                        </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" href="/dashboard">
                            <span className="menu-title">Dashboard</span>
                            <i className="mdi mdi-home menu-icon"></i>
                        </Link>
                        </li>
        
                        <li className="nav-item">
                        <Link className="nav-link" href="/category">
                            <span className="menu-title">Categories</span>
                            <i className="mdi mdi-contacts menu-icon"></i>
                        </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" href="/products">
                            <span className="menu-title">Products</span>
                            <i className="fa fa-product-hunt menu-icon" aria-hidden="true"></i>
                        </Link>
                        </li>

                        <li className="nav-item" onClick={logOutUser}>
                            <a className="nav-link">
                            {/* <a className="nav-link mouse-cursor"> */}
                                <span className="menu-title">Logout</span>
                                <i className="mdi mdi-logout menu-icon"></i>
                            </a>
                        </li>

                        {/* <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                            <span className="menu-title">Sample Pages</span>
                            <i className="menu-arrow"></i>
                            <i className="mdi mdi-medical-bag menu-icon"></i>
                        </a>
                        <div className="collapse" id="general-pages">
                            <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                            </ul>
                        </div>
                        </li> */}
                    </ul>
            </nav>
        </>
    )

}

export default SideBar;