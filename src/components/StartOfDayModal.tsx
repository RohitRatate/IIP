import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';
import { Sun, X, CheckCircle2 } from 'lucide-react';

export const StartOfDayModal: React.FC = () => {
  const { sodModalOpen, setSodModalOpen, activeDayNum, enrollment, submitSOD } = useInternship();

  const [todayWorkFocus, setTodayWorkFocus] = useState('Frontend Component Architecture');
  const [plannedTasks, setPlannedTasks] = useState('Build responsive dashboard layout, define TypeScript props, and handle edge cases.');
  const [expectedOutcome, setExpectedOutcome] = useState('Clean, tested component pushed to feature branch.');

  if (!sodModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSOD(enrollment.currentWeek, activeDayNum, { plannedTasks, todayWorkFocus, expectedOutcome });
    setSodModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setSodModalOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#fffef5', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sun color="#c17d0a" size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a1a2e' }}>Start of Day (SOD) Update — Day {activeDayNum}</h3>
              <div style={{ fontSize: '0.78rem', color: '#718096' }}>Week {enrollment.currentWeek} • Morning Work Planning</div>
            </div>
          </div>
          <button onClick={() => setSodModalOpen(false)} style={{ background: 'transparent', color: '#9ea8b3' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>1. Today's Main Work Focus</label>
              <input type="text" className="form-control" value={todayWorkFocus} onChange={(e) => setTodayWorkFocus(e.target.value)} placeholder="e.g. Building UI components, REST API integration" required />
            </div>
            <div className="form-group">
              <label>2. What I will work on today (Planned Tasks)</label>
              <textarea className="form-control" rows={3} value={plannedTasks} onChange={(e) => setPlannedTasks(e.target.value)} placeholder="List your specific tasks planned for today..." required />
            </div>
            <div className="form-group">
              <label>3. Expected Outcome</label>
              <input type="text" className="form-control" value={expectedOutcome} onChange={(e) => setExpectedOutcome(e.target.value)} placeholder="e.g. Working prototype with unit tests passing" required />
            </div>
          </div>
          <div className="modal-footer" style={{ background: '#f8fafc', borderRadius: '0 0 var(--radius-xl) var(--radius-xl)' }}>
            <button type="button" onClick={() => setSodModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)' }}>
              <CheckCircle2 size={15} /> Start My Day
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
