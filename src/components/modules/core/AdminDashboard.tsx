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
  Camera,
  UserPlus,
  Sparkles
} from 'lucide-react';
import { useHR } from '../../../context/HRContext';

export const AdminDashboard: React.FC = () => {
  const {
    employees,
    attendanceRecords,
    leaveRequests,
    timesheets,
    goalsOKR,
    interviews,
    offboardingRecords,
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
  const pendingTimesheets = timesheets.filter((t) => t.status === 'Submitted');
  const todayStr = '2026-10-29';
  const presentCount = attendanceRecords.filter((r) => r.date === todayStr).length;

  // Real computed metrics
  const totalEmployeesCount = employees.length;
  const turnoverRateStr =
    employees.length > 0
      ? `${((offboardingRecords.length / employees.length) * 100).toFixed(1)}%`
      : '0.0%';

  const happinessScore = pulseSurvey.totalVotes > 0
    ? Math.round((pulseSurvey.averageRating / 5) * 100)
    : 100;

  const avgKpi = goalsOKR.length > 0
    ? (goalsOKR.reduce((sum, g) => sum + g.progress, 0) / goalsOKR.length).toFixed(1)
    : '0.0';

  // Employment breakdown calculated directly from state
  const permanentCount = employees.filter((e) => e.employmentType === 'Full-time').length;
  const contractCount = employees.filter((e) => e.employmentType === 'Contract').length;
  const probationCount = employees.filter((e) => e.employmentType === 'Probation' || e.employmentType === 'Part-time').length;

  const permPct = totalEmployeesCount > 0 ? Math.round((permanentCount / totalEmployeesCount) * 100) : 0;
  const contractPct = totalEmployeesCount > 0 ? Math.round((contractCount / totalEmployeesCount) * 100) : 0;
  const probationPct = totalEmployeesCount > 0 ? Math.round((probationCount / totalEmployeesCount) * 100) : 0;

  // Real actionable tasks derived from live state
  const dynamicTasks = [
    ...(pendingLeaves.length > 0
      ? [
          {
            title: `Review ${pendingLeaves.length} pending leave request${pendingLeaves.length > 1 ? 's' : ''}`,
            dept: 'People & Attendance',
            due: 'Action Required',
            progress: 25,
            module: 'attendance' as const,
            tab: 'leave-tracker',
          },
        ]
      : []),
    ...(pendingTimesheets.length > 0
      ? [
          {
            title: `Audit ${pendingTimesheets.length} project timesheet submission${pendingTimesheets.length > 1 ? 's' : ''}`,
            dept: 'Timesheets & Payroll',
            due: 'Weekly Review',
            progress: 50,
            module: 'attendance' as const,
            tab: 'project-timesheets',
          },
        ]
      : []),
    {
      title: 'Maintain Geofence & Office Attendance Compliance',
      dept: 'HQ Security & Biometrics',
      due: 'Ongoing',
      progress: presentCount > 0 ? 100 : 50,
      module: 'attendance' as const,
      tab: 'attendance-overview',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Welcome Banner */}
      <div className="relative rounded-2xl bg-[#DDF0FF] p-6 lg:p-7 border border-[#BDE0FE] flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            Thursday, October 29, 2026 · {company.name} Workspace
          </p>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Hello, {currentUser.name.split(' ')[0]}! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Live overview of your workforce lifecycle, attendance punches, payroll disbursements, and active talent.
          </p>
        </div>

        {/* 3 Metric Cards with Real State Calculations */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto">
          {/* Card 1: Total Employees */}
          <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3.5 border border-white/60 shadow-xs flex items-center gap-3.5 min-w-[170px]">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-orange-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                {totalEmployeesCount}
              </p>
              <p className="text-[11px] font-medium text-slate-500">Total Employees</p>
            </div>
          </div>

          {/* Card 2: Turnover Rate */}
          <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3.5 border border-white/60 shadow-xs flex items-center gap-3.5 min-w-[170px]">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-orange-200">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                {turnoverRateStr}
              </p>
              <p className="text-[11px] font-medium text-slate-500">Turnover Rate</p>
            </div>
          </div>

          {/* Card 3: Happiness Index */}
          <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3.5 border border-white/60 shadow-xs flex items-center gap-3.5 min-w-[170px]">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-orange-200">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 tabular-nums">
                {happinessScore}%
              </p>
              <p className="text-[11px] font-medium text-slate-500">Happiness Index</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns + Sidebar Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left & Middle columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Row 1: Team KPI + Attendance Bar Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Team KPI Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Strategic Goals & OKR Rate
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                        {avgKpi}%
                      </span>
                      {goalsOKR.length > 0 && (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center">
                          <ArrowUpRight className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveModule('performance');
                      setActiveSubTab('okr-goals');
                    }}
                    className="text-xs text-orange-600 hover:underline font-semibold"
                  >
                    View OKRs
                  </button>
                </div>

                <p className="text-xs text-slate-500 mt-1">
                  {goalsOKR.length > 0
                    ? `Tracking ${goalsOKR.length} active company and team objectives`
                    : 'No strategic OKRs created yet.'}
                </p>
              </div>

              {goalsOKR.length === 0 ? (
                <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 my-2">
                  <p className="text-xs text-slate-500 mb-2">Establish company & individual goals</p>
                  <button
                    onClick={() => {
                      setActiveModule('performance');
                      setActiveSubTab('okr-goals');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-2xs"
                  >
                    Create First Goal OKR
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-3">
                  {goalsOKR.slice(0, 2).map((g) => (
                    <div key={g.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-800 truncate">{g.title}</span>
                        <span className="font-mono text-orange-600 font-bold">{g.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div style={{ width: `${g.progress}%` }} className="h-full bg-orange-500 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Attendance Overview Bar Chart */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Today's Attendance Status
                    </h3>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      {presentCount} Checked In · {Math.max(0, totalEmployeesCount - presentCount)} Pending Punch
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPunchModalOpen(true)}
                    className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="Camera Punch In"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {presentCount === 0 ? (
                <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 my-2">
                  <p className="text-xs text-slate-500 mb-2">No punches recorded yet for today</p>
                  <button
                    onClick={() => setIsPunchModalOpen(true)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-2xs"
                  >
                    Punch In with Camera
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Attendance Rate Today:</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {totalEmployeesCount > 0
                        ? `${Math.round((presentCount / totalEmployeesCount) * 100)}%`
                        : '100%'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{
                        width: `${
                          totalEmployeesCount > 0
                            ? Math.round((presentCount / totalEmployeesCount) * 100)
                            : 100
                        }%`,
                      }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Verified through office HQ geofence coordinates.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Tasks Priority + Employment Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tasks list */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Active HR Action Queue
                </h3>
                <span className="text-[11px] font-medium text-slate-500">
                  {dynamicTasks.length} Pending
                </span>
              </div>

              <div className="space-y-3">
                {dynamicTasks.map((task) => (
                  <div
                    key={task.title}
                    onClick={() => {
                      setActiveModule(task.module);
                      setActiveSubTab(task.tab);
                    }}
                    className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/70 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{task.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {task.dept} · {task.due}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-semibold text-orange-600 hover:underline">
                        Open
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment Status Breakdown */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Employment Status
                </h3>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                      Full-time Staff:
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {permanentCount} ({permPct}%)
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                      Contractors:
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {contractCount} ({contractPct}%)
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                      Probation / Other:
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {probationCount} ({probationPct}%)
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveModule('core');
                  setActiveSubTab('employees');
                }}
                className="mt-4 w-full py-2 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors text-center"
              >
                Manage Staff Directory
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule & Approvals */}
        <div className="space-y-6">
          {/* Calendar & Today's Schedule */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Schedule & Interviews
              </h3>
              <span className="text-xs font-semibold text-orange-600">October 2026</span>
            </div>

            {interviews.length > 0 ? (
              <div className="space-y-3">
                {interviews.map((evt) => (
                  <div key={evt.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <p className="font-bold text-slate-900">{evt.candidateName}</p>
                    <p className="text-[11px] text-slate-500">{evt.roundName}</p>
                    <p className="text-[10px] text-orange-600 font-mono mt-1">
                      {evt.date} · {evt.time}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No meetings or interview sessions scheduled for today.
              </div>
            )}
          </div>

          {/* Pending Approval Inbox */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending Leaves ({pendingLeaves.length})
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
                  className="p-3 rounded-xl bg-orange-50/50 border border-orange-100 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{req.employeeName}</p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {req.days} days {req.type} Leave
                    </p>
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

              {pendingLeaves.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400 italic">
                  All employee leave requests are up to date!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
