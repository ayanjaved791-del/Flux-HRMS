import React, { useState } from 'react';
import { HRProvider, useHR } from './context/HRContext';
import { SidebarPrimary } from './components/layout/SidebarPrimary';
import { SidebarSubNav } from './components/layout/SidebarSubNav';
import { TopHeader } from './components/layout/TopHeader';
import { CameraPunchModal } from './components/common/CameraPunchModal';
import { SmartAssistantDrawer } from './components/common/SmartAssistantDrawer';
import { AuthModal } from './components/common/AuthModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { PayslipModal } from './components/modules/payroll/PayslipModal';

// Module Components
import { AdminDashboard } from './components/modules/core/AdminDashboard';
import { EmployeeEssDashboard } from './components/modules/core/EmployeeEssDashboard';
import { ManagerMssDashboard } from './components/modules/core/ManagerMssDashboard';
import { EmployeeDirectory } from './components/modules/core/EmployeeDirectory';
import { OrgChart } from './components/modules/core/OrgChart';
import { DocumentVault } from './components/modules/core/DocumentVault';
import { AssetLedger } from './components/modules/core/AssetLedger';
import { RbacMatrix } from './components/modules/core/RbacMatrix';
import { WorkflowBuilder } from './components/modules/core/WorkflowBuilder';
import { ApiGateway } from './components/modules/core/ApiGateway';
import { CompanyProfile } from './components/modules/core/CompanyProfile';

import { AttendanceOverview } from './components/modules/attendance/AttendanceOverview';
import { ProjectTimesheets } from './components/modules/attendance/ProjectTimesheets';
import { LeaveTracker } from './components/modules/attendance/LeaveTracker';
import { ShiftScheduler } from './components/modules/attendance/ShiftScheduler';
import { OvertimeEngine } from './components/modules/attendance/OvertimeEngine';
import { HolidayCalendar } from './components/modules/attendance/HolidayCalendar';

import { PayrollEngine } from './components/modules/payroll/PayrollEngine';
import { PayslipDistribution } from './components/modules/payroll/PayslipDistribution';
import { StatutoryTaxCalculator } from './components/modules/payroll/StatutoryTaxCalculator';
import { ExpenseClaims } from './components/modules/payroll/ExpenseClaims';
import { BenefitsPortal } from './components/modules/payroll/BenefitsPortal';
import { MultiCurrencyModule } from './components/modules/payroll/MultiCurrencyModule';
import { GratuityCalculator } from './components/modules/payroll/GratuityCalculator';

import { ApplicantTrackingSystem } from './components/modules/talent/ApplicantTrackingSystem';
import { InterviewScheduler } from './components/modules/talent/InterviewScheduler';
import { DigitalOnboarding } from './components/modules/talent/DigitalOnboarding';
import { BackgroundVerifier } from './components/modules/talent/BackgroundVerifier';
import { OffboardingTracker } from './components/modules/talent/OffboardingTracker';
import { TalentPipeline } from './components/modules/talent/TalentPipeline';

import { OkrGoalTracker } from './components/modules/performance/OkrGoalTracker';
import { AppraisalMatrix } from './components/modules/performance/AppraisalMatrix';
import { LearningManagementSystem } from './components/modules/performance/LearningManagementSystem';
import { CompetencyFramework } from './components/modules/performance/CompetencyFramework';
import { SuccessionBench } from './components/modules/performance/SuccessionBench';
import { SentimentPulseSurvey } from './components/modules/performance/SentimentPulseSurvey';
import { PeerRewardsWall } from './components/modules/performance/PeerRewardsWall';
import { WorkforceAnalytics } from './components/modules/performance/WorkforceAnalytics';

import { PayrollRun } from './types';

const MainAppLayout: React.FC = () => {
  const { activeModule, activeSubTab, company } = useHR();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activePayslipRun, setActivePayslipRun] = useState<PayrollRun | null>(null);

  const renderActiveView = () => {
    switch (activeModule) {
      case 'core':
        switch (activeSubTab) {
          case 'dashboard':
            return <AdminDashboard />;
          case 'employee-ess':
            return <EmployeeEssDashboard />;
          case 'manager-mss':
            return <ManagerMssDashboard />;
          case 'employees':
            return <EmployeeDirectory />;
          case 'org-chart':
            return <OrgChart />;
          case 'document-vault':
            return <DocumentVault />;
          case 'asset-ledger':
            return <AssetLedger />;
          case 'rbac-matrix':
            return <RbacMatrix />;
          case 'workflow-builder':
            return <WorkflowBuilder />;
          case 'api-gateway':
            return <ApiGateway />;
          default:
            return <AdminDashboard />;
        }

      case 'attendance':
        switch (activeSubTab) {
          case 'attendance-overview':
            return <AttendanceOverview />;
          case 'project-timesheets':
            return <ProjectTimesheets />;
          case 'leave-tracker':
            return <LeaveTracker />;
          case 'shift-scheduler':
            return <ShiftScheduler />;
          case 'overtime-engine':
            return <OvertimeEngine />;
          case 'holiday-calendar':
            return <HolidayCalendar />;
          default:
            return <AttendanceOverview />;
        }

      case 'payroll':
        switch (activeSubTab) {
          case 'payroll-engine':
            return <PayrollEngine onViewPayslip={(run) => setActivePayslipRun(run)} />;
          case 'payslips':
            return <PayslipDistribution onViewPayslip={(run) => setActivePayslipRun(run)} />;
          case 'tax-calculator':
            return <StatutoryTaxCalculator />;
          case 'expense-claims':
            return <ExpenseClaims />;
          case 'benefits-portal':
            return <BenefitsPortal />;
          case 'multi-currency':
            return <MultiCurrencyModule />;
          case 'gratuity-calc':
            return <GratuityCalculator />;
          default:
            return <PayrollEngine onViewPayslip={(run) => setActivePayslipRun(run)} />;
        }

      case 'talent':
        switch (activeSubTab) {
          case 'ats-kanban':
            return <ApplicantTrackingSystem />;
          case 'interview-scheduler':
            return <InterviewScheduler />;
          case 'digital-onboarding':
            return <DigitalOnboarding />;
          case 'background-check':
            return <BackgroundVerifier />;
          case 'offboarding-tracker':
            return <OffboardingTracker />;
          case 'talent-pipeline':
            return <TalentPipeline />;
          default:
            return <ApplicantTrackingSystem />;
        }

      case 'performance':
        switch (activeSubTab) {
          case 'okr-goals':
            return <OkrGoalTracker />;
          case '360-appraisal':
            return <AppraisalMatrix />;
          case 'lms-learning':
            return <LearningManagementSystem />;
          case 'competency-map':
            return <CompetencyFramework />;
          case 'succession-bench':
            return <SuccessionBench />;
          case 'pulse-surveys':
            return <SentimentPulseSurvey />;
          case 'peer-rewards':
            return <PeerRewardsWall />;
          case 'workforce-analytics':
            return <WorkforceAnalytics />;
          default:
            return <OkrGoalTracker />;
        }

      case 'settings':
        switch (activeSubTab) {
          case 'company-profile':
            return <CompanyProfile />;
          case 'asset-ledger':
            return <AssetLedger />;
          case 'rbac-matrix':
            return <RbacMatrix />;
          case 'workflow-builder':
            return <WorkflowBuilder />;
          case 'api-gateway':
            return <ApiGateway />;
          default:
            return <CompanyProfile />;
        }

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
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-7xl w-full mx-auto">
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
