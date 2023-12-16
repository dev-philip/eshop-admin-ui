'use client'
import "/public/assets/vendors/mdi/css/materialdesignicons.min.css";
import "/public/assets/vendors/css/vendor.bundle.base.css";
import "/public/assets/css/style.css";
import "/public/assets/css/appstyle.css";
import "/public/assets/images/favicon.ico";

import React, { useEffect, useState } from "react";
import {isJwtTokenExpired, logout, getJwtTokenData, getJwtToken } from "../../utils/auth";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

// redux files
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser, logoutWithRedux } from "../../store/useSlice/userSlice";

//component
import Footer from "../../components/footer/footer";
import Header from "@/components/header/header";
import SideBar from "@/components/sidebar/sidebar";
import toss from "@/utils/alert";
import axios from "axios";


const Product = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const user = useSelector(selectUser);
    const [products, setProducts] = useState<any[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    // const user = useSelector((state: RootState) => state.user.user);

    const baseUrl = process.env.NEXT_API_BASE_URL || "http://localhost:3000" ;
    const baseUrlEshopApp = process.env.NEXT_API_URL_ESHOP_APP || "http://localhost:8080/api/v1";
    const adminUrl =  process.env.NEXT_API_BASE_URL_ADMIN || "http://localhost:5656";
    if(!baseUrl || !baseUrlEshopApp || !adminUrl){
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

            getProduct();
        }
    }, []);

    const getProduct = async() => {
        try {
            setIsDataLoading(true);
            // const response = await axios.get(baseUrlEshopApp + "/products");
            const response = await axios.get("http://localhost:8000/api/v1/products");
           
            console.log(response.data);
            if(response.data){
                setProducts(response.data);
                setIsDataLoading(false);
            }else{
                toss.error("Error getting category data on page load");
            }
        } catch (error) {
            setIsDataLoading(false);
            console.error('Error getting category data on page load:', error);
            alert('Error getting category data on page load');
        }
      }

      const finalDeleteProduct = async (product: any) => {
        const headers = {
            'Authorization': `Bearer ${getJwtToken()}`,
            'Content-Type': 'application/json',  // Adjust the content type based on your API requirements
          };

          const data = {
            id : product.id,
            primaryImage : product.defaultImg,
            cartImage: product.addToCartImg,
            hoverImage: product.hoverImg,
          }

        
        try {
            // const response = await axios.get(baseUrlEshopApp + "/products");
            const response = await axios.post(`http://localhost:5656/api/v1/admin/delete/product`, data ,{ headers});
           
            console.log(response.data);
          
            // location.reload();
            if(response.data){
                setProducts(response.data);
                setIsDataLoading(false);
                  getProduct();
            }else{
                toss.error("Error getting category data on page load");
            }
        } catch (error) {
            console.error('Error getting category data on page load:', error);
            alert('Error getting category data on page load');
        } finally{
            // setIsDataLoading(false);
        }

      }

    const deleteProduct =  (product: any) => {
        Swal.fire({
            icon: "info",
            title: "Do you want to make this change?",
            showCancelButton: true,
            confirmButtonText: "Confirm",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                finalDeleteProduct(product);
                Swal.fire("Deleted!", "", "success");
            } 
          });   

    }

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
                                <i className="fa fa-product-hunt" aria-hidden="true"></i>
                            </span> 
                            Products
                        </h3>
                    </div>


                    {/* body */}
                    <div className="container">
                        <div className="row">
                        {isDataLoading ? (
                        // Show a loading indicator while data is being fetched
                        <p>Loading...</p>
                      ): products.length === 0 ? (
                        // Display a message when there are no products available
                        <p>No products available</p>
                      ) : (
                        products.map(product => (
                            <div className="col">
                                 <div key={product.id} className="card" style={{ width: "18rem"}}>
                                <img className="card-img-top" style={{ height: "200px"}} src={adminUrl + "/"+product.defaultImg} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">{product.productDescription}</p>
                                    <button className="btn btn-primary" title="Edit">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </button>
                                    <span style={{ marginLeft: "5px" }}></span>
                                    <button onClick={() => deleteProduct(product)} className="btn btn-danger" title="Delete">
                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                                </div>
                            </div>
                           
                        ))
                      )
                    
                    }
                            
                        </div>

                    
                    </div>
                    {/* end of body */}
                    
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
  };
  
  export default Product;