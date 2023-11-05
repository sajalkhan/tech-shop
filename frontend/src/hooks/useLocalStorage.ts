const useLocalStorage = <T>(key: string, type: 'get' | 'set' | 'delete') => {
  try {
    if (type === 'get') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else if (type === 'set') {
      const setValue = (newValue: T) => {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      };
      return [setValue] as const;
    } else {
      const deleteValue = () => {
        window.localStorage.removeItem(key);
      };
      return [deleteValue] as const;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default useLocalStorage;
