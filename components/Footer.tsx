
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        <div className="col-span-2 md:col-span-1 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-black font-black text-xs">
              A
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase text-white">{APP_NAME}</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed font-light pr-4">
            The next-generation data engine for AI tool discovery. Curating the world's intelligence for professional workflows.
          </p>
        </div>
        <div>
          <h4 className="tech-font text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white mb-6 md:mb-8 font-black">Intelligence</h4>
          <ul className="space-y-3 md:space-y-4 text-[9px] md:text-xs tracking-wider text-gray-500 uppercase font-bold">
            <li className="hover:text-[#ff2d55] cursor-pointer transition-colors">Vector Search</li>
            <li className="hover:text-[#ff2d55] cursor-pointer transition-colors">Data Validation</li>
            <li className="hover:text-[#ff2d55] cursor-pointer transition-colors">Pricing Intel</li>
          </ul>
        </div>
        <div>
          <h4 className="tech-font text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white mb-6 md:mb-8 font-black">Enterprise</h4>
          <ul className="space-y-3 md:space-y-4 text-[9px] md:text-xs tracking-wider text-gray-500 uppercase font-bold">
            <li className="hover:text-[#ff2d55] cursor-pointer transition-colors">Engine Info</li>
            <li className="hover:text-[#ff2d55] cursor-pointer transition-colors">Protocol</li>
            <li className="hover:text-[#ff2d55] cursor-pointer transition-colors">Connect</li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 border-t border-white/5 pt-8 md:pt-0 md:border-t-0">
          <h4 className="tech-font text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white mb-6 md:mb-8 font-black">System Status</h4>
          <div className="flex items-center space-x-2 text-[9px] tech-font text-emerald-500 font-black uppercase tracking-widest mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            <span>All Nodes Operational</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="tech-font text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-gray-700 font-bold">
          © {new Date().getFullYear()} {APP_NAME} // DATA ENGINE V3.2.1
        </div>
        <div className="flex space-x-4 md:space-x-8 tech-font text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-gray-700">
          <span>REGION: GLOBAL</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
