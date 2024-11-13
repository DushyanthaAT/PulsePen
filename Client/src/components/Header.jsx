import React from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import DarkLogo from "../assets/DarkLogo.png";
import LightLogo from "../assets/LightLogo.png";

import { CiSearch } from "react-icons/ci";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const theme = useSelector((state) => state.theme.theme);
  const logo = theme === "dark" ? LightLogo : DarkLogo;
  const icon = theme === "dark" ? <FaSun /> : <FaMoon />;

  const handleSignout=async ()=>{
    try {
      const res=await fetch ('/api/user/signout',{
        method:'POST',
      });
      const data=await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Navbar className="border-b-2">
      {/* Logo Section */}
      <Link to="/" className="self-center whitespace-nowrap w-20">
        <img src={logo} alt="logo" />
      </Link>

      {/* Search Section */}
      <form className="hidden lg:inline">
        <TextInput type="text" placeholder="Search.." rightIcon={CiSearch} />
      </form>

      {/* Right-aligned Links and Toggle Button */}
      <div className="flex items-center gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {icon}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={currentUser.username}
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="blovk text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Signin
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      {/* Collapsible Menu */}
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
