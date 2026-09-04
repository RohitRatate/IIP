import React from 'react';
import { useInternship } from '../context/InternshipContext';
import { FastForward, CheckCircle2, AlertTriangle, Unlock, RotateCcw, PlayCircle } from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const {
    enrollment,
    simFillActiveDay,
    simApproveCurrentWeek,
    simUnlockAllWeeks,
    togglePauseState,
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
          <span style={{ color: '#9ea8b3' }}>Quickly test & showcase IIP state transitions</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={simFillActiveDay}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
              background: 'rgba(141, 198, 63, 0.15)', color: '#8dc63f',
              border: '1px solid rgba(141, 198, 63, 0.4)', cursor: 'pointer'
            }}
          >
            <FastForward size={14} />
            <span>Complete 1 Day (SOD+EOD)</span>
          </button>

          <button
            onClick={simApproveCurrentWeek}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
              background: 'rgba(141, 198, 63, 0.15)', color: '#8dc63f',
              border: '1px solid rgba(141, 198, 63, 0.4)', cursor: 'pointer'
            }}
          >
            <CheckCircle2 size={14} />
            <span>Approve Week {enrollment.currentWeek}</span>
          </button>

          <button
            onClick={togglePauseState}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
              background: 'rgba(245, 158, 11, 0.12)',
              color: enrollment.status === 'PAUSED_INCOMPLETE' ? '#f87171' : '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.4)', cursor: 'pointer'
            }}
          >
            <AlertTriangle size={14} />
            <span>{enrollment.status === 'PAUSED_INCOMPLETE' ? 'Resume Internship' : 'Simulate Missed Deadline'}</span>
          </button>

          <button
            onClick={simUnlockAllWeeks}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
              background: 'rgba(141, 198, 63, 0.15)', color: '#8dc63f',
              border: '1px solid rgba(141, 198, 63, 0.4)', cursor: 'pointer'
            }}
          >
            <Unlock size={14} />
            <span>Unlock All 8 Weeks</span>
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
