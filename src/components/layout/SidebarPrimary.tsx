import React from 'react';
import {
  LayoutDashboard,
  Clock,
  Wallet,
  Users2,
  Target,
  ShieldCheck,
  Bot,
  Camera,
  ArrowRightLeft,
  Building2,
  Sparkles
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

interface SidebarPrimaryProps {
  onOpenAuthModal: () => void;
}

export const SidebarPrimary: React.FC<SidebarPrimaryProps> = ({ onOpenAuthModal }) => {
  const {
    activeModule,
    setActiveModule,
    setActiveSubTab,
    activeRole,
    switchRole,
    currentUser,
    isPunchedIn,
    setIsPunchModalOpen,
    isAssistantOpen,
    setIsAssistantOpen,
    leaveRequests,
    candidates
  } = useHR();

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending').length;
  const activeCandidates = candidates.filter((c) => c.stage !== 'Hired' && c.stage !== 'Rejected').length;

  const modules = [
    {
      id: 'core' as const,
      label: 'Core Workspace',
      icon: LayoutDashboard,
      defaultTab: activeRole === 'admin' ? 'dashboard' : 'employee-ess',
      badge: null,
    },
    {
      id: 'attendance' as const,
      label: 'Time & Attendance',
      icon: Clock,
      defaultTab: 'attendance-overview',
      badge: pendingLeaves > 0 ? pendingLeaves : null,
    },
    {
      id: 'payroll' as const,
      label: 'Payroll & Finance',
      icon: Wallet,
      defaultTab: 'payroll-engine',
      badge: null,
    },
    {
      id: 'talent' as const,
      label: 'Talent & Recruiting',
      icon: Users2,
      defaultTab: 'ats-kanban',
      badge: activeCandidates > 0 ? activeCandidates : null,
    },
    {
      id: 'performance' as const,
      label: 'Performance & OKR',
      icon: Target,
      defaultTab: 'okr-goals',
      badge: null,
    },
    {
      id: 'settings' as const,
      label: 'Logistics & Security',
      icon: ShieldCheck,
      defaultTab: 'asset-ledger',
      badge: null,
    },
  ];

  return (
    <aside className="w-18 shrink-0 bg-white border-r border-slate-200 flex flex-col items-center py-4 justify-between z-30 select-none">
      {/* Top: Brand Logo */}
      <div className="flex flex-col items-center gap-6 w-full">
        <button
          onClick={() => {
            setActiveModule('core');
            setActiveSubTab(activeRole === 'admin' ? 'dashboard' : 'employee-ess');
          }}
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 transition-colors shadow-xs"
          title="HRMate Home"
        >
          <div className="w-6 h-6 flex items-center justify-center font-bold text-lg tracking-tighter">
            <span className="text-orange-600 font-extrabold text-xl">HR</span>
          </div>
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>

        {/* Primary Navigation Icons */}
        <nav className="flex flex-col items-center gap-2 w-full px-2">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModule(mod.id);
                  setActiveSubTab(mod.defaultTab);
                }}
                className={`group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-200'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
                title={mod.label}
              >
                <Icon className="w-5 h-5" />

                {/* Subdued badge count */}
                {mod.badge && (
                  <span
                    className={`absolute -top-1 -right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold rounded-full ring-2 ring-white ${
                      isActive ? 'bg-slate-900 text-white' : 'bg-orange-500 text-white'
                    }`}
                  >
                    {mod.badge}
                  </span>
                )}

                {/* Tooltip on hover */}
                <span className="absolute left-16 px-2.5 py-1 text-xs font-medium text-white bg-slate-800 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {mod.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions: Punch In, Smart Assistant, Role Switch, User */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        {/* Quick Camera Punch Button */}
        <button
          onClick={() => setIsPunchModalOpen(true)}
          className={`group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all ${
            isPunchedIn
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
              : 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 animate-pulse'
          }`}
          title={isPunchedIn ? 'Punch Out with Camera' : 'Punch In with Camera'}
        >
          <Camera className="w-5 h-5" />
          <span className="absolute left-16 px-2.5 py-1 text-xs font-medium text-white bg-slate-800 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {isPunchedIn ? 'Camera Punch-Out' : 'Camera Punch-In'}
          </span>
        </button>

        {/* Smart Helper Assistant Trigger */}
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={`group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all ${
            isAssistantOpen
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
          title="HRMate Smart Assistant"
        >
          <Bot className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-white" />
          <span className="absolute left-16 px-2.5 py-1 text-xs font-medium text-white bg-slate-800 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Smart Helper Assistant
          </span>
        </button>

        {/* Divider */}
        <div className="w-8 h-px bg-slate-200 my-1" />

        {/* Role Toggle Button */}
        <button
          onClick={() => {
            const nextRole = activeRole === 'admin' ? 'employee' : 'admin';
            switchRole(nextRole);
            if (nextRole === 'employee') {
              setActiveModule('core');
              setActiveSubTab('employee-ess');
            } else {
              setActiveModule('core');
              setActiveSubTab('dashboard');
            }
          }}
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title={`Switch to ${activeRole === 'admin' ? 'Employee View' : 'Admin View'}`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span className="absolute left-16 px-2.5 py-1 text-xs font-medium text-white bg-slate-800 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Switch: {activeRole === 'admin' ? 'Admin → Employee' : 'Employee → Admin'}
          </span>
        </button>

        {/* User Avatar & Login Modal Trigger */}
        <button
          onClick={onOpenAuthModal}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 hover:border-orange-500 transition-all"
          title="Account & Company Login"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute left-16 px-2.5 py-1 text-xs font-medium text-white bg-slate-800 rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {currentUser.name} ({activeRole.toUpperCase()})
          </span>
        </button>
      </div>
    </aside>
  );
};
