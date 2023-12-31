import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineBars, AiOutlineClose, AiTwotoneHome } from "react-icons/ai";
import { useAuth } from "../../hooks/useAuth";
import { FaHistory, FaShoppingBag } from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
import { RiStore3Fill } from "react-icons/ri";
import {
  MdAssignmentAdd,
  MdManageAccounts,
  MdOutlineManageHistory,
} from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../loader/Loader";

const Sidebar = () => {
  const auth = useAuth();
  const [isActive, setActive] = useState(false);
  const location = useLocation();

  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users", auth?.user?.email],
    enabled: !!auth?.user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${auth?.user?.email}`);
      return res.data;
    },
  });

  const handleToggle = () => {
    setActive(!isActive);
  };

  const isLinkActive = (pathname) => {
    return location.pathname === pathname ? "text-white bg-[#1F2340]" : "";
  };

  return (
    <>
      <div className="bg-[#1F2340] text-white overflow-hidden flex justify-between md:hidden">
        {auth?.loading && <Loader />}
        <div>
          <div className="block cursor-pointer p-4 font-bold"></div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button z-50 absolute top-0 right-0 p-4 focus:outline-none focus:bg-[#571ce0c5]"
        >
          {isActive ? (
            <AiOutlineBars className="h-5 w-5" />
          ) : (
            <AiOutlineClose className="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#322a71] w-72 space-y-6 px-2 py-4  absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="flex flex-col  items-center mt-6 -mx-2">
              {auth?.loading && <Loader />}
              <Link to="/dashboard">
                <img
                  className="object-cover w-24 h-24 border-[#571ce057] shadow-blue-100 shadow border-2  mx-2 rounded-full"
                  src={auth?.user?.photoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <Link to="/dashboard">
                <h4 className="mx-2 mt-2 font-medium text-white  hover:underline">
                  {auth?.user?.displayName}
                </h4>
              </Link>
              <Link to="/dashboard">
                <p className="mx-2 mt-1 text-sm font-medium text-white  hover:underline">
                  {auth?.user?.email}
                </p>
              </Link>
              <div className="mt-3">
                {users.role === "admin" && (
                  <p className="text-2xl text-green-500 font-semibold ">
                    Admin Dashboard
                  </p>
                )}
                {users.role === "instructor" && (
                  <p className="text-2xl text-green-500 font-semibold ">
                    Instructor Dashboard
                  </p>
                )}
                {users.role === "student" && (
                  <p className="text-2xl text-green-500 font-semibold ">
                    Student Dashboard
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {users?.role === "admin" && (
          <div>
            <hr className="border-[#571ce0]" />
            <Link
              to="/dashboard/manageUsers"
              className={`flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-[#1F2340] transition-colors duration-300 transform ${isLinkActive(
                "/dashboard/manageUsers"
              )}`}
            >
              <MdManageAccounts className="w-5 h-5" />
              <span className="mx-4 font-medium">Manage Users</span>
            </Link>
            <Link
              to="/dashboard/manageClasses"
              className={`flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-[#1F2340] transition-colors duration-300 transform ${isLinkActive(
                "/dashboard/manageClasses"
              )}`}
            >
              <MdOutlineManageHistory className="w-5 h-5" />
              <span className="mx-4 font-medium">Manage Classes</span>
            </Link>
          </div>
        )}

        {users?.role === "instructor" && (
          <div>
            <hr className="border-[#571ce0]" />
            <Link
              to="/dashboard/addClass"
              className={`flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-[#1F2340] transition-colors duration-300 transform ${isLinkActive(
                "/dashboard/addClass"
              )}`}
            >
              <MdAssignmentAdd className="w-5 h-5" />
              <span className="mx-4 font-medium">Add a Class</span>
            </Link>
            <Link
              to="/dashboard/myClass"
              className={`flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-[#1F2340] transition-colors duration-300 transform ${isLinkActive(
                "/dashboard/myClass"
              )}`}
            >
              <GiClassicalKnowledge className="w-5 h-5" />
              <span className="mx-4 font-medium">My Classes</span>
            </Link>
          </div>
        )}

        {users?.role === "student" && (
          <div>
            <hr className="border-[#571ce0]" />
            <Link
              to="/dashboard/mySelectedClass"
              className={`flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-[#1F2340] transition-colors duration-300 transform ${isLinkActive(
                "/dashboard/mySelectedClass"
              )}`}
            >
              <FaShoppingBag className="w-5 h-5" />
              <span className="mx-4 font-medium">My Selected Classes</span>
            </Link>
            <Link
              to="/dashboard/myEnrolledClass"
              className={`flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-[#1F2340] transition-colors duration-300 transform ${isLinkActive(
                "/dashboard/myEnrolledClass"
              )}`}
            >
              <RiStore3Fill className="w-5 h-5" />
              <span className="mx-4 font-medium">My Enrolled Classes</span>
            </Link>
            <Link
              to="/dashboard/paymentHistory"
              className={`flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-[#1F2340] transition-colors duration-300 transform ${isLinkActive(
                "/dashboard/paymentHistory"
              )}`}
            >
              <FaHistory className="w-5 h-5" />
              <span className="mx-4 font-medium">Payment History</span>
            </Link>
          </div>
        )}

        <div>
          <hr className="border-[#571ce0]" />
          <Link
            to="/"
            className={`flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-[#1F2340] transition-colors duration-300 transform ${isLinkActive(
              "/"
            )}`}
          >
            <AiTwotoneHome className="w-5 h-5" />
            <span className="mx-4 font-medium">Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
