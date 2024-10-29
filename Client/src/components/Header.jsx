import React from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navbar className="border-b-2">
      {/* Logo Section */}
      <Link to="/" className="self-center whitespace-nowrap w-20">
        <img src={Logo} alt="logo" />
      </Link>

      {/* Search Section */}
      <form className="hidden lg:inline">
        <TextInput type="text" placeholder="Search.." rightIcon={CiSearch} />
      </form>

      {/* Right-aligned Links and Toggle Button */}
      <div className="flex items-center gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={currentUser.username}
                img={currentUser.ProfilePicture}
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
            <Dropdown.Item>Sign Out</Dropdown.Item>
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
