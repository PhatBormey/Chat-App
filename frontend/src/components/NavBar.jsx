import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/live.png";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Profiler } from "react";
import { Home, LogOut, Settings, User } from "lucide-react";
import HomePage from "../pages/HomePage";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <div>
      <div className="navbar shadow-sm">
        <div className="navbar-start">
          <div className="dropdown dropdown-start">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={authUser?.profilePic || "/avatar.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-30 p-2 shadow"
            >
              {authUser ? (
                <>
                  <li>
                    <Link to="/" className="justify-between">
                      Home
                      <span>
                        <Home className="size-4 text-base-content/40" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span>
                        <User className="size-4 text-base-content/40" />
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/setting" className="justify-between">
                      Settings
                      <span>
                        <Settings className="size-4 text-base-content/40" />
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link onClick={logout} className="justify-between">
                      Logout
                      <span>
                        <LogOut className="size-4 text-base-content/40" />
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/setting" className="justify-between">
                      Settings
                      <span>
                        <Settings className="size-4 text-base-content/40" />
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="font-bold">Homepage</a>
              </li>
              <li>
                <a className="font-bold">Portfolio</a>
              </li>
              <li>
                <a className="font-bold">Setting</a>
              </li>
              <li>
                <a className="font-bold">About</a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="navbar-center">
          <a className="text-2xl font-bold">LIVE</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />{" "}
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />{" "}
              </svg>
              <span className="badge badge-xs badge-primary indicator-item bg-red-600 ">
                3
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
