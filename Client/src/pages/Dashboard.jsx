import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { DashPosts } from "../components/DashPosts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParms = new URLSearchParams(location.search);
    const tabFromUrl = urlParms.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900">
      <div className="md:w-56">
        {/* sideNav */}
        <DashSidebar />
      </div>
      {/* RightSide */}
      {tab === "profile" && <DashProfile />}
      {/* post */}
      {tab === "posts" && <DashPosts />}
    </div>
  );
};

export default Dashboard;
