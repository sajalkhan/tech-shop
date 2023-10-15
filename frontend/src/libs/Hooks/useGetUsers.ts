import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export interface user {
  id: number;
  name: string;
  email: string;
}

const url = 'https://jsonplaceholder.typicode.com/users';

export const useGetUsers = () => {
  const [user, setUser] = useState<user[] | null>(null);

  const getUserName = useCallback(async () => {
    const { data } = await axios.get(url);
    setUser(data);
  }, []);

  useEffect(() => {
    getUserName();
  }, [getUserName]);

  return user;
};
