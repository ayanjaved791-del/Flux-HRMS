import React from 'react';
import {
  LineChart,
  Users,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useHR } from '../../../context/HRContext';

export const SuccessionBench: React.FC = () => {
  const { successionPlans } = useHR();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Succession Planning Bench</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Executive leadership talent continuity, flight risk mitigation, and role succession readiness
        </p>
      </div>

      <div className="space-y-5">
        {successionPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                  Critical Enterprise Mandate
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{plan.criticalRole}</h3>
                <p className="text-xs text-slate-500">Current Incumbent: {plan.incumbentName}</p>
              </div>

              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                Horizon: {plan.readinessBenchmark}
              </span>
            </div>

            {/* Bench candidates */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Identified Successor Candidates
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plan.successors.map((succ) => (
                  <div
                    key={succ.employeeId}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={succ.avatar}
                        alt={succ.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{succ.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Readiness: <span className="font-semibold text-orange-600">{succ.readiness}</span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        succ.flightRisk === 'Low'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {succ.flightRisk} Flight Risk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
