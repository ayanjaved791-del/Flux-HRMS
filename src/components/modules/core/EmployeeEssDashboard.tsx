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
  AlertCircle
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
    shiftRosters,
  } = useHR();

  const currentEmp =
    employees.find((e) => e.id === currentUser.employeeId) ||
    employees.find((e) => e.email.toLowerCase() === currentUser.email.toLowerCase()) ||
    employees[1]; // default to Elena

  const [isApplyLeaveOpen, setIsApplyLeaveOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<'Annual' | 'Sick' | 'Casual' | 'Parental'>('Annual');
  const [startDate, setStartDate] = useState('2026-11-05');
  const [endDate, setEndDate] = useState('2026-11-06');
  const [leaveDays, setLeaveDays] = useState(2);
  const [leaveReason, setLeaveReason] = useState('');

  const myLeaves = leaveRequests.filter((l) => l.employeeId === currentEmp.id);
  const myKudos = peerKudos.filter((k) => k.toName.includes(currentEmp.firstName));
  const myPayslip = payrollRuns.find((p) => p.employeeId === currentEmp.id);
  const myShift = shiftRosters.find((s) => s.employeeId === currentEmp.id);

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;
    applyLeave({
      type: leaveType,
      startDate,
      endDate,
      days: Number(leaveDays),
      reason: leaveReason,
    });
    setIsApplyLeaveOpen(false);
    setLeaveReason('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 lg:p-7 shadow-sm shadow-orange-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentEmp.avatar}
            alt={currentEmp.firstName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="text-xs font-semibold text-orange-100 uppercase tracking-wider">
              Employee Self-Service (ESS)
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
            className="px-4 py-2.5 bg-white text-orange-600 font-bold text-xs rounded-xl shadow-md hover:bg-orange-50 transition-colors flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>
              {isPunchedIn
                ? `Punch-Out (In: ${currentAttendanceRecord?.punchInTime || '09:00 AM'})`
                : 'Camera Punch-In'}
            </span>
          </button>
        </div>
      </div>

      {/* Grid: Punch Status & Location + Leave Balances */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Clock-In & Location Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Today's Attendance Status
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
                {currentAttendanceRecord?.locationLabel || 'San Francisco HQ'}
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
                {userLocation ? `${userLocation.distanceMeters}m from HQ` : 'HQ Active'}
              </span>
            </div>
            <p className="text-[11px] text-blue-700">
              Your device is connected to the Acme Cloud Mission St campus.
            </p>
          </div>

          <button
            onClick={() => setIsPunchModalOpen(true)}
            className="w-full py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Open Camera Viewfinder
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
                className="px-3.5 py-1.5 text-xs font-semibold bg-orange-500 text-white rounded-lg shadow-xs hover:bg-orange-600 transition-colors"
              >
                Apply for Leave
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEmp.leaveBalances.annual}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Annual Leave</p>
                <p className="text-[10px] text-slate-400">Days available</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEmp.leaveBalances.sick}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Sick Leave</p>
                <p className="text-[10px] text-slate-400">Days available</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEmp.leaveBalances.casual}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Casual Leave</p>
                <p className="text-[10px] text-slate-400">Days available</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEmp.leaveBalances.parental}
                </span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Parental Leave</p>
                <p className="text-[10px] text-slate-400">Days available</p>
              </div>
            </div>

            {/* My Recent Leave Requests */}
            {myLeaves.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 mb-2">My Leave Requests</p>
                <div className="space-y-2">
                  {myLeaves.map((l) => (
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

          {/* Row: Quick Payslip + Peer Kudos Stream */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quick Payslip Widget */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Latest Payslip
                  </h3>
                  <FileText className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                  ${myPayslip ? myPayslip.netPayable.toLocaleString() : '11,895'} USD
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Period: October 2026 · Status: Paid
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveModule('payroll');
                  setActiveSubTab('payslips');
                }}
                className="mt-4 w-full py-2 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> View Detailed Payslip
              </button>
            </div>

            {/* Peer Recognition Received */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Kudos & Recognition
                  </h3>
                  <Gift className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {myKudos.reduce((sum, k) => sum + k.points, 250)} pts
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {myKudos.length > 0 ? `Latest: "${myKudos[0].badge}" from ${myKudos[0].fromName}` : 'No new kudos'}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveModule('performance');
                  setActiveSubTab('peer-rewards');
                }}
                className="mt-4 w-full py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              >
                Send Kudo to Teammate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isApplyLeaveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Request Paid Time Off (PTO)</h3>
              <button
                onClick={() => setIsApplyLeaveOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
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
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="Annual">Annual Vacation ({currentEmp.leaveBalances.annual} days left)</option>
                  <option value="Sick">Sick Leave ({currentEmp.leaveBalances.sick} days left)</option>
                  <option value="Casual">Casual Leave ({currentEmp.leaveBalances.casual} days left)</option>
                  <option value="Parental">Parental Leave ({currentEmp.leaveBalances.parental} days left)</option>
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
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Days</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  required
                  value={leaveDays}
                  onChange={(e) => setLeaveDays(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason / Note</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide context for manager approval..."
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsApplyLeaveOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-xs"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
