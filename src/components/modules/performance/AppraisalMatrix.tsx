import React from 'react';
import {
  Award,
  Star,
  CheckCircle2,
  Users,
  Compass,
  MessageSquare
} from 'lucide-react';
import { useHR } from '../../../context/HRContext';

export const AppraisalMatrix: React.FC = () => {
  const { appraisals } = useHR();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">360-Degree Appraisal Matrix</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Peer feedback, manager assessments, self-reflections, and competency radar metrics
        </p>
      </div>

      <div className="space-y-6">
        {appraisals.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6"
          >
            {/* Review Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800">
                  {rev.reviewPeriod}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{rev.revieweeName}</h3>
                <p className="text-xs text-slate-500">Comprehensive Performance Assessment</p>
              </div>

              <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl border border-orange-200/80">
                <Star className="w-5 h-5 text-orange-500 fill-current" />
                <div>
                  <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    {rev.overallRating}
                  </span>
                  <span className="text-xs text-slate-500 font-bold"> / 5.0</span>
                  <p className="text-[10px] font-bold text-orange-700 uppercase">Exceeds Benchmark</p>
                </div>
              </div>
            </div>

            {/* Competency Score Distribution */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Core Competencies Rating
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                {Object.entries(rev.competencyScores).map(([skill, score]) => (
                  <div key={skill} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-lg font-extrabold text-slate-900 tabular-nums font-mono">{score}</p>
                    <p className="text-xs font-semibold text-slate-600 capitalize mt-0.5">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Feedback Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" /> Manager Evaluation
                </p>
                <p className="text-slate-600 leading-relaxed italic">"{rev.managerFeedback}"</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" /> Peer Reviews (Synthesis)
                </p>
                <p className="text-slate-600 leading-relaxed italic">"{rev.peerFeedback}"</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-600" /> Self Reflection
                </p>
                <p className="text-slate-600 leading-relaxed italic">"{rev.selfFeedback}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
