// src/components/ui/Card.js
import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`p-4 shadow-lg rounded ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="mt-2">
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="text-xl font-bold">
    {children}
  </div>
);

export default Card;
