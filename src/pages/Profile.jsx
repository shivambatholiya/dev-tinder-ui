import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80";

const Profile = () => {
    const user = useSelector((state) => state.user);
  if (!user) {
    return <div className="text-gray-400">Loading profile...</div>;
  }

  const {
    firstName,
    lastName,
    email,
    photoUrl,
    age,
    gender,
    skills,
    about,
  } = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img
              src={photoUrl || DEFAULT_IMAGE}
              alt="Profile"
              className="w-full h-80 object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">
              {firstName} {lastName}
              {age && (
                <span className="text-gray-400 font-normal">, {age}</span>
              )}
            </h1>

            {gender && (
              <p className="text-gray-400 capitalize">{gender}</p>
            )}

            <p className="text-gray-400">{email}</p>

            {about && (
              <p className="text-gray-300 mt-4 leading-relaxed">
                {about}
              </p>
            )}

            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Edit Button */}
            <Link
              to={"/edit-profile"}
              className="mt-6 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold transition"
            >
              ✏️ Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
