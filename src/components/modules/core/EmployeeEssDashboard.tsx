import React, { useState } from 'react';
import {
  Camera,
  Calendar,
  Clock,
  Coins,
  FileText,
  Gift,
  MapPin,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Download,
  AlertCircle,
  Megaphone,
  Pin,
  User,
  ArrowRight
} from 'lucide-react';
import { useHR } from '../../../context/HRContext';

export const EmployeeEssDashboard: React.FC = () => {
  const {
    currentUser,
    employees,
    isPunchedIn,
    currentAttendanceRecord,
    setIsPunchModalOpen,
    leaveRequests,
    applyLeave,
    peerKudos,
    payrollRuns,
    setActiveModule,
    setActiveSubTab,
    userLocation,
    announcements,
    company
  } = useHR();

  const currentEmpId = currentUser?.employeeId || currentUser?.id;
  const currentEmp =
    employees.find((e) => e.id === currentEmpId) ||
    employees.find((e) => e.email.toLowerCase() === currentUser?.email.toLowerCase()) || {
      id: currentEmpId || 'emp_user',
      firstName: currentUser?.name.split(' ')[0] || 'Team',
      lastName: currentUser?.name.split(' ').slice(1).join(' ') || 'Member',
      avatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      designation: currentUser?.designation || 'Team Member',
      department: currentUser?.department || 'Operations',
      email: currentUser?.email || 'user@company.com',
      employeeCode: 'EMP-1001',
      leaveBalances: { annual: 20, sick: 10, casual: 5, parental: 15 },
      salary: { baseMonthly: 8000, hra: 2000, specialAllowance: 1000, currency: company.currency || 'USD' },
    };

  const [isApplyLeaveOpen, setIsApplyLeaveOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<'Annual' | 'Sick' | 'Casual' | 'Parental'>('Annual');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [leaveDays, setLeaveDays] = useState(1);
  const [leaveReason, setLeaveReason] = useState('');

  const myLeaves = leaveRequests.filter((l) => l.employeeId === currentEmp.id);
  const myPayslip = payrollRuns.find((p) => p.employeeId === currentEmp.id);

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;
    applyLeave({
      type: leaveType,
      startDate,
      endDate,
      days: Number(leaveDays),
      reason: leaveReason.trim(),
    });
    setIsApplyLeaveOpen(false);
    setLeaveReason('');
  };

  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 lg:p-8 shadow-sm shadow-orange-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentEmp.avatar}
            alt={currentEmp.firstName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="text-xs font-bold text-orange-200 uppercase tracking-wider">
              {company.name} · Employee Portal
            </span>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome, {currentEmp.firstName}!
            </h1>
            <p className="text-xs text-orange-100 mt-0.5">
              {currentEmp.designation} · {currentEmp.department} · {currentEmp.employeeCode}
            </p>
          </div>
        </div>

        {/* Quick Camera Punch Button in Hero */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPunchModalOpen(true)}
            className="px-4 py-2.5 bg-white text-orange-600 font-bold text-xs rounded-xl shadow-md hover:bg-orange-50 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>
              {isPunchedIn
                ? `Punched In (${currentAttendanceRecord?.punchInTime || '09:00 AM'})`
                : 'Camera Punch-In'}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('employee-profile')}
            className="px-3 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            title="Edit Profile & Password"
          >
            <User className="w-3.5 h-3.5" />
            <span>My Profile</span>
          </button>
        </div>
      </div>

      {/* Announcements Stream for Employee */}
      {recentAnnouncements.length > 0 && (
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-orange-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Company Announcements & Broadcasts
              </h3>
            </div>
            <button
              onClick={() => setActiveSubTab('employee-announcements')}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>View All ({announcements.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recentAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  ann.pinned
                    ? 'border-orange-300 bg-orange-50/30'
                    : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {ann.pinned && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-orange-100 text-orange-700">
                      <Pin className="w-2.5 h-2.5 rotate-45" /> Pinned
                    </span>
                  )}
                  <span className="text-[10px] font-semibold text-slate-500">{ann.category}</span>
                  <span className="text-[10px] text-slate-400">· {ann.publishDate}</span>
                </div>
                <h4 className="font-bold text-slate-900 leading-snug line-clamp-1">{ann.title}</h4>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid: Punch Status & Location + Leave Balances */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Clock-In & Location Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Today's Biometric Attendance
            </h3>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                isPunchedIn
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isPunchedIn ? 'Checked In' : 'Not Clocked In'}
            </span>
          </div>

          {/* Snapshot or status indicator */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
            {currentAttendanceRecord?.punchInPhoto ? (
              <img
                src={currentAttendanceRecord.punchInPhoto}
                alt="Punch snap"
                className="w-16 h-16 rounded-xl object-cover border border-slate-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl">
                <Clock className="w-7 h-7" />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-slate-800">
                {isPunchedIn
                  ? `Clocked in at ${currentAttendanceRecord?.punchInTime}`
                  : 'Ready to Punch In'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {currentAttendanceRecord?.status || 'Scheduled Shift: 09:00 AM - 05:00 PM'}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">
                {currentAttendanceRecord?.locationLabel || `${company.hqLocation.name}`}
              </p>
            </div>
          </div>

          {/* Location Verification Details */}
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-blue-900 font-semibold">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Geofence Verified
              </span>
              <span className="text-[10px] text-blue-600 font-mono">
                {userLocation ? `${userLocation.distanceMeters}m from HQ` : 'Office Center'}
              </span>
            </div>
            <p className="text-[11px] text-blue-700">
              Verified within {company.name} office boundary radius.
            </p>
          </div>

          <button
            onClick={() => setIsPunchModalOpen(true)}
            className="w-full py-2.5 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Open Camera Biometric Scanner
          </button>
        </div>

        {/* Center & Right Columns: Leave Balances & Fast Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leave Balances Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Leave & PTO Balances
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Annual paid time-off allocations</p>
              </div>
              <button
                onClick={() => setIsApplyLeaveOpen(true)}
                className="px-3.5 py-1.5 text-xs font-bold bg-orange-600 text-white rounded-xl shadow-xs hover:bg-orange-700 transition-colors cursor-pointer"
              >
                Apply for Leave
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEmp.leaveBalances?.annual ?? 20}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Annual Leave</p>
                <p className="text-[10px] text-slate-400">Days available</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEmp.leaveBalances?.sick ?? 10}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Sick Leave</p>
                <p className="text-[10px] text-slate-400">Days available</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEmp.leaveBalances?.casual ?? 5}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Casual Leave</p>
                <p className="text-[10px] text-slate-400">Days available</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEmp.leaveBalances?.parental ?? 15}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Parental Leave</p>
                <p className="text-[10px] text-slate-400">Days available</p>
              </div>
            </div>

            {/* My Recent Leave Requests */}
            {myLeaves.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 mb-2">Recent Leave Status</p>
                <div className="space-y-2">
                  {myLeaves.slice(0, 3).map((l) => (
                    <div
                      key={l.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-800">
                          {l.type} Leave · {l.days} days
                        </span>
                        <p className="text-[11px] text-slate-500">
                          {l.startDate} to {l.endDate} ({l.reason})
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          l.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : l.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {l.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Row: Quick Payslip + Fast Link to Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quick Payslip Widget */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Official Payslip
                  </h3>
                  <FileText className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-xl font-extrabold text-slate-900 tabular-nums font-mono">
                  ${Math.round(currentEmp.salary.baseMonthly * 0.83).toLocaleString()} {currentEmp.salary.currency}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Period: October 2026 · Custom Designed
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('employee-payslips')}
                className="mt-4 w-full py-2 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> View Custom Payslip
              </button>
            </div>

            {/* Profile & Security Widget */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Credentials & Sync
                  </h3>
                  <User className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {currentEmp.firstName} {currentEmp.lastName}
                </p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{currentEmp.email}</p>
                <p className="text-[11px] text-emerald-600 mt-1 font-semibold">
                  ✓ Synchronized with Admin Directory
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('employee-profile')}
                className="mt-4 w-full py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Change Name, Email & Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isApplyLeaveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Request Paid Time Off (PTO)</h3>
              <button
                onClick={() => setIsApplyLeaveOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                >
                  <option value="Annual">Annual Paid Leave</option>
                  <option value="Sick">Sick / Medical Leave</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Parental">Parental Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Days Count</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  required
                  value={leaveDays}
                  onChange={(e) => setLeaveDays(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Request *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Taking family annual break..."
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsApplyLeaveOpen(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs"
                >
                  Submit to Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
