"use client";

import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../app/context/appcontext";

export const Profile: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppContextProvider");

  const {
    email,
    name,
    mobilenumber,
    state,
    district,
    soiltype,
    farmSize, // ✅ added
    setToken,
    setDistrict,
    setEmail,
    setMobilenumber,
    setSoiltype,
    setState,
    setName,
    setFarmSize, // ✅ added
    userId,
  } = context;

  const [formData, setFormData] = useState({
    email,
    password: "********",
    name,
    mobilenumber,
    state,
    district,
    soiltype,
    farmSize,// ✅ initialize farmSize
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setName("");
    setEmail("");
    setMobilenumber("");
    setState("");
    setDistrict("");
    setSoiltype("");
    setFarmSize(null); // ✅ clear farmSize
    window.location.href = "/login";
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
       console.log("userId",userId);
       console.log("email",email);
      const res = await axios.put(
        `https://kisaan-portal-backend.onrender.com/api/user/${userId}`,
        {
          name: formData.name,
          email: formData.email,
          mobilenumber: formData.mobilenumber,
          state: formData.state,
          district: formData.district,
          soiltype: formData.soiltype,
          farmSize: formData.farmSize, // ✅ send farmSize
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updated = res.data.user;
      setName(updated.name);
      setEmail(updated.email);
      setMobilenumber(updated.mobilenumber);
      setState(updated.state);
      setDistrict(updated.district);
      setSoiltype(updated.soiltype);
      setFarmSize(updated.farmSize); // ✅ update context

      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      alert("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl">
        {/* Left column */}
        <div className="bg-green-500 flex flex-col items-center justify-center p-10 w-full lg:w-1/3 text-center">
          {name ? (
            <div className="w-32 h-32 rounded-full bg-green-700 flex items-center justify-center text-white text-5xl font-bold mb-4">
              {name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img src="/default-avatar.png" alt="Profile" className="w-32 h-32 rounded-full mb-4" />
          )}
          <h1 className="text-2xl font-bold text-white">{name}</h1>
          <p className="text-green-100">{email}</p>
          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-2 bg-red-500 rounded-full text-white font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Right column */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Profile Details</h2>
          {!isEditing ? (
            <div className="space-y-4">
              {[
                { label: "Name", value: name },
                { label: "Email", value: email },
                { label: "Mobile Number", value: mobilenumber },
                { label: "State", value: state },
                { label: "District", value: district },
                { label: "Soil Type", value: soiltype },
                { label: "Farm Size (Acres)", value: farmSize },
                { label: "Password", value: formData.password },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-500">{item.label}</span>
                  <span className="text-gray-700">{item.value}</span>
                </div>
              ))}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {["name", "email", "password", "mobilenumber", "state", "district", "soiltype", "farmSize"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  placeholder={field}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
                />
              ))}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
