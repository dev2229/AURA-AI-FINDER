import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../constants';

const SUGGESTIONS = [
  'Video avatars', 'Vibe coding', 'Resume builder', 'Social media ads',
  'Code generation', 'Podcast editing', 'Logo design', 'SEO content'
];

const DYNAMIC_PLACEHOLDERS = [
  'website from scratch...', 'cinematic video...', 'expert copy...', 'neural automation...'
];

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % DYNAMIC_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    navigate(`/results?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden py-12 md:py-20">
      <div className="orb bg-[#ff2d55] w-[500px] h-[500px] -top-40 -left-40 animate-float"></div>
      <div className="orb bg-purple-600 w-[400px] h-[400px] bottom-[-10%] right-[10%] animate-float" style={{animationDelay: '-5s'}}></div>

      <div className="max-w-6xl w-full mx-auto space-y-12 md:space-y-16 relative z-10 text-center">
        <div className="space-y-6">
          <div className="inline-block tech-font text-[10px] tracking-[0.4em] uppercase text-[#ff2d55] border border-[#ff2d55]/30 px-5 py-2 rounded-full bg-[#ff2d55]/5 mb-2 font-black">
            Discovery Protocol // V4.0
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-black tracking-tighter leading-[0.9] mb-4">
            The AI <span className="neon-pink-text">Finder</span> <br />
            <span className="text-white/40">Discovery Engine</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Stop searching. Start discovering. Access the professional data layer for <span className="text-white font-medium">real-world AI solutions</span>.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2d55] to-purple-600 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
            <div className="relative flex flex-col sm:flex-row items-center gap-4">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Discover tools for ${DYNAMIC_PLACEHOLDERS[placeholderIndex]}`}
                className="w-full bg-black/80 border border-white/10 text-white px-10 py-7 rounded-[32px] text-xl outline-none focus:border-[#ff2d55]/50 transition-all shadow-2xl backdrop-blur-md"
              />
              <button 
                type="submit"
                className="w-full sm:w-auto sm:absolute sm:right-3 bg-[#ff2d55] text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,45,85,0.4)]"
              >
                Find
              </button>
            </div>
          </form>
          
          <div className="mt-12">
            <span className="tech-font text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black block mb-6">Popular Entry Points</span>
            <div className="flex flex-wrap justify-center gap-3">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSuggestion(item)}
                  className="px-5 py-3 border border-white/5 rounded-xl tech-font text-[9px] uppercase tracking-widest text-gray-500 hover:text-white hover:border-[#ff2d55]/50 hover:bg-[#ff2d55]/10 transition-all font-bold"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;