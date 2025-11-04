import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="w-full bg-red-800 p-4 rounded-t-lg border-b-4 border-black relative">
      <div className="flex items-center space-x-2">
        <div className="w-16 h-16 bg-cyan-400 rounded-full border-4 border-white shadow-inner animate-pulse"></div>
        <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-slate-900"></div>
        <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-slate-900"></div>
        <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900"></div>
      </div>
    </div>
  );
};

export default Header;
