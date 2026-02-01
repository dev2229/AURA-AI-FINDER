
import React from 'react';
import { CATEGORIES } from '../constants';
import { useNavigate } from 'react-router-dom';

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/results?q=Best AI tools for ${categoryName}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center tech-font text-[10px] tracking-[0.3em] uppercase text-gray-500 hover:text-[#ff2d55] transition-all group font-bold"
      >
        <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Return
      </button>

      <div className="text-center mb-12 md:mb-20 space-y-4">
        <h2 className="tech-font text-[10px] text-[#ff2d55] uppercase tracking-[0.5em] mb-2 font-black neon-pink-text">Intelligence Layers</h2>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter px-2">
          Browse by Category
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed px-4">
          Dive deep into specialized AI solutions tailored for your professional workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {CATEGORIES.map((category) => (
          <div 
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="glass glass-hover p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff2d55]/20 to-transparent group-hover:via-[#ff2d55]/60 transition-all duration-500"></div>
            
            <div className="text-3xl md:text-4xl mb-6 bg-white/5 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center group-hover:bg-[#ff2d55]/10 group-hover:scale-110 transition-all duration-500">
              {category.icon}
            </div>
            <h3 className="text-lg md:text-xl font-black text-white mb-2 group-hover:text-[#ff2d55] transition-colors">{category.name}</h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">
              {category.description}
            </p>
            <div className="mt-6 flex items-center text-[#ff2d55] font-black tech-font text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              <span>Access Node</span>
              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center px-2">
        <div className="glass p-6 md:p-8 rounded-3xl border border-white/5">
          <div className="text-2xl md:text-4xl font-black text-white mb-1">5,000+</div>
          <div className="text-gray-500 font-bold tech-font text-[9px] uppercase tracking-widest">Tools Indexed</div>
        </div>
        <div className="glass p-6 md:p-8 rounded-3xl border border-white/5">
          <div className="text-2xl md:text-4xl font-black text-white mb-1">24/7</div>
          <div className="text-gray-500 font-bold tech-font text-[9px] uppercase tracking-widest">Reasoning</div>
        </div>
        <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 col-span-2 md:col-span-1">
          <div className="text-2xl md:text-4xl font-black text-white mb-1">100%</div>
          <div className="text-gray-500 font-bold tech-font text-[9px] uppercase tracking-widest">Verified Links</div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
