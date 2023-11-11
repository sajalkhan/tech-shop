import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => --currentCount);
    }, 1000);

    count === 0 && navigate('/');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="loading">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};
