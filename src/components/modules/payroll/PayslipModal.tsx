import React from 'react';
import {
  FileText,
  Printer,
  Download,
  X,
  Building2,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { PayrollRun, Company } from '../../../types';

interface PayslipModalProps {
  run: PayrollRun | null;
  company: Company;
  onClose: () => void;
}

export const PayslipModal: React.FC<PayslipModalProps> = ({ run, company, onClose }) => {
  if (!run) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <FileText className="w-4 h-4 text-orange-600" />
            <span>Digital Payslip Voucher</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Payslip Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs text-slate-800 font-sans print:p-0">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-orange-600 tracking-tight">HRMate</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                  Enterprise
                </span>
              </div>
              <p className="font-bold text-sm text-slate-900 mt-1">{company.name}</p>
              <p className="text-slate-500 text-[11px]">{company.hqLocation.name}</p>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase">
                {run.paymentStatus} · Electronic Disbursal
              </span>
              <p className="text-slate-500 mt-2 font-mono text-[11px]">Pay Period: {run.period}</p>
              <p className="text-slate-400 font-mono text-[10px]">Reference: {run.id}</p>
            </div>
          </div>

          {/* Employee Meta Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Employee Name</p>
              <p className="font-bold text-slate-900 mt-0.5">{run.employeeName}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Department</p>
              <p className="font-semibold text-slate-800 mt-0.5">{run.department}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Designation</p>
              <p className="font-semibold text-slate-800 mt-0.5">{run.designation}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Bank Account</p>
              <p className="font-mono text-slate-800 mt-0.5">{run.bankAccount}</p>
            </div>
          </div>

          {/* Earnings & Deductions Tables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Earnings */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700">
                Earnings Breakdown
              </div>
              <div className="p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Basic Monthly Wage</span>
                  <span className="font-semibold text-slate-900 font-mono">${run.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">House Rent Allowance (HRA)</span>
                  <span className="font-semibold text-slate-900 font-mono">${run.hra.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Special Executive Allowance</span>
                  <span className="font-semibold text-slate-900 font-mono">${run.allowances.toLocaleString()}</span>
                </div>
                {run.reimbursements > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Approved Expense Reimbursement</span>
                    <span className="font-semibold text-emerald-600 font-mono">+${run.reimbursements.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                  <span>Gross Total Earnings</span>
                  <span className="font-mono">${run.grossSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700">
                Statutory & Voluntary Deductions
              </div>
              <div className="p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Statutory Tax Withholding (IRS/State)</span>
                  <span className="font-semibold text-red-600 font-mono">-${run.statutoryTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Provident Fund / 401(k) Match</span>
                  <span className="font-semibold text-blue-600 font-mono">-${run.providentFund.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Health & Vision Plan Deductions</span>
                  <span className="font-semibold text-slate-700 font-mono">-${run.benefitsDeduction.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-red-600">
                  <span>Total Withholdings</span>
                  <span className="font-mono">
                    -${(run.statutoryTax + run.providentFund + run.benefitsDeduction).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Pay Highlight Box */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase font-bold text-emerald-800">Net Take-Home Pay Disbursed</p>
              <p className="text-2xl font-black text-emerald-700 tabular-nums font-mono mt-0.5">
                ${run.netPayable.toLocaleString()} USD
              </p>
            </div>
            <div className="text-right text-[11px] text-emerald-800 font-medium">
              <p>Direct Deposit Initiated: {run.disbursedDate || 'Oct 28, 2026'}</p>
              <p className="text-[10px] text-emerald-600">ACH Settlement Confirmed</p>
            </div>
          </div>

          {/* Signoff */}
          <div className="pt-4 border-t border-slate-100 flex justify-between text-[10px] text-slate-400">
            <span>This is an authenticated computer-generated payroll advisory.</span>
            <span>HRMate Enterprise Engine 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
