import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";

const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div>
            <Link to="/" className="self-center whitespace-nowrap w-20">
              <img src={Logo} alt="logo" className="w-20 mt-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About " />
              <Footer.LinkGroup col>
                <Footer.Link href="/about">About</Footer.Link>
                <Footer.Link href="/Mission">Mission</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Support " />
              <Footer.LinkGroup col>
                <Footer.Link href="/contact">Contact</Footer.Link>
                <Footer.Link href="/contact">FAQ's</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/contact">Privacy Policy</Footer.Link>
                <Footer.Link href="/contact">Copyright Notice</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />

        <div className="flex w-full justify-center">
          <Footer.Copyright
            href="#"
            by="Dushyantha Thilakarathne"
            year={new Date().getFullYear()}
          ></Footer.Copyright>
        </div>

        <div className="flex gap-10 w-full items-center justify-center mt-5">
          <Footer.Icon href="#" icon={CiFacebook} />
          <Footer.Icon href="#" icon={CiInstagram} />
          <Footer.Icon href="#" icon={RiTwitterXFill} />
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
