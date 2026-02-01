
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const validateForm = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Your password must be at least 6 characters long for security.');
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin + '/#/login'
        }
      });
      
      if (authError) {
        // Handle specific Supabase error codes for better UX
        const msg = authError.message.toLowerCase();
        if (msg.includes('user already registered')) {
          setError('It looks like you already have an account. Try signing in instead!');
        } else if (msg.includes('rate limit')) {
          setError('Too many attempts. Please wait a few minutes before trying again.');
        } else {
          setError(authError.message || 'We couldn\'t create your account right now. Please try again.');
        }
        setLoading(false);
      } else {
        // If Supabase is configured to NOT require email confirmation, they might be logged in already
        if (data?.session) {
          navigate('/');
        } else {
          setIsSuccess(true);
        }
        setLoading(false);
      }
    } catch (err) {
      setError('Network synchronization failure. Please check your connection or use Demo Mode.');
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    loginAsDemo();
    navigate('/');
  };

  if (isSuccess) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="orb orb-blue top-[10%] left-[10%] opacity-20"></div>
        <div className="max-w-md w-full glass p-10 rounded-[40px] border border-emerald-500/20 text-center animate-in fade-in zoom-in duration-500 shadow-2xl relative z-10">
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            ✉️
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-4">Verify Your Identity</h1>
          <p className="text-gray-400 leading-relaxed mb-8 font-light">
            An activation link has been dispatched to <span className="text-white font-bold">{email}</span>. Please click the link in that email to finalize your account setup.
          </p>
          <div className="space-y-4">
            <Link 
              to="/login" 
              className="block w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#ff2d55] hover:text-white transition-all shadow-lg active:scale-95"
            >
              Back to Sign In
            </Link>
            <button 
              onClick={() => setIsSuccess(false)}
              className="text-gray-500 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors"
            >
              Use a different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
      <div className="orb orb-blue top-[10%] left-[10%] opacity-20"></div>
      <div className="orb orb-pink bottom-[10%] right-[10%] opacity-10"></div>
      
      <div className="max-w-md w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold tracking-widest uppercase mb-4">
            Protocol: New User
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Join Aura AI</h1>
          <p className="text-gray-500 mt-2 font-light">Initialize your discovery environment today.</p>
        </div>

        <div className="glass p-8 md:p-10 rounded-[40px] border border-white/5 shadow-2xl relative group">
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-start space-x-3 animate-in fade-in zoom-in duration-300">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <p className="text-red-200 text-xs leading-relaxed font-medium">
                  {error}
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wider">Email Address</label>
              <input 
                ref={emailRef}
                required
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
                placeholder="name@example.com"
                className={`w-full bg-black/60 border ${error && !email.includes('@') ? 'border-red-500/50' : 'border-white/10'} text-white px-6 py-4 rounded-2xl focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-wider">Create Password</label>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (error) setError(null); }}
                placeholder="6+ characters required"
                className={`w-full bg-black/60 border ${error && password.length < 6 ? 'border-red-500/50' : 'border-white/10'} text-white px-6 py-4 rounded-2xl focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700`}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Initialize Account'}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <span className="bg-[#0a0a0c] px-4">Instant Entry</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleDemoMode}
              className="w-full py-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl font-bold text-xs hover:bg-emerald-500/20 transition-all active:scale-[0.98]"
            >
              Continue as Guest (Demo Mode)
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Already verified? <Link to="/login" className="text-white font-bold hover:text-blue-400 transition-colors border-b border-white/10 pb-0.5">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
