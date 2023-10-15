import React from 'react';
import { PagesRoutes } from 'pages/routes';
import { useNavigate } from 'react-router-dom';
import Navigation from 'components/atoms/navigation';

const App: React.FC = () => {
  const navigate = useNavigate();
  const handleRoute = (e: { key: React.Key }) => navigate(`${e.key}`);

  return (
    <>
      <Navigation onClick={handleRoute} />
      <PagesRoutes />
    </>
  );
};

export default App;
