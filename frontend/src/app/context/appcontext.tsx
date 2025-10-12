"use client";
import React, { createContext, useState, useEffect, type ReactNode } from "react";
import { useRef } from "react";

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (text: string) => Promise<string>;

  userId: string | null; // ✅ added
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;

  name: any;
  setName: React.Dispatch<React.SetStateAction<string>>;

  showlogin: boolean;
  setShowlogin: React.Dispatch<React.SetStateAction<boolean>>;

  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;

  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;

  mobilenumber: string;
  setMobilenumber: React.Dispatch<React.SetStateAction<string>>;

  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;

  district: string;
  setDistrict: React.Dispatch<React.SetStateAction<string>>;

  soiltype: string;
  setSoiltype: React.Dispatch<React.SetStateAction<string>>;

   farmSize: number | null;
  setFarmSize: React.Dispatch<React.SetStateAction<number | null>>; 
}

export const AppContext = createContext<AppContextType | null>(null);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null); // ✅ added
  const [name, setName] = useState<any>(null);
  const [showlogin, setShowlogin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const didHydrate = useRef(false);

  // farmer details
  const [email, setEmail] = useState<string>("");
  const [mobilenumber, setMobilenumber] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [soiltype, setSoiltype] = useState<string>("");
  const [farmSize, setFarmSize] = useState<number | null>(null); 
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

  const translate = async (text: string) => {
    if (language === "en") return text;
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${language}`
      );
      const data = await res.json();
      return data.responseData.translatedText || text;
    } catch (err) {
      console.error("Translation failed:", err);
      return text;
    }
  };

  //Save to localStorage when states change
  useEffect(() => {
    if (!didHydrate.current) {
      didHydrate.current = true;
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      if (userId) localStorage.setItem("userId", userId); // ✅ save userId
      if (name) localStorage.setItem("name", JSON.stringify(name));
      if (state) localStorage.setItem("state", state);
      if (district) localStorage.setItem("district", district);
      if (email) localStorage.setItem("email", email);
      if (soiltype) localStorage.setItem("soiltype", soiltype);
      if (mobilenumber) localStorage.setItem("mobilenumber", mobilenumber);
      if (farmSize !== null) localStorage.setItem("farmSize", farmSize.toString());
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId"); // ✅ clear userId
      localStorage.removeItem("name");
      localStorage.removeItem("state");
      localStorage.removeItem("email");
      localStorage.removeItem("soiltype");
      localStorage.removeItem("district");
      localStorage.removeItem("mobilenumber");
      localStorage.removeItem("farmSize");
    }
  }, [token, userId, name, state, district, email, soiltype, mobilenumber,farmSize]);

  // 🔹 Restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId"); // ✅ load userId
    const savedUser = localStorage.getItem("name");
    const savedState = localStorage.getItem("state");
    const savedDistrict = localStorage.getItem("district");
    const saveEmail = localStorage.getItem("email");
    const savesoiltype = localStorage.getItem("soiltype");
    const savemobilenumber = localStorage.getItem("mobilenumber");
    const savedFarmSize = localStorage.getItem("farmSize");

    if (savedToken) setToken(savedToken);
    if (savedUserId) setUserId(savedUserId); // ✅ restore userId
    if (savedUser) setName(JSON.parse(savedUser));
    if (savedState) setState(savedState);
    if (savedDistrict) setDistrict(savedDistrict);
    if (saveEmail) setEmail(saveEmail);
    if (savesoiltype) setSoiltype(savesoiltype);
    if (savemobilenumber) setMobilenumber(savemobilenumber);
    if (savedFarmSize) setFarmSize(parseFloat(savedFarmSize));

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (showlogin) {
      localStorage.setItem("showlogin", "true");
    } else {
      localStorage.setItem("showlogin", "false");
    }
  }, [showlogin]);

  useEffect(() => {
    const savedShowlogin = localStorage.getItem("showlogin");
    if (savedShowlogin === "true") {
      setShowlogin(true);
    }
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const value: AppContextType = {
    language,
    setLanguage,
    translate,
    userId, setUserId, // ✅ included in context
    name,
    setName,
    showlogin,
    setShowlogin,
    token,
    setToken,
    email,
    setEmail,
    mobilenumber,
    setMobilenumber,
    state,
    setState,
    district,
    setDistrict,
    soiltype,
    setSoiltype,
    farmSize, // ✅ included in context
    setFarmSize,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
