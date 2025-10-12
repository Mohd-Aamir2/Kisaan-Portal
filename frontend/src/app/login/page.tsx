"use client";

import React, { useContext, useState,useEffect } from 'react';
import  { useRouter } from "next/navigation";
import { Sprout, User, Phone, MapPin, Map, Layers, Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from "../context/appcontext";


const Login: React.FC = () => {
  const context = useContext(AppContext);
  
    if (!context) {
      throw new Error("AppContext must be used within AppContextProvider");
    }
  const {name,setName,setToken,setEmail,setDistrict,setMobilenumber,setSoiltype,setState,setFarmSize,setUserId}=context;
  const router = useRouter();
   const goToRegister = () => {
    router.push("/dashboard"); // 👈 Next.js way
  };
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
    name: '',
    mobilenumber: '',
    state: '',
    district: '',
    soiltype: '',
    farmSize: '',
  });
  //const { email, password, name, mobilenumber,state,district,soiltype} = req.body;

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🔹 Yahan apne backend ka URL daalo
  const backendUrl = "http://localhost:4000";  

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const soiltypes = [
    'Alluvial Soil', 'Black Soil (Regur)', 'Red Soil', 'Laterite Soil',
    'Desert Soil', 'Mountain Soil', 'Saline Soil', 'Peaty Soil'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    const { name, value } = e.target;
    console.log(e.target.value)
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() && !isLogin) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobilenumber.trim() && !isLogin) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!isLogin && !/^[6-9]\d{9}$/.test(formData.mobilenumber)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.state && !isLogin) {
      newErrors.state = 'Please select your state';
    }

    if (!formData.district.trim() && !isLogin) {
      newErrors.district = 'District is required';
    }

    if (!formData.soiltype && !isLogin) {
      newErrors.soiltype = 'Please select your soil type';
    }
    if (!formData.farmSize && !isLogin) {
       newErrors.farmSize = "Please enter your farm size";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit clicked ✅", formData);
    
    if (isLogin || validateForm()) {
      try {
        let response;

        if (isLogin) {
          //  Login API call
          response = await axios.post(backendUrl+'/api/user/login' ,{
            email: formData.email,
            password: formData.password
            
          });
         console.log("response of backend", response.data);

        } else {
          // 🔹 Register API call
          response = await axios.post(backendUrl+'/api/user/register', formData);
           console.log("response of backend", response.data);
        }

        if (response.data.success) {
          toast.success(isLogin ? "Login successful!" : "Registration successful!");
           setToken(response.data.token)
           setName(response.data.name)
           setDistrict(response.data.district)
           setEmail(response.data.email)
           setMobilenumber(response.data.mobilenumber)
           setState(response.data.state)
           setSoiltype(response.data.soiltype)
           setFarmSize(response.data.farmSize)
           setUserId(response.data.userId)
          // 🔹 Save token in localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", JSON.stringify(response.data.name));
        } else {
          toast.error(response.data.message || "Something went wrong!");
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };
   useEffect(() => {
    if (name) {
      router.push("/dashboard");
    }
  }, [name, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Farm background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-md w-full">
        
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Sprout className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">CropAdvisor</h1>
              <p className="text-green-600 font-medium">Smart Farming Solutions</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            {isLogin ? 'Welcome back to your farming dashboard' : 'Join thousands of farmers growing smarter'}
          </p>
        </div>

        {/* Login/Registration Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
        <button
          onClick={() => {goToRegister}}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition z-10"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6 mt-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                isLogin
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Sign In to Your Account' : 'Create Your Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Access your personalized farming dashboard' 
                : 'Get personalized crop recommendations for your farm'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field (for both login and signup) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password Field (for both login and signup) */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Additional fields only for signup */}
            {!isLogin && (
              <>
                {/* Name Field */}
                <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

                {/* Mobile Number Field */}
                <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="mobilenumber"
                  name="mobilenumber"
                  value={formData.mobilenumber}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.mobile ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
              </div>
              {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
            </div>

                {/* State Field */}
                <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Map className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white ${
                    errors.state ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
            </div>

                {/* District Field */}
                <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.district ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your district"
                />
              </div>
              {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
            </div>

                {/* Soil Type Field */}
                <div>
              <label htmlFor="soiltype" className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Layers className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="soiltype"
                  name="soiltype"
                  value={formData.soiltype}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white ${
                    errors.soilType ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your soil type</option>
                  {soiltypes.map((soil) => (
                    <option key={soil} value={soil}>
                      {soil}
                    </option>
                  ))}
                </select>
                
              </div>
              {errors.soilType && <p className="mt-1 text-sm text-red-600">{errors.soilType}</p>}
            </div>
              </>
            )}
              {!isLogin && (
                      <div>
                        <label
                          htmlFor="farmSize"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Farm Size (in acres)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Map className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="number"
                            id="farmSize"
                            name="farmSize"
                            value={formData.farmSize || ""}
                            onChange={handleInputChange}
                            min={0}
                            step={0.1}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                              errors.farmSize
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter your farm size in acres"
                          />
                        </div>
                        {errors.farmSize && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.farmSize}
                          </p>
                        )}
                      </div>
                    )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLogin ? 'Sign In to Dashboard' : 'Start Your Farming Journey'}
            </button>
          </form>

          {/* Forgot Password (only for login) */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                Forgot your password?
              </button>
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sprout className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Smart Crop Recommendations</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Real-time Market Prices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;