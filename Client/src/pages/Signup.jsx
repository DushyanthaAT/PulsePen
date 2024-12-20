import { React, useState } from "react";
import bg from "../assets/bg.jpg";
import logo from "../assets/DarkLogo.png";
import {
  Flowbite,
  Label,
  TextInput,
  Button,
  Alert,
  Spinner,
} from "flowbite-react";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { FaArrowRight } from "react-icons/fa";

const customTheme = {
  button: {
    gradientDuoTone: {
      greenToBlue:
        "bg-gradient-to-br from-[#8cc63f] to-[#9add42] text-white focus:ring-4 focus:ring-green-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-green-800",
    },
  },
};

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Track text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage("User is already existing");
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex h-[calc(100vh-40px)] bg-white  dark:bg-gray-900  dark:text-white m-5 p-3 rounded-[30px] flex-col md:flex-row overflow-y-auto">
        {/* Left Side */}
        <div className="flex-[3] md:flex-[4] lg:flex-[3] flex flex-col items-center justify-center rounded-[20px] overflow-hidden">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <img
            src={logo}
            alt="Logo"
            className="absolute w-[50vw] h-[auto] md:w-[30vw] mb-5"
          />
        </div>

        {/* Right Side */}
        <div className="flex-[4] md:flex-[4] lg:flex-[4] flex flex-col md:p-10 px-3 justify-start md:justify-center items-center">
          <h2 className="text-primary text-[2rem] md:text-[2.5rem] font-bold">
            Sign Up
          </h2>
          <form className="w-[100%] lg:w-[50%]" onSubmit={handleSubmit}>
            <div>
              <Label
                value="Username"
                className="text-secondary-light text-[1rem]"
              />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                icon={() => <IoPersonOutline className="w-4 text-[#9f9f9f]" />}
                required
                style={{
                  borderColor: "#e6e7eb",
                  color: "#000000",
                  background: "#f9fafb",
                }}
                className="w-[100%] mb-2"
              />

              <Label
                value="Email"
                className="text-secondary-light text-[1rem]"
              />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                icon={() => <IoMailOutline className="w-5 text-[#9f9f9f]" />}
                required
                style={{
                  borderColor: "#e6e7eb",
                  color: "#000000",
                  background: "#f9fafb",
                }}
                className="w-[100%] mb-2"
              />

              <Label
                value="Password"
                className="text-secondary-light text-[1rem]"
              />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                icon={() => (
                  <IoLockClosedOutline className="w-4 text-[#9f9f9f]" />
                )}
                required
                style={{
                  borderColor: "#e6e7eb",
                  color: "#000000",
                  background: "#f9fafb",
                }}
                className="w-[100%] mb-4"
              />
              <Button
                gradientDuoTone="greenToBlue"
                type="submit"
                className="w-[100%] mb-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <OAuth />
            </div>
          </form>
          <div className="">
            <span className="text-secondary  dark:text-white ">
              Have an account?
            </span>
            <Link to="/sign-in" className="text-primary font-semibold ml-1">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>
          )}
          <Link
            to="/"
            className="mt-5 text-sm flex justify-center items-center"
          >
            <span className="text-gray-700 dark:text-gray-200">
              Continue Without Signing In
            </span>
            <div className="">
              <FaArrowRight className="h-full ml-2 text-gray-700 dark:text-gray-200" />
            </div>
          </Link>
        </div>
      </div>
    </Flowbite>
  );
};

export default Signup;
