export type UserRole = 'admin' | 'hr_manager' | 'employee' | 'company_owner';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  companyId: string;
  department?: string;
  designation?: string;
  employeeId?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  currency: string;
  timezone: string;
  hqLocation: {
    name: string;
    latitude: number;
    longitude: number;
    radiusMeters: number;
  };
}

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  department: 'Engineering' | 'Design' | 'Product' | 'Marketing' | 'Human Resources' | 'Finance' | 'Operations';
  designation: string;
  managerId?: string;
  joiningDate: string;
  employmentType: 'Full-time' | 'Contract' | 'Part-time' | 'Probation';
  status: 'Active' | 'On Leave' | 'Terminated' | 'Notice Period';
  salary: {
    baseMonthly: number;
    hra: number;
    specialAllowance: number;
    currency: string;
  };
  leaveBalances: {
    annual: number;
    sick: number;
    casual: number;
    parental: number;
  };
  location: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  punchInTime: string;
  punchOutTime?: string;
  punchInPhoto?: string; // Captured camera snapshot
  punchOutPhoto?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  isWithinGeofence: boolean;
  locationLabel: string;
  status: 'On Time' | 'Late' | 'Half Day' | 'Overtime' | 'Absent';
  workHours?: number;
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  type: 'Annual' | 'Sick' | 'Casual' | 'Parental' | 'Unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  approvedBy?: string;
  rejectionReason?: string;
}

export interface TimesheetEntry {
  id: string;
  employeeId: string;
  weekStarting: string;
  projectName: string;
  clientName: string;
  taskDescription: string;
  dailyHours: {
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
    sun: number;
  };
  isBillable: boolean;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  totalHours: number;
}

export interface ShiftRoster {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  weekStart: string;
  shifts: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };
}

export interface OvertimeLog {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  hours: number;
  multiplier: 1.5 | 2.0;
  baseHourlyRate: number;
  payoutAmount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Processed';
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  day: string;
  type: 'Public' | 'Company' | 'Regional';
  isMandatory: boolean;
}

export interface PayrollRun {
  id: string;
  period: string; // e.g., 'October 2026'
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  grossSalary: number;
  basicSalary: number;
  hra: number;
  allowances: number;
  statutoryTax: number;
  providentFund: number;
  benefitsDeduction: number;
  reimbursements: number;
  netPayable: number;
  paymentStatus: 'Paid' | 'Processing' | 'Hold';
  disbursedDate?: string;
  bankAccount: string;
}

export interface ExpenseClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  category: 'Travel' | 'Client Dinner' | 'Equipment' | 'Certification' | 'Wellness' | 'Other';
  amount: number;
  currency: string;
  expenseDate: string;
  receiptName?: string;
  receiptUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reimbursed';
  notes: string;
}

export interface BenefitPlan {
  id: string;
  name: string;
  provider: string;
  category: 'Health Insurance' | 'Retirement 401(k)' | 'Dental & Vision' | 'Wellness Stipend' | 'Commuter Pass';
  coverage: string;
  employerContribution: number;
  employeeContribution: number;
  enrolledCount: number;
  isEnrolled: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  experienceYears: number;
  stage: 'Sourced' | 'Screening' | 'Interview' | 'Technical Round' | 'Offer' | 'Hired' | 'Rejected';
  rating: number; // 1-5
  avatar: string;
  skills: string[];
  appliedDate: string;
  source: 'LinkedIn' | 'Referral' | 'Direct Career Page' | 'Headhunter' | 'Indeed';
  expectedSalary: string;
  notes: string;
}

export interface InterviewSession {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  roundName: string;
  date: string;
  time: string;
  interviewer: string;
  meetLink: string;
  scorecardNotes?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface OnboardingTask {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  category: 'Documentation' | 'IT Setup' | 'Compliance' | 'Culture & Meet';
  completed: boolean;
  dueDate: string;
}

export interface BackgroundCheck {
  id: string;
  employeeId: string;
  employeeName: string;
  agency: string;
  identityCheck: 'Verified' | 'Pending' | 'Flagged';
  educationCheck: 'Verified' | 'Pending' | 'Flagged';
  criminalCheck: 'Verified' | 'Pending' | 'Flagged';
  priorEmploymentCheck: 'Verified' | 'Pending' | 'Flagged';
  overallStatus: 'Passed' | 'Under Review' | 'Action Needed';
  updatedAt: string;
}

export interface OffboardingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  resignationDate: string;
  lastWorkingDay: string;
  reason: string;
  assetsReturned: boolean;
  accessRevoked: boolean;
  exitInterviewCompleted: boolean;
  financialClearance: boolean;
  status: 'Initiated' | 'In Progress' | 'Completed';
}

export interface GoalOKR {
  id: string;
  level: 'Company' | 'Department' | 'Individual';
  title: string;
  ownerId?: string;
  ownerName: string;
  quarter: string;
  progress: number; // 0 - 100
  keyResults: {
    id: string;
    text: string;
    target: number;
    current: number;
    unit: string;
  }[];
}

export interface AppraisalReview {
  id: string;
  revieweeId: string;
  revieweeName: string;
  reviewPeriod: string;
  overallRating: number;
  competencyScores: {
    leadership: number;
    execution: number;
    collaboration: number;
    innovation: number;
    technical: number;
  };
  managerFeedback: string;
  selfFeedback: string;
  peerFeedback: string;
  status: 'Draft' | 'Submitted' | 'Acknowledged';
}

export interface LMSCourse {
  id: string;
  title: string;
  category: string;
  durationHours: number;
  modulesCount: number;
  thumbnail: string;
  instructor: string;
  progressPercent: number;
  isEnrolled: boolean;
  badgeEarned?: string;
}

export interface CompetencyItem {
  id: string;
  department: string;
  skillName: string;
  requiredLevel: number; // 1-5
  currentAverageLevel: number; // 1-5
  gap: number;
}

export interface SuccessionPlan {
  id: string;
  criticalRole: string;
  incumbentName: string;
  readinessBenchmark: string;
  successors: {
    employeeId: string;
    name: string;
    avatar: string;
    readiness: 'Ready Now' | '1-2 Years' | 'Long Term';
    flightRisk: 'Low' | 'Medium' | 'High';
  }[];
}

export interface PulseSurveyResponse {
  id: string;
  question: string;
  averageRating: number;
  totalVotes: number;
  options: { label: string; count: number; percentage: number }[];
  userVotedOption?: string;
}

export interface PeerKudo {
  id: string;
  fromName: string;
  fromAvatar: string;
  toName: string;
  toAvatar: string;
  badge: 'Rockstar' | 'Team Player' | 'Innovator' | 'Problem Solver' | 'Empathetic Leader';
  message: string;
  points: number;
  timestamp: string;
  likes: number;
}

export interface CompanyAsset {
  id: string;
  assetTag: string;
  name: string;
  category: 'Laptop' | 'Monitor' | 'Peripherals' | 'Mobile Device' | 'Security Token';
  serialNumber: string;
  assignedToEmployeeId?: string;
  assignedToName?: string;
  status: 'Allocated' | 'In Stock' | 'Maintenance' | 'Decommissioned';
  purchaseDate: string;
  warrantyExpiry: string;
  purchaseValueUSD: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Offer Letter' | 'Non-Disclosure' | 'Tax W-4' | 'Identity Proof' | 'Company Policy' | 'Appraisal Letter';
  uploadedDate: string;
  fileSize: string;
  fileType: string;
  ownerId?: string;
  ownerName?: string;
  isCompanyWide: boolean;
}

export interface WorkflowRule {
  id: string;
  title: string;
  triggerEvent: string;
  condition: string;
  action: string;
  isActive: boolean;
  executionsCount: number;
}

export interface ApiKeyIntegration {
  id: string;
  name: string;
  keyPrefix: string;
  environment: 'Production' | 'Sandbox';
  createdDate: string;
  lastUsedDate: string;
  scopes: string[];
}
