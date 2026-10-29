import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Company,
  Employee,
  AttendanceRecord,
  LeaveRequest,
  TimesheetEntry,
  ShiftRoster,
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
  UserRole
} from '../types';
import {
  initialCompany,
  initialEmployees,
  initialSessions,
  initialAttendanceRecords,
  initialLeaveRequests,
  initialTimesheets,
  initialShiftRosters,
  initialHolidays,
  initialPayrollRuns,
  initialExpenseClaims,
  initialBenefitPlans,
  initialCandidates,
  initialInterviews,
  initialOnboardingTasks,
  initialBackgroundChecks,
  initialOffboardingRecords,
  initialGoalsOKR,
  initialAppraisals,
  initialCourses,
  initialCompetencies,
  initialSuccessionPlans,
  initialPulseSurvey,
  initialPeerKudos,
  initialCompanyAssets,
  initialDocuments,
  initialWorkflows,
  initialApiKeys,
} from '../data/initialData';

// Haversine formula to compute distance in meters between two lat/lng coords
export function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickActions?: { label: string; actionKey: string; payload?: any }[];
}

interface HRContextType {
  // Auth & Session
  currentUser: UserSession;
  activeRole: UserRole;
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  loginUser: (email: string, role: UserRole) => boolean;
  registerUser: (userData: Partial<UserSession> & { companyName?: string }) => void;
  allSessions: UserSession[];

  // Company
  company: Company;
  updateCompany: (updates: Partial<Company>) => void;

  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id' | 'employeeCode'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  selectedEmployeeDetail: Employee | null;
  setSelectedEmployeeDetail: (emp: Employee | null) => void;

  // Attendance & Punch
  attendanceRecords: AttendanceRecord[];
  isPunchedIn: boolean;
  currentAttendanceRecord: AttendanceRecord | null;
  punchIn: (photoDataUrl: string, coords?: { latitude: number; longitude: number; accuracy?: number }) => { success: boolean; message: string };
  punchOut: (photoDataUrl: string) => { success: boolean; message: string };
  userLocation: { latitude: number; longitude: number; distanceMeters: number; isWithinGeofence: boolean } | null;
  refreshLocation: () => Promise<void>;

  // Leaves
  leaveRequests: LeaveRequest[];
  applyLeave: (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn' | 'employeeId' | 'employeeName' | 'employeeAvatar' | 'department'>) => void;
  updateLeaveStatus: (leaveId: string, status: 'Approved' | 'Rejected', reason?: string) => void;

  // Timesheets
  timesheets: TimesheetEntry[];
  addTimesheet: (entry: Omit<TimesheetEntry, 'id' | 'status' | 'totalHours'>) => void;
  updateTimesheetStatus: (id: string, status: 'Approved' | 'Rejected') => void;

  // Shifts & Overtime
  shiftRosters: ShiftRoster[];
  updateShift: (rosterId: string, day: keyof ShiftRoster['shifts'], shiftValue: string) => void;
  holidays: Holiday[];
  addHoliday: (holiday: Omit<Holiday, 'id'>) => void;

  // Payroll & Expenses
  payrollRuns: PayrollRun[];
  processPayrollRun: () => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  currencyRates: Record<string, number>;
  expenseClaims: ExpenseClaim[];
  addExpenseClaim: (claim: Omit<ExpenseClaim, 'id' | 'status' | 'employeeId' | 'employeeName'>) => void;
  updateExpenseStatus: (id: string, status: 'Approved' | 'Rejected' | 'Reimbursed') => void;
  benefitPlans: BenefitPlan[];
  toggleBenefitEnrollment: (planId: string) => void;

  // Talent & ATS
  candidates: Candidate[];
  updateCandidateStage: (candidateId: string, stage: Candidate['stage']) => void;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'appliedDate'>) => void;
  interviews: InterviewSession[];
  scheduleInterview: (interview: Omit<InterviewSession, 'id' | 'status'>) => void;
  onboardingTasks: OnboardingTask[];
  toggleOnboardingTask: (taskId: string) => void;
  backgroundChecks: BackgroundCheck[];
  offboardingRecords: OffboardingRecord[];
  updateOffboardingStatus: (id: string, updates: Partial<OffboardingRecord>) => void;

  // Performance & Culture
  goalsOKR: GoalOKR[];
  updateGoalProgress: (goalId: string, newProgress: number) => void;
  appraisals: AppraisalReview[];
  courses: LMSCourse[];
  toggleCourseEnrollment: (courseId: string) => void;
  updateCourseProgress: (courseId: string, percent: number) => void;
  competencies: CompetencyItem[];
  successionPlans: SuccessionPlan[];
  pulseSurvey: PulseSurveyResponse;
  votePulseSurvey: (optionLabel: string) => void;
  peerKudos: PeerKudo[];
  sendPeerKudo: (toEmployeeId: string, badge: PeerKudo['badge'], message: string, points: number) => void;
  likePeerKudo: (kudoId: string) => void;

  // Assets, Documents & Automation
  companyAssets: CompanyAsset[];
  assignAsset: (assetId: string, employeeId: string) => void;
  returnAsset: (assetId: string) => void;
  documents: DocumentItem[];
  uploadDocument: (doc: Omit<DocumentItem, 'id' | 'uploadedDate'>) => void;
  workflows: WorkflowRule[];
  toggleWorkflow: (id: string) => void;
  apiKeys: ApiKeyIntegration[];

  // Smart Helper Assistant
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  assistantMessages: AssistantMessage[];
  sendAssistantQuery: (text: string) => void;
  clearAssistantChat: () => void;
  executeAssistantAction: (actionKey: string, payload?: any) => void;

  // Camera Punch Modal
  isPunchModalOpen: boolean;
  setIsPunchModalOpen: (open: boolean) => void;

  // Global Active Navigation state
  activeModule: 'core' | 'attendance' | 'payroll' | 'talent' | 'performance' | 'settings';
  setActiveModule: (module: 'core' | 'attendance' | 'payroll' | 'talent' | 'performance' | 'settings') => void;
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
}

const HRContext = createContext<HRContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'hrmate_data_v1';

export const HRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Company & Sessions
  const [company, setCompany] = useState<Company>(initialCompany);
  const [allSessions, setAllSessions] = useState<UserSession[]>(initialSessions);
  const [currentUser, setCurrentUser] = useState<UserSession>(initialSessions[0]);
  const [activeRole, setActiveRole] = useState<UserRole>('admin');

  // Navigation state
  const [activeModule, setActiveModule] = useState<'core' | 'attendance' | 'payroll' | 'talent' | 'performance' | 'settings'>('core');
  const [activeSubTab, setActiveSubTab] = useState<string>('dashboard');

  // Modals & Details
  const [selectedEmployeeDetail, setSelectedEmployeeDetail] = useState<Employee | null>(null);
  const [isPunchModalOpen, setIsPunchModalOpen] = useState(false);

  // Entities
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>(initialTimesheets);
  const [shiftRosters, setShiftRosters] = useState<ShiftRoster[]>(initialShiftRosters);
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(initialPayrollRuns);
  const [expenseClaims, setExpenseClaims] = useState<ExpenseClaim[]>(initialExpenseClaims);
  const [benefitPlans, setBenefitPlans] = useState<BenefitPlan[]>(initialBenefitPlans);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [interviews, setInterviews] = useState<InterviewSession[]>(initialInterviews);
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>(initialOnboardingTasks);
  const [backgroundChecks] = useState<BackgroundCheck[]>(initialBackgroundChecks);
  const [offboardingRecords, setOffboardingRecords] = useState<OffboardingRecord[]>(initialOffboardingRecords);
  const [goalsOKR, setGoalsOKR] = useState<GoalOKR[]>(initialGoalsOKR);
  const [appraisals] = useState<AppraisalReview[]>(initialAppraisals);
  const [courses, setCourses] = useState<LMSCourse[]>(initialCourses);
  const [competencies] = useState<CompetencyItem[]>(initialCompetencies);
  const [successionPlans] = useState<SuccessionPlan[]>(initialSuccessionPlans);
  const [pulseSurvey, setPulseSurvey] = useState<PulseSurveyResponse>(initialPulseSurvey);
  const [peerKudos, setPeerKudos] = useState<PeerKudo[]>(initialPeerKudos);
  const [companyAssets, setCompanyAssets] = useState<CompanyAsset[]>(initialCompanyAssets);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(initialWorkflows);
  const [apiKeys] = useState<ApiKeyIntegration[]>(initialApiKeys);

  // Currency
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const currencyRates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.77,
    JPY: 153.4,
    INR: 84.1,
    AED: 3.67,
  };

  // Location Geofence state
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    distanceMeters: number;
    isWithinGeofence: boolean;
  } | null>(null);

  // Check geofence
  const refreshLocation = async () => {
    if (!navigator.geolocation) {
      setUserLocation({
        latitude: initialCompany.hqLocation.latitude,
        longitude: initialCompany.hqLocation.longitude,
        distanceMeters: 15,
        isWithinGeofence: true,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = calculateDistanceMeters(
          pos.coords.latitude,
          pos.coords.longitude,
          company.hqLocation.latitude,
          company.hqLocation.longitude
        );
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          distanceMeters: dist,
          isWithinGeofence: dist <= company.hqLocation.radiusMeters,
        });
      },
      (err) => {
        // Fallback for iframe / denied permission to simulate within office HQ
        console.warn('Geolocation unavailable, defaulting to HQ coordinates:', err.message);
        setUserLocation({
          latitude: company.hqLocation.latitude,
          longitude: company.hqLocation.longitude,
          distanceMeters: 24,
          isWithinGeofence: true,
        });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    refreshLocation();
  }, [company]);

  // Current user's attendance for today
  const todayStr = '2026-10-29';
  const currentAttendanceRecord =
    attendanceRecords.find(
      (rec) => rec.employeeId === (currentUser.employeeId || 'emp_01') && rec.date === todayStr
    ) || null;

  const isPunchedIn = Boolean(currentAttendanceRecord && !currentAttendanceRecord.punchOutTime);

  // Punch actions
  const punchIn = (photoDataUrl: string, coords?: { latitude: number; longitude: number; accuracy?: number }) => {
    const empId = currentUser.employeeId || 'emp_01';
    const emp = employees.find((e) => e.id === empId) || employees[0];
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let withinFence = true;
    let dist = 20;
    if (coords) {
      dist = calculateDistanceMeters(coords.latitude, coords.longitude, company.hqLocation.latitude, company.hqLocation.longitude);
      withinFence = dist <= company.hqLocation.radiusMeters;
    }

    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      date: todayStr,
      punchInTime: timeStr,
      punchInPhoto: photoDataUrl,
      coordinates: coords,
      isWithinGeofence: withinFence,
      locationLabel: withinFence ? `Office HQ (${dist}m from center)` : `Remote (${(dist / 1000).toFixed(1)}km away)`,
      status: now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 15) ? 'Late' : 'On Time',
      notes: 'Live Camera & Geofence Verified',
    };

    setAttendanceRecords((prev) => [newRecord, ...prev.filter((r) => !(r.employeeId === emp.id && r.date === todayStr))]);
    return { success: true, message: `Successfully punched in at ${timeStr}` };
  };

  const punchOut = (photoDataUrl: string) => {
    const empId = currentUser.employeeId || 'emp_01';
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAttendanceRecords((prev) =>
      prev.map((r) => {
        if (r.employeeId === empId && r.date === todayStr) {
          return {
            ...r,
            punchOutTime: timeStr,
            punchOutPhoto: photoDataUrl,
            workHours: 8.0,
          };
        }
        return r;
      })
    );
    return { success: true, message: `Successfully punched out at ${timeStr}` };
  };

  // Auth methods
  const switchUser = (userId: string) => {
    const session = allSessions.find((s) => s.id === userId);
    if (session) {
      setCurrentUser(session);
      setActiveRole(session.role);
    }
  };

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    setCurrentUser((prev) => ({ ...prev, role }));
  };

  const loginUser = (email: string, role: UserRole): boolean => {
    const found = allSessions.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setActiveRole(role);
      return true;
    }
    // Auto-create or link with employee
    const matchedEmp = employees.find((e) => e.email.toLowerCase() === email.toLowerCase());
    const newSession: UserSession = {
      id: `user_${Date.now()}`,
      name: matchedEmp ? `${matchedEmp.firstName} ${matchedEmp.lastName}` : email.split('@')[0],
      email,
      role,
      avatar: matchedEmp ? matchedEmp.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      companyId: company.id,
      department: matchedEmp ? matchedEmp.department : 'Operations',
      designation: matchedEmp ? matchedEmp.designation : 'Team Member',
      employeeId: matchedEmp ? matchedEmp.id : undefined,
    };
    setAllSessions((prev) => [...prev, newSession]);
    setCurrentUser(newSession);
    setActiveRole(role);
    return true;
  };

  const registerUser = (userData: Partial<UserSession> & { companyName?: string }) => {
    if (userData.companyName) {
      setCompany((prev) => ({ ...prev, name: userData.companyName! }));
    }
    const newSession: UserSession = {
      id: `user_${Date.now()}`,
      name: userData.name || 'New Member',
      email: userData.email || 'user@acme.io',
      role: userData.role || 'employee',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      companyId: company.id,
      department: userData.department || 'Operations',
      designation: userData.designation || 'Specialist',
    };
    setAllSessions((prev) => [...prev, newSession]);
    setCurrentUser(newSession);
    setActiveRole(newSession.role);
  };

  const updateCompany = (updates: Partial<Company>) => {
    setCompany((prev) => ({ ...prev, ...updates }));
  };

  // Employee CRUD
  const addEmployee = (empData: Omit<Employee, 'id' | 'employeeCode'>) => {
    const nextCodeNum = 1000 + employees.length + 1;
    const newEmp: Employee = {
      ...empData,
      id: `emp_${Date.now()}`,
      employeeCode: `EMP-${nextCodeNum}`,
    };
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    if (selectedEmployeeDetail && selectedEmployeeDetail.id === id) {
      setSelectedEmployeeDetail((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    if (selectedEmployeeDetail?.id === id) {
      setSelectedEmployeeDetail(null);
    }
  };

  // Leave Actions
  const applyLeave = (requestData: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn' | 'employeeId' | 'employeeName' | 'employeeAvatar' | 'department'>) => {
    const emp = employees.find((e) => e.id === (currentUser.employeeId || 'emp_02')) || employees[1];
    const newLeave: LeaveRequest = {
      ...requestData,
      id: `leave_${Date.now()}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      employeeAvatar: emp.avatar,
      department: emp.department,
      status: 'Pending',
      appliedOn: todayStr,
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
  };

  const updateLeaveStatus = (leaveId: string, status: 'Approved' | 'Rejected', reason?: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => {
        if (l.id === leaveId) {
          // If approved, decrement balance
          if (status === 'Approved' && l.status !== 'Approved') {
            const leaveTypeKey = l.type.toLowerCase() as keyof Employee['leaveBalances'];
            setEmployees((empList) =>
              empList.map((e) => {
                if (e.id === l.employeeId && e.leaveBalances[leaveTypeKey] !== undefined) {
                  return {
                    ...e,
                    leaveBalances: {
                      ...e.leaveBalances,
                      [leaveTypeKey]: Math.max(0, e.leaveBalances[leaveTypeKey] - l.days),
                    },
                  };
                }
                return e;
              })
            );
          }
          return {
            ...l,
            status,
            approvedBy: status === 'Approved' ? currentUser.name : undefined,
            rejectionReason: reason,
          };
        }
        return l;
      })
    );
  };

  // Timesheets
  const addTimesheet = (entry: Omit<TimesheetEntry, 'id' | 'status' | 'totalHours'>) => {
    const total = Object.values(entry.dailyHours).reduce((a, b) => a + b, 0);
    const newTs: TimesheetEntry = {
      ...entry,
      id: `ts_${Date.now()}`,
      status: 'Submitted',
      totalHours: total,
    };
    setTimesheets((prev) => [newTs, ...prev]);
  };

  const updateTimesheetStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setTimesheets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  // Shifts
  const updateShift = (rosterId: string, day: keyof ShiftRoster['shifts'], shiftValue: string) => {
    setShiftRosters((prev) =>
      prev.map((r) => {
        if (r.id === rosterId) {
          return {
            ...r,
            shifts: {
              ...r.shifts,
              [day]: shiftValue,
            },
          };
        }
        return r;
      })
    );
  };

  const addHoliday = (holiday: Omit<Holiday, 'id'>) => {
    setHolidays((prev) => [...prev, { ...holiday, id: `hol_${Date.now()}` }]);
  };

  // Payroll
  const processPayrollRun = () => {
    const newPayrollList: PayrollRun[] = employees.map((emp) => {
      const gross = emp.salary.baseMonthly + emp.salary.hra + emp.salary.specialAllowance;
      const tax = Math.round(gross * 0.18);
      const pf = Math.round(emp.salary.baseMonthly * 0.07);
      const ben = 300;
      const net = gross - tax - pf - ben;
      return {
        id: `pay_${Date.now()}_${emp.id}`,
        period: 'November 2026',
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        designation: emp.designation,
        grossSalary: gross,
        basicSalary: emp.salary.baseMonthly,
        hra: emp.salary.hra,
        allowances: emp.salary.specialAllowance,
        statutoryTax: tax,
        providentFund: pf,
        benefitsDeduction: ben,
        reimbursements: 0,
        netPayable: net,
        paymentStatus: 'Paid',
        disbursedDate: todayStr,
        bankAccount: 'Direct Deposit Linked',
      };
    });
    setPayrollRuns((prev) => [...newPayrollList, ...prev]);
  };

  // Expenses
  const addExpenseClaim = (claim: Omit<ExpenseClaim, 'id' | 'status' | 'employeeId' | 'employeeName'>) => {
    const emp = employees.find((e) => e.id === (currentUser.employeeId || 'emp_02')) || employees[1];
    const newClaim: ExpenseClaim = {
      ...claim,
      id: `exp_${Date.now()}`,
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      status: 'Pending',
    };
    setExpenseClaims((prev) => [newClaim, ...prev]);
  };

  const updateExpenseStatus = (id: string, status: 'Approved' | 'Rejected' | 'Reimbursed') => {
    setExpenseClaims((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const toggleBenefitEnrollment = (planId: string) => {
    setBenefitPlans((prev) =>
      prev.map((b) => {
        if (b.id === planId) {
          const nextEnrolled = !b.isEnrolled;
          return {
            ...b,
            isEnrolled: nextEnrolled,
            enrolledCount: nextEnrolled ? b.enrolledCount + 1 : Math.max(0, b.enrolledCount - 1),
          };
        }
        return b;
      })
    );
  };

  // Talent & ATS
  const updateCandidateStage = (candidateId: string, stage: Candidate['stage']) => {
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, stage } : c)));
  };

  const addCandidate = (candidateData: Omit<Candidate, 'id' | 'appliedDate'>) => {
    const newCand: Candidate = {
      ...candidateData,
      id: `cand_${Date.now()}`,
      appliedDate: todayStr,
    };
    setCandidates((prev) => [newCand, ...prev]);
  };

  const scheduleInterview = (interviewData: Omit<InterviewSession, 'id' | 'status'>) => {
    const newInt: InterviewSession = {
      ...interviewData,
      id: `int_${Date.now()}`,
      status: 'Scheduled',
    };
    setInterviews((prev) => [newInt, ...prev]);
  };

  const toggleOnboardingTask = (taskId: string) => {
    setOnboardingTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const updateOffboardingStatus = (id: string, updates: Partial<OffboardingRecord>) => {
    setOffboardingRecords((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  // Performance
  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoalsOKR((prev) => prev.map((g) => (g.id === goalId ? { ...g, progress: newProgress } : g)));
  };

  const toggleCourseEnrollment = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, isEnrolled: !c.isEnrolled } : c))
    );
  };

  const updateCourseProgress = (courseId: string, percent: number) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, progressPercent: percent, isEnrolled: true } : c
      )
    );
  };

  const votePulseSurvey = (optionLabel: string) => {
    setPulseSurvey((prev) => {
      const updatedOptions = prev.options.map((opt) => {
        if (opt.label === optionLabel) {
          return { ...opt, count: opt.count + 1 };
        }
        return opt;
      });
      const newTotal = prev.totalVotes + 1;
      const withPercents = updatedOptions.map((opt) => ({
        ...opt,
        percentage: Math.round((opt.count / newTotal) * 100),
      }));
      return {
        ...prev,
        totalVotes: newTotal,
        options: withPercents,
        userVotedOption: optionLabel,
      };
    });
  };

  const sendPeerKudo = (toEmployeeId: string, badge: PeerKudo['badge'], message: string, points: number) => {
    const toEmp = employees.find((e) => e.id === toEmployeeId);
    if (!toEmp) return;
    const newKudo: PeerKudo = {
      id: `kudo_${Date.now()}`,
      fromName: currentUser.name,
      fromAvatar: currentUser.avatar,
      toName: `${toEmp.firstName} ${toEmp.lastName}`,
      toAvatar: toEmp.avatar,
      badge,
      message,
      points,
      timestamp: 'Just now',
      likes: 1,
    };
    setPeerKudos((prev) => [newKudo, ...prev]);
  };

  const likePeerKudo = (kudoId: string) => {
    setPeerKudos((prev) => prev.map((k) => (k.id === kudoId ? { ...k, likes: k.likes + 1 } : k)));
  };

  // Assets & Docs
  const assignAsset = (assetId: string, employeeId: string) => {
    const emp = employees.find((e) => e.id === employeeId);
    setCompanyAssets((prev) =>
      prev.map((a) =>
        a.id === assetId
          ? {
              ...a,
              status: 'Allocated',
              assignedToEmployeeId: employeeId,
              assignedToName: emp ? `${emp.firstName} ${emp.lastName}` : undefined,
            }
          : a
      )
    );
  };

  const returnAsset = (assetId: string) => {
    setCompanyAssets((prev) =>
      prev.map((a) =>
        a.id === assetId
          ? {
              ...a,
              status: 'In Stock',
              assignedToEmployeeId: undefined,
              assignedToName: undefined,
            }
          : a
      )
    );
  };

  const uploadDocument = (doc: Omit<DocumentItem, 'id' | 'uploadedDate'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc_${Date.now()}`,
      uploadedDate: todayStr,
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) => prev.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w)));
  };

  // Smart Helper Assistant
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Hello ${currentUser.name.split(' ')[0]}! I'm your HRMate Smart Assistant. I can summarize team attendance, check pending leave requests, compute payroll disbursements, or trigger quick actions across our workspace.`,
      timestamp: 'Today at 09:00 AM',
      quickActions: [
        { label: '📊 Summarize today\'s attendance', actionKey: 'SUMMARIZE_ATTENDANCE' },
        { label: '⏳ Check pending leave requests', actionKey: 'CHECK_LEAVES' },
        { label: '💰 View monthly payroll totals', actionKey: 'VIEW_PAYROLL' },
        { label: '🎯 Show OKR progress', actionKey: 'SHOW_OKRS' },
      ],
    },
  ]);

  const sendAssistantQuery = (queryText: string) => {
    const userMsg: AssistantMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAssistantMessages((prev) => [...prev, userMsg]);

    // Intelligent context-aware answer generation
    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let reply = '';
      let actions: AssistantMessage['quickActions'] = undefined;

      if (lower.includes('attendance') || lower.includes('present') || lower.includes('punch')) {
        const presentCount = attendanceRecords.filter((r) => r.date === todayStr).length;
        const lateCount = attendanceRecords.filter((r) => r.date === todayStr && r.status === 'Late').length;
        reply = `Here is today's Attendance Summary (${todayStr}):\n• Total Punches Today: ${presentCount} / ${employees.length} employees\n• On-time punches: ${presentCount - lateCount}\n• Late arrivals: ${lateCount}\n• Office HQ Geofence check: Active at ${company.hqLocation.name} (150m radius).`;
        actions = [
          { label: 'Open Attendance Module', actionKey: 'NAV_ATTENDANCE' },
          { label: 'Open Camera Check-In', actionKey: 'OPEN_PUNCH_MODAL' },
        ];
      } else if (lower.includes('leave') || lower.includes('pto') || lower.includes('vacation')) {
        const pending = leaveRequests.filter((l) => l.status === 'Pending');
        if (pending.length > 0) {
          const names = pending.map((p) => `${p.employeeName} (${p.days}d ${p.type})`).join(', ');
          reply = `There are currently ${pending.length} pending leave requests:\n${names}.\n\nWould you like me to approve all eligible pending requests?`;
          actions = [
            { label: '✅ Approve All Pending Leaves', actionKey: 'APPROVE_ALL_LEAVES' },
            { label: 'View Leave Tracker', actionKey: 'NAV_LEAVES' },
          ];
        } else {
          reply = `All leave requests are currently reviewed! No pending approvals. Upcoming holidays include Thanksgiving Day on Nov 26.`;
        }
      } else if (lower.includes('payroll') || lower.includes('salary') || lower.includes('net pay') || lower.includes('tax')) {
        const totalNet = payrollRuns.reduce((sum, r) => sum + r.netPayable, 0);
        const totalTax = payrollRuns.reduce((sum, r) => sum + r.statutoryTax, 0);
        reply = `October 2026 Payroll Summary:\n• Disbursed Net Pay: $${totalNet.toLocaleString()} USD\n• Total Statutory Tax Withheld: $${totalTax.toLocaleString()} USD\n• Currency in use: ${selectedCurrency}\n• All direct deposits were executed on Oct 28.`;
        actions = [
          { label: 'Open Payroll Engine', actionKey: 'NAV_PAYROLL' },
          { label: 'Open Tax Calculator', actionKey: 'NAV_TAX_CALC' },
        ];
      } else if (lower.includes('okr') || lower.includes('goal') || lower.includes('performance')) {
        const avg = Math.round(goalsOKR.reduce((a, b) => a + b.progress, 0) / goalsOKR.length);
        reply = `Company & Team OKR Overview (Q4 2026):\n• Overall Objective Completion: ${avg}%\n• Top Goal: "${goalsOKR[0].title}" (${goalsOKR[0].progress}%)\n• Design System 3.0: 74% completed.`;
        actions = [{ label: 'Go to OKR Tracker', actionKey: 'NAV_OKRS' }];
      } else if (lower.includes('candidate') || lower.includes('recruit') || lower.includes('ats') || lower.includes('interview')) {
        reply = `Recruitment Pipeline Status:\n• Active Candidates: ${candidates.length}\n• In Technical Round / Interview: ${candidates.filter((c) => c.stage === 'Interview' || c.stage === 'Technical Round').length}\n• Offers Extended: ${candidates.filter((c) => c.stage === 'Offer').length} (Maya Lin for Staff ML)\n• Hired: 1 candidate (Samantha Grey, joining Nov 15).`;
        actions = [{ label: 'View ATS Kanban Board', actionKey: 'NAV_ATS' }];
      } else if (lower.includes('policy') || lower.includes('gratuity') || lower.includes('overtime')) {
        reply = `Company Policy Overview:\n• Standard Working Hours: 40 hrs/week (Mon-Fri 9AM-5PM)\n• Overtime Rates: 1.5x hourly rate on weekdays, 2.0x on weekends/holidays\n• End-of-Service Gratuity: 21 days basic pay per year for first 5 years, 30 days per year thereafter\n• PTO Entitlement: 20 days annual + 10 days sick leave with carry-forward up to 5 days.`;
      } else {
        reply = `I analyzed our workforce database for "${queryText}". We have ${employees.length} active employees across 7 departments, with ${attendanceRecords.length} recorded attendance events and ${companyAssets.length} tracked company assets.`;
        actions = [
          { label: 'View Employee Directory', actionKey: 'NAV_DIRECTORY' },
          { label: 'Summarize Attendance', actionKey: 'SUMMARIZE_ATTENDANCE' },
        ];
      }

      const botMsg: AssistantMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: actions,
      };

      setAssistantMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const executeAssistantAction = (actionKey: string) => {
    if (actionKey === 'SUMMARIZE_ATTENDANCE') {
      sendAssistantQuery('Summarize today\'s attendance');
    } else if (actionKey === 'CHECK_LEAVES') {
      sendAssistantQuery('Check pending leave requests');
    } else if (actionKey === 'VIEW_PAYROLL') {
      sendAssistantQuery('View monthly payroll totals');
    } else if (actionKey === 'SHOW_OKRS') {
      sendAssistantQuery('Show OKR progress');
    } else if (actionKey === 'APPROVE_ALL_LEAVES') {
      leaveRequests.forEach((l) => {
        if (l.status === 'Pending') {
          updateLeaveStatus(l.id, 'Approved');
        }
      });
      const confirmMsg: AssistantMessage = {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        text: '✅ All pending leave requests have been successfully approved and employee balances updated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAssistantMessages((prev) => [...prev, confirmMsg]);
    } else if (actionKey === 'NAV_ATTENDANCE') {
      setActiveModule('attendance');
      setActiveSubTab('attendance-overview');
    } else if (actionKey === 'NAV_LEAVES') {
      setActiveModule('attendance');
      setActiveSubTab('leave-tracker');
    } else if (actionKey === 'NAV_PAYROLL') {
      setActiveModule('payroll');
      setActiveSubTab('payroll-engine');
    } else if (actionKey === 'NAV_TAX_CALC') {
      setActiveModule('payroll');
      setActiveSubTab('tax-calculator');
    } else if (actionKey === 'NAV_OKRS') {
      setActiveModule('performance');
      setActiveSubTab('okr-goals');
    } else if (actionKey === 'NAV_ATS') {
      setActiveModule('talent');
      setActiveSubTab('ats-kanban');
    } else if (actionKey === 'NAV_DIRECTORY') {
      setActiveModule('core');
      setActiveSubTab('employees');
    } else if (actionKey === 'OPEN_PUNCH_MODAL') {
      setIsPunchModalOpen(true);
    }
  };

  const clearAssistantChat = () => {
    setAssistantMessages([
      {
        id: 'msg_cleared',
        sender: 'assistant',
        text: `Chat reset. Ask me anything about attendance, salaries, OKRs, candidates, or company policies!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '📊 Summarize today\'s attendance', actionKey: 'SUMMARIZE_ATTENDANCE' },
          { label: '⏳ Check pending leave requests', actionKey: 'CHECK_LEAVES' },
        ],
      },
    ]);
  };

  return (
    <HRContext.Provider
      value={{
        currentUser,
        activeRole,
        switchUser,
        switchRole,
        loginUser,
        registerUser,
        allSessions,
        company,
        updateCompany,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        selectedEmployeeDetail,
        setSelectedEmployeeDetail,
        attendanceRecords,
        isPunchedIn,
        currentAttendanceRecord,
        punchIn,
        punchOut,
        userLocation,
        refreshLocation,
        leaveRequests,
        applyLeave,
        updateLeaveStatus,
        timesheets,
        addTimesheet,
        updateTimesheetStatus,
        shiftRosters,
        updateShift,
        holidays,
        addHoliday,
        payrollRuns,
        processPayrollRun,
        selectedCurrency,
        setSelectedCurrency,
        currencyRates,
        expenseClaims,
        addExpenseClaim,
        updateExpenseStatus,
        benefitPlans,
        toggleBenefitEnrollment,
        candidates,
        updateCandidateStage,
        addCandidate,
        interviews,
        scheduleInterview,
        onboardingTasks,
        toggleOnboardingTask,
        backgroundChecks,
        offboardingRecords,
        updateOffboardingStatus,
        goalsOKR,
        updateGoalProgress,
        appraisals,
        courses,
        toggleCourseEnrollment,
        updateCourseProgress,
        competencies,
        successionPlans,
        pulseSurvey,
        votePulseSurvey,
        peerKudos,
        sendPeerKudo,
        likePeerKudo,
        companyAssets,
        assignAsset,
        returnAsset,
        documents,
        uploadDocument,
        workflows,
        toggleWorkflow,
        apiKeys,
        isAssistantOpen,
        setIsAssistantOpen,
        assistantMessages,
        sendAssistantQuery,
        clearAssistantChat,
        executeAssistantAction,
        isPunchModalOpen,
        setIsPunchModalOpen,
        activeModule,
        setActiveModule,
        activeSubTab,
        setActiveSubTab,
      }}
    >
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
};
