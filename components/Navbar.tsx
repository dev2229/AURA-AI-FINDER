import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME } from '../constants';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-[100] bg-black/80 backdrop-blur-2xl border-b border-white/5 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-black text-2xl group-hover:rotate-6 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            F
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase group-hover:text-[#ff2d55] transition-colors">{APP_NAME}</span>
        </Link>

        <div className="hidden md:flex items-center space-x-10 tech-font uppercase text-[10px] tracking-[0.4em]">
          <Link to="/" className={`${location.pathname === '/' ? 'text-[#ff2d55]' : 'text-gray-400 hover:text-white'} transition-colors font-black`}>Directory</Link>
          <Link to="/categories" className={`${location.pathname === '/categories' ? 'text-[#ff2d55]' : 'text-gray-400 hover:text-white'} transition-colors font-black`}>Layers</Link>
          <Link to="/submit" className="bg-[#ff2d55] px-6 py-2.5 rounded-lg text-white hover:brightness-110 transition-all font-black shadow-[0_0_15px_rgba(255,45,85,0.2)]">
            Submit
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;