"use client";
import React from "react";
import { Facebook, Twitter, Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-6 mt-10"> {/* ✅ light whitish background */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6"> {/* ✅ 2 columns on md */}
        
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold text-green-700">🌾 Kisan Farming</h2>
          <p className="mt-2 text-sm text-gray-600">
            Empowering farmers with modern solutions for a better tomorrow.
          </p>
        </div>

        {/* Quick Links + Contact combined in 2nd col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-700">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/crops" className="hover:underline">Crops</a></li>
              <li><a href="/market" className="hover:underline">Market</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-700">Contact Us</h3>
            <p className="flex items-center gap-2 text-sm"><Phone size={16}/> +91 9876543210</p>
            <p className="flex items-center gap-2 text-sm"><Mail size={16}/> support@kisanapp.com</p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-3">
              <a href="#"><Facebook className="hover:text-green-600" size={20}/></a>
              <a href="#"><Twitter className="hover:text-green-600" size={20}/></a>
              <a href="#"><Instagram className="hover:text-green-600" size={20}/></a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Kisan Farming. All rights reserved.
      </div>
    </footer>
  );
}
