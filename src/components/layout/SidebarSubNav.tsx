import React, { useState } from 'react';
import {
  Users,
  Network,
  FolderLock,
  Boxes,
  KeyRound,
  GitBranch,
  Webhook,
  Clock,
  Camera,
  FileSpreadsheet,
  CalendarDays,
  CalendarClock,
  Coins,
  Receipt,
  Gift,
  Globe2,
  Calculator,
  FileText,
  UserCheck,
  UserPlus,
  ShieldCheck,
  UserMinus,
  Briefcase,
  Target,
  Award,
  BookOpen,
  Compass,
  LineChart,
  BarChart3,
  HeartHandshake,
  Search,
  Building,
  UserCircle2,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

interface SubNavItem {
  id: string;
  label: string;
  icon: any;
  role: 'admin' | 'employee' | 'all';
  isAction?: boolean;
  badge?: string | number | null;
}

interface ModuleDef {
  title: string;
  subtitle: string;
  items: SubNavItem[];
}

export const SidebarSubNav: React.FC = () => {
  const {
    activeModule,
    activeSubTab,
    setActiveSubTab,
    activeRole,
    company,
    leaveRequests,
    timesheets,
    candidates,
    expenseClaims,
    setIsPunchModalOpen,
  } = useHR();

  const [searchTerm, setSearchTerm] = useState('');

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending').length;
  const pendingTimesheets = timesheets.filter((t) => t.status === 'Submitted').length;
  const pendingExpenses = expenseClaims.filter((e) => e.status === 'Pending').length;
  const activeCandidates = candidates.filter((c) => c.stage !== 'Hired' && c.stage !== 'Rejected').length;

  const moduleDefinitions: Record<string, ModuleDef> = {
    core: {
      title: 'Core Workspace',
      subtitle: 'Employee & org architecture',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3, role: 'admin' },
        { id: 'employee-ess', label: 'Employee Self-Service (ESS)', icon: UserCircle2, role: 'all' },
        { id: 'manager-mss', label: 'Manager Self-Service', icon: Users, role: 'all' },
        { id: 'employees', label: 'Centralized Directory', icon: Users, role: 'all' },
        { id: 'org-chart', label: 'Dynamic Org Chart', icon: Network, role: 'all' },
        { id: 'document-vault', label: 'Document Vault', icon: FolderLock, role: 'all' },
        { id: 'asset-ledger', label: 'Company Asset Ledger', icon: Boxes, role: 'all' },
        { id: 'rbac-matrix', label: 'Role-Based Access (RBAC)', icon: KeyRound, role: 'admin' },
        { id: 'workflow-builder', label: 'No-Code Workflow Builder', icon: GitBranch, role: 'admin' },
        { id: 'api-gateway', label: 'Third-Party API Gateway', icon: Webhook, role: 'admin' },
      ],
    },
    attendance: {
      title: 'Time & Attendance',
      subtitle: 'Biometrics & schedules',
      items: [
        { id: 'attendance-overview', label: 'Daily Punch Overview', icon: Clock, role: 'all' },
        { id: 'camera-checkin', label: 'Camera & Geofence Punch', icon: Camera, role: 'all', isAction: true },
        { id: 'project-timesheets', label: 'Project Timesheets', icon: FileSpreadsheet, role: 'all', badge: pendingTimesheets > 0 ? `${pendingTimesheets} pending` : null },
        { id: 'leave-tracker', label: 'Automated Leave & PTO', icon: CalendarDays, role: 'all', badge: pendingLeaves > 0 ? `${pendingLeaves} new` : null },
        { id: 'shift-scheduler', label: 'Shift & Roster Scheduler', icon: CalendarClock, role: 'all' },
        { id: 'overtime-engine', label: 'Overtime Calculation Engine', icon: Coins, role: 'all' },
        { id: 'holiday-calendar', label: 'Holiday Calendar Manager', icon: CalendarDays, role: 'all' },
      ],
    },
    payroll: {
      title: 'Payroll & Financials',
      subtitle: 'Disbursement & statutory tax',
      items: [
        { id: 'payroll-engine', label: 'Gross-to-Net Payroll Run', icon: Coins, role: 'admin' },
        { id: 'payslips', label: 'Payslip Distribution', icon: FileText, role: 'all' },
        { id: 'tax-calculator', label: 'Statutory Tax Calculator', icon: Calculator, role: 'all' },
        { id: 'expense-claims', label: 'Expense Reimbursement', icon: Receipt, role: 'all', badge: pendingExpenses > 0 ? `${pendingExpenses} pending` : null },
        { id: 'benefits-portal', label: 'Benefits Administration', icon: Gift, role: 'all' },
        { id: 'multi-currency', label: 'Multi-Currency Module', icon: Globe2, role: 'all' },
        { id: 'gratuity-calc', label: 'End-of-Service Gratuity', icon: Calculator, role: 'all' },
      ],
    },
    talent: {
      title: 'Talent Acquisition',
      subtitle: 'Hiring & employee lifecycle',
      items: [
        { id: 'ats-kanban', label: 'Applicant Tracking System (ATS)', icon: Briefcase, role: 'all', badge: activeCandidates > 0 ? `${activeCandidates}` : null },
        { id: 'interview-scheduler', label: 'Interview Scheduler', icon: CalendarClock, role: 'all' },
        { id: 'digital-onboarding', label: 'Digital Onboarding Checklist', icon: UserPlus, role: 'all' },
        { id: 'background-check', label: 'Employee Background Verifier', icon: ShieldCheck, role: 'admin' },
        { id: 'offboarding-tracker', label: 'Offboarding & De-provisioning', icon: UserMinus, role: 'admin' },
        { id: 'talent-pipeline', label: 'Candidate Talent Pipeline', icon: UserCheck, role: 'all' },
      ],
    },
    performance: {
      title: 'Performance & Retention',
      subtitle: 'Goals, appraisals & culture',
      items: [
        { id: 'okr-goals', label: 'OKR & Goal Tracking', icon: Target, role: 'all' },
        { id: '360-appraisal', label: '360° Appraisal Matrix', icon: Award, role: 'all' },
        { id: 'lms-learning', label: 'Learning Management (LMS)', icon: BookOpen, role: 'all' },
        { id: 'competency-map', label: 'Competency Framework', icon: Compass, role: 'all' },
        { id: 'succession-bench', label: 'Succession Planning Bench', icon: LineChart, role: 'admin' },
        { id: 'pulse-surveys', label: 'Employee Pulse Surveys', icon: HeartHandshake, role: 'all' },
        { id: 'peer-rewards', label: 'Peer Rewards & Kudos Wall', icon: Gift, role: 'all' },
        { id: 'workforce-analytics', label: 'Strategic Workforce Analytics', icon: BarChart3, role: 'admin' },
      ],
    },
    settings: {
      title: 'Logistics & Security',
      subtitle: 'Company governance & assets',
      items: [
        { id: 'company-profile', label: 'Company Profile & Geofence', icon: Building, role: 'admin' },
        { id: 'asset-ledger', label: 'Company Asset Ledger', icon: Boxes, role: 'all' },
        { id: 'rbac-matrix', label: 'Role-Based Access Control', icon: KeyRound, role: 'admin' },
        { id: 'workflow-builder', label: 'Workflow Automations', icon: GitBranch, role: 'admin' },
        { id: 'api-gateway', label: 'API Gateway & Webhooks', icon: Webhook, role: 'admin' },
      ],
    },
  };

  const currentMod = moduleDefinitions[activeModule];
  const filteredItems = currentMod.items.filter((item) => {
    const matchesSearch = item.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = item.role === 'all' || item.role === activeRole;
    return matchesSearch && matchesRole;
  });

  return (
    <nav aria-label="Module Subnavigation" className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between select-none">
      <div className="flex flex-col">
        {/* Module Header */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">{currentMod.title}</h2>
            <span className="text-[10px] font-semibold tracking-wider text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded-full">
              {activeRole}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{currentMod.subtitle}</p>

          {/* Quick Search inside module */}
          <div className="relative mt-3">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Feature Nav Items */}
        <div className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-210px)]">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isAction && item.id === 'camera-checkin') {
                    setIsPunchModalOpen(true);
                  } else {
                    setActiveSubTab(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all group ${
                  isActive
                    ? 'bg-orange-50 text-orange-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-orange-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="ml-1.5 shrink-0 px-1.5 py-0.5 text-[10px] font-semibold rounded bg-orange-100 text-orange-700">
                    {item.badge}
                  </span>
                )}

                {isActive && !item.badge && (
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Company Footprint */}
      <div className="p-3 m-3 bg-slate-50 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {company.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">{company.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{company.hqLocation.name.split(',')[0]}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
