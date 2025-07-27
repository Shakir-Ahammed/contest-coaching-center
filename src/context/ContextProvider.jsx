// context/ContextProvider.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { useLoader } from './LoaderContext';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Admission');
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [scrollAnimatedSections, setScrollAnimatedSections] = useState({});
  const [isExpand, setIsExpand] = useState(true);
  const {setLoading} = useLoader();
   const accessToken = localStorage.getItem("access_token");

  const checkAuth = async () => {
  setLoading(true); // ✅ শুরুতেই loader চালাও
  setMsg("Checking authentication...");

  try {
    const response = await api.get('/me');

    if (response.status === 200) {
      setUser(response.data.data.user);
      setMsg("✅ Authenticated successfully");
    } else {
      setUser(null);
      setMsg("❌ Not authenticated");
    }
  } catch (err) {
    setUser(null);
    console.log('❌ Auth check failed:', err);
    setMsg("❌ Not authenticated");
  } finally {
    setTimeout(() => {
      setLoading(false); // ✅ যেকোনো অবস্থায় loader বন্ধ
    }, 800); // Optional delay to show spinner smoothly
  }
};


  useEffect(() => {
    if (accessToken) {
      checkAuth();
    }
  }, []);


  return (
    <StateContext.Provider value={{
      isActiveMenu,
      setIsActiveMenu,
      activeTab,
      setActiveTab,
      scrollAnimatedSections,
      setScrollAnimatedSections,
      isExpand,
      setIsExpand,
      user,
      setUser,
      msg,
      setMsg,
      showConfirm,
      setShowConfirm,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
