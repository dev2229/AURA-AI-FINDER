
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { findToolsForTask } from '../services/geminiService.ts';
import { AITool, PricingModel } from '../types.ts';
import ToolCard from '../components/ToolCard.tsx';

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getResults() {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const results = await findToolsForTask(query);
        const sorted = [...results].sort((a, b) => b.rating - a.rating);
        setTools(sorted);
      } catch (err) {
        setError('Core Synchronization Error: Data Engine failed to execute request.');
      } finally {
        setLoading(false);
      }
    }
    getResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 md:mb-12 flex items-center tech-font text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-500 hover:text-[#ff2d55] transition-all group font-bold"
      >
        <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        System: Back
      </button>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
        <div className="max-w-3xl">
          <h2 className="tech-font text-[9px] md:text-[10px] text-[#ff2d55] uppercase tracking-[0.4em] md:tracking-[0.5em] mb-2 md:mb-4 font-black neon-pink-text">Search Output Results</h2>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter break-words">
            Intelligence Analysis for <br />
            <span className="neon-pink-text">"{query}"</span>
          </h1>
        </div>
        {!loading && (
          <div className="flex flex-col lg:items-end">
            <div className="tech-font text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em] border border-[#ff2d55]/20 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/2 mb-2 w-fit">
              Verified: <span className="neon-pink-text font-black">{tools.length}</span> candidates
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] animate-pulse shadow-[0_0_8px_#ff2d55]"></span>
              <span className="text-[8px] md:text-[9px] tech-font text-[#ff2d55] font-black uppercase tracking-widest neon-pink-text">PROTOCOL: RANKED BY UTILITY</span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[...Array(6)].map((_, n) => (
            <div key={n} className="glass p-8 h-80 animate-pulse flex flex-col justify-between rounded-[24px] md:rounded-[32px] border border-white/5">
              <div className="space-y-4">
                <div className="h-2.5 w-1/3 bg-white/5 rounded-full"></div>
                <div className="h-6 w-4/5 bg-white/10 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-2.5 w-full bg-white/5 rounded-full"></div>
                  <div className="h-2.5 w-5/6 bg-white/5 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="glass border-[#ff2d55]/30 p-10 md:p-16 text-center rounded-[32px] md:rounded-[40px] shadow-[0_0_50px_rgba(255,45,85,0.1)]">
          <p className="text-[#ff2d55] tech-font uppercase tracking-[0.3em] font-black text-sm md:text-lg mb-8 neon-pink-text">{error}</p>
          <button onClick={() => window.location.reload()} className="px-8 py-4 bg-[#ff2d55] text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg">Retry Sync</button>
        </div>
      ) : tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {tools.map((tool, index) => (
            <div key={tool.id} className="relative">
              <div className="absolute -top-2 -left-2 z-20 w-7 h-7 bg-[#ff2d55] text-white font-black text-[10px] flex items-center justify-center rounded-lg shadow-lg tech-font border border-white/20">
                #{index + 1}
              </div>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 md:py-32 glass rounded-[32px] md:rounded-[40px] border border-white/5">
          <p className="text-gray-600 tech-font uppercase tracking-[0.4em] font-bold text-xs">Search yielded zero verified matches.</p>
          <Link to="/" className="mt-8 inline-block text-[#ff2d55] tech-font text-[9px] uppercase tracking-widest border-b border-[#ff2d55]/50 hover:border-[#ff2d55] transition-all pb-1 neon-pink-text">Refine Request</Link>
        </div>
      )}
    </div>
  );
};

export default Results;
