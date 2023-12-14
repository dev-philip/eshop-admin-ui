import "/public/assets/vendors/mdi/css/materialdesignicons.min.css";
import "/public/assets/vendors/css/vendor.bundle.base.css";
import "/public/assets/css/style.css";
import "/public/assets/css/appstyle.css";
import "/public/assets/images/favicon.ico";

import React, { FC, useEffect, useState } from "react";
import {isJwtTokenExpired, logout } from "../utils/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../store/useSlice/userSlice";



interface DashboardPageProps {}

const Dashboard: FC<DashboardPageProps> = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const user = useSelector(selectUser);

    useEffect(() => {
        if(isJwtTokenExpired()){ //if expired
            router.push('/login');
            return;
        }
    }, []);


    const logOutUser = () => {
        logout();
        router.push('/login');
    }
    return (
        <div className="container-scroller">
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a className="navbar-brand brand-logo" href="index.html"><img src="assets/images/logo.svg" alt="logo" /></a>
                <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
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
                    <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="nav-profile-img">
                        <img src="assets/images/faces/face1.jpg" alt="image" />
                        <span className="availability-status online"></span>
                    </div>
                    <div className="nav-profile-text">
                        <p className="mb-1 text-black">
                        David Greymaax
                        {user.email}</p>
                    </div>
                    </a>
                    <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                    <a className="dropdown-item" href="#">
                        <i className="mdi mdi-cached me-2 text-success"></i> Activity Log </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                        <i className="mdi mdi-logout me-2 text-primary"></i> Signout </a>
                    </div>
                </li>
                <li className="nav-item d-none d-lg-block full-screen-link">
                    <a className="nav-link">
                    <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="mdi mdi-email-outline"></i>
                    <span className="count-symbol bg-warning"></span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                    <h6 className="p-3 mb-0">Messages</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                        <img src="assets/images/faces/face4.jpg" alt="image" className="profile-pic" />
                        </div>
                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                        <p className="text-gray mb-0"> 1 Minutes ago </p>
                        </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                        <img src="assets/images/faces/face2.jpg" alt="image" className="profile-pic" />
                        </div>
                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                        <p className="text-gray mb-0"> 15 Minutes ago </p>
                        </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                        <img src="assets/images/faces/face3.jpg" alt="image" className="profile-pic" />
                        </div>
                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                        <p className="text-gray mb-0"> 18 Minutes ago </p>
                        </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="p-3 mb-0 text-center">4 new messages</h6>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                    <i className="mdi mdi-bell-outline"></i>
                    <span className="count-symbol bg-danger"></span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                    <h6 className="p-3 mb-0">Notifications</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                            <i className="mdi mdi-calendar"></i>
                        </div>
                        </div>
                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Event today</h6>
                        <p className="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                        </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                        <div className="preview-icon bg-warning">
                            <i className="mdi mdi-settings"></i>
                        </div>
                        </div>
                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Settings</h6>
                        <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                        </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                        <div className="preview-icon bg-info">
                            <i className="mdi mdi-link-variant"></i>
                        </div>
                        </div>
                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                        <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                        </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="p-3 mb-0 text-center">See all notifications</h6>
                    </div>
                </li>
                <li className="nav-item nav-logout d-none d-lg-block">
                    <a className="nav-link" href="#">
                    <i className="mdi mdi-power"></i>
                    </a>
                </li>
                <li className="nav-item nav-settings d-none d-lg-block">
                    <a className="nav-link" href="#">
                    <i className="mdi mdi-format-line-spacing"></i>
                    </a>
                </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span className="mdi mdi-menu"></span>
                </button>
            </div>
            </nav>
            
            <div className="container-fluid page-body-wrapper">
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item nav-profile">
                    <a href="#" className="nav-link">
                        <div className="nav-profile-image">
                        <img src="assets/images/faces/face1.jpg" alt="profile" />
                        <span className="login-status online"></span>
                        
                        </div>
                        <div className="nav-profile-text d-flex flex-column">
                        <span className="font-weight-bold mb-2">David Grey. H</span>
                        <span className="text-secondary text-small">Project Manager</span>
                        </div>
                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <span className="menu-title">Dashboard</span>
                        <i className="mdi mdi-home menu-icon"></i>
                    </a>
                    </li>
      
                    <li className="nav-item">
                    <a className="nav-link" href="pages/icons/mdi.html">
                        <span className="menu-title">Categories</span>
                        <i className="mdi mdi-contacts menu-icon"></i>
                    </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link mouse-cursor" onClick={logOutUser}>
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
        
            <div className="main-panel">
                <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                        <i className="mdi mdi-home"></i>
                    </span> Dashboard
                    </h3>
                    <nav aria-label="breadcrumb">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">
                        <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                        </li>
                    </ul>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-4 stretch-card grid-margin">
                    <div className="card bg-gradient-danger card-img-holder text-white">
                        <div className="card-body">
                        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                        <h4 className="font-weight-normal mb-3">Weekly Sales <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                        </h4>
                        <h2 className="mb-5">$ 15,0000</h2>
                        <h6 className="card-text">Increased by 60%</h6>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin">
                    <div className="card bg-gradient-info card-img-holder text-white">
                        <div className="card-body">
                        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                        <h4 className="font-weight-normal mb-3">Weekly Orders <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                        </h4>
                        <h2 className="mb-5">45,6334</h2>
                        <h6 className="card-text">Decreased by 10%</h6>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin">
                    <div className="card bg-gradient-success card-img-holder text-white">
                        <div className="card-body">
                        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                        <h4 className="font-weight-normal mb-3">Visitors Online <i className="mdi mdi-diamond mdi-24px float-right"></i>
                        </h4>
                        <h2 className="mb-5">95,5741</h2>
                        <h6 className="card-text">Increased by 5%</h6>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <div className="clearfix">
                            <h4 className="card-title float-left">Visit And Sales Statistics</h4>
                            <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right"></div>
                        </div>
                        <canvas id="visit-sale-chart" className="mt-4"></canvas>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-5 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title">Traffic Sources</h4>
                        <canvas id="traffic-chart"></canvas>
                        <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4"></div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title">Recent Tickets</h4>
                        <div className="table-responsive">
                            <table className="table">
                            <thead>
                                <tr>
                                <th> Assignee </th>
                                <th> Subject </th>
                                <th> Status </th>
                                <th> Last Update </th>
                                <th> Tracking ID </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>
                                    <img src="assets/images/faces/face1.jpg" className="me-2" alt="image" /> David Grey
                                </td>
                                <td> Fund is not recieved </td>
                                <td>
                                    <label className="badge badge-gradient-success">DONE</label>
                                </td>
                                <td> Dec 5, 2017 </td>
                                <td> WD-12345 </td>
                                </tr>
                                <tr>
                                <td>
                                    <img src="assets/images/faces/face2.jpg" className="me-2" alt="image" /> Stella Johnson
                                </td>
                                <td> High loading time </td>
                                <td>
                                    <label className="badge badge-gradient-warning">PROGRESS</label>
                                </td>
                                <td> Dec 12, 2017 </td>
                                <td> WD-12346 </td>
                                </tr>
                                <tr>
                                <td>
                                    <img src="assets/images/faces/face3.jpg" className="me-2" alt="image" /> Marina Michel
                                </td>
                                <td> Website down for one week </td>
                                <td>
                                    <label className="badge badge-gradient-info">ON HOLD</label>
                                </td>
                                <td> Dec 16, 2017 </td>
                                <td> WD-12347 </td>
                                </tr>
                                <tr>
                                <td>
                                    <img src="assets/images/faces/face4.jpg" className="me-2" alt="image" /> John Doe
                                </td>
                                <td> Loosing control on server </td>
                                <td>
                                    <label className="badge badge-gradient-danger">REJECTED</label>
                                </td>
                                <td> Dec 3, 2017 </td>
                                <td> WD-12348 </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title">Recent Updates</h4>
                        <div className="d-flex">
                            <div className="d-flex align-items-center me-4 text-muted font-weight-light">
                            <i className="mdi mdi-account-outline icon-sm me-2"></i>
                            <span>jack Menqu</span>
                            </div>
                            <div className="d-flex align-items-center text-muted font-weight-light">
                            <i className="mdi mdi-clock icon-sm me-2"></i>
                            <span>October 3rd, 2018</span>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6 pe-1">
                            <img src="assets/images/dashboard/img_1.jpg" className="mb-2 mw-100 w-100 rounded" alt="image" />
                            <img src="assets/images/dashboard/img_4.jpg" className="mw-100 w-100 rounded" alt="image" />
                            </div>
                            <div className="col-6 ps-1">
                            <img src="assets/images/dashboard/img_2.jpg" className="mb-2 mw-100 w-100 rounded" alt="image" />
                            <img src="assets/images/dashboard/img_3.jpg" className="mw-100 w-100 rounded" alt="image" />
                            </div>
                        </div>
                        <div className="d-flex mt-5 align-items-top">
                            <img src="assets/images/faces/face3.jpg" className="img-sm rounded-circle me-3" alt="image" />
                            <div className="mb-0 flex-grow">
                            <h5 className="me-2 mb-2">School Website - Authentication Module.</h5>
                            <p className="mb-0 font-weight-light">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
                            </div>
                            <div className="ms-auto">
                            <i className="mdi mdi-heart-outline text-muted"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* last row full of shit */}
                <div className="row">
                    <div className="col-md-7 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title">Project Status</h4>
                        <div className="table-responsive">
                            <table className="table">
                            <thead>
                                <tr>
                                <th> # </th>
                                <th> Name </th>
                                <th> Due Date </th>
                                <th> Progress </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td> 1 </td>
                                <td> Herman Beck </td>
                                <td> May 15, 2015 </td>
                                <td>
                                    <div className="progress">
                                    {/* <div className="progress-bar bg-gradient-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div> */}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td> 2 </td>
                                <td> Messsy Adam </td>
                                <td> Jul 01, 2015 </td>
                                <td>
                                    <div className="progress">
                                    {/* <div className="progress-bar bg-gradient-danger" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" ></div> */}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td> 3 </td>
                                <td> John Richards </td>
                                <td> Apr 12, 2015 </td>
                                <td>
                                    <div className="progress">
                                    {/* <div className="progress-bar bg-gradient-warning" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div> */}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td> 4 </td>
                                <td> Peter Meggik </td>
                                <td> May 15, 2015 </td>
                                <td>
                                    <div className="progress">
                                    {/* <div className="progress-bar bg-gradient-primary" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> */}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td> 5 </td>
                                <td> Edward </td>
                                <td> May 03, 2015 </td>
                                <td>
                                    <div className="progress">
                                    {/* <div className="progress-bar bg-gradient-danger" role="progressbar" style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div> */}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td> 5 </td>
                                <td> Ronald </td>
                                <td> Jun 05, 2015 </td>
                                <td>
                                    <div className="progress">
                                    {/* <div className="progress-bar bg-gradient-info" role="progressbar" style={{ width: '65%' }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div> */}
                                    {/* <div className="progress-bar bg-gradient-info" role="progressbar" style={{ width: '65%' }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div> */}
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
    
                    {/* inner full of shit */}
                    <div className="col-md-5 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title text-white">Todo</h4>
                        <div className="add-items d-flex">
                            <input type="text" className="form-control todo-list-input" placeholder="What do you need to do today?" />
                            <button className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn" id="add-task">Add</button>
                        </div>
                        {/* innnner full of shit */}
                        <div className="list-wrapper">
                            <ul className="d-flex flex-column-reverse todo-list todo-list-custom">
                            <li>
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" /> Meeting with Alisa </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline"></i>
                            </li>
                            <li className="completed">
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" defaultChecked={true} /> Call John 
                                </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline"></i>
                            </li>
                            <li>
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" /> Create invoice </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline"></i>
                            </li>
                            <li>
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" /> Print Statements </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline"></i>
                            </li>
                            <li className="completed">
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" defaultChecked={true} /> Prepare for presentation </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline"></i>
                            </li>
                            <li>
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input className="checkbox" type="checkbox" /> Pick up kids from school </label>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline"></i>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <footer className="footer">
                <div className="container-fluid d-flex justify-content-between">
                    <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">Copyright © bootstrapdash.com 2021</span>
                    <span className="float-none float-sm-end mt-1 mt-sm-0 text-end"> Free <a href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Bootstrap admin template</a> from Bootstrapdash.com</span>
                </div>
                </footer>
            </div>
            </div>
        </div>
    );
  };
  
  export default Dashboard;