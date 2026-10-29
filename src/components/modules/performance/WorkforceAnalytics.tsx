import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Users,
  Building,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { useHR } from '../../../context/HRContext';

export const WorkforceAnalytics: React.FC = () => {
  const { employees, payrollRuns, company } = useHR();

  const deptCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Strategic Workforce Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Enterprise headcount expansion metrics, retention trajectories, and department capital allocations
        </p>
      </div>

      {/* Top 4 Macro Trends Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Annualized Retention</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">96.8%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Top-quartile SaaS benchmark</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Avg Tenure</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">3.4 Years</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">High institutional retention</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Monthly Payroll Run</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              ${Math.round(employees.reduce((sum, e) => sum + e.salary.baseMonthly, 0) * 1.3).toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Fully burdened capital cost</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Glassdoor Rating</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-orange-600 tabular-nums">4.8 / 5.0</span>
          </div>
          <p className="text-[11px] text-orange-600/80 mt-0.5">High eNPS engagement</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Headcount Growth Trajectory */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Quarterly Headcount Expansion
            </h3>
            <span className="text-xs font-mono font-semibold text-emerald-600">+142 hires (2026)</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-4">
            {[
              { q: 'Q1 2025', count: 820 },
              { q: 'Q2 2025', count: 910 },
              { q: 'Q3 2025', count: 1040 },
              { q: 'Q4 2025', count: 1100 },
              { q: 'Q1 2026', count: 1160 },
              { q: 'Q2 2026', count: 1205 },
              { q: 'Q3 2026', count: 1242 },
            ].map((item) => (
              <div key={item.q} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  style={{ height: `${(item.count / 1300) * 100}%` }}
                  className="w-full max-w-[32px] bg-orange-500 hover:bg-orange-600 rounded-t-lg transition-all"
                  title={`${item.count} staff`}
                />
                <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                  {item.q.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Capital & Headcount Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Department Workforce Breakdown
            </h3>
            <span className="text-xs font-mono text-slate-400">7 Functional Domains</span>
          </div>

          <div className="space-y-3 pt-1">
            {Object.entries(deptCounts).map(([dept, count]) => {
              const pct = Math.round((count / employees.length) * 100);
              return (
                <div key={dept} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{dept}</span>
                    <span className="font-mono text-slate-500">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-slate-800 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
