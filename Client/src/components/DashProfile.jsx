import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput, Modal } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess,updateFailure, deleteUserStart,deleteUserSuccess,deleteUserFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const DashProfile = () => {
  const { currentUser,error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser?.profilePicture || null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading]=useState(false);
  const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
  const [updateUserError,setUpdateUserError]=useState(null);
  const [showModel,setShowModal]=useState(false);
  const [formData,setFormData]=useState({});
  const filePickerRef = useRef();
  const dispatch=useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
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
          setImageFileUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture:downloadURL});
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
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
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length ===0){
      setUpdateUserError('No Changes Made');
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image upload')
      return;

    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully!")
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message);
    }
  };
  const handleDeleteUser=async()=>{
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,
        {method:"Delete",}
      );
      const data=await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }else{
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
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
          onClick={() => filePickerRef.current?.click()} 
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
            src={imageFileUrl || currentUser.profilePicture}
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
          <span onClick={()=>setShowModal(true)} className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </form>
      {updateUserSuccess &&(
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      
      <Modal show={showModel} onClose={()=>setShowModal(false)} popup size="md">
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationTriangle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
              <h3 className="mb-5 text-md text-gray-500 dark:text-gray-300">Are you sure you want to delete your account? </h3>
              <div className="flex justify-center gap-6"> 
                <Button color="failure" onClick={handleDeleteUser}>Yes, I am sure</Button>
                <Button color="gray" onClick={()=>setShowModal(false)}>No, cancel</Button>
              </div>
            </div>

          </Modal.Body>

      </Modal>
    </div>
  );
};

export default DashProfile;
