
'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios';


const Test = () => {

    const [file, setFile] = useState<any>(null);

    const handleFileChange = (e:any) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);

      console.log(formData);
  
      try {
        // const response = await axios.post('http://localhost:3001/upload', formData, {
            const response = await axios.post('http://localhost:5656/api/v1/admin/product/upload', formData, {

        
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
    };
    

    return (
        <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  };
  
  export default Test;