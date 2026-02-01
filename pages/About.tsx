
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../constants';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12 md:space-y-16">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center tech-font text-[10px] tracking-[0.3em] uppercase text-gray-500 hover:text-[#ff2d55] transition-all group font-bold"
      >
        <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Return
      </button>

      <section className="text-center space-y-4 md:space-y-6">
        <h2 className="tech-font text-[10px] text-[#ff2d55] uppercase tracking-[0.5em] mb-2 font-black neon-pink-text">Identity Core</h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">{APP_NAME}</h1>
        <p className="text-lg md:text-2xl text-gray-500 italic font-medium max-w-2xl mx-auto leading-relaxed">
          "The professional directory for the age of intelligence."
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">System Objective</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed text-base md:text-lg font-light">
            <p>
              In a world where new AI tools are launched every hour, it's impossible to keep up. {APP_NAME} was built to bridge the gap between human creativity and artificial intelligence.
            </p>
            <p>
              We don't just list tools; we understand your intent. By leveraging the latest in LLM technology, we match your specific workflow with the exact features you need to succeed.
            </p>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2d55] to-purple-600 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-square">
            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" alt="Technology Network" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="glass rounded-[32px] md:rounded-[40px] p-8 md:p-12 text-center space-y-10 border border-white/5">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">The Aura Protocol</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-[#ff2d55]/10 border border-[#ff2d55]/20 rounded-full flex items-center justify-center text-[#ff2d55] mx-auto text-xl shadow-[0_0_15px_rgba(255,45,85,0.1)]">✓</div>
            <h4 className="font-black text-white tech-font text-[10px] uppercase tracking-widest">Verified Quality</h4>
            <p className="text-xs md:text-sm text-gray-500 italic font-light">Only established, working tools reach our engine.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center text-purple-400 mx-auto text-xl shadow-[0_0_15px_rgba(168,85,247,0.1)]">🧠</div>
            <h4 className="font-black text-white tech-font text-[10px] uppercase tracking-widest">Smart Matching</h4>
            <p className="text-xs md:text-sm text-gray-500 italic font-light">Context-aware reasoning that understands your task.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto text-xl shadow-[0_0_15px_rgba(16,185,129,0.1)]">💰</div>
            <h4 className="font-black text-white tech-font text-[10px] uppercase tracking-widest">Price Intel</h4>
            <p className="text-xs md:text-sm text-gray-500 italic font-light">Clear breakdowns of Free vs Paid options instantly.</p>
          </div>
        </div>
      </section>

      <section className="text-center pt-8 border-t border-white/5">
        <p className="text-gray-600 font-bold tech-font text-[9px] uppercase tracking-[0.4em]">Founded by intelligence architects // Curating the builders of tomorrow.</p>
      </section>
    </div>
  );
};

export default About;
