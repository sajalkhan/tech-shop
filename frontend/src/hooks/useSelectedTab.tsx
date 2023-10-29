import { useState, useCallback, useEffect } from 'react';

// Custom hook to manage the selected tab and persist it in localStorage
export const useSelectedTab = (defaultTab = '/') => {
  const [selectedTab, setSelectedTab] = useState<string>(localStorage.getItem('selectedTab') || defaultTab);

  const handleTabChange = useCallback((newTab: string) => {
    setSelectedTab(newTab);
    localStorage.setItem('selectedTab', newTab);
  }, []);

  useEffect(() => {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  return [selectedTab, handleTabChange];
};
