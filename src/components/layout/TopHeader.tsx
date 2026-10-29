import React from 'react';
import {
  Search,
  Camera,
  MapPin,
  Bot,
  UserCheck,
  CheckCircle2,
  ChevronDown
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
  } = useHR();

  const moduleNames: Record<string, string> = {
    core: 'Core Workspace',
    attendance: 'Time & Attendance',
    payroll: 'Payroll & Financials',
    talent: 'Talent Acquisition',
    performance: 'Performance & Retention',
    settings: 'Logistics & Security',
  };

  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between gap-6 shrink-0 z-20">
      {/* Zone 1: Breadcrumb Trail */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 whitespace-nowrap shrink-0">
        <span className="text-slate-900 font-semibold">{company.name}</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700">{moduleNames[activeModule] || 'Workspace'}</span>
        <span className="text-slate-300">/</span>
        <span className="text-orange-600 font-semibold capitalize">
          {activeSubTab.replace(/-/g, ' ')}
        </span>
      </div>

      {/* Zone 2: Search Affordance & Geofence Status */}
      <div className="flex items-center gap-3 max-w-md w-full">
        <button
          onClick={onOpenGlobalSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search employees, candidates, policies...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Live Geofence Indicator */}
        <div
          className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg border shrink-0 ${
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
            {userLocation?.isWithinGeofence ? 'Office HQ (Verified)' : 'Remote Geofence'}
          </span>
        </div>
      </div>

      {/* Zone 3: Actions & Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Multi-Currency Selector */}
        <div className="relative">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 focus:outline-none cursor-pointer"
          >
            {Object.keys(currencyRates).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        {/* Role Switcher Pill */}
        <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => switchRole('admin')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              activeRole === 'admin'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => switchRole('employee')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              activeRole === 'employee'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Employee
          </button>
        </div>

        {/* Camera Punch-In Primary Button */}
        <button
          onClick={() => setIsPunchModalOpen(true)}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-xs ${
            isPunchedIn
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
              : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">
            {isPunchedIn
              ? `Punched In (${currentAttendanceRecord?.punchInTime || '09:00 AM'})`
              : 'Camera Punch In'}
          </span>
        </button>

        {/* Smart Assistant Toggle */}
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            isAssistantOpen
              ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden md:inline whitespace-nowrap">Assistant</span>
        </button>

        {/* User Profile Pill */}
        <button
          onClick={onOpenAuthModal}
          className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white transition-all text-left"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="hidden xl:block min-w-0">
            <p className="text-xs font-semibold text-slate-800 leading-tight truncate">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-slate-500 leading-none truncate capitalize">
              {currentUser.role}
            </p>
          </div>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </header>
  );
};
