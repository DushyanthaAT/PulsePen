import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser?.ProfilePicture || null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData,setFormData]=useState({});
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploadError(null);
    if (!imageFile) return;

    try {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${imageFile.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL);
          setFormData({...formData, ProfilePicture:downloadURL});
        }
      );
    } catch (error) {
      setImageFileUploadError('Unexpected error occurred during upload.');
      setImageFile(null);
      setImageFileUrl(null);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(Object.key(formData).length ===0){
      return;
    }
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full h-screen">
      <h1 className="my-7 text-center font-semibold text-3xl dark:text-white">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
           {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(140, 198, 63, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}  
          <img
            src={imageFileUrl || currentUser.ProfilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-lightgray ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}onChange={handleChange}
        />
        <TextInput type="password" id="password" placeholder="Password" onChange={handleChange}/>
        <Button type="submit" color="dark" className="dark:bg-slate-400">
          Update
        </Button>
        {imageFileUploadProgress && (
          <div className="text-center mt-2">
            Upload Progress: {imageFileUploadProgress}%
          </div>
        )}
        {imageFileUploadError && (
          <div className="text-red-500 text-center mt-2">
            {imageFileUploadError}
          </div>
        )}
        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
