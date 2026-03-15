import React from "react";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=80";

const ProfilePreviewCard = ({ user }) => {
  if (!user) return null;

  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    skills = [],
    photoUrl,
  } = user;

  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
      
      {/* IMAGE (balanced size) */}
      <div className="relative h-[320px]">
        <img
          src={photoUrl || DEFAULT_IMAGE}
          alt="Profile"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* NAME */}
        <div className="absolute bottom-0 p-5">
          <h1 className="text-2xl font-bold text-white">
            {firstName || "Your"} {lastName || "Name"}
            {age && (
              <span className="text-gray-300 font-normal">
                , {age}
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-300 mt-1 capitalize">
            {gender || "Not specified"}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">
        <p className={`text-sm ${about ? "text-gray-300" : "text-gray-500 italic"}`}>
          {about || "Add a short bio to make your profile stand out."}
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-600/30"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500 italic">
              Add skills to get better matches
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePreviewCard;
