import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './imageview.css';

const ImageViwer = () => {
  const { id } = useParams(); // Get the image ID from the URL
  const navigate = useNavigate();
  const [images, setImages] = useState([]); // Store all images
  const [currentImage, setCurrentImage] = useState(parseInt(id)); // Current image index

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/website/image/get', {
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

  const prevImage = () => {
    if (currentImage > 0) navigate(`/photo/${currentImage - 1}`); // Corrected path
  };

  const nextImage = () => {
    if (currentImage < images.length - 1) navigate(`/photo/${currentImage + 1}`); // Corrected path
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Update `currentImage` when `id` changes
  useEffect(() => {
    setCurrentImage(parseInt(id));
  }, [id]);

  return (
    <div className="fullscreen-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate('/home')}>
        ⬅ Back
      </button>
      <button className="prev-btn" onClick={prevImage} disabled={currentImage === 0}>
        &#10094;
      </button>
      {/* Display the current image */}
      {images.length > 0 && currentImage >= 0 && currentImage < images.length ? (
        <img src={images[currentImage]?.url} alt="Full View" className="fullscreen-image" />
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
