import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../features/feed/feedSlice";

const DEFAULT_AVATAR = "https://i.pravatar.cc/300?img=12";

const UserCard = ({ feed, single = false }) => {
    const dispatch = useDispatch();

    const handleConnectionRequest = async (userId, status) => {
        try {
            await axios.post(
                import.meta.env.VITE_API_BASE_URL +
                    `/request/send/${status}/${userId}`,
                {},
                { withCredentials: true },
            );

            // Remove the user from the feed after sending the request
            const updatedFeed = feed.filter((user) => user._id !== userId);
            dispatch(addFeed(updatedFeed));
        } catch (error) {
            console.error(`Error while sending ${status} request:`, error);
        }
    };
    if (!feed || feed.length === 0) {
        return (
            <div className="text-center text-gray-400 mt-16 text-lg">
                No developers available right now 🚀
            </div>
        );
    }

    return (
        <div
            className={
                single
                    ? "flex justify-center"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10"
            }
        >
            {feed.map((user) => {
                const {
                    _id,
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    skills,
                    about,
                } = user;

                return (
                    <div
                        key={_id}
                        className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
            border border-gray-700 rounded-3xl p-6 shadow-xl 
            hover:shadow-2xl hover:scale-[1.03] transition-all duration-300
            ${single ? "w-full max-w-md" : ""}
          `}
                    >
                        {/* Avatar */}
                        <div className="flex justify-center -mt-16">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-900 shadow-lg">
                                <img
                                    src={photoUrl || DEFAULT_AVATAR}
                                    alt={`${firstName} ${lastName}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center mt-4">
                            {/* Name */}
                            <h2 className="text-xl font-semibold text-white">
                                {firstName} {lastName}
                                {age && (
                                    <span className="text-gray-400 font-normal text-sm">
                                        {" "}
                                        • {age}
                                    </span>
                                )}
                            </h2>

                            {/* Gender */}
                            {gender && (
                                <p className="text-sm text-gray-400 capitalize mt-1">
                                    {gender}
                                </p>
                            )}

                            {/* About */}
                            {about && (
                                <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                                    {about}
                                </p>
                            )}

                            {/* Skills */}
                            {skills && skills.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    {skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="text-xs px-3 py-1 rounded-full 
                      bg-indigo-500/10 text-indigo-400 border border-indigo-500/20
                      hover:bg-indigo-500/20 transition"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() =>
                                    handleConnectionRequest(
                                        _id,
                                        "interested",
                                    )
                                }
                                className="flex-1 py-2 rounded-xl bg-indigo-600 
                hover:bg-indigo-700 text-white font-semibold 
                shadow-md hover:shadow-lg transition cursor-pointer"
                            >
                                ❤️ Interested
                            </button>

                            <button
                                onClick={() =>
                                    handleConnectionRequest(
                                        _id,
                                        "ignored",
                                    )
                                }
                                className="flex-1 py-2 rounded-xl border border-red-500/30 
                text-red-400 hover:bg-red-500/10 transition font-medium cursor-pointer"
                            >
                                ❌ Ignore
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserCard;
