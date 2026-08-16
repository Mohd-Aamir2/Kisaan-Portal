"use client";

import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Sprout, User, Phone, MapPin, Map, Layers, Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from "../context/appcontext";
import { LanguageSelector } from "@/components/language-selector";

const Login: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within AppContextProvider");
  }
  const { name, setName, setToken, setEmail, setDistrict, setMobilenumber, setSoiltype, setState, setFarmSize, setUserId } = context;
  const router = useRouter();
  const goToRegister = () => {
    router.push("/dashboard");
  };
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🔹 Backend URL
  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

  const soiltypes = [
    'Alluvial Soil', 'Black Soil (Regur)', 'Red Soil', 'Laterite Soil',
    'Desert Soil', 'Mountain Soil', 'Saline Soil', 'Peaty Soil'
  ];

  // 🔹 OPTION A: State -> District data ab hardcoded nahi, runtime pe fetch hoga
  const [stateDistrictData, setStateDistrictData] = useState<Record<string, string[]>>({});
  const [districtDataLoading, setDistrictDataLoading] = useState(true);

  useEffect(() => {
    const fetchStatesDistricts = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json'
        );
        const data = await res.json();
        // data shape: { states: [ { state: "Andhra Pradesh", districts: [...] }, ... ] }
        const map: Record<string, string[]> = {};
        data.states.forEach((item: { state: string; districts: string[] }) => {
          map[item.state] = item.districts;
        });
        setStateDistrictData(map);
      } catch (err) {
        console.error('Failed to load states/districts', err);
        toast.error('Could not load state/district list, please refresh');
      } finally {
        setDistrictDataLoading(false);
      }
    };
    fetchStatesDistricts();
  }, []);

  const states = Object.keys(stateDistrictData);
  const availableDistricts = formData.state ? stateDistrictData[formData.state] || [] : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // 🔹 State badalte hi purana district clear kar do
      if (name === 'state') {
        return { ...prev, state: value, district: '' };
      }
      return { ...prev, [name]: value };
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 🔹 Email validation — login + signup dono ke liye
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // 🔹 Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.mobilenumber.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.mobilenumber)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }

      if (!formData.state) {
        newErrors.state = 'Please select your state';
      }

      if (!formData.district.trim()) {
        newErrors.district = formData.state
          ? 'Please select your district'
          : 'Please select your state first';
      }

      if (!formData.soiltype) {
        newErrors.soiltype = 'Please select your soil type';
      }
      if (!formData.farmSize) {
        newErrors.farmSize = 'Please enter your farm size';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Backend ka error message sahi field ke saath map karo
  const applyBackendError = (message: string) => {
    const msg = (message || '').toLowerCase();

    if (msg.includes('password') || msg.includes('incorrect') || msg.includes('invalid credential')) {
      setErrors(prev => ({ ...prev, password: message }));
    } else if (
      msg.includes('email') ||
      msg.includes('user not found') ||
      msg.includes('not registered') ||
      msg.includes('already exists') ||
      msg.includes("doesn't exist") ||
      msg.includes('does not exist')
    ) {
      setErrors(prev => ({ ...prev, email: message }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      let response;

      if (isLogin) {
        response = await axios.post(backendUrl + '/api/user/login', {
          email: formData.email.trim(),
          password: formData.password,
        });
      } else {
        response = await axios.post(backendUrl + '/api/user/register', formData);
      }

      if (response.data.success) {
        toast.success(isLogin ? "Login successful!" : "Registration successful!");
        setToken(response.data.token);
        setName(response.data.name);
        setDistrict(response.data.district);
        setEmail(response.data.email);
        setMobilenumber(response.data.mobilenumber);
        setState(response.data.state);
        setSoiltype(response.data.soiltype);
        setFarmSize(response.data.farmSize);
        setUserId(response.data.userId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", JSON.stringify(response.data.name));
      } else {
        const message = response.data.message || "Something went wrong!";
        toast.error(message);
        applyBackendError(message);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Something went wrong!";
      toast.error(message);
      applyBackendError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      router.push("/dashboard");
    }
  }, [name, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Farm background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-md w-full">
        <div className="flex justify-end mb-3">
          <LanguageSelector />
        </div>

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

        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <button
            onClick={goToRegister}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition z-10"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex bg-gray-100 rounded-lg p-1 mb-6 mt-6">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setErrors({}); }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${isLogin ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setErrors({}); }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${!isLogin ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Sign In to Your Account' : 'Create Your Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Access your personalized farming dashboard' : 'Get personalized crop recommendations for your farm'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
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
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {!isLogin && (
              <>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
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
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
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
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.mobile ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                  {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                </div>

                {/* State — ab list fetch se aati hai */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Map className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={districtDataLoading}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.state ? 'border-red-300' : 'border-gray-300'}`}
                    >
                      <option value="">
                        {districtDataLoading ? 'Loading states...' : 'Select your state'}
                      </option>
                      {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>

                {/* District — selected State ke hisaab se dynamic dropdown */}
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      disabled={!formData.state}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.district ? 'border-red-300' : 'border-gray-300'}`}
                    >
                      <option value="">
                        {formData.state ? 'Select your district' : 'Select state first'}
                      </option>
                      {availableDistricts.map((district) => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                  {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>

                {/* Soil Type */}
                <div>
                  <label htmlFor="soiltype" className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Layers className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="soiltype"
                      name="soiltype"
                      value={formData.soiltype}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white ${errors.soiltype ? 'border-red-300' : 'border-gray-300'}`}
                    >
                      <option value="">Select your soil type</option>
                      {soiltypes.map((soil) => (
                        <option key={soil} value={soil}>{soil}</option>
                      ))}
                    </select>
                  </div>
                  {errors.soiltype && <p className="mt-1 text-sm text-red-600">{errors.soiltype}</p>}
                </div>

                {/* Farm Size */}
                <div>
                  <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-2">Farm Size (in acres)</label>
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
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.farmSize ? "border-red-300" : "border-gray-300"}`}
                      placeholder="Enter your farm size in acres"
                    />
                  </div>
                  {errors.farmSize && <p className="mt-1 text-sm text-red-600">{errors.farmSize}</p>}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In to Dashboard' : 'Start Your Farming Journey')}
            </button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                Forgot your password?
              </button>
            </div>
          )}
        </div>

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