import "./index.css";
import { Button, Typography } from "@mui/material";

import { photoStore } from "../../store/photoStore";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";

function PostPage() {
  const navigate = useNavigate();
  const { authUser } = authStore();
  const { setUploadFile, previewURL, uploadPhoto } = photoStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadFile(file);
  };

  return (
    <div className="post-page-wrapper">
      <div className="file-upload-container">
        <div className="file-upload">
          <input
            type="file"
            id="fileInput"
            className="file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label className="file-label" htmlFor="fileInput">
            <i className="upload-icon">📁</i>
            <p>Drag & Drop your files here or click to upload</p>
          </label>
          {previewURL && (
            <div className="preview-section">
              <Typography variant="subtitle1">Preview:</Typography>
              <img src={previewURL} alt="Preview" className="preview-image" />
            </div>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            uploadPhoto();
            navigate(`/photos/${authUser._id}`);
          }}
          sx={{ mt: 2, width: "100%" }}
        >
          Upload Photo
        </Button>
      </div>
    </div>
  );
}

export default PostPage;
