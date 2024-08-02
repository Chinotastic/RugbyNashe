// src/components/ui/Input.js
import React from 'react';

const Input = ({ placeholder, value, onChange, className = '' }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`p-2 border rounded ${className}`}
  />
);

export default Input;
