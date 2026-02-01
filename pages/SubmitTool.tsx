
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, APP_NAME } from '../constants';
import { PricingModel } from '../types';

const SubmitTool: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    pricing: PricingModel.FREEMIUM,
    category: CATEGORIES[0].name,
    tags: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20 text-center animate-in fade-in zoom-in duration-700">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10 text-3xl md:text-4xl shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-blue-500/20">
          ✓
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 md:mb-6 tracking-tighter">INTEGRATION QUEUED</h1>
        <p className="text-gray-400 text-base md:text-lg mb-10 md:mb-12 font-light leading-relaxed">
          Your tool has been submitted to the {APP_NAME} Data Engine. Verification process initiated.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          <Link to="/" className="px-10 py-4 bg-white text-black rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all">
            Return to Core
          </Link>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all"
          >
            New Submission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 md:mb-10 flex items-center tech-font text-[9px] md:text-[10px] tracking-widest uppercase text-gray-500 hover:text-white transition-colors font-bold"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Return
      </button>

      <div className="mb-10 md:mb-12">
        <h2 className="tech-font text-[9px] md:text-[10px] text-[#ff2d55] uppercase tracking-[0.4em] mb-2 md:mb-4 font-black neon-pink-text">Submission Portal</h2>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Contribute to Engine</h1>
      </div>

      <div className="glass p-6 sm:p-8 md:p-12 rounded-[32px] md:rounded-[40px] relative border border-white/5">
        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="space-y-2 md:space-y-3">
              <label className="tech-font text-[9px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Tool Identity</label>
              <input 
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Unique identifier"
                className="w-full bg-black border border-white/10 text-white px-5 md:px-6 py-4 rounded-xl focus:border-[#ff2d55]/50 outline-none transition-all placeholder:text-gray-800 text-sm"
              />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="tech-font text-[9px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Origin Endpoint</label>
              <input 
                required
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://"
                className="w-full bg-black border border-white/10 text-white px-5 md:px-6 py-4 rounded-xl focus:border-[#ff2d55]/50 outline-none transition-all placeholder:text-gray-800 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2 md:space-y-3">
            <label className="tech-font text-[9px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Core Capability Overview</label>
            <textarea 
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the primary function..."
              className="w-full bg-black border border-white/10 text-white px-5 md:px-6 py-4 rounded-xl focus:border-[#ff2d55]/50 outline-none transition-all placeholder:text-gray-800 resize-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="space-y-2 md:space-y-3">
              <label className="tech-font text-[9px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Revenue Model</label>
              <select 
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 text-white px-5 md:px-6 py-4 rounded-xl focus:border-[#ff2d55]/50 outline-none transition-all appearance-none text-sm cursor-pointer"
              >
                {Object.values(PricingModel).map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="tech-font text-[9px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Functional Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 text-white px-5 md:px-6 py-4 rounded-xl focus:border-[#ff2d55]/50 outline-none transition-all appearance-none text-sm cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 md:py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.3em] hover:bg-[#ff2d55] hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-[0.98]"
          >
            Deploy Submission
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTool;
