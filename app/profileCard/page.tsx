"use client";

import { useState } from "react";
import axios from "axios";

interface ProfileManagementProps {
  email?: string;
}

const ProfileCard: React.FC<ProfileManagementProps> = ({ email }) => {
  const [profilePic, setProfilePic] = useState<string | File | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profileEmail, setProfileEmail] = useState<string>(email || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleProfileUpdate = async () => {
    // Validate inputs
    const newErrors: { [key: string]: string } = {};
    if (!profileEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format.";
    }
    if (!firstName || !lastName) {
      newErrors.name = "First name and last name are required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("/api/update-profile", {
        profilePic,
        firstName,
        lastName,
        email: profileEmail,
      });
    } catch (error) {
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-lg font-semibold">Profile Management</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <input
          type="file"
          onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 border-gray-300"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 border-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={profileEmail}
          onChange={(e) => setProfileEmail(e.target.value)}
          className="mt-1 border-gray-300"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>
      <button
        onClick={handleProfileUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfileCard;
