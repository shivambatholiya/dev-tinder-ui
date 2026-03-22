import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../features/request/requestSlice';
import axios from 'axios';
import { DEFAULT_IMAGE } from '../utils/constants';

const Requests = () => {

    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const fetchConnectionRequests = async () => {
        try {
            const res = await axios.get(
                import.meta.env.VITE_API_BASE_URL + "/user/requests/received",
                { withCredentials: true }
            );

            if (res.status === 200) {
                dispatch(addRequests(res.data.data));
            }
        } catch (error) {
            console.error("Error fetching connection requests:", error);
        }
    };

    // ✅ Handle Accept / Reject
    const handleRequest = async (requestId, status) => {
        try {
            await axios.post(
                import.meta.env.VITE_API_BASE_URL + `/request/review/${status}/${requestId}`,
                {},
                { withCredentials: true }
            );

            // remove from UI after action
            const updatedRequests = requests.filter(
                (req) => req._id !== requestId
            );
            dispatch(addRequests(updatedRequests));
        } catch (error) {
            console.error(`Error while ${status} request:`, error);
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
                    <p className="text-gray-400">
                        You have no pending connection requests.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.map((request) => {
                            const { _id, firstName, lastName, email } = request.fromUserId;

                            return (
                                <div
                                    key={request._id}
                                    className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center"
                                >
                                    <img
                                        src={request.fromUserId.photoUrl || DEFAULT_IMAGE}
                                        alt={`${firstName} ${lastName}`}
                                        className="w-24 h-24 object-cover rounded-full mb-4"
                                    />

                                    <h2 className="text-xl font-semibold">
                                        {firstName} {lastName}
                                    </h2>
                                    <p className="text-gray-400 mb-4">{email}</p>

                                    {/* ✅ Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleRequest(request._id, "accepted")}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                                        >
                                            Accept
                                        </button>

                                        <button
                                            onClick={() => handleRequest(request._id, "rejected")}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requests;