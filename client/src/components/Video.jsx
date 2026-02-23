// import { useState } from "react";

// const VideoUpload = () => {
//   const [video, setVideo] = useState(null);

//   const handleVideoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideo(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Here you can handle the video upload to the server
//     console.log("Video uploaded");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" accept="video/*" onChange={handleVideoChange} />
//       {video && <video src={video} controls width={300} />}
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default VideoUpload;
