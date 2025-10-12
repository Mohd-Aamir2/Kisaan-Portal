"use client"

import React, { useState } from 'react';



import { LucideIcon } from "lucide-react";
import { ChevronDown, ChevronUp, Sprout, Droplets, Sun, Scissors } from 'lucide-react';
import crops from '../assets/crops';
interface CropStep {
  title: string;// ya React.FC<React.SVGProps<SVGSVGElement>>
  //icon: LucideIcon,
  description: string;
  tips: string[];
}

interface Crop {
  id: number;
  name: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  steps: CropStep[];
}

const CropFarmingGuide: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const toggleCard = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };
   const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <div className="space-y-6  p-10 ">
      {/* Header Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="Farming guide"
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Comprehensive Farming Guides</h2>
            <p className="text-gray-600">
              Step-by-step instructions to help you grow healthy, profitable crops from seed to harvest.
            </p>
          </div>
        </div>
          {/* 🔍 Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search crops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
      </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">100+</div>
            <p className="text-xs text-gray-600">Crop Guides</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">1000+</div>
            <p className="text-xs text-gray-600">Success Stories</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">95%</div>
            <p className="text-xs text-gray-600">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Crop Guide Cards */}
      <div className="space-y-6">
        {
        filteredCrops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      crop.difficulty === 'Easy' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {crop.difficulty}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {crop.duration}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleCard(crop.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {expandedCards.includes(crop.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Expandable Content */}
            {expandedCards.includes(crop.id) && (
              <div className="p-6">
                {/* Crop Overview */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Crop Overview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Season:</span>
                      <p className="font-medium">All seasons</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Water needs:</span>
                      <p className="font-medium">Moderate</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Soil pH:</span>
                      <p className="font-medium">6.0 - 6.8</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Yield:</span>
                      <p className="font-medium">High</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {crop.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          {/* <step.icon className="w-5 h-5" /> */}
                          <h1>#</h1>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <h5 className="font-medium text-gray-800 mb-2">Pro Tips:</h5>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">💡</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional Resources */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">Additional Resources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button className="text-left p-3 bg-white rounded border hover:shadow-sm transition-shadow">
                      <h5 className="font-medium text-gray-800">Video Tutorial</h5>
                      <p className="text-sm text-gray-600">Watch step-by-step video guide</p>
                    </button>
                    <button className="text-left p-3 bg-white rounded border hover:shadow-sm transition-shadow">
                      <h5 className="font-medium text-gray-800">Expert Consultation</h5>
                      <p className="text-sm text-gray-600">Get personalized advice</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Farming Calendar */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Seasonal Farming Calendar</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { season: 'Spring', crops: ['Tomatoes', 'Peppers', 'Corn'], color: 'green' },
            { season: 'Summer', crops: ['Rice', 'Cotton', 'Sugarcane'], color: 'yellow' },
            { season: 'Monsoon', crops: ['Rice', 'Maize', 'Pulses'], color: 'blue' },
            { season: 'Winter', crops: ['Wheat', 'Barley', 'Mustard'], color: 'purple' }
          ].map((season, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 border-${season.color}-200 bg-${season.color}-50`}>
              <h4 className={`font-semibold text-${season.color}-800 mb-2`}>{season.season}</h4>
              <ul className="space-y-1">
                {season.crops.map((crop, cropIndex) => (
                  <li key={cropIndex} className={`text-sm text-${season.color}-700`}>• {crop}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropFarmingGuide;