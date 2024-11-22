import React, { useEffect, useState } from "react";
import { Sidebar, Modal, Button } from "flowbite-react";
import { HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiUserCircle } from "react-icons/hi";
import { HiAnnotation } from "react-icons/hi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [showModel2, setShowModal2] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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
  return (
    <div>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUserCircle}
              label={
                currentUser.isSuperAdmin
                  ? "Super Admin"
                  : currentUser.isAdmin
                  ? "Admin"
                  : "User"
              }
              labelColor="dark"
              onClick={() => navigate("/dashboard?tab=profile")}
              as="div"
            >
              Profile
            </Sidebar.Item>
            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  as="div"
                >
                  Post
                </Sidebar.Item>
              </Link>
            )}

            {currentUser.isSuperAdmin && (
              <>
                <Link to="/dashboard?tab=dash">
                  <Sidebar.Item
                    active={tab === "dash" || !tab}
                    icon={TbLayoutDashboardFilled}
                    as="div"
                  >
                    Dashboard
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=comments">
                  <Sidebar.Item
                    active={tab === "comments"}
                    icon={HiAnnotation}
                    as="div"
                  >
                    Comments
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=users">
                  <Sidebar.Item
                    active={tab === "users"}
                    icon={HiMiniUserGroup}
                    as="div"
                  >
                    Users
                  </Sidebar.Item>
                </Link>
              </>
            )}

            <Sidebar.Item
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={() => setShowModal2(true)}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
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
    </div>
  );
};

export default DashSidebar;
