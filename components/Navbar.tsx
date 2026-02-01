
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const menuItems = [
    { label: 'Home Node', path: '/' },
    { label: 'Intelligence Categories', path: '/categories' },
    { label: 'About Data Engine', path: '/about' }
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-black/80 backdrop-blur-2xl border-b border-white/5 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group relative z-[110]">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-md flex items-center justify-center text-black font-black text-lg md:text-xl shadow-[0_0_20px_rgba(255,45,85,0.4)] transition-all group-hover:scale-105 group-hover:rotate-3">
            A
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tighter text-white uppercase group-hover:text-[#ff2d55] transition-colors">{APP_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10 tech-font uppercase text-[10px] tracking-[0.3em]">
          <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-[#ff2d55]' : 'text-gray-400 hover:text-white'}`}>Home</Link>
          <Link to="/categories" className={`transition-colors ${location.pathname === '/categories' ? 'text-[#ff2d55]' : 'text-gray-400 hover:text-white'}`}>Categories</Link>
          <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? 'text-[#ff2d55]' : 'text-gray-400 hover:text-white'}`}>About</Link>
          
          <Link to="/submit" className="neon-pink-border px-6 py-2 rounded text-white hover:bg-[#ff2d55] hover:text-white transition-all duration-500 font-bold uppercase text-[9px]">
            Submit Tool
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-[110] p-2 text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 translate-x-10' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu Dropdown */}
        <div 
          ref={menuRef}
          className={`fixed md:absolute top-[72px] md:top-full left-4 right-4 md:right-0 md:left-auto md:w-72 md:mt-4 z-[105] transition-all duration-500 ease-out ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
              : 'opacity-0 translate-y-[-10px] scale-95 pointer-events-none'
          }`}
        >
          <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="p-4 space-y-2 bg-black/40 backdrop-blur-3xl">
              <div className="tech-font text-[8px] uppercase tracking-[0.3em] text-gray-600 px-3 py-2 font-bold">Navigation</div>
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'bg-[#ff2d55]/10 text-white' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="tech-font text-[10px] md:text-[11px] uppercase tracking-widest font-bold">{item.label}</span>
                  {location.pathname === item.path && <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] shadow-[0_0_8px_#ff2d55]"></div>}
                </Link>
              ))}

              <div className="h-[1px] bg-white/5 my-2"></div>

              <div className="space-y-2 px-1">
                <Link to="/submit" className="block w-full text-center py-4 bg-[#ff2d55] text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(255,45,85,0.2)]">
                  Submit Tool
                </Link>
              </div>
              
              <div className="pt-2 px-3 flex items-center justify-between opacity-30">
                <span className="tech-font text-[7px] uppercase tracking-widest text-gray-500">v3.2.1</span>
                <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
