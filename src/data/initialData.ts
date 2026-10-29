import {
  Company,
  Employee,
  AttendanceRecord,
  LeaveRequest,
  TimesheetEntry,
  ShiftRoster,
  OvertimeLog,
  Holiday,
  PayrollRun,
  ExpenseClaim,
  BenefitPlan,
  Candidate,
  InterviewSession,
  OnboardingTask,
  BackgroundCheck,
  OffboardingRecord,
  GoalOKR,
  AppraisalReview,
  LMSCourse,
  CompetencyItem,
  SuccessionPlan,
  PulseSurveyResponse,
  PeerKudo,
  CompanyAsset,
  DocumentItem,
  WorkflowRule,
  ApiKeyIntegration,
  UserSession
} from '../types';

export const initialCompany: Company = {
  id: 'comp_default',
  name: 'Acme Technologies',
  logo: 'HRMate',
  industry: 'Technology & Cloud Solutions',
  currency: 'USD',
  timezone: 'America/Los_Angeles (PST)',
  hqLocation: {
    name: 'Corporate HQ, 450 Mission St',
    latitude: 37.7749,
    longitude: -122.4194,
    radiusMeters: 150,
  },
};

// Initial admin employee representing the current workspace owner
export const initialEmployees: Employee[] = [
  {
    id: 'emp_admin',
    employeeCode: 'EMP-1001',
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'admin@company.io',
    phone: '+1 (415) 555-0100',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Human Resources',
    designation: 'VP of People & Culture',
    joiningDate: '2024-01-15',
    employmentType: 'Full-time',
    status: 'Active',
    salary: {
      baseMonthly: 12500,
      hra: 3125,
      specialAllowance: 1875,
      currency: 'USD',
    },
    leaveBalances: {
      annual: 20,
      sick: 10,
      casual: 5,
      parental: 15,
    },
    location: 'San Francisco, CA (HQ)',
    emergencyContact: {
      name: 'Taylor Morgan',
      relation: 'Spouse',
      phone: '+1 (415) 555-0101',
    },
  },
];

export const initialSessions: UserSession[] = [
  {
    id: 'user_admin',
    name: 'Alex Morgan',
    email: 'admin@company.io',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    companyId: 'comp_default',
    department: 'Human Resources',
    designation: 'VP of People & Culture',
    employeeId: 'emp_admin',
  },
];

export const initialAttendanceRecords: AttendanceRecord[] = [];

export const initialLeaveRequests: LeaveRequest[] = [];

export const initialTimesheets: TimesheetEntry[] = [];

export const initialShiftRosters: ShiftRoster[] = [
  {
    id: 'shift_admin',
    employeeId: 'emp_admin',
    employeeName: 'Alex Morgan',
    department: 'Human Resources',
    weekStart: '2026-10-26',
    shifts: {
      mon: 'Morning (09:00 - 17:00)',
      tue: 'Morning (09:00 - 17:00)',
      wed: 'Morning (09:00 - 17:00)',
      thu: 'Morning (09:00 - 17:00)',
      fri: 'Morning (09:00 - 17:00)',
      sat: 'Off',
      sun: 'Off',
    },
  },
];

export const initialHolidays: Holiday[] = [
  { id: 'hol_01', name: 'New Year\'s Day', date: '2026-01-01', day: 'Thursday', type: 'Public', isMandatory: true },
  { id: 'hol_02', name: 'Memorial Day', date: '2026-05-25', day: 'Monday', type: 'Public', isMandatory: true },
  { id: 'hol_03', name: 'Juneteenth Freedom Day', date: '2026-06-19', day: 'Friday', type: 'Public', isMandatory: true },
  { id: 'hol_04', name: 'Independence Day', date: '2026-07-04', day: 'Saturday', type: 'Public', isMandatory: true },
  { id: 'hol_05', name: 'Labor Day', date: '2026-09-07', day: 'Monday', type: 'Public', isMandatory: true },
  { id: 'hol_06', name: 'Thanksgiving Day', date: '2026-11-26', day: 'Thursday', type: 'Public', isMandatory: true },
  { id: 'hol_07', name: 'Christmas Day', date: '2026-12-25', day: 'Friday', type: 'Public', isMandatory: true },
];

export const initialPayrollRuns: PayrollRun[] = [];

export const initialExpenseClaims: ExpenseClaim[] = [];

export const initialBenefitPlans: BenefitPlan[] = [
  {
    id: 'ben_01',
    name: 'Comprehensive Health & Vision Plan',
    provider: 'National Healthcare Provider',
    category: 'Health Insurance',
    coverage: '$0 in-network preventive care, $15 generic copay, worldwide emergency coverage',
    employerContribution: 650,
    employeeContribution: 85,
    enrolledCount: 1,
    isEnrolled: true,
  },
  {
    id: 'ben_02',
    name: 'Retirement 401(k) Plan with Company Match',
    provider: 'Fidelity Retirement Services',
    category: 'Retirement 401(k)',
    coverage: 'Dollar-for-dollar employer match up to 5% of base compensation',
    employerContribution: 550,
    employeeContribution: 550,
    enrolledCount: 1,
    isEnrolled: true,
  },
  {
    id: 'ben_03',
    name: 'Comprehensive Dental Plus',
    provider: 'MetLife Dental',
    category: 'Dental & Vision',
    coverage: '$2,500 annual dental maximum, orthodontic coverage for dependents',
    employerContribution: 45,
    employeeContribution: 12,
    enrolledCount: 1,
    isEnrolled: true,
  },
  {
    id: 'ben_04',
    name: 'Monthly Wellness & Fitness Stipend',
    provider: 'Gympass & ClassPass',
    category: 'Wellness Stipend',
    coverage: 'Access to participating gyms, fitness centers, and wellness apps',
    employerContribution: 120,
    employeeContribution: 25,
    enrolledCount: 0,
    isEnrolled: false,
  },
];

export const initialCandidates: Candidate[] = [];

export const initialInterviews: InterviewSession[] = [];

export const initialOnboardingTasks: OnboardingTask[] = [
  { id: 'onb_01', employeeId: 'emp_admin', title: 'Sign Mutual Non-Disclosure Agreement', description: 'Complete corporate compliance packet', category: 'Documentation', completed: true, dueDate: '2026-11-01' },
  { id: 'onb_02', employeeId: 'emp_admin', title: 'Collect Work Laptop & Hardware', description: 'Receive encrypted device from IT', category: 'IT Setup', completed: true, dueDate: '2026-11-02' },
  { id: 'onb_03', employeeId: 'emp_admin', title: 'Setup Hardware MFA & Security Keys', description: 'Configure multi-factor authentication', category: 'IT Setup', completed: true, dueDate: '2026-11-03' },
  { id: 'onb_04', employeeId: 'emp_admin', title: 'Complete Compliance & Security Overview', description: 'Mandatory annual workplace security training', category: 'Compliance', completed: false, dueDate: '2026-11-10' },
  { id: 'onb_05', employeeId: 'emp_admin', title: 'Submit Direct Deposit & Tax W-4 Form', description: 'Upload payroll information to HR Vault', category: 'Documentation', completed: false, dueDate: '2026-11-12' },
];

export const initialBackgroundChecks: BackgroundCheck[] = [];

export const initialOffboardingRecords: OffboardingRecord[] = [];

export const initialGoalsOKR: GoalOKR[] = [];

export const initialAppraisals: AppraisalReview[] = [];

export const initialCourses: LMSCourse[] = [
  {
    id: 'lms_01',
    title: 'Workplace Security & Data Protection Best Practices',
    category: 'Compliance & Security',
    durationHours: 3.0,
    modulesCount: 5,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80',
    instructor: 'Corporate Security Team',
    progressPercent: 0,
    isEnrolled: false,
  },
  {
    id: 'lms_02',
    title: 'Modern Leadership & Cross-Functional Team Building',
    category: 'Management & People',
    durationHours: 4.5,
    modulesCount: 6,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80',
    instructor: 'People Operations Lead',
    progressPercent: 0,
    isEnrolled: false,
  },
  {
    id: 'lms_03',
    title: 'Effective Product Management & Agile Workflows',
    category: 'Product & Engineering',
    durationHours: 5.0,
    modulesCount: 7,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    instructor: 'Product Operations',
    progressPercent: 0,
    isEnrolled: false,
  },
];

export const initialCompetencies: CompetencyItem[] = [
  { id: 'comp_1', department: 'Engineering', skillName: 'Cloud Infrastructure & Architecture', requiredLevel: 4.5, currentAverageLevel: 4.0, gap: -0.5 },
  { id: 'comp_2', department: 'Design', skillName: 'Design Systems & UX Prototyping', requiredLevel: 4.5, currentAverageLevel: 4.5, gap: 0.0 },
  { id: 'comp_3', department: 'Human Resources', skillName: 'Workforce Planning & Compliance', requiredLevel: 4.5, currentAverageLevel: 4.5, gap: 0.0 },
  { id: 'comp_4', department: 'Operations', skillName: 'Security & Access Administration', requiredLevel: 4.0, currentAverageLevel: 4.0, gap: 0.0 },
];

export const initialSuccessionPlans: SuccessionPlan[] = [];

export const initialPulseSurvey: PulseSurveyResponse = {
  id: 'pulse_active',
  question: 'How energized and supported do you feel by your team and leadership this week?',
  averageRating: 5.0,
  totalVotes: 1,
  options: [
    { label: 'Exceedingly Energized & Thriving', count: 1, percentage: 100 },
    { label: 'Steady & Well-Paced', count: 0, percentage: 0 },
    { label: 'Slightly Fatigued / Need Break', count: 0, percentage: 0 },
    { label: 'Overwhelmed & Seeking Support', count: 0, percentage: 0 },
  ],
  userVotedOption: 'Exceedingly Energized & Thriving',
};

export const initialPeerKudos: PeerKudo[] = [];

export const initialCompanyAssets: CompanyAsset[] = [];

export const initialDocuments: DocumentItem[] = [];

export const initialWorkflows: WorkflowRule[] = [
  {
    id: 'wf_01',
    title: 'Automated Leave Approval (<= 2 Days)',
    triggerEvent: 'Leave Request Submitted',
    condition: 'Leave Days <= 2 AND Balance > Required',
    action: 'Auto-Approve, Deduct Balance, Notify Manager on Slack',
    isActive: true,
    executionsCount: 0,
  },
  {
    id: 'wf_02',
    title: 'High-Value Expense Multi-Tier Escalation',
    triggerEvent: 'Expense Claim Filed',
    condition: 'Claim Amount > $500',
    action: 'Route to VP Finance and Require Secondary Audit Signature',
    isActive: true,
    executionsCount: 0,
  },
];

export const initialApiKeys: ApiKeyIntegration[] = [
  { id: 'key_01', name: 'Primary HR Gateway Key', keyPrefix: 'ak_live_hrm_9012', environment: 'Production', createdDate: '2026-10-29', lastUsedDate: 'Active', scopes: ['employees:read', 'attendance:write', 'payroll:read'] },
];
