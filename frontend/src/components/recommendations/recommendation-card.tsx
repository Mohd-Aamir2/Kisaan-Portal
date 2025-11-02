"use client"

import React, { useContext } from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';
import soilCropRecommendations from '@/app/dashboard/assets/assets';
import { AppContext } from '@/app/context/appcontext';
 interface Crop {
  id: number;
  name: string;
  image: string;
  description: string;
  days: number;       // duration instead of rating
  months: string;     // months instead of season
  region: string;
}

const CropRecommendation: React.FC = () => {
  const context = useContext(AppContext);
    
      if (!context) {
        throw new Error("AppContext must be used within AppContextProvider");
      }
    const {soiltype,language,translate}=context; // Get soil type from context
    //const t = translate[language]; 
  // Get crops for the selected soil type
  const recommendations: Crop[] = soiltype
    ? soilCropRecommendations[soiltype] || []
    : [];

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="flex items-center space-x-4 ">
          <img
            src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="Crop field"
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Personalized Crop Recommendations
            </h2>
            <p className="text-gray-600">
              Based on your soil type: <span className="font-semibold">{soiltype}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{crop.name}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{crop.description}</p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Growing Months: {crop.months}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Region: {crop.region}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>Days to Harvest: {crop.days}</span>
                </div>
              </div>

           {/* <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                View Detai   ls
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Message if no crops found */}
      {recommendations.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          No crop recommendations available for the selected soil type.
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;