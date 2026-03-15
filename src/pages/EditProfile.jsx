import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/user/userSlice";
import axios from "axios";
import ProfilePreviewCard from "../components/ProfilePreviewCard";
import toast from "react-hot-toast";

/* ---------- Profile Preview Card (local to this page) ---------- */

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=80";

/* ------------------------- Edit Profile Page ------------------------- */

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const [profileImage, setProfileImage] = useState(null);

    const dispatch = useDispatch();
    const [skillsInput, setSkillsInput] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        about: "",
        photoUrl: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                age: user.age || "",
                gender: user.gender || "",
                about: user.about || "",
                skills: user.skills || [],
                photoUrl: user.photoUrl || "",
            });

            setSkillsInput((user.skills || []).join(", "));
        }
    }, [user]);

    /* ---------------- Handlers ---------------- */

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillsChange = (e) => {
        setSkillsInput(e.target.value);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProfileImage(file);

        setFormData({
            ...formData,
            photoUrl: URL.createObjectURL(file),
        });
    };

    const handleSave = async () => {
        try {
            const payload = new FormData();
            payload.append("firstName", formData.firstName);
            payload.append("lastName", formData.lastName);
            payload.append("age", formData.age);
            payload.append("gender", formData.gender);
            payload.append("about", formData.about);

            skillsInput
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .forEach((skill) => {
                    payload.append("skills[]", skill);
                });

            if (profileImage) {
                payload.append("photo", profileImage);
            }

            const res = await axios.patch(
                import.meta.env.VITE_API_BASE_URL + "/profile/edit",
                payload,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            if (res.status === 200) {
                console.log("Updated user from backend:", res.data.data);
                dispatch(addUser(res?.data?.data));
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error saving profile:", error.response?.data);
        }
    };

    /* ---------------- UI ---------------- */

    return !user ? (
        <div className="min-h-screen flex items-center justify-center text-gray-400">
            Loading profile...
        </div>
    ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-8 py-10 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* LEFT: PROFILE PREVIEW (50%) */}
                <ProfilePreviewCard user={formData} />

                {/* RIGHT: EDIT FORM (50%) */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-7 space-y-6">
                    <h2 className="text-2xl font-bold">Edit Profile</h2>

                    {/* Profile Photo */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Profile Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="text-sm text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:bg-indigo-600 file:text-white
                                hover:file:bg-indigo-700 cursor-pointer"
                        />
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="input-field"
                        />
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="input-field"
                        />
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                            className="input-field"
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">
                                Prefer not to say
                            </option>
                        </select>
                    </div>

                    {/* About */}
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Write a short bio about yourself"
                        className="input-field resize-none"
                    />

                    {/* Skills */}
                    <input
                        value={skillsInput}
                        onChange={handleSkillsChange}
                        placeholder="Skills (React, Node, MongoDB)"
                        className="input-field"
                    />

                    {/* Save */}
                    <button
                        onClick={handleSave}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold transition cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
