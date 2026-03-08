
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './imageview.css';

const ImageViwer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(parseInt(id));
  const [deleting, setDeleting] = useState(false);

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/image/get', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.success) {
        setImages(result.data);
      } else {
        console.error('Failed to fetch images:', result.message);
      }
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  // Delete current image
  const deleteImage = async () => {
    const imageToDelete = images[currentImage];
    if (!imageToDelete) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    setDeleting(true);
    try {
     const response = await fetch(
  `http://localhost:3000/image/${imageToDelete._id}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
      const result = await response.json();

      if (result.success) {
        // Remove deleted image from local state
        const updatedImages = images.filter((_, index) => index !== currentImage);
        setImages(updatedImages);

        // Navigate smartly after delete
        if (updatedImages.length === 0) {
          navigate('/home');
        } else if (currentImage >= updatedImages.length) {
          const newIndex = updatedImages.length - 1;
          setCurrentImage(newIndex);
          navigate(`/photo/${newIndex}`);
        } else {
          navigate(`/photo/${currentImage}`);
        }
      } else {
        alert(result.message || 'Failed to delete image');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Server error while deleting');
    } finally {
      setDeleting(false);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) navigate(`/photo/${currentImage - 1}`);
  };

  const nextImage = () => {
    if (currentImage < images.length - 1) navigate(`/photo/${currentImage + 1}`);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    setCurrentImage(parseInt(id));
  }, [id]);

  return (
    <div className="fullscreen-container">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate('/home')}>
        ⬅ Back
      </button>

      {/* Delete Button */}
      <button
        className="delete-btn"
        onClick={deleteImage}
        disabled={deleting || images.length === 0}
      >
        {deleting ? 'Deleting...' : '🗑️ Delete'}
      </button>

      <button className="prev-btn" onClick={prevImage} disabled={currentImage === 0}>
        &#10094;
      </button>

      {images.length > 0 && currentImage >= 0 && currentImage < images.length ? (
        <img
          src={images[currentImage]?.url}
          alt="Full View"
          className="fullscreen-image"
        />
      ) : (
        <p>Loading image...</p>
      )}

      <button
        className="next-btn"
        onClick={nextImage}
        disabled={currentImage === images.length - 1}
      >
        &#10095;
      </button>

    </div>
  );
};

export default ImageViwer;