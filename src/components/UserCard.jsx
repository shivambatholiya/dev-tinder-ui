import React from "react";

const DEFAULT_AVATAR = "https://i.pravatar.cc/300?img=12";

const UserCard = ({ feed, single = false }) => {
  if (!feed || feed.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-16">
        No developers available right now 🚀
      </div>
    );
  }

  return (
    <div
  className={
    single
      ? "flex justify-center"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
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
  className={`bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden
    ${single ? "w-full max-w-md" : ""}
  `}
>
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
              <img
                src={photoUrl || DEFAULT_AVATAR}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h2 className="mt-4 text-xl font-bold text-white">
              {firstName} {lastName}
              {age && (
                <span className="text-gray-400 font-normal">
                  , {age}
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
                    className="text-xs px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 w-full mt-6">
              <button className="flex-1 py-2 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
                ❌ Ignore
              </button>
              <button className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">
                ❤️ Interested
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
