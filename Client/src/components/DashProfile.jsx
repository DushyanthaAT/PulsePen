import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput, Modal } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess,updateFailure, deleteUserStart,deleteUserSuccess,deleteUserFailure, signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import { HiSwitchHorizontal } from "react-icons/hi";

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(
    currentUser?.profilePicture || null
  );
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModel, setShowModal] = useState(false);
  const [showModel2, setShowModal2] = useState(false);
  const [showModel3, setShowModal3] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
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
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            "Could not upload image (File must be less than 2MB)"
          );
          setImageFileUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
        }
      );
    } catch (error) {
      setImageFileUploadError("Unexpected error occurred during upload.");
      setImageFile(null);
      setImageFileUrl(null);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes Made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "Delete",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleSwitchToAdmin = async () => {
  //   try {
  //     dispatch(updateStart());
  //     const res = await fetch(`/api/user/update-admin/${currentUser._id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ isAdmin: !currentUser.isAdmin }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       dispatch(updateFailure(data.message));
  //     } else {
  //       dispatch(updateSuccess(data));
  //     }
  //   } catch (error) {
  //     dispatch(updateFailure(error.message));
  //   }
  // };

  const handleSwitchToAdmin = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    setShowModal3(false);
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update-admin/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !currentUser.isAdmin }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message);
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
                  width: "100%",
                  height: "100%",
                  position: "absolute",
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
            className={`rounded-full w-full h-full object-cover border-8 border-lightgray ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          color="dark"
          className="dark:bg-slate-400"
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update"}
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
        <div className=" flex flex-col mb-5 items-center gap-3">
          <span
            onClick={() => setShowModal(true)}
            className="cursor-pointer font-medium text-red-500"
          >
            Delete Account
          </span>
          <span
            onClick={() => setShowModal2(true)}
            className="cursor-pointer text-gray-800 font-medium dark:text-gray-200"
          >
            Sign Out
          </span>
        </div>
        {currentUser.isAdmin && (
          <div className="flex flex-col gap-3 items-center bg-primary-light p-5 rounded-xl">
            <span>
              Ready to share? Click here to start your next blog entry.
            </span>
            <Link to={"/create-post"}>
              <Button type="button" className="rounded-full" color="light">
                <LuPencilLine className="h-6 w-6 mr-3" />
                Create a Post
              </Button>
            </Link>
          </div>
        )}
        {!currentUser.isAdmin && (
          <div className="flex flex-col gap-3 items-center bg-primary-light p-5 rounded-xl text-center font-semibold">
            <span>
              Ready to share your thoughts? Switch to Writer Mode by clicking
              Start and begin crafting your articles!
            </span>
            <Button
              type="button"
              className="rounded-full flex justify-center items-center"
              color="light"
              onClick={() => setShowModal3(true)}
            >
              <LuPencilLine className="h-5 w-5 mr-3" />
              Start
            </Button>
          </div>
        )}
      </form>
      {updateUserSuccess && (
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

      <Modal
        show={showModel}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationTriangle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-md text-gray-500 dark:text-gray-300">
              Are you sure you want to delete your account?{" "}
            </h3>
            <div className="flex justify-center gap-6">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModel2}
        onClose={() => setShowModal2(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationTriangle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-md text-gray-500 dark:text-gray-300">
              Are you sure you want to do Signout?
            </h3>
            <div className="flex justify-center gap-6">
              <Button color="failure" onClick={handleSignout}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal2(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModel3}
        onClose={() => setShowModal3(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-left flex flex-col">
            <HiSwitchHorizontal className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-2 mx-auto" />
            <h1 className="text-primary text-lg font-bold self-center flex">
              Switch to Writer Account
            </h1>
            <div className="items-start w-full">
              <span className="text-sm font-semibold block text-justify leading-normal mb-2 mt-3">
                &#8226; Are you passionate about sharing your thoughts,
                expertise, or stories with others? Switching to a Writer Account
                will allow you to contribute articles and become an active voice
                in our blogging community.
                <br />
              </span>
              <span className="text-sm font-semibold block text-justify leading-normal">
                &#8226; As a writer, you'll be able to:
              </span>
              <ul className="text-sm mt-1 mb-5">
                <li className="ml-2">
                  &#10687; Create and publish your own articles.
                </li>
                <li className="ml-2">
                  &#10687; Manage, edit, and delete your content anytime.
                </li>
                <li className="ml-2">
                  &#10687; Engage with readers and receive feedback.
                </li>
              </ul>
            </div>
            <Button
              color="dark"
              className="bg-primary enabled:hover:bg-primary-dark"
              onClick={handleSwitchToAdmin}
            >
              Switch
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
