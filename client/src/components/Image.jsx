
import { useState, useEffect } from "react";
import "./images.css";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3000/api/website/image/get"; // Ensure this matches your backend route
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result.success) {
        setImages(result.data);
      } else {
        console.log("Failed to fetch images:", result.message);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        // Fetch images again to update the list
        fetchProducts();
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
    <>
    <div className="container">
      <div> <h1>Uploaded Images</h1></div>
   

    <div className="card-container" id="images">
        {images.map((image, index) => (
          <div key={index} className="card">
            <img src={image.url} alt="Preview" width={200} />
            <h2 className="card-title">Image {index + 1}</h2>
            <p className="card-description">Uploaded by: {image.uploadedBy}</p>
          </div>
        ))}
      </div>
    </div>
      

      <div className="form">

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" width={200} />}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      </div>

    </>
  );
};

export default ImageUpload;
