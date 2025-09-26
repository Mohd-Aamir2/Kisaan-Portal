import React, { createContext, useState,useEffect, type ReactNode } from "react";

interface AppContextType {
  username: any;
  setUsername: React.Dispatch<React.SetStateAction<string>>;

  showlogin: boolean;
  setShowlogin: React.Dispatch<React.SetStateAction<boolean>>;

  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;

  // New fields with useState
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;

  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}


export const AppContext = createContext<AppContextType | null>(null);

interface AppContextProviderProps {
  children: ReactNode;  // ✅ ye add karna important hai
}


const AppContextProvider = ({ children }: AppContextProviderProps) => {
const [username, setUsername] = useState<any>(() => {
  const savedUser = localStorage.getItem("name");
  return savedUser ? JSON.parse(savedUser) : null;
});
const [showlogin, setShowlogin] = useState(false);
const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

// new states for farmer details
const [email, setEmail]  = useState<any>(() => {
  const savedUser = localStorage.getItem("email");
  return savedUser ? savedUser: "";
});
const [role, setRole] = useState<string>(() => {
  const saved = localStorage.getItem("role");
  return saved ? saved : "manager";   // ✅ no JSON.parse
});

 

useEffect(() => {
  if (token) {
    localStorage.setItem("token", token);
    if (username) localStorage.setItem("username", JSON.stringify(username));
    if (role) localStorage.setItem("role", role);
   if (email) localStorage.setItem("email", email);
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
  
  }
}, [token, username,email,role]);

  useEffect(() => {
    // On app load, check localStorage
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");
  
   
    if (savedToken) setToken(savedToken);
    if (savedUser) setUsername(JSON.parse(savedUser));
    if (savedRole) setRole(savedRole);

   
  }, []);

const value: AppContextType = {
  username,
  setUsername,
  showlogin,
  setShowlogin,
  token,
  setToken,
  email,
  setEmail,
  role,
  setRole,
};


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
