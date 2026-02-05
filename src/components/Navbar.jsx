import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../features/user/userSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const isLoggedIn = user ? true : false;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const logoutUrl = import.meta.env.VITE_API_BASE_URL + "/logout";

            const res = await axios.post(logoutUrl, {}, { withCredentials: true });

            if (res.status === 200) {
                toast.success('Logged out successfully!');
                // Optionally, you can dispatch an action to clear user data from the Redux store here
                dispatch(removeUser());
                navigate("/");
            } else {
                console.error("Logout failed:", res.statusText);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-bold text-white">
          Dev<span className="text-indigo-500">Tinder</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {isLoggedIn ? (
          <>
            {/* Search */}
            <input
              type="text"
              placeholder="Search developers..."
              className="hidden md:block px-4 py-2 rounded-lg bg-gray-800 text-sm text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
            />

            {/* Avatar Dropdown */}
            <div>
                <span className="text-gray-300 text-sm">Hello, {user.firstName}</span>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700 cursor-pointer">
                
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ul className="py-2 text-sm text-gray-300">
                  <Link to={"/profile"} className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                    Profile
                  </Link>
                  <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                    Settings
                  </li>
                  <li onClick={handleLogout} className="px-4 py-2 hover:bg-red-600/20 text-red-400 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Logged-out Actions */}
            <Link to="/login" className="text-sm text-gray-300 hover:text-white transition">
              Sign In
            </Link>
            <Link to="/signup" className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold transition">
              Sign Up
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
