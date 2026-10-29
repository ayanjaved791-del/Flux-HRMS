import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Info,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

export const DedicatedLoginPage: React.FC = () => {
  const { company, loginUser, resetEntireSystem } = useHR();

  const [portalMode, setPortalMode] = useState<'employee' | 'admin'>('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    const res = loginUser(email, password, portalMode);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setSuccessMessage(res.message);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#0F172A] text-slate-100 flex flex-col justify-between p-4 sm:p-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-orange-500/20">
            {company.logo || 'HR'}
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">{company.name}</h1>
            <p className="text-xs text-slate-400">Enterprise People & Attendance Portal</p>
          </div>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
          title="Reset and register a new company"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset System</span>
        </button>
      </div>

      {/* Login Box */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Portal Switcher Tabs */}
          <div className="flex p-1 bg-slate-900 rounded-2xl mb-6 border border-slate-700/60">
            <button
              type="button"
              onClick={() => {
                setPortalMode('employee');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                portalMode === 'employee'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Employee Portal</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPortalMode('admin');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                portalMode === 'admin'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Console</span>
            </button>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {portalMode === 'employee' ? 'Employee Sign In' : 'Administrator Sign In'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {portalMode === 'employee'
                ? `Enter the email and credentials assigned by your company administrator.`
                : `Enter your master administrator credentials for ${company.name}.`}
            </p>
          </div>

          {/* Notifications */}
          {errorMessage && (
            <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {portalMode === 'employee' ? 'Employee Work Email' : 'Admin Official Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder={portalMode === 'employee' ? 'employee@company.com' : 'admin@company.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-mono pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all shadow-lg cursor-pointer ${
                portalMode === 'employee'
                  ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              <span>{portalMode === 'employee' ? 'Access Employee Dashboard' : 'Open Admin Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Notice for Employees */}
          {portalMode === 'employee' && (
            <div className="mt-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>
                First time logging in? Your login credentials are created and managed by your HR Administrator. Once logged in, you can update your name, email, and password anytime from your profile.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal to Reset System */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Reset & Reconfigure System?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will wipe the current workspace data, company registration, and employee roster, allowing you to register a brand new company and master administrator account.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  resetEntireSystem();
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-500 text-white"
              >
                Yes, Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-4xl w-full mx-auto text-center text-xs text-slate-500 pt-6 border-t border-slate-800">
        {company.name} · Powered by HRMate Enterprise Suite
      </div>
    </div>
  );
};
