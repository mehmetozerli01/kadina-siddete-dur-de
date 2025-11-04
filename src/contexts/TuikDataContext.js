import React, { createContext, useContext, useState, useEffect } from 'react';
import tuikData from '../assets/data/tuik-violence-data.json';

const TuikDataContext = createContext();

export const TuikDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Veri dosyasını yükle
    setData(tuikData);
    setLoading(false);
  }, []);

  const value = {
    data,
    loading,
    metadata: data?.metadata || {},
    lifetime: data?.lifetime || {},
    last12months: data?.last12months || {},
    byAge: data?.byAge || {},
    byRegion: data?.byRegion || {},
    byEducation: data?.byEducation || {},
    byMaritalStatus: data?.byMaritalStatus || {},
    byEmployment: data?.byEmployment || {},
    byLocation: data?.byLocation || {},
    reasons: data?.reasons || {},
    sharing: data?.sharing || {},
    violencePerpetrators: data?.violencePerpetrators || {}
  };

  return (
    <TuikDataContext.Provider value={value}>
      {children}
    </TuikDataContext.Provider>
  );
};

export const useTuikData = () => {
  const context = useContext(TuikDataContext);
  if (!context) {
    throw new Error('useTuikData must be used within TuikDataProvider');
  }
  return context;
};

