import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './layouts/Home';


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home><div>Hello</div></Home>} />
      <Route path="/about" element={<Home><div>Hello</div></Home>} />

      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
};
