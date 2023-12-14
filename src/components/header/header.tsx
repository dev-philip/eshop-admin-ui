// redux files
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser, logoutWithRedux } from "../../store/useSlice/userSlice";
import Link from 'next/link';

//auth
import { logout } from "../../utils/auth";

const Header = () => {
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
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo" href="/dashboard"><img src="assets/images/logo.svg" alt="logo" /></Link>
                    <Link className="navbar-brand brand-logo-mini" href="/dashboard"><img src="assets/images/logo-mini.svg" alt="logo" /></Link>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-stretch">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span className="mdi mdi-menu"></span>
                    </button>
                    <div className="search-field d-none d-md-block">
                    <form className="d-flex align-items-center h-100" action="#">
                        <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                            <i className="input-group-text border-0 mdi mdi-magnify"></i>
                        </div>
                        <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
                        </div>
                    </form>
                    </div>
                    <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item nav-profile dropdown">
                        <a className="nav-link" >
                        <div className="nav-profile-img">
                            <img src="https://images.rawpixel.com/image_png_1100/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjc5MS10YW5nLTM1LnBuZw.png" alt="image" />
                            <span className="availability-status online"></span>
                        </div>
                        <div className="nav-profile-text">
                            <p className="mb-1 text-black t-capitalise"> {`${user.firstName} ${user.lastName}`} </p>
                        </div>
                        </a>
                    </li>
                  
                    <li className="nav-item nav-logout d-none d-lg-block" title="Logout" onClick={logOutUser}>
                        <a className="nav-link">
                        <i className="mdi mdi-power"></i>
                        </a>
                    </li>

                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span className="mdi mdi-menu"></span>
                    </button>
                </div>
            </nav>
        </>
    )

}

export default Header;