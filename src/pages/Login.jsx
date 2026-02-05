import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../features/user/userSlice";

const Login = () => {
    const [loginData, setLoginData] = React.useState({
        emailId: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            const loginUrl = import.meta.env.VITE_API_BASE_URL + "/login";

            const response = await axios.post(loginUrl, loginData, { withCredentials: true });

            if (response.status === 200) {
                const data = response.data;
                console.log("Login successful:", data);

                // Dispatch action to update user state in Redux store
                dispatch(addUser(data.data));

                navigate("/");
            } else {
                console.error("Login failed:", response.statusText);
            }
            
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
                {/* Login Card */}
                <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 p-8">
                    {/* Brand */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Dev<span className="text-indigo-500">Tinder</span>
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Where developers match & build together
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={(e) => handleLogin(e)}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="you@developer.com"
                                value={loginData.emailId}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, emailId: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, password: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg shadow-indigo-600/20"
                        >
                            Login
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-gray-400 text-sm mt-6">
                        New to DevTinder?{" "}
                        <span className="text-indigo-500 hover:underline cursor-pointer">
                            Create an account
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
