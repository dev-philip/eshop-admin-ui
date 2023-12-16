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

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import toss from "@/utils/alert";
import { Category } from "../../types/category";



const validationSchema = Yup.object({
    product_category: Yup.string()
        .required('Product Category is required')
        .matches(/^[a-zA-Z0-9-_& ]+$/, 'Product Category can only contain alphabets, numbers, -, _, and &'),
});

const Category = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isAdded, setIsAdded] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editedCategory, setEditedCategory] = useState<string>("");
    const [trackWhatToEdit, setTrackWhatToEdit] = useState<Category>();
    const user = useSelector(selectUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [rowClassName, setRowClassName] = useState('');
    const [isDataLoading, setIsDataLoading] = useState(true);
    // const user = useSelector((state: RootState) => state.user.user);

    const baseUrlToHome = process.env.NEXT_API_BASE_URL || "http://localhost:3000";
    const baseUrl = process.env.NEXT_API_URL_ADMIN;
    if(!baseUrlToHome || !baseUrl){
        console.log("ENV not loaded! - Dashboard Page");
        return;
    }

    useEffect(() => {
        if(isJwtTokenExpired()){ //if expired
            history.pushState(null, "", '/'); 
            window.location.href = baseUrlToHome
            return;
        }else{
            const userLoggedIn = getJwtTokenData()
            dispatch(setUser(userLoggedIn.username));
        }
        getProductCategory();
    }, []);


    //Add category
    const formik = useFormik({
        initialValues: {
            product_category: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            // Handle form submission
            try {
                // Set loading to true to show the spinner
                setIsLoading(true);
                const headers = {
                    'Authorization': `Bearer ${getJwtToken()}`,
                    'Content-Type': 'application/json',  // Adjust the content type based on your API requirements
                  };

                const response = await axios.post(baseUrl + "/admin/add/category", values, { headers });
                // console.log(response.data);
                if(response.data.status === true){
                    getProductCategory();
                    toss.success(response.data.message);
                    // setIsAdded(false);

                    setRowClassName("animate__animated animate__fadeInUp");
                     setTimeout(() => {
                        setRowClassName("");
                    }, 2500);
                }else{
                    // setIsAdded(true);
                    // setResponseMessage(response.data.message);
                    toss.error(response.data.message);
                    // setTimeout(() => {
                    //     setResponseMessage("");
                    // }, 2500);
                }
            
               
            } catch (error) {
                console.error('Error during form submission:', error);
                alert('Error submitting form');
            } finally {
                // Set loading back to false after the action completes
                setIsLoading(false);
                resetForm();
            }
        },
      });

      //FOR EDIT CATEGORY
      useEffect(() => {
        formikEdit.setValues({
            ...formikEdit.values,
            product_category: editedCategory,
        });
    }, [editedCategory]);

      const formikEdit = useFormik({
        initialValues: {
            product_category: editedCategory,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const dataValues = {
                
                product_category : values.product_category,
                categoryId: trackWhatToEdit?.id
            }
            // Handle form submission
            try {
                // Set loading to true to show the spinner
                setIsLoading(true);
                const headers = {
                    'Authorization': `Bearer ${getJwtToken()}`,
                    'Content-Type': 'application/json',  // Adjust the content type based on your API requirements
                  };

                const response = await axios.put(baseUrl + "/admin/edit/category", dataValues, {headers});

                if(response.data.status === true){
                    getProductCategory();
                    toss.success(response.data.message);
                    // setIsAdded(false);

                    setRowClassName("animate__animated animate__fadeInUp");
                     setTimeout(() => {
                        setRowClassName("");
                    }, 2500);
                }else{
                    // setIsAdded(true);
                    toss.error(response.data.message);
                }
            
               
            } catch (error) {
                console.error('Error during Edit form submission:', error);
                alert('Error during Edit form submission:');
            } finally {
                // Set loading back to false after the action completes
                setIsLoading(false);
            }
        },
      });

      const getProductCategory = async() => {
        try {
            const response = await axios.get(baseUrl + "/admin/category/all");
            // console.log(response.data);
            if(response.data){
                setCategories(response.data);
                setIsDataLoading(false);
            }else{
                toss.error("Error getting category data on page load");
            }
        } catch (error) {
            console.error('Error getting category data on page load:', error);
            alert('Error getting category data on page load');
        } 
      }

      const deleteCategoryNow = async (categoryId:string) => {
        try {
            setIsDeleting(true); // Set loading state to true

            const headers = {
                'Authorization': `Bearer ${getJwtToken()}`,
                'Content-Type': 'application/json',  // Adjust the content type based on your API requirements
              };
            
            const response = await axios.delete(baseUrl + `/admin/delete/category/${categoryId}`, {headers});

            if(response.data){
                getProductCategory();
                toss.success("Category deleted successfully");

                // setRowClassName("animate__animated animate__fadeInUp");
                //  setTimeout(() => {
                //     setRowClassName("");
                // }, 2500);
            }else{
                toss.error("Error getting category data on page load");
            }

        } catch (error) {
            console.error('Error deleting category:', error);
            // Handle error as needed
        } finally {
            setIsDeleting(false); // Reset loading state regardless of success or failure
        }

      }
      
    const deleteCategory = (categoryId:string) => {
        Swal.fire({
            icon: "info",
            title: "Do you want to make this change?",
            showCancelButton: true,
            confirmButtonText: "Confirm",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteCategoryNow(categoryId);
                Swal.fire("Deleted!", "", "success");
            } 
          });   
           
    }

    const editCategory = (category:Category): void => {
        setIsEdit(true);
        setTrackWhatToEdit(category);
        setEditedCategory(category.category_name);
    }


    return (
        <div className="container-scroller">
           <Header />
            
            <div className="container-fluid page-body-wrapper">
                <SideBar />
        
                <div className="main-panel animate__animated animate__fadeIn">
                    <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="fa fa-user-o"></i>
                            </span> 
                            Product Categories
                        </h3>
                    </div>


                    {/* body */}
                    
                    {/* add category */}
                    {isEdit === false && (
                        <div className="col-12 grid-margin stretch-card animate__animated animate__fadeInUp">
                        <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add Categories</h4>
                            <div className={isAdded ? ("inputErrorAdmin") : ("inputSuccessAdmin")}>
                                {formik.touched.product_category && formik.errors.product_category}
                                {responseMessage}
                            </div>
                            <form className="form-inline" onSubmit={formik.handleSubmit}>
                                <div className="input-group mb-2 mr-sm-2">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fa fa-product-hunt" style={{color: "black"}} aria-hidden="true"></i>
                                    </div>
                                    </div>
                                    
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="product_category"
                                        name="product_category"  
                                        placeholder="Enter category" 
                                        value={formik.values.product_category} 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                <button type="submit" className="btn btn-gradient-primary mb-2">
                                    {isLoading ? (
                                        <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '24px' }}></i>
                                        ) : (
                                        'Add'
                                        )
                                    }
                                </button>
                            </form>
                        </div>
                        </div>
                    </div>
                    )}
                    

                    {/* Edit category */}
                    {isEdit === true && (
                          <div className="col-12 grid-margin stretch-card animate__animated animate__fadeInUp">
                          <div className="card">
                          <div className="card-body">
                              <h4 className="card-title">Edit Categories</h4>
                              <div className={isAdded ? ("inputErrorAdmin") : ("inputSuccessAdmin")}>
                                  {formikEdit.touched.product_category && formikEdit.errors.product_category}
                                  {responseMessage}
                              </div>
                              <form className="form-inline" onSubmit={formikEdit.handleSubmit}>
                                  <div className="input-group mb-2 mr-sm-2">
                                      <div className="input-group-prepend">
                                      <div className="input-group-text">
                                          <i className="fa fa-product-hunt" style={{color: "black"}} aria-hidden="true"></i>
                                      </div>
                                      </div>
                                      
                                      <input 
                                          type="text" 
                                          className="form-control" 
                                          id="product_category"
                                          name="product_category"  
                                          placeholder="Enter category" 
                                          value={formikEdit.values.product_category} 
                                          onChange={formikEdit.handleChange}
                                          onBlur={formikEdit.handleBlur}
                                      />
                                  </div>
  
                                  <button type="submit" className="btn btn-gradient-primary mb-2">
                                      {isLoading ? (
                                          <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '24px' }}></i>
                                          ) : (
                                          'Edit'
                                          )
                                      }
                                  </button>
                                  <button type="button" onClick={() => {setIsEdit(!isEdit);}} className="btn btn-gradient-danger mx-xxl-1 mb-2">
                                    Cancel
                                  </button>
                              </form>
                          </div>
                          </div>
                      </div>
                    )}
                  


                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Eshop Categories</h4>
                            {/* <p className="card-description">
                                 Add class <code>.table</code>
                            </p> */}
                            <table className="table table-hover">
                            <thead>
                                <tr>
                                <th>Id</th>   
                                <th>Product Name</th>
                                <th>Last Updated</th>
                                <th>Created</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isDataLoading ? (
                                    // Show loading state when data is not available yet
                                    <tr>
                                        <td><i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '24px' }}></i> Loading...</td>
                                    </tr>
                                ) : (
                                    categories.map((category: Category, index:number) => {
                                        return (
                                            <tr key={category.id} className={rowClassName}>
                                                <td>{index +1}</td>
                                                <td>{category.category_name}</td>
                                                <td>{new Date(category.last_updated).toLocaleString()}</td>
                                                <td>{new Date(category.date_created).toLocaleString()}</td>
                                                <td>
                                                    <label onClick={() => deleteCategory(category.id)} className="badge badge-danger mouse-cursor round-border" title="Delete"> 
                                                    {isDeleting ? (
                                                        <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                                                    ) : (
                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    )}
                                                    </label>
                                                    <label onClick={() => editCategory(category)} className="badge badge-info mx-xxl-1 mouse-cursor round-border" title="Edit">
                                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                                    </label>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
  };
  
  export default Category;