// // import { useState } from "react";

// // const ImageUpload = () => {
// //   const [image, setImage] = useState(null);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [loading,setLoading]=useState(false)


// //   const handleImageChange=(event)=>{
   
// //     setSelectedFile(event.target.files[0])
// //     }
// //   }
// //   //upload image to backend
  
// //   const uploadImag=async()=>{
// //   if(!selectedFile){
// //     alert("please select file to upload")
// //     return
// //   }
// //   setLoading(true)
// //   const formData=new FormData()
// //   formData.append("file",selectedFile)
// //     try{
// //       const url="http://localhost:3000/api/website/image/upload"
// //       const response=await fetch(url,{
// //         method:"POST",
// //          headers:{
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //          } ,
// //          body:formData
// //       })
// //       const result=await response.json();
// //       if(result.success){
// //         alert("Image uploades successfully")
// //       }
// //       else{
// //         alert("uploads failed"+result.message)
// //       }

// //     }catch(e){
// //         alert(e)
// //         alert("error in uploading the image")


// //     }
// //     finally{
// //       setLoading(false)
// //     }
// //   }

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     // Here you can handle the image upload to the server
// //     console.log("Image uploaded");
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input type="file" accept="image/*" onChange={handleImageChange} />
// //       {image && <img src={image} alt="Preview" width={200} />}
// //       <button type="submit" onClick={uploadImag } disabled={loading}>{

// // loading ? "uploading.....":"uploaded"

// // }</button>
// //     </form>
// //   );
// // };

// // export default ImageUpload;

// import { useState } from "react";

// const ImageUpload = () => {
//   const [image, setImage] = useState(null); // For previewing the image
//   const [selectedFile, setSelectedFile] = useState(null); // For storing the selected file
//   const [loading, setLoading] = useState(false); // For showing loading state

//   // Handle image selection
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setImage(URL.createObjectURL(file)); // Create a preview URL for the image
//     }
//   };

//   // Upload image to backend
//   const uploadImag = async () => {
//     if (!selectedFile) {
//       alert("Please select a file to upload");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const url = "http://localhost:3000/api/website/image/upload";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });

//       const result = await response.json();
//       if (result.success) {
//         alert("Image uploaded successfully");
//       } else {
//         alert("Upload failed: " + result.message);
//       }
//     } catch (e) {
//       console.error("Error uploading the image:", e);
//       alert("Error in uploading the image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     uploadImag(); // Trigger the upload function
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       {image && <img src={image} alt="Preview" width={200} />}
//       <button type="submit" disabled={loading}>
//         {loading ? "Uploading..." : "Upload"}
//       </button>
//     </form>
//   );
// };

// export default ImageUpload;


import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const uploadImag = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile); // Corrected field name to "image"

    try {
      const response = await fetch(
        "http://localhost:3000/api/website/image/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Image uploaded successfully");
      } else {
        alert("Upload failed: " + result.message);
      }
    } catch (e) {
      console.error("Error uploading the image:", e);
      alert("Error in uploading the image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadImag();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Preview" width={200} />}
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default ImageUpload;
