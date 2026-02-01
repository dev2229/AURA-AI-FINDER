
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (authError) {
        if (authError.message.toLowerCase().includes('email not confirmed')) {
          setError('Almost there! Please check your email and click the confirmation link to activate your account.');
        } else if (authError.message.toLowerCase().includes('invalid login credentials')) {
          setError('Oops! That email or password doesn\'t look right. Please double-check and try again.');
        } else {
          setError('We\'re having trouble connecting right now. Please try again in a moment or use Demo Mode.');
        }
        setLoading(false);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Something went wrong on our end. Please try our Demo Mode to see the app immediately!');
      setLoading(false);
    }
  };

  const handleDemoBypass = () => {
    loginAsDemo();
    navigate('/');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
      <div className="orb orb-pink top-[20%] right-[10%] opacity-20"></div>
      
      <div className="max-w-md w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-[#ff2d55] text-[11px] font-bold tracking-widest uppercase mb-4">
            Aura AI Access
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Welcome Back</h1>
          <p className="text-gray-500 mt-2 font-light">Sign in to manage your AI discoveries.</p>
        </div>

        <div className="glass p-8 md:p-10 rounded-[40px] border border-white/5 shadow-2xl relative">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-start space-x-3 animate-in fade-in zoom-in duration-300">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <p className="text-red-200 text-xs leading-relaxed font-medium">
                  {error}
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-wider">Email Address</label>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full bg-black/60 border ${error && !email ? 'border-red-500/50' : 'border-white/10'} text-white px-6 py-4 rounded-2xl focus:border-[#ff2d55]/50 outline-none transition-all placeholder:text-gray-700`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-wider">Password</label>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your secret password"
                className={`w-full bg-black/60 border ${error && !password ? 'border-red-500/50' : 'border-white/10'} text-white px-6 py-4 rounded-2xl focus:border-[#ff2d55]/50 outline-none transition-all placeholder:text-gray-700`}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#ff2d55] hover:text-white transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Sign In Now'}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <span className="bg-[#0a0a0c] px-4">New here?</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Link to="/signup" className="w-full py-4 text-center border border-white/10 text-gray-300 rounded-2xl font-bold text-xs hover:bg-white/5 transition-all">
                Create Free Account
              </Link>
              <button 
                type="button"
                onClick={handleDemoBypass}
                className="w-full py-4 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-2xl font-bold text-xs hover:bg-blue-600/20 transition-all"
              >
                Instant Demo Access (No Login)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
