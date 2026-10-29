import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Smile,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  MoreVertical,
  Plus,
  Briefcase,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useHR } from '../../../context/HRContext';

export const AdminDashboard: React.FC = () => {
  const {
    employees,
    attendanceRecords,
    leaveRequests,
    company,
    currentUser,
    setIsPunchModalOpen,
    setActiveModule,
    setActiveSubTab,
    pulseSurvey,
    setSelectedEmployeeDetail,
  } = useHR();

  const [kpiPeriod, setKpiPeriod] = useState<'monthly' | 'weekly'>('monthly');

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending');
  const presentCount = attendanceRecords.filter((r) => r.date === '2026-10-29').length;

  // KPI curve simulation
  const kpiPoints = [68, 72, 70, 78, 81, 84.45, 82, 86, 88];

  const scheduleEvents = [
    { time: '09:30 AM', title: 'Morning Leadership Standup', tag: 'Executive Sync', host: 'Matt Murdock' },
    { time: '11:00 AM', title: 'Design System 3.0 Review', tag: 'Product Design', host: 'Elena Rostova' },
    { time: '01:30 PM', title: 'Technical Interview: Staff ML', tag: 'Recruiting', host: 'Lucas Vance' },
    { time: '03:00 PM', title: 'Q4 Budget & Payroll Finalization', tag: 'Finance & HR', host: 'Aaliyah Patel' },
    { time: '04:30 PM', title: 'New Hire 90-Day Check-in', tag: 'Onboarding', host: 'Zoe Kaufman' },
  ];

  const tasks = [
    { title: 'Update Global Employee Handbook 2026-27', dept: 'Policy Assessment', due: 'Nov 05, 2026', progress: 75 },
    { title: 'Finalize Q4 Disbursal & Tax Withholding', dept: 'Financial Analysis', due: 'Nov 01, 2026', progress: 90 },
    { title: 'Screen Security Architect Shortlist', dept: 'Talent Acquisition', due: 'Oct 30, 2026', progress: 40 },
    { title: 'Upgrade Office HQ Geofence Radius to 150m', dept: 'IT Logistics', due: 'Completed', progress: 100 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner inspired directly by HRMate reference image */}
      <div className="relative rounded-2xl bg-[#DDF0FF] p-6 lg:p-7 border border-[#BDE0FE] flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 overflow-hidden">
        {/* Soft background curve visual */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none bg-gradient-to-l from-blue-300 to-transparent" />

        <div className="relative z-10">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            Thursday, October 29, 2026 · Office HQ Active
          </p>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Hello, {currentUser.name.split(' ')[0]}! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Track and orchestrate your enterprise workforce across attendance, payroll runs, OKRs, and strategic hiring pipelines.
          </p>
        </div>

        {/* 3 Metric Cards with orange badges matching the inspiration screenshot */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto">
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3.5 border border-white/60 shadow-xs flex items-center gap-3.5 min-w-[170px]">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-orange-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                1,242
              </p>
              <p className="text-[11px] font-medium text-slate-500">Total Employees</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3.5 border border-white/60 shadow-xs flex items-center gap-3.5 min-w-[170px]">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-orange-200">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                3.2%
              </p>
              <p className="text-[11px] font-medium text-slate-500">Turnover Rate</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3.5 border border-white/60 shadow-xs flex items-center gap-3.5 min-w-[170px]">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-orange-200">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                78%
              </p>
              <p className="text-[11px] font-medium text-slate-500">Happiness Index</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns + Sidebar Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left & Middle columns: Charts and Task status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Row 1: Team KPI Curve + Attendance Bar Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Team KPI Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Average Team KPI
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-slate-900 tabular-nums">84.45%</span>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +1.28%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-[11px]">
                  <button
                    onClick={() => setKpiPeriod('monthly')}
                    className={`px-2 py-1 rounded font-medium ${
                      kpiPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setKpiPeriod('weekly')}
                    className={`px-2 py-1 rounded font-medium ${
                      kpiPeriod === 'weekly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    Weekly
                  </button>
                </div>
              </div>

              {/* Clean SVG Trend Curve */}
              <div className="h-32 w-full pt-4 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="25" x2="300" y2="25" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="65" x2="300" y2="65" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Gradient fill */}
                  <defs>
                    <linearGradient id="kpiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FB923C" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#FB923C" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 0,70 Q 50,75 100,50 T 200,20 T 300,35 L 300,100 L 0,100 Z"
                    fill="url(#kpiGrad)"
                  />
                  <path
                    d="M 0,70 Q 50,75 100,50 T 200,20 T 300,35"
                    fill="none"
                    stroke="#FF6B4A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Active highlight marker */}
                  <circle cx="200" cy="20" r="4.5" fill="#FF6B4A" stroke="#FFFFFF" strokeWidth="2" />
                </svg>

                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                  <span>Oct</span>
                </div>
              </div>
            </div>

            {/* Attendance Overview Bar Chart */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Attendance Overview
                  </h3>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {presentCount} Present · {employees.length - presentCount} Remote / Leave
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-sky-400" /> Present
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-orange-400" /> Remote
                  </span>
                </div>
              </div>

              {/* Bar Columns */}
              <div className="h-32 flex items-end justify-between gap-2 pt-2 px-1">
                {[
                  { day: 'Mon', pres: 88, rem: 12 },
                  { day: 'Tue', pres: 92, rem: 8 },
                  { day: 'Wed', pres: 94, rem: 6 },
                  { day: 'Thu', pres: 90, rem: 10 },
                  { day: 'Fri', pres: 82, rem: 18 },
                  { day: 'Sat', pres: 30, rem: 70 },
                  { day: 'Sun', pres: 10, rem: 90 },
                ].map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full max-w-[24px] rounded-t-md overflow-hidden flex flex-col justify-end bg-slate-100 h-24">
                      <div
                        style={{ height: `${item.rem}%` }}
                        className="bg-orange-400 w-full"
                        title={`Remote: ${item.rem}%`}
                      />
                      <div
                        style={{ height: `${item.pres}%` }}
                        className="bg-sky-400 w-full"
                        title={`Present: ${item.pres}%`}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-slate-500">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Tasks Priority + Employee Satisfaction Gauge & Employment Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tasks list */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Strategic HR Tasks
                </h3>
                <span className="text-[11px] font-medium text-slate-500">4 Active Items</span>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.title}
                    className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{task.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {task.dept} · Due {task.due}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-800 tabular-nums">
                          {task.progress}%
                        </span>
                      </div>
                      <div className="w-12 h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          style={{ width: `${task.progress}%` }}
                          className={`h-full ${
                            task.progress === 100 ? 'bg-emerald-500' : 'bg-orange-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment Status Donut / Breakdown */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Employment Status
                </h3>

                {/* Donut Simulation */}
                <div className="relative w-28 h-28 mx-auto my-2 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Permanent 68% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#FF6B4A"
                      strokeWidth="3.2"
                      strokeDasharray="68 32"
                      strokeDashoffset="0"
                    />
                    {/* Contract 20% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#38BDF8"
                      strokeWidth="3.2"
                      strokeDasharray="20 80"
                      strokeDashoffset="-68"
                    />
                    {/* Probation 12% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#E2E8F0"
                      strokeWidth="3.2"
                      strokeDasharray="12 88"
                      strokeDashoffset="-88"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-lg font-extrabold text-slate-900 tabular-nums">1,242</span>
                    <span className="block text-[9px] uppercase font-bold text-slate-400">Total</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                      Permanent (68%)
                    </span>
                    <span className="font-semibold text-slate-800 tabular-nums">844</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                      Contract (20%)
                    </span>
                    <span className="font-semibold text-slate-800 tabular-nums">248</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      Probation (12%)
                    </span>
                    <span className="font-semibold text-slate-800 tabular-nums">150</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule & Quick Pending Approvals */}
        <div className="space-y-6">
          {/* Calendar & Today's Schedule */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Schedule & Agenda
              </h3>
              <span className="text-xs font-semibold text-orange-600">Oct 2026</span>
            </div>

            {/* Calendar Mini-Strip */}
            <div className="grid grid-cols-7 gap-1 text-center pb-4 border-b border-slate-100">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className="text-[10px] font-bold text-slate-400">
                  {d}
                </span>
              ))}
              {[26, 27, 28, 29, 30, 31, 1].map((date, idx) => {
                const isToday = date === 29;
                return (
                  <div
                    key={idx}
                    className={`py-1.5 rounded-lg text-xs font-medium ${
                      isToday
                        ? 'bg-orange-500 text-white font-bold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {date}
                  </div>
                );
              })}
            </div>

            {/* Schedule Timeline */}
            <div className="space-y-3 pt-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Today's Timeline
              </p>
              {scheduleEvents.map((evt, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <span className="text-[11px] font-mono text-slate-400 pt-0.5 w-16 shrink-0">
                    {evt.time}
                  </span>
                  <div className="min-w-0 border-l-2 border-slate-200 pl-2.5 space-y-0.5">
                    <p className="font-semibold text-slate-800 truncate">{evt.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {evt.tag} · {evt.host}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approval Inbox */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending Actions ({pendingLeaves.length})
              </h3>
              <button
                onClick={() => {
                  setActiveModule('attendance');
                  setActiveSubTab('leave-tracker');
                }}
                className="text-xs font-semibold text-orange-600 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingLeaves.map((req) => (
                <div
                  key={req.id}
                  className="p-3 rounded-xl bg-orange-50/50 border border-orange-100 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={req.employeeAvatar}
                      alt={req.employeeName}
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{req.employeeName}</p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {req.days} days {req.type} Leave
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveModule('attendance');
                      setActiveSubTab('leave-tracker');
                    }}
                    className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 hover:border-orange-500 text-slate-700 rounded-lg shadow-2xs transition-colors shrink-0"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
