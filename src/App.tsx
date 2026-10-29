import React, { useState } from 'react';
import { HRProvider, useHR } from './context/HRContext';
import { FirstTimeSetup } from './components/auth/FirstTimeSetup';
import { DedicatedLoginPage } from './components/auth/DedicatedLoginPage';
import { SidebarPrimary } from './components/layout/SidebarPrimary';
import { SidebarSubNav } from './components/layout/SidebarSubNav';
import { TopHeader } from './components/layout/TopHeader';
import { CameraPunchModal } from './components/common/CameraPunchModal';
import { SmartAssistantDrawer } from './components/common/SmartAssistantDrawer';
import { AuthModal } from './components/common/AuthModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { PayslipModal } from './components/modules/payroll/PayslipModal';

// Admin Modules
import { AdminDashboard } from './components/modules/core/AdminDashboard';
import { EmployeeDirectory } from './components/modules/core/EmployeeDirectory';
import { AdminApplications } from './components/modules/admin/AdminApplications';
import { AdminAnnouncements } from './components/modules/admin/AdminAnnouncements';
import { PayslipDesigner } from './components/modules/admin/PayslipDesigner';
import { OrgChart } from './components/modules/core/OrgChart';
import { CompanyProfile } from './components/modules/core/CompanyProfile';

// Attendance Modules
import { AttendanceOverview } from './components/modules/attendance/AttendanceOverview';
import { ProjectTimesheets } from './components/modules/attendance/ProjectTimesheets';
import { HolidayCalendar } from './components/modules/attendance/HolidayCalendar';

// Payroll Modules
import { PayrollEngine } from './components/modules/payroll/PayrollEngine';
import { StatutoryTaxCalculator } from './components/modules/payroll/StatutoryTaxCalculator';

// Employee Dedicated Modules
import { EmployeeEssDashboard } from './components/modules/core/EmployeeEssDashboard';
import { EmployeeAnnouncements } from './components/modules/employee/EmployeeAnnouncements';
import { EmployeeApplications } from './components/modules/employee/EmployeeApplications';
import { EmployeePayslips } from './components/modules/employee/EmployeePayslips';
import { EmployeeProfile } from './components/modules/employee/EmployeeProfile';

import { PayrollRun } from './types';

const MainAppLayout: React.FC = () => {
  const {
    isSetupComplete,
    currentUser,
    activeRole,
    activeModule,
    activeSubTab,
    company
  } = useHR();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activePayslipRun, setActivePayslipRun] = useState<PayrollRun | null>(null);

  // 1. Guard: If system has never been registered/setup, prompt FirstTimeSetup dedicated screen
  if (!isSetupComplete) {
    return <FirstTimeSetup />;
  }

  // 2. Guard: If user is logged out or visiting from another device, show DedicatedLoginPage
  if (!currentUser) {
    return <DedicatedLoginPage />;
  }

  // 3. Render Role-specific Viewports
  const renderActiveView = () => {
    // If Employee Portal
    if (activeRole === 'employee') {
      switch (activeSubTab) {
        case 'employee-ess':
          return <EmployeeEssDashboard />;
        case 'employee-announcements':
          return <EmployeeAnnouncements />;
        case 'employee-applications':
          return <EmployeeApplications />;
        case 'employee-payslips':
          return <EmployeePayslips />;
        case 'employee-profile':
          return <EmployeeProfile />;
        case 'attendance-overview':
          return <AttendanceOverview />;
        case 'project-timesheets':
          return <ProjectTimesheets />;
        default:
          return <EmployeeEssDashboard />;
      }
    }

    // If Admin Console
    switch (activeSubTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'employees':
        return <EmployeeDirectory />;
      case 'applications':
        return <AdminApplications />;
      case 'announcements':
        return <AdminAnnouncements />;
      case 'payslip-studio':
        return <PayslipDesigner />;
      case 'org-chart':
        return <OrgChart />;
      case 'attendance-overview':
        return <AttendanceOverview />;
      case 'project-timesheets':
        return <ProjectTimesheets />;
      case 'holiday-calendar':
        return <HolidayCalendar />;
      case 'payroll-engine':
        return <PayrollEngine onViewPayslip={(run) => setActivePayslipRun(run)} />;
      case 'tax-calculator':
        return <StatutoryTaxCalculator />;
      case 'company-profile':
        return <CompanyProfile />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      {/* 1. Primary Iconic Navigation Rail */}
      <SidebarPrimary onOpenAuthModal={() => setIsAuthModalOpen(true)} />

      {/* 2. Secondary Module Sub-navigation Bar */}
      <SidebarSubNav />

      {/* 3. Main Workspace Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Bar Header */}
        <TopHeader
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenGlobalSearch={() => setIsSearchModalOpen(true)}
        />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & Overlays */}
      <CameraPunchModal />
      <SmartAssistantDrawer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <GlobalSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
      <PayslipModal
        run={activePayslipRun}
        company={company}
        onClose={() => setActivePayslipRun(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <HRProvider>
      <MainAppLayout />
    </HRProvider>
  );
}
