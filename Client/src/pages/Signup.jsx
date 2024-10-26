import React from "react";
import bg from "../assets/bg.jpg";
import logo from "../assets/LOGO.png";
import { Flowbite, Label, TextInput, Button } from "flowbite-react";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const customTheme = {
  // Removed type annotation
  button: {
    gradientDuoTone: {
      greenToBlue:
        "bg-gradient-to-br from-[#8cc63f] to-[#9add42] text-white focus:ring-4 focus:ring-green-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-green-800",
    },
  },
};

const Signup = () => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex h-[calc(100vh-40px)] bg-white m-5 p-3 rounded-[30px] flex-col md:flex-row overflow-y-auto">
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
          <form className="w-[100%] lg:w-[50%]">
            <div>
              <Label
                value="Username"
                className="text-secondary-light text-[1rem]"
              />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
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
                type="email" // Changed type to email for proper validation
                placeholder="Email"
                id="email" // Changed id to email
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
                type="password" // Changed type to password for security
                placeholder="Password"
                id="password" // Kept id as password (correct)
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
              >
                Sign Up
              </Button>
            </div>
          </form>
          <div className="">
            <span className="text-secondary">Have an Account? </span>
            <Link to="/sign-in" className="text-primary font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </Flowbite>
  );
};

export default Signup;
