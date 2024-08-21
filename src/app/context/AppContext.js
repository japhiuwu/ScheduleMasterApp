import React, { createContext, useContext, useState } from 'react';

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
  const [titleBanner, setTitleBanner] = useState('')
  const [descriptionBanner, setDescriptionBanner] = useState('')
  const [linkBanner, setLinkBanner] = useState('')

  const ocultarToast = () =>{
    setTimeout(() => {
        setStatus('');
      }, 5000); 
}

  return (
    <AppContext.Provider value={{ 
      title, setTitle, 
      subtitle, setSubtitle, 
      showMenu, setShowMenu, 
      status, setStatus, 
      informationMessage, setInformationMessage, 
      ocultarToast, 
      inititals, setInititals, 
      profile, setProfile,
      banner, setBanner,
      titleBanner, setTitleBanner,
      descriptionBanner, setDescriptionBanner,
      linkBanner, setLinkBanner }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
