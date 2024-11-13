import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch=useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            onClick={() => navigate("/dashboard?tab=profile")}
            as="div"
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
