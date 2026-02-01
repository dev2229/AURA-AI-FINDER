
import React from 'react';
import { AITool, PricingModel } from '../types';

interface ToolCardProps {
  tool: AITool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const getPricingBadge = (model: PricingModel) => {
    switch (model) {
      case PricingModel.FREE: return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5';
      case PricingModel.FREEMIUM: return 'text-[#ff2d55] border-[#ff2d55]/30 bg-[#ff2d55]/5';
      case PricingModel.PAID: return 'text-blue-400 border-blue-400/30 bg-blue-400/5';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/5';
    }
  };

  return (
    <div className="glass glass-hover p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] transition-all duration-700 group relative flex flex-col h-full overflow-hidden border border-white/5">
      {/* Top Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff2d55]/40 to-transparent group-hover:via-[#ff2d55] transition-all duration-700"></div>
      
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-2 bg-[#ff2d55]/5 rounded-[40px] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 -z-10"></div>

      <div className="flex justify-between items-start mb-6 sm:mb-8">
        <div className="flex-1 pr-4">
          <span className="tech-font text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-[#ff2d55] mb-1 sm:mb-2 block font-black">{tool.category}</span>
          <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-white transition-colors leading-tight tracking-tight">
            {tool.name}
          </h3>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/5 border border-white/5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl">
            <span className="text-[#ff2d55] text-[10px] sm:text-xs">★</span>
            <span className="text-white text-[9px] sm:text-[10px] font-bold tech-font tracking-tighter">{tool.rating.toFixed(1)}</span>
          </div>
          <span className="text-[8px] sm:text-[10px] text-gray-500 tech-font tracking-widest">{tool.review_count} REVIEWS</span>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm sm:text-[15px] font-light leading-relaxed mb-8 sm:mb-10 flex-grow">
        {tool.description}
      </p>

      <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-white/5">
        <span className={`tech-font text-[8px] sm:text-[9px] uppercase font-black px-2.5 py-1.5 rounded-lg border ${getPricingBadge(tool.pricing_model)}`}>
          {tool.pricing_model}
        </span>
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group/btn flex items-center space-x-2 sm:space-x-3 text-[9px] sm:text-[10px] tech-font uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white hover:text-[#ff2d55] transition-all font-bold"
        >
          <span className="hidden xs:inline">Request Access</span>
          <span className="xs:hidden">Visit</span>
          <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-[#ff2d55]/50 group-hover/btn:bg-[#ff2d55]/10 transition-all">
            <svg className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ToolCard;
