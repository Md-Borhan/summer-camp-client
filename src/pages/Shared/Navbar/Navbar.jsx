import { useState } from "react";
import { stack as Menu } from "react-burger-menu";
import openMenu from "../../../assets/icons/menu.png";
import closeMenu from "../../../assets/icons/close.png";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import avatar from "../../../assets/icons/user.png";
import logo from "../../../assets/icons/logo.png";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();

  const [darkMode, setDarkMode] = useState(false);
  const handleMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    auth
      ?.logOut()
      .then(() => {
        toast.success("Logout Success!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="fixed z-10 w-full">
      <div
        className={`navbar px-4 md:px-8 flex shadow-md h-full w-full ${
          darkMode ? "dark" : ""
        } bg-[#1f234088] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-dotted border-2 text-white border-[#571ce09f]`}
      >
        <div className="navbar-start">
          <Link to="/" className="hidden lg:block">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul tabIndex={0} className="flex gap-6 menu-horizontal">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/instructor"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Instructors
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/classes"
              >
                All Classes
              </NavLink>
            </li>
            {auth?.user && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <div
            onClick={() => handleMode(setDarkMode(!darkMode))}
            className="mr-5"
          >
            {darkMode ? (
              <li className="list-none">
                <MdOutlineDarkMode size={24} />
              </li>
            ) : (
              <li className="list-none">
                <MdOutlineLightMode size={24} />
              </li>
            )}
          </div>
          <div className="mr-5">
            {auth?.user ? (
              <li className="list-none" onClick={handleLogout}>
                <Link to="/">Logout</Link>
              </li>
            ) : (
              <li className="list-none">
                <Link to="/login">Login</Link>
              </li>
            )}
          </div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-[#571ce0] shadow-blue-100 shadow">
              {auth?.user ? (
                <img
                  title={auth?.user?.displayName}
                  src={auth?.user?.photoURL}
                />
              ) : (
                <img title={auth?.user?.displayName} src={avatar} />
              )}
            </div>
          </label>
        </div>
      </div>
      {/* Humburger Menu */}
      <div
        className="lg:hidden responsiveMenu
      "
      >
        <Menu
          width={280}
          disableAutoFocus
          customBurgerIcon={<HiBars3 className="text-white" />}
          customCrossIcon={<HiXMark className="text-white" />}
          onStateChange={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="text-white ml-4 mt-4">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <ul tabIndex={0} className="mt-6 flex flex-col gap-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/instructor"
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  Instructors
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to="/classes"
                >
                  All Classes
                </NavLink>
              </li>
              {auth?.user && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active" : "inactive"
                    }
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
