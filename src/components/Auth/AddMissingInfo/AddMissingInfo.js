import React, { useState } from "react";
import { auth, db, storage } from "../../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import "./AddMissingInfo.css";
import { useNavigate } from "react-router-dom";

const AddMissingInfo = () => {
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInput = React.createRef();
  const navigate = useNavigate();

  // tranform profile pic
  const handleImageMouseEnter = (event) => {
    event.target.style.transform = "scale(1.1)";
  };

  const handleImageMouseLeave = (event) => {
    event.target.style.transform = "scale(1)";
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please choose a file first!");
      return;
    }

    const storageRef = ref(storage, `/files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          db.collection("users")
            .doc(user.uid)
            .update({ profilePicURL: url })
            .then(() => {
              navigate("/home");
            });
        });
      }
    );
  };

  return (
    <div className="add-missing-info__outer-wrapper">
      <h1 className="add-missing-info__header">upload a profile picture.</h1>
      <img
        src={imageUrl || "https://via.placeholder.com/200x200"}
        style={{
          borderRadius: "50%",
          border: "solid 8px #FFFFFF",
          width: "200px",
          height: "200px",
          objectFit: "cover",
          cursor: "pointer",
        }}
        onMouseEnter={handleImageMouseEnter}
        onMouseLeave={handleImageMouseLeave}
        onClick={() => fileInput.current.click()}
      />
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <br />
      <div>{imageUrl ? <progress value={progress} max="100" /> : null}</div>
    </div>
  );
};

export default AddMissingInfo;
