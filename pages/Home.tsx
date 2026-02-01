
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RECENT_SEARCHES_KEY = 'aura_ai_recent_searches';

const SUGGESTIONS = [
  'Landing page', 'Vibe coding', 'Image to video', 'Text to image',
  'AI Resume', 'Website code', 'Logo maker', 'SEO AI',
  'YouTube script', 'Voiceovers'
];

const TRENDING_TOOLS = [
  { name: 'ChatGPT', price: 'Freemium' },
  { name: 'Claude', price: 'Freemium' },
  { name: 'Midjourney', price: 'Paid' },
  { name: 'Perplexity', price: 'Free' },
  { name: 'Canva AI', price: 'Freemium' },
  { name: 'Luma Dream Machine', price: 'Freemium' },
  { name: 'ElevenLabs', price: 'Freemium' },
  { name: 'Cursor', price: 'Freemium' },
  { name: 'Grammarly', price: 'Freemium' },
  { name: 'Notion AI', price: 'Paid' },
  { name: 'Jasper', price: 'Paid' },
  { name: 'Leonardo.ai', price: 'Freemium' },
  { name: 'Runway Gen-3', price: 'Paid' },
  { name: 'GitHub Copilot', price: 'Paid' },
  { name: 'DeepL', price: 'Free' },
  { name: 'Gamma', price: 'Freemium' },
  { name: 'Framer AI', price: 'Freemium' },
  { name: 'Poe', price: 'Freemium' },
  { name: 'Otter.ai', price: 'Freemium' },
  { name: 'Descript', price: 'Freemium' }
];

const POPULAR_TAGS = [
  'LLM', 'GenArt', 'Voice', 'Code', 'Scraping', 'SEO', 'No-code', 'Agents', 'B2B'
];

const DYNAMIC_PLACEHOLDERS = [
  'website code...', 'landing page...', 'neural logic...', 'creative assets...'
];

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % DYNAMIC_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const saveSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearch(query.trim());
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    saveSearch(suggestion);
    navigate(`/results?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden py-12 md:py-20">
      <div className="orb orb-purple -top-40 -left-40 opacity-40"></div>
      <div className="orb orb-pink top-[20%] right-[10%] opacity-30"></div>
      <div className="orb orb-blue bottom-[-10%] left-[20%] opacity-20"></div>

      <div className="max-w-6xl w-full mx-auto space-y-12 md:space-y-16 relative z-10 text-center">
        <div className="space-y-4 md:space-y-6">
          <div className="inline-block tech-font text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase text-[#ff2d55] border border-[#ff2d55]/30 px-4 md:px-5 py-2 rounded-full bg-[#ff2d55]/5 mb-2 animate-pulse neon-pink-border font-black">
            Neural Network // V3.2
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[6rem] font-black tracking-tighter leading-[1.1] md:leading-[0.9] mb-4 px-2">
            Execute Your <span className="neon-pink-text">Vision</span> <br />
            <span className="gradient-text">With AI Intelligence</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4">
            Access the professional data layer for <span className="neon-pink-text font-medium">AI discovery</span>. 
            Identify specialized categories and integrate them into your workflow.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto px-2">
          <form onSubmit={handleSearch} className="relative group mb-8 md:mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2d55] via-[#a855f7] to-[#3b82f6] rounded-[22px] blur-sm md:blur-md opacity-20 group-hover:opacity-50 transition duration-700"></div>
            <div className="relative flex flex-col sm:flex-row items-center gap-3">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${DYNAMIC_PLACEHOLDERS[placeholderIndex]}`}
                className="w-full bg-black/95 border border-white/10 text-white px-6 md:px-10 py-5 md:py-7 rounded-2xl md:rounded-3xl text-lg md:text-xl font-light placeholder:text-gray-700 outline-none focus:border-[#ff2d55]/50 transition-all shadow-xl"
              />
              <button 
                type="submit"
                className="w-full sm:w-auto sm:absolute sm:right-4 bg-[#ff2d55] text-white px-10 py-5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:brightness-125 transition-all shadow-lg sm:shadow-[0_0_20px_rgba(255,45,85,0.4)]"
              >
                Execute
              </button>
            </div>
          </form>
          
          <div className="mt-8 md:mt-12 px-2">
            <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-6 md:mb-8">
               <div className="h-[1px] w-8 md:w-12 bg-[#ff2d55]/30"></div>
               <span className="tech-font text-[9px] md:text-[10px] text-[#ff2d55] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black neon-pink-text">Neural Entry Points</span>
               <div className="h-[1px] w-8 md:w-12 bg-[#ff2d55]/30"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSuggestion(item)}
                  className="px-3 py-2.5 border border-white/5 rounded-lg md:rounded-xl tech-font text-[8px] md:text-[9px] uppercase tracking-widest text-gray-500 hover:text-white hover:border-[#ff2d55]/50 hover:bg-[#ff2d55]/10 transition-all font-bold"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Now Section */}
          <div className="mt-16 md:mt-24 px-2">
            <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-8 md:mb-10">
               <div className="h-[1px] w-10 md:w-20 bg-gradient-to-r from-transparent to-[#ff2d55]/30"></div>
               <span className="tech-font text-[10px] md:text-[12px] text-white uppercase tracking-[0.5em] font-black">Trending Now</span>
               <div className="h-[1px] w-10 md:w-20 bg-gradient-to-l from-transparent to-[#ff2d55]/30"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {TRENDING_TOOLS.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => handleSuggestion(tool.name)}
                  className="glass group p-5 rounded-[20px] border border-white/5 hover:border-[#ff2d55]/30 transition-all duration-500 text-left relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-bold text-sm tracking-tight group-hover:text-[#ff2d55] transition-colors">{tool.name}</span>
                    <span className={`text-[7px] tech-font uppercase tracking-widest px-2 py-0.5 rounded border ${
                      tool.price === 'Free' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                      tool.price === 'Freemium' ? 'text-[#ff2d55] border-[#ff2d55]/20 bg-[#ff2d55]/5' :
                      'text-blue-400 border-blue-400/20 bg-blue-400/5'
                    }`}>
                      {tool.price}
                    </span>
                  </div>
                  <div className="tech-font text-[8px] text-gray-600 uppercase tracking-widest group-hover:text-gray-400">Execute Protocol →</div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#ff2d55]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 md:mt-16 px-2">
            <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-6 md:mb-8">
               <div className="h-[1px] w-8 md:w-12 bg-white/10"></div>
               <span className="tech-font text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.4em] font-black">Popular Tags</span>
               <div className="h-[1px] w-8 md:w-12 bg-white/10"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSuggestion(tag)}
                  className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full tech-font text-[7px] md:text-[8px] uppercase tracking-widest text-gray-500 hover:text-[#ff2d55] hover:border-[#ff2d55]/30 transition-all font-bold"
                >
                  #{tag}
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
