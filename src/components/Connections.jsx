import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from "../features/connection/connectionSlice";

const Connections = () => {

  const dispatch = useDispatch();

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=80";

  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
    //   const apiUrl = import.meta.env.VITE_API_BASE_URL + "/user/connections";
      const res = await axios.get(import.meta.env.VITE_API_BASE_URL + "/user/connections", { withCredentials: true });

      if (res.status === 200) {
        dispatch(addConnections(res.data.data));
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-10 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Connections</h1>
          <p className="text-gray-400">
            You have no connections yet. Start connecting with other developers!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Connections</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const { _id, firstName, lastName, email, photoUrl } = connection;
            return (
              <div key={_id} className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center">
                <img
                  src={photoUrl || DEFAULT_IMAGE}
                  alt={`${firstName} ${lastName}`}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
                <p className="text-gray-400">{email}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;