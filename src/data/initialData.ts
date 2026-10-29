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
  UserSession,
  Announcement,
  PayslipTemplate
} from '../types';

export const initialCompany: Company = {
  id: 'comp_default',
  name: 'Enterprise HRMS',
  logo: 'HRMate',
  industry: 'Corporate & Technology',
  currency: 'USD',
  timezone: 'America/New_York (EST)',
  hqLocation: {
    name: 'Corporate HQ Suite 400',
    latitude: 37.7749,
    longitude: -122.4194,
    radiusMeters: 200,
  },
};

// No fake dummy profiles — users create their own company and employee roster
export const initialEmployees: Employee[] = [];

export const initialSessions: UserSession[] = [];

export const initialAnnouncements: Announcement[] = [];

export const defaultPayslipTemplate: PayslipTemplate = {
  fontFamily: 'Plus Jakarta Sans',
  primaryColor: '#ea580c',
  headerStyle: 'banner',
  headerTitle: 'CONFIDENTIAL SALARY DISBURSEMENT STATEMENT',
  headerSubtitle: 'Certified Monthly Compensation & Benefits Breakdown',
  companyTaxNumber: 'TAX-REG-2026-90812',
  showLogo: true,
  showQrCode: true,
  earningsHeading: 'Monthly Gross Earnings & Allowances',
  deductionsHeading: 'Statutory Taxes & Payroll Deductions',
  netPayHeading: 'Net Take-Home Disbursed Compensation',
  accountDetailsHeading: 'Disbursement Account Credentials',
  footerNote: 'This voucher is an authenticated digital record of payroll disbursement. Direct deposit verified through corporate banking gateway.',
  showEmployerSignature: true,
  signatoryTitle: 'Authorized Payroll Administrator',
  signatoryName: 'Office of People & Finance',
};

export const initialAttendanceRecords: AttendanceRecord[] = [];

export const initialLeaveRequests: LeaveRequest[] = [];

export const initialTimesheets: TimesheetEntry[] = [];

export const initialShiftRosters: ShiftRoster[] = [];

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

export const initialOnboardingTasks: OnboardingTask[] = [];

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
