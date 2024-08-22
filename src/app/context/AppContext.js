import React, { createContext, useContext, useState } from 'react';
import InformationToast from "../components/InformationToast";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [showMenu, setShowMenu] = useState(true);
  const [profile, setProfile] = useState('');
  const [inititals, setInititals] = useState('');
  const [status, setStatus] = useState('');
  const [informationMessage, setInformationMessage] = useState('');
  const [banner, setBanner] = useState(false);
  const [titleBanner, setTitleBanner] = useState('');
  const [descriptionBanner, setDescriptionBanner] = useState('');
  const [linkBanner, setLinkBanner] = useState('');
  const [data, setData] = useState([]);

  const toastMessage = (status, description) => {
    setInformationMessage(description);
    setStatus(status);
    setTimeout(() => {
      setStatus('');
    }, 3500);
  };

  return (
    <AppContext.Provider value={{ 
      title, setTitle, 
      subtitle, setSubtitle, 
      showMenu, setShowMenu, 
      toastMessage, 
      inititals, setInititals, 
      profile, setProfile,
      banner, setBanner,
      titleBanner, setTitleBanner,
      descriptionBanner, setDescriptionBanner,
      informationMessage, setInformationMessage,
      status, setStatus,
      linkBanner, setLinkBanner,
      data, setData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
