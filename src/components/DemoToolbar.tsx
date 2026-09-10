import React from 'react';
import { useInternship } from '../context/InternshipContext';
import { FastForward, CheckCircle2, Unlock, RotateCcw, PlayCircle, Send } from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const {
    enrollment,
    simSubmitCurrentTask,
    simApproveTask,
    simUnlockAllTasks,
    resetDemo,
    activeView
  } = useInternship();

  if (activeView === 'CATALOG') return null;

  return (
    <div style={{
      background: '#1a1a2e',
      borderBottom: '2px solid #8dc63f',
      padding: '10px 24px',
      fontSize: '0.85rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8dc63f' }}>
          <PlayCircle size={16} color="#8dc63f" />
          <span style={{ fontWeight: 700, color: '#ffffff' }}>Demo Controls:</span>
          <span style={{ color: '#9ea8b3' }}>Test & showcase Case Study milestone transitions</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={simSubmitCurrentTask}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
              background: 'rgba(141, 198, 63, 0.15)', color: '#8dc63f',
              border: '1px solid rgba(141, 198, 63, 0.4)', cursor: 'pointer'
            }}
          >
            <Send size={14} />
            <span>Submit Active Deliverable</span>
          </button>

          <button
            onClick={simApproveTask}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
              background: 'rgba(141, 198, 63, 0.15)', color: '#8dc63f',
              border: '1px solid rgba(141, 198, 63, 0.4)', cursor: 'pointer'
            }}
          >
            <CheckCircle2 size={14} />
            <span>Trainer Approve Pending Deliverable</span>
          </button>

          <button
            onClick={simUnlockAllTasks}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
              background: 'rgba(141, 198, 63, 0.15)', color: '#8dc63f',
              border: '1px solid rgba(141, 198, 63, 0.4)', cursor: 'pointer'
            }}
          >
            <Unlock size={14} />
            <span>Complete All Milestones</span>
          </button>

          <button
            onClick={resetDemo}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
              background: 'rgba(255,255,255,0.06)', color: '#9ea8b3',
              border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
