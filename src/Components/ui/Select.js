// src/components/ui/Select.js
import React from 'react';

const Select = ({ children, value, onChange, className = '' }) => (
  <select
    value={value}
    onChange={onChange}
    className={`p-2 border rounded ${className}`}
  >
    {children}
  </select>
);

export default Select;
