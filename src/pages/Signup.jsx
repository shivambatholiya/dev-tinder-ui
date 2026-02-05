import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        skills: "",
        about: "",
        age: "",
        gender: "",
        photo: null, // file object
    });

    const isStepOneValid =
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.password;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const signupUrl = import.meta.env.VITE_API_BASE_URL + "/signup";

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const payload = new FormData();

            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    payload.append(key, formData[key]);
                }
            });

            const response = await fetch(signupUrl, {
                method: "POST",
                body: payload, // NO headers here
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Signup successful:", data);
                navigate("/");
            } else {
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
            <div className="w-full max-w-lg bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Join <span className="text-indigo-500">DevTinder</span>
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {step === 1
                            ? "Create your account"
                            : "Tell us about yourself"}
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex justify-center gap-2 mb-8">
                    <div
                        className={`h-2 w-10 rounded-full ${step === 1 ? "bg-indigo-500" : "bg-gray-700"}`}
                    />
                    <div
                        className={`h-2 w-10 rounded-full ${step === 2 ? "bg-indigo-500" : "bg-gray-700"}`}
                    />
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="firstName"
                                type="text"
                                placeholder="First Name *"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 outline-none"
                            />
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name *"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 outline-none"
                            />
                        </div>

                        <input
                            name="email"
                            type="email"
                            placeholder="Email address *"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 outline-none"
                        />

                        <input
                            name="password"
                            type="password"
                            placeholder="Password *"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 outline-none"
                        />

                        <button
                            disabled={!isStepOneValid}
                            onClick={() => setStep(2)}
                            className={`w-full py-3 rounded-lg font-semibold transition
                ${
                    isStepOneValid
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }
              `}
                        >
                            Next →
                        </button>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="space-y-5">
                        {/* Skills */}
                        <input
                            name="skills"
                            type="text"
                            placeholder="Skills (React, Node, MongoDB)"
                            value={formData.skills}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 outline-none"
                        />

                        {/* About */}
                        <textarea
                            name="about"
                            rows="3"
                            placeholder="What do you like to build?"
                            value={formData.about}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 outline-none resize-none"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Age */}
                            <input
                                name="age"
                                type="number"
                                min="13"
                                max="100"
                                placeholder="Age (optional)"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 outline-none"
                            />

                            {/* Gender */}
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 outline-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer_not_to_say">
                                    Prefer not to say
                                </option>
                            </select>
                        </div>

                        {/* Profile Photo */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Profile Photo (optional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        photo: e.target.files[0],
                                    })
                                }
                                className="block w-full text-sm text-gray-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-600 file:text-white
          hover:file:bg-indigo-700"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="w-full py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
                            >
                                Back
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold transition"
                            >
                                Finish
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-400 hover:underline cursor-pointer">
                            Skip for now
                        </p>
                    </div>
                )}

                {/* Footer */}
                <p className="text-center text-gray-400 text-sm mt-6">
                    Already have an account?{" "}
                    <span className="text-indigo-500 hover:underline cursor-pointer">
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
