"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sprout,
  Droplets,
  Sun,
  Scissors,
  PlayCircle,
  MessageCircle,
} from "lucide-react";
import crops from "../assets/crops";
import { motion, AnimatePresence } from "framer-motion";

const CropFarmingGuide: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const toggleCard = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id]
    );
  };

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white p-6 sm:p-10"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-green-100"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Farming guide"
              className="w-20 h-20 rounded-xl object-cover border-2 border-green-200"
            />
            <div>
              <h1 className="text-3xl font-bold text-green-700">
                🌱 Smart Farming Guides
              </h1>
              <p className="text-gray-600">
                Grow smarter — detailed, step-by-step instructions for
                successful crops.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="🔍 Search crops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 pt-6 border-t mt-6 border-gray-100 text-center">
          <div>
            <p className="text-green-700 font-semibold text-lg">100+</p>
            <p className="text-sm text-gray-600">Crop Guides</p>
          </div>
          <div>
            <p className="text-emerald-600 font-semibold text-lg">1,000+</p>
            <p className="text-sm text-gray-600">Success Stories</p>
          </div>
          <div>
            <p className="text-lime-600 font-semibold text-lg">95%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
        </div>
      </motion.div>

      {/* Crop Cards */}
      <div className="mt-10 space-y-6">
        {filteredCrops.map((crop) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-all"
          >
            {/* Card Header */}
            <div className="p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-20 h-20 rounded-xl object-cover border border-green-100"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {crop.name}
                  </h2>
                  <div className="flex gap-3 mt-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        crop.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : crop.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {crop.difficulty}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {crop.duration}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleCard(crop.id)}
                className="p-2 hover:bg-green-50 rounded-lg transition"
              >
                {expandedCards.includes(crop.id) ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}
              </button>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {expandedCards.includes(crop.id) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 border-t border-gray-100 bg-gradient-to-br from-green-50 to-white"
                >
                  {/* Crop Overview */}
                  <div className="mb-6 p-4 bg-white border border-green-100 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-green-700 mb-2">
                      🌾 Crop Overview
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
                      <p>
                        <strong>Season:</strong> All seasons
                      </p>
                      <p>
                        <strong>Water needs:</strong> Moderate
                      </p>
                      <p>
                        <strong>Soil pH:</strong> 6.0 - 6.8
                      </p>
                      <p>
                        <strong>Yield:</strong> High
                      </p>
                    </div>
                  </div>

                  {/* Crop Steps */}
                  <div className="space-y-6">
                    {crop.steps.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="flex items-start gap-4 bg-white p-4 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition"
                      >
                        <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold">
                          {stepIndex + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-1">
                            {step.title}
                          </h5>
                          <p className="text-gray-600 text-sm mb-3">
                            {step.description}
                          </p>
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                            <h6 className="text-blue-700 font-medium mb-2">
                              💡 Pro Tips
                            </h6>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                              {step.tips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Resources */}
                  <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-4">
                    <h4 className="font-semibold text-green-700 mb-3">
                      📚 Additional Resources
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-100 hover:shadow-md transition">
                        <PlayCircle className="text-green-600" />
                        <div className="text-left">
                          <h5 className="font-medium text-gray-800">
                            Video Tutorial
                          </h5>
                          <p className="text-sm text-gray-600">
                            Watch full step-by-step video
                          </p>
                        </div>
                      </button>
                      <button className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-100 hover:shadow-md transition">
                        <MessageCircle className="text-green-600" />
                        <div className="text-left">
                          <h5 className="font-medium text-gray-800">
                            Expert Consultation
                          </h5>
                          <p className="text-sm text-gray-600">
                            Get advice from experts
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Farming Calendar */}
      <div className="mt-10 bg-white rounded-2xl p-8 shadow-lg border border-green-100">
        <h3 className="text-2xl font-semibold text-green-700 mb-6">
          📅 Seasonal Farming Calendar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { season: "Spring", crops: ["Tomatoes", "Peppers", "Corn"], color: "green" },
            { season: "Summer", crops: ["Rice", "Cotton", "Sugarcane"], color: "yellow" },
            { season: "Monsoon", crops: ["Maize", "Pulses", "Rice"], color: "blue" },
            { season: "Winter", crops: ["Wheat", "Barley", "Mustard"], color: "purple" },
          ].map((season, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border-2 bg-${season.color}-50 border-${season.color}-200 shadow-sm hover:shadow-md transition`}
            >
              <h4
                className={`font-semibold text-${season.color}-700 mb-2 text-lg`}
              >
                {season.season}
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {season.crops.map((c, idx) => (
                  <li key={idx}>• {c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CropFarmingGuide;
