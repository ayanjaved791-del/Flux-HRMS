import React from 'react';
import {
  Search,
  Camera,
  MapPin,
  Bot,
  UserCheck,
  CheckCircle2,
  ChevronDown,
  LogOut,
  Shield,
  User
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

interface TopHeaderProps {
  onOpenAuthModal: () => void;
  onOpenGlobalSearch: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenAuthModal, onOpenGlobalSearch }) => {
  const {
    activeModule,
    activeSubTab,
    company,
    currentUser,
    activeRole,
    switchRole,
    isPunchedIn,
    currentAttendanceRecord,
    setIsPunchModalOpen,
    userLocation,
    selectedCurrency,
    setSelectedCurrency,
    currencyRates,
    isAssistantOpen,
    setIsAssistantOpen,
    logoutUser,
  } = useHR();

  const moduleNames: Record<string, string> = {
    core: activeRole === 'admin' ? 'Admin Workspace' : 'Employee Self-Service',
    attendance: 'Time & Attendance',
    payroll: 'Payroll & Compensation',
    talent: 'Talent Acquisition',
    performance: 'Performance & Goals',
    settings: 'Organization Settings',
  };

  const getSubTabLabel = (tab: string) => {
    const labels: Record<string, string> = {
      'dashboard': 'Executive Dashboard',
      'employee-ess': 'Personal Dashboard',
      'employees': 'Staff Directory',
      'applications': 'Applications & Approvals',
      'announcements': 'Broadcast Announcements',
      'payslip-studio': 'Payslip Designer',
      'employee-announcements': 'Company Broadcasts',
      'employee-applications': 'My Applications',
      'employee-payslips': 'My Payslips',
      'employee-profile': 'My Profile & Security',
      'attendance-overview': 'Biometric Logs',
      'leave-tracker': 'Time-Off & Leave',
      'payroll-engine': 'Payroll Disbursal',
    };
    return labels[tab] || tab.replace(/-/g, ' ');
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200 flex items-center justify-between gap-4 shrink-0 z-20">
      {/* Zone 1: Breadcrumb Trail */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 whitespace-nowrap shrink-0">
        <span className="text-slate-900 font-bold">{company.name}</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600 hidden sm:inline">{moduleNames[activeModule] || 'Workspace'}</span>
        <span className="text-slate-300 hidden sm:inline">/</span>
        <span className="text-orange-600 font-bold capitalize">
          {getSubTabLabel(activeSubTab)}
        </span>
      </div>

      {/* Zone 2: Search Affordance & Geofence Status */}
      <div className="flex items-center gap-3 max-w-sm w-full hidden md:flex">
        <button
          onClick={onOpenGlobalSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Search employees, requests, policies...</span>
          </div>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Live Geofence Indicator */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-xl border shrink-0 ${
            userLocation?.isWithinGeofence
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
          title={
            userLocation
              ? `Distance: ${userLocation.distanceMeters}m from HQ center`
              : 'Detecting geolocation...'
          }
        >
          <MapPin className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">
            {userLocation?.isWithinGeofence ? 'Office HQ' : 'Remote'}
          </span>
        </div>
      </div>

      {/* Zone 3: Actions & Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Multi-Currency Selector */}
        <div className="relative hidden sm:block">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:border-slate-300 focus:outline-none cursor-pointer"
          >
            {Object.keys(currencyRates).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        {/* Camera Punch-In Primary Button */}
        <button
          onClick={() => setIsPunchModalOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer ${
            isPunchedIn
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
              : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">
            {isPunchedIn
              ? `Punched In (${currentAttendanceRecord?.punchInTime || '09:00 AM'})`
              : 'Punch In'}
          </span>
        </button>

        {/* Smart Assistant Toggle */}
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
            isAssistantOpen
              ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Smart Assistant"
        >
          <Bot className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden xl:inline whitespace-nowrap">AI Helper</span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full border border-slate-200 bg-white">
          <img
            src={
              currentUser?.avatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
            }
            alt={currentUser?.name || 'User'}
            className="w-7 h-7 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="hidden lg:block min-w-0 max-w-[120px]">
            <p className="text-xs font-bold text-slate-800 leading-tight truncate">
              {currentUser?.name || 'Authorized Member'}
            </p>
            <p className="text-[10px] text-slate-500 leading-none truncate capitalize">
              {currentUser?.role || activeRole}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logoutUser}
          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
