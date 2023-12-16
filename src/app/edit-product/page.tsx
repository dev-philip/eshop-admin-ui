'use client'
import "/public/assets/vendors/mdi/css/materialdesignicons.min.css";
import "/public/assets/vendors/css/vendor.bundle.base.css";
import "/public/assets/css/style.css";
import "/public/assets/css/appstyle.css";
import "/public/assets/images/favicon.ico";

import React, { useEffect, useState } from "react";
import {isJwtTokenExpired, logout, getJwtTokenData, getJwtToken } from "../../utils/auth";
import { useRouter } from "next/navigation";

// redux files
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser, logoutWithRedux } from "../../store/useSlice/userSlice";

//component
import Footer from "../../components/footer/footer";
import Header from "@/components/header/header";
import SideBar from "@/components/sidebar/sidebar";
import axios from "axios";
import Category from "../category/page";
import toss from "@/utils/alert";
import Swal from 'sweetalert2'



const editProduct = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const user = useSelector(selectUser);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

      const [selectedFileNames, setSelectedFileNames] = useState({
        primaryImage: '',
        addToCartImage: '',
        hoverImage: '',
      });

      const [file, setFile] = useState<any>(null);

      const [primaryImage, setPrimaryImage] = useState<any>("");
      const [addToCartImage, setAddToCartImage] = useState<any>("");
      const [hoverImage, setHoverImage] = useState<any>("");


      const handleFileChangePrimaryImage = (event:any, imageType:any) => {
            const fileInput = event.target;
            if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Check if the file type is an image
            if (file.type.startsWith('image/')) {
                setPrimaryImage(file);
            } else {
                // Reset the file input and display an error (you can customize this part)
                fileInput.value = '';
                alert('Please select a valid image file.');
            }
            } else {
                setPrimaryImage("");
            }
      }

      const handleFileChangeAddToCartImage = (event:any, imageType:any) => {

        const fileInput = event.target;
            if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Check if the file type is an image
            if (file.type.startsWith('image/')) {
                setAddToCartImage(file);
            } else {
                // Reset the file input and display an error (you can customize this part)
                fileInput.value = '';
                alert('Please select a valid image file.');
            }
            } else {
                setAddToCartImage("");
            }
        
      }

      const handleFileChangeHoverImage = (event:any, imageType:any) => {
        const fileInput = event.target;
            if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Check if the file type is an image
            if (file.type.startsWith('image/')) {
                setHoverImage(file);
            } else {
                // Reset the file input and display an error (you can customize this part)
                fileInput.value = '';
                alert('Please select a valid image file.');
            }
            } else {
                setHoverImage("");
            }
      }
      
//   const handleFileChange = (event:any, imageType:any) => {
//     const fileInput = event.target;
//     if (fileInput.files.length > 0) {
//       const file = fileInput.files[0];

//       setFile(file);

//       // Check if the file type is an image
//       if (file.type.startsWith('image/')) {
//         setSelectedFileNames({
//           ...selectedFileNames,
//           [imageType]: file,
//         });
//       } else {
//         // Reset the file input and display an error (you can customize this part)
//         fileInput.value = '';
//         alert('Please select a valid image file.');
//       }
//     } else {
//       setSelectedFileNames({
//         ...selectedFileNames,
//         [imageType]: '',
//       });
//     }
//   };

  const handleFileUpload = (imageType:any) => {
    const fileInput = document.getElementById(`fileInput-${imageType}`);
    if (fileInput) {
      fileInput.click();
    }
  };


  const [formData, setFormData] = useState({
    // Initialize your form data state
    productName: "",
    productPrice: "",
    productCount: "",
    discountPrice: "",
    productCategory: "",
    productSize: "",
    productCurrency: "",
    productLabel: "",
    productDescription: "",

  });

  const onChangeHandler = (event:any) => {
    // Update the form data state as the user types
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const onSubmitHandler = async (event:any) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const finalFormData = new FormData();

    // Append product info fields to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
        finalFormData.append(key, value);
      });

      finalFormData.append('file1', primaryImage);
      finalFormData.append('file2', addToCartImage);
      finalFormData.append('file3', hoverImage);

 

    // Do something with the form data, for example, send it to a server
    console.log('Form data submitted:', finalFormData);

  

    if(finalFormData.get("productCategory") === ""){
        toss.error("Product category is required");
        return;
    }

    if(finalFormData.get("productName") === ""){
        toss.error("Product name is required");
        return;
    }

    if(finalFormData.get("productPrice") === ""){
        toss.error("Product Price is required");
        return;
    }

    if(isNaN(Number(finalFormData.get("productPrice")))){
        toss.error("Product Price needs to be a number");
        return;
    }

    if(finalFormData.get("productDescription") === ""){
        toss.error("Product description is required");
        return;
    }

    const productDescriptionEntry = finalFormData.get("productDescription");

    if (typeof productDescriptionEntry === 'string') {
        const productDescription = productDescriptionEntry;

        if (productDescription.length <= 10 || productDescription.length >= 250) {
            toss.error("Description: Should be between 10 and 250 characters.");
            return
        } 

    }


    if(finalFormData.get("productCount") === ""){
        toss.error("Product Count is required");
        return;
    }

    if(isNaN(Number(finalFormData.get("productCount")))){
        toss.error("Product count needs to be a number");
        return;
    }


  
    if(finalFormData.get("discountPrice") !== ""){
        if(isNaN(Number(finalFormData.get("discountPrice")))){
            toss.error("Discount price needs to be a number");
            return;
        }
    }


    
    

    if(finalFormData.get("productSize") === ""){
        toss.error("Product size is required");
        return;
    }

    if(finalFormData.get("productCurrency") === ""){
        toss.error("Product currency is required");
        return;
    }

    // if(finalFormData.get("productLabel") === ""){
    //     toss.error("Product label is required");
    //     return;
    // }

   

    if(finalFormData.get("file1") === ""){
        toss.error("Primary Image is required");
        return;
    }

    if(finalFormData.get("file2") === ""){
        toss.error("Add to Cart Image is required");
        return;
    }

    if(finalFormData.get("file3") === ""){
        toss.error("Hover Image is required");
        return;
    }


    const baseUrl = process.env.NEXT_API_URL_ADMIN;
    if(!baseUrl){ return; }


    try {
        setIsLoading(true);
        const response = await axios.post(baseUrl + "/admin/product/upload", finalFormData, {
          headers: {
            'Authorization': `Bearer ${getJwtToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        
        if(response.data){
            console.log(response.data);
            if(response.data.status === false){
                toss.error(response.data.message);
            }else{
                toss.success("Product created successfully");
            }
        }else{
            toss.error("Error creating product...");  
        }

        
       
      } catch (error:any) {
        console.error('Error uploading files:', error.message);
        toss.error("Error creating product");
      }finally {
        // Set loading back to false after the action completes
        setIsLoading(false);
    }


    // You can also perform additional actions or validations here

    // Reset the form after submission if needed
    // setFormData({
    //   productName: '',
    //   password: '',
    // });
  };
    

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
                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                            </span> 
                            Create a Product
                        </h3>
                    </div>

                    {/* starts here */}
                    <>
                    <form className="forms-sample" onSubmit={onSubmitHandler}>
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Select a Product Category</h4>
                                    <div className="form-group">
                                        <div className="col">
                                            <select name="productCategory" value={formData.productCategory} onChange={onChangeHandler} className="form-control">
                                                {isDataLoading ? (<option value="">  Loading categories... </option>) : (<option value="">  Select a Category </option>)}
                                                
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.category_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                            </div>
                            </div>
                        </div>
                        
                        

                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Build a product</h4>
                                <p className="card-description"> Showcase your amazing products to your customer </p>
                                
                                <div className="form-group">
                                    <label htmlFor="productName">Product Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="productName" 
                                        placeholder="Product Name" 

                                        name="productName"
                                        value={formData.productName}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productPrice">Product Price</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="productPrice" 
                                        placeholder="Product Price" 

                                        name="productPrice"
                                        value={formData.productPrice}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productDescription">Product Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="productDescription"
                                        name="productDescription"
                                        value={formData.productDescription}
                                        onChange={onChangeHandler}
                                     />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productCount">Product Count</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="productCount" 
                                        placeholder="Product Count" 

                                        name="productCount"
                                        value={formData.productCount}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="discountPrice">Discount Price </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="discountPrice" 
                                        placeholder="Product Price"

                                        name="discountPrice"
                                        value={formData.discountPrice}
                                        onChange={onChangeHandler}
                                     />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productSize">Size</label>
                                    <select name="productSize" value={formData.productSize} onChange={onChangeHandler} className="form-control" id="productSize">
                                        <option value="">Select a Size</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productCurrency">Currency</label>
                                    <select name="productCurrency" value={formData.productCurrency} onChange={onChangeHandler} className="form-control" id="productCurrency">
                                        <option value="">select a Currency</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productLabel">Label Product</label>
                                    <select name="productLabel" value={formData.productLabel} onChange={onChangeHandler} className="form-control" id="productLabel">
                                        <option value="">select a Label</option>
                                        <option value="HOT">HOT</option>
                                        <option value="NEW">NEW</option>
                                    </select>
                                </div>

                                {/* First Image */}
                                    <div className="form-group">
                                        <label>Primary Image Upload</label>
                                        <input
                                        id="fileInput-primaryImage"
                                        type="file"
                                        name="img[]"
                                        className="file-upload-default"
                                        style={{ display: 'none' }}
                                        onChange={(event) => handleFileChangePrimaryImage(event, 'primaryImage')}
                                        />
                                        <div className="input-group col-xs-12">
                                        <input
                                            type="text"
                                            className="form-control file-upload-info"
                                            disabled
                                            placeholder="Upload Image"
                                            value={primaryImage.name}
                                        />
                                        <span className="input-group-append">
                                            <button
                                            className="file-upload-browse btn btn-gradient-primary"
                                            type="button"
                                            onClick={() => handleFileUpload('primaryImage')}
                                            >
                                            Upload
                                            </button>
                                        </span>
                                        </div>
                                    </div>
                                    {/* end of first Image */}

                                    {/* Second Image */}
                                    <div className="form-group">
                                        <label>Add to cart Image Upload</label>
                                        <input
                                        id="fileInput-addToCartImage"
                                        type="file"
                                        name="img[]"
                                        className="file-upload-default"
                                        style={{ display: 'none' }}
                                        onChange={(event) => handleFileChangeAddToCartImage(event, 'addToCartImage')}
                                        />
                                        <div className="input-group col-xs-12">
                                        <input
                                            type="text"
                                            className="form-control file-upload-info"
                                            disabled
                                            placeholder="Upload Image"
                                            value={addToCartImage.name}
                                        />
                                        <span className="input-group-append">
                                            <button
                                            className="file-upload-browse btn btn-gradient-primary"
                                            type="button"
                                            onClick={() => handleFileUpload('addToCartImage')}
                                            >
                                            Upload
                                            </button>
                                        </span>
                                        </div>
                                    </div>
                                    {/* end of second Image */}

                                    {/* Third Image */}
                                    <div className="form-group">
                                        <label>Hover Image Upload</label>
                                        <input
                                        id="fileInput-hoverImage"
                                        type="file"
                                        name="img[]"
                                        className="file-upload-default"
                                        style={{ display: 'none' }}
                                        onChange={(event) => handleFileChangeHoverImage(event, 'hoverImage')}
                                        />
                                        <div className="input-group col-xs-12">
                                        <input
                                            type="text"
                                            className="form-control file-upload-info"
                                            disabled
                                            placeholder="Upload Image"
                                            value={hoverImage.name}
                                        />
                                        <span className="input-group-append">
                                            <button
                                            className="file-upload-browse btn btn-gradient-primary"
                                            type="button"
                                            onClick={() => handleFileUpload('hoverImage')}
                                            >
                                            Upload
                                            </button>
                                        </span>
                                        </div>
                                    </div>
                                    {/* end of third Image */}
                            

                                <button type="submit" className="btn btn-gradient-primary me-2">
                                    {isLoading ? (
                                          <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '24px' }}></i>
                                          ) : (
                                          'Submit'
                                          )
                                    }
                                </button>
                            
                            </div>
                            </div>
                        </div>

                        {/* ends here */}
                    </form>
                    </>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
  };
  
  export default editProduct;