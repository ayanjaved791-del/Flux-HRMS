import React, { useState } from 'react';
import {
  X,
  Building2,
  UserCheck,
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useHR } from '../../context/HRContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    allSessions,
    switchUser,
    loginUser,
    registerUser,
    company,
  } = useHR();

  const [mode, setMode] = useState<'switch' | 'login' | 'register'>('switch');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [companyName, setCompanyName] = useState(company.name);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickSwitch = (sessionId: string) => {
    switchUser(sessionId);
    setSuccessMsg('Switched active profile successfully.');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 600);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const ok = loginUser(email, role);
    if (ok) {
      setSuccessMsg(`Welcome back, ${email.split('@')[0]}!`);
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 700);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    registerUser({
      name,
      email,
      role,
      companyName,
    });
    setSuccessMsg(`Account & Workspace registered for ${name}!`);
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm">
              HR
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Workspace Authentication</h3>
              <p className="text-xs text-slate-500">Acme Cloud Technologies HRMS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-1.5 bg-slate-100 mx-6 mt-4 rounded-xl flex items-center text-xs font-semibold">
          <button
            onClick={() => setMode('switch')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
              mode === 'switch' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Demo Profiles
          </button>
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
              mode === 'register' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register Org
          </button>
        </div>

        {/* Content body */}
        <div className="p-6">
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'switch' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-500 mb-3">
                Switch instantly between pre-configured HR Admin and Employee roles to test both dashboards:
              </p>
              {allSessions.map((session) => {
                const isCurrent = currentUser.id === session.id;
                return (
                  <button
                    key={session.id}
                    onClick={() => handleQuickSwitch(session.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={session.avatar}
                        alt={session.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{session.name}</p>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider ${
                              session.role === 'admin'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {session.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{session.designation || session.email}</p>
                      </div>
                    </div>
                    {isCurrent ? (
                      <span className="text-[11px] font-semibold text-orange-600">Active</span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role Account</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      role === 'admin'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Admin / HR Director
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('employee')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      role === 'employee'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Staff / Employee
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-xs shadow-orange-200 transition-colors"
              >
                Sign In to Workspace
              </button>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Enterprise Name</label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex.m@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white"
                >
                  <option value="admin">Administrator / HR Executive</option>
                  <option value="employee">Standard Employee</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-xs shadow-orange-200 transition-colors"
              >
                Create Account & Join HRMS
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
