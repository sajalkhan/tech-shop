import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSelectedTab = (defaultTab = '/') => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab);

  const handleTabChange = useCallback((newTab: string) => {
    setSelectedTab(newTab);
  }, []);

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location.pathname]);

  return [selectedTab, handleTabChange];
};
