import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname;

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
        <Link>
          <Button gradientDuoTone="purpleToBlue" outline>
            Signin
          </Button>
        </Link>
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
