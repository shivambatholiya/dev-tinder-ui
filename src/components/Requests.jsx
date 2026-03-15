import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../features/request/requestSlice';
import axios from 'axios';

const Requests = () => {

    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const fetchConnectionRequests = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_BASE_URL + "/user/requests/received", { withCredentials: true });

            console.log("API response for connection requests:", res.data.data);

            if (res.status === 200) {
                console.log("Connection requests data:", res.data.data);
                dispatch(addRequests(res.data.data));
            } else {
                console.error("Failed to fetch connection requests:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching connection requests:", error);
        }
    };

    useEffect(() => {
        fetchConnectionRequests();
    }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Connection Requests</h1>
        {requests.length === 0 ? (
          <p className="text-gray-400">You have no pending connection requests.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => {
                    const { _id, firstName, lastName, email } = request.fromUserId;
                    return (
                        <div key={_id} className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center">
                            <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
                            <p className="text-gray-400">{email}</p>
                        </div>
                    );
                })}

            </div>
        )}
      </div>
    </div>
  )
}

export default Requests
