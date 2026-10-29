import React, { useState } from 'react';
import {
  Target,
  Plus,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useHR } from '../../../context/HRContext';
import { GoalOKR } from '../../../types';

export const OkrGoalTracker: React.FC = () => {
  const { goalsOKR, updateGoalProgress, activeRole } = useHR();
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const filtered = goalsOKR.filter((g) => filterLevel === 'All' || g.level === filterLevel);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">OKR & Strategic Goal Tracking</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quarterly strategic objectives, quantitative key results, and real-time execution progress
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
          {['All', 'Company', 'Department', 'Individual'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterLevel === lvl ? 'bg-orange-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* OKR Cards */}
      <div className="space-y-4">
        {filtered.map((goal) => (
          <div
            key={goal.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5"
          >
            {/* Goal Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      goal.level === 'Company'
                        ? 'bg-purple-100 text-purple-800'
                        : goal.level === 'Department'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {goal.level} OKR
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{goal.quarter}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{goal.title}</h3>
                <p className="text-xs text-slate-500">Lead Owner: {goal.ownerName}</p>
              </div>

              {/* Progress Dial / Bar */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    {goal.progress}%
                  </span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Completion</p>
                </div>
              </div>
            </div>

            {/* Interactive Progress Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Overall Objective Delivery</span>
                <span>Adjust Progress:</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
                className="w-full accent-orange-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Key Results Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Measurable Key Results
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {goal.keyResults.map((kr) => {
                  const percent = Math.min(100, Math.round((kr.current / (kr.target || 1)) * 100));
                  return (
                    <div
                      key={kr.id}
                      className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-2 flex flex-col justify-between"
                    >
                      <p className="text-xs font-semibold text-slate-800 leading-snug">{kr.text}</p>
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                          <span>
                            {kr.current} / {kr.target} {kr.unit}
                          </span>
                          <span className="font-bold text-slate-700">{percent}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            style={{ width: `${percent}%` }}
                            className="h-full bg-orange-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
