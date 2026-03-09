import { useState, useEffect } from "react";
import "./images.css";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/image/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      if (result.success) setImages(result.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const uploadImage = async () => {
    if (!selectedFile) { alert("Please select a file to upload"); return; }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await fetch("http://localhost:3000/image/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setImage(null);
        setSelectedFile(null);
        fetchProducts();
      } else {
        alert("Upload failed: " + result.message);
      }
    } catch (e) {
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); uploadImage(); };

  return (
    <>
      {/* ── Image Grid ── */}
      <div className="card-container">
        {images.map((img, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(`/photo/${index}`)}
          >
            <div className="card-img-wrapper">
              <img src={img.url} alt={`Image ${index + 1}`} />
              <div className="card-overlay">
                <span className="card-overlay-icon">🔍</span>
              </div>
              <div className="card-index">#{index + 1}</div>
            </div>
            <div className="card-body">
              <h2 className="card-title">Image {index + 1}</h2>
              <p className="card-description">
                <span className="card-id-dot" />
                {img.uploadedBy}
              </p>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🌿</div>
            <p>No images yet. Upload your first one below!</p>
          </div>
        )}
      </div>

      {/* ── Upload Form ── */}
      <div className="upload-section">
        <div className="upload-section-header">
          <h3>Upload New Image</h3>
          <p>Drag & drop or click to select a file</p>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <label
            className={`drop-zone ${dragOver ? "drag-active" : ""} ${image ? "has-preview" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="preview-wrapper">
                <img src={image} alt="Preview" className="preview-img" />
                <div className="preview-overlay">
                  <span>Click to change</span>
                </div>
              </div>
            ) : (
              <div className="drop-zone-content">
                <div className="drop-icon">☁️</div>
                <span className="drop-text">Drop image here</span>
                <span className="drop-sub">or click to browse</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input-hidden"
            />
          </label>

          <button
            type="submit"
            disabled={loading || !selectedFile}
            className={`upload-btn ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <><span className="spinner" /> Uploading...</>
            ) : (
              <><span>⬆</span> Upload Image</>
            )}
          </button>
        </form>
      </div>

      {/* ── Lightbox ── */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close">✕</button>
          <img src={selectedImage} alt="Full view" className="lightbox-img" />
        </div>
      )}
    </>
  );
};

export default ImageUpload;