import { useState, useCallback, useEffect } from 'react';

// Custom hook to manage the selected tab and persist it in localStorage
export const useSelectedTab = (defaultTab = '/') => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab);

  const handleTabChange = useCallback((newTab: string) => {
    setSelectedTab(newTab);
  }, []);

  useEffect(() => {
    const routeName = window.location.pathname.split('/')[1];
    if (routeName) {
      setSelectedTab(routeName);
    }
  }, []);

  return [selectedTab, handleTabChange];
};
