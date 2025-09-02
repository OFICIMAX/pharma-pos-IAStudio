import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="w-full  rounded-md border-gray-300 shadow-sm  px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 p-2 border "
    />
  );
};

export default Input;
