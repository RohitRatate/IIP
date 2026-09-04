import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';
import { Moon, X, CheckCircle2, Link } from 'lucide-react';

export const EndOfDayModal: React.FC = () => {
  const { eodModalOpen, setEodModalOpen, activeDayNum, enrollment, submitEOD } = useInternship();

  const [completedWork, setCompletedWork] = useState('Implemented full responsive component layout and validated props with TypeScript.');
  const [progressPercent, setProgressPercent] = useState<number>(100);
  const [challengesBlockers, setChallengesBlockers] = useState('Handled minor edge case with dynamic state updates on mobile viewports.');
  const [keyLearnings, setKeyLearnings] = useState('Leveraged custom hooks for clean state separation.');
  const [attachmentsLink, setAttachmentsLink] = useState('https://github.com/wingz-student/iip-day-log');

  if (!eodModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEOD(enrollment.currentWeek, activeDayNum, { completedWork, progressPercent, challengesBlockers, keyLearnings, attachmentsLink });
    setEodModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setEodModalOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#f8fff4', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(141, 198, 63, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Moon color="#5a9a1a" size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a1a2e' }}>End of Day (EOD) Update — Day {activeDayNum}</h3>
              <div style={{ fontSize: '0.78rem', color: '#718096' }}>Week {enrollment.currentWeek} • Evening Work Wrap-up</div>
            </div>
          </div>
          <button onClick={() => setEodModalOpen(false)} style={{ background: 'transparent', color: '#9ea8b3' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>1. What I completed today</label>
              <textarea className="form-control" rows={3} value={completedWork} onChange={(e) => setCompletedWork(e.target.value)} placeholder="Describe your accomplishments today..." required />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>2. Progress Percentage</label>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#5a9a1a' }}>{progressPercent}% Complete</span>
              </div>
              <input type="range" min="0" max="100" step="5" value={progressPercent} onChange={(e) => setProgressPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#8dc63f', cursor: 'pointer', height: '6px' }} />
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #8dc63f 0%, #5a9a1a 100%)', borderRadius: '4px', transition: 'width 0.3s' }} />
              </div>
            </div>

            <div className="form-group">
              <label>3. Challenges & Blockers encountered</label>
              <input type="text" className="form-control" value={challengesBlockers} onChange={(e) => setChallengesBlockers(e.target.value)} placeholder="Any obstacles or issues faced today?" />
            </div>

            <div className="form-group">
              <label>4. Key Learnings</label>
              <input type="text" className="form-control" value={keyLearnings} onChange={(e) => setKeyLearnings(e.target.value)} placeholder="What new concepts or tools did you master today?" />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Link size={13} color="#8dc63f" /> 5. Attachments or Links
              </label>
              <input type="url" className="form-control" value={attachmentsLink} onChange={(e) => setAttachmentsLink(e.target.value)} placeholder="https://github.com/..." />
            </div>
          </div>
          <div className="modal-footer" style={{ background: '#f8fafc', borderRadius: '0 0 var(--radius-xl) var(--radius-xl)' }}>
            <button type="button" onClick={() => setEodModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-success"><CheckCircle2 size={15} /> Submit EOD Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
