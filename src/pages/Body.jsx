import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../features/user/userSlice'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store) => store.user);

    // Use a ref to track if the request has already been sent
    const hasFetched = React.useRef(false);

    const fetchUser = async () => {
        if (hasFetched.current) return; // Prevent multiple requests
        hasFetched.current = true;
        try {
            const res = await axios.get(import.meta.env.VITE_API_BASE_URL + "/profile/view", { withCredentials: true });
            if (res.status === 200) {
                dispatch(addUser(res.data.data));
            } else {
                console.error("Failed to fetch user data:", res.statusText);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // User is not authenticated
                toast.error("Please log in to continue.");
                navigate("/login");
            }
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Body
