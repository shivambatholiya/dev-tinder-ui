import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DEFAULT_IMAGE } from "../utils/constants";
import { addSentRequests } from "../features/request/sentRequestSlice";

const SentRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.sentRequests);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // ✅ Fetch Sent Requests
  const fetchSentRequests = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/request/sent",
        { withCredentials: true }
      );

      dispatch(addSentRequests(res.data.data || []));
    } catch (error) {
      console.error("Error fetching sent requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel Request
  const cancelRequest = async (requestId) => {
    try {
      setActionLoading(requestId);

      await axios.delete(
        import.meta.env.VITE_API_BASE_URL + `/request/cancel/${requestId}`,
        { withCredentials: true }
      );

      // remove from UI
      const updated = requests.filter((req) => req._id !== requestId);
      dispatch(addSentRequests(updated));

    } catch (error) {
      console.error("Error cancelling request:", error);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchSentRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-2">Sent Requests</h1>
        <p className="text-gray-400 mb-6">
          People you’ve shown interest in 👇
        </p>

        {/* 🔄 Loading State */}
        {loading ? (
          <p className="text-gray-400">Loading your requests...</p>
        ) : requests.length === 0 ? (
          
          /* ❌ Empty State */
          <div className="text-center mt-10">
            <p className="text-xl text-gray-300">
              You haven’t sent any requests yet.
            </p>
            <p className="text-gray-500 mt-2">
              Start exploring and connect with developers 🚀
            </p>
          </div>

        ) : (
          
          /* ✅ Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => {
              const { _id, firstName, lastName, profilePicture } =
                request.toUserId;

              return (
                <div
                  key={request._id}
                  className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center hover:scale-105 transition"
                >
                  <img
                    src={profilePicture || DEFAULT_IMAGE}
                    alt={`${firstName} ${lastName}`}
                    className="w-24 h-24 object-cover rounded-full mb-4"
                  />

                  <h2 className="text-xl font-semibold">
                    {firstName} {lastName}
                  </h2>

                  {/* Status */}
                  <p className="text-yellow-400 mt-2 mb-3">
                    Pending ⏳
                  </p>

                  {/* Cancel Button */}
                  <button
                    onClick={() => cancelRequest(request._id)}
                    disabled={actionLoading === request._id}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 cursor-pointer"
                  >
                    {actionLoading === request._id
                      ? "Cancelling..."
                      : "Cancel Request"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SentRequests;