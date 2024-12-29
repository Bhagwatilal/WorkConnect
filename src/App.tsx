import React from 'react';
import { Routes } from 'react-router-dom';
import { routes } from './routes';

const App: React.FC = () => {
  return (
    <Routes>
      {routes}
    </Routes>
  );
};

export default App;