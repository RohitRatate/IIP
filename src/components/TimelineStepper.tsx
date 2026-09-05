import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';
import { Check, Lock, Play, Sparkles, Send } from 'lucide-react';

interface TimelineStepperProps {
  activeWeekTab: number;
  setActiveWeekTab: (w: number) => void;
}

export const TimelineStepper: React.FC<TimelineStepperProps> = ({ activeWeekTab, setActiveWeekTab }) => {
  const { enrollment, selectedProgram } = useInternship();
  const [showTaskModal, setShowTaskModal] = useState(false);

  return (
    <div className="glass-card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={17} color="#8dc63f" />
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1a1a2e' }}>8-Week Timeline Progression</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 600 }}>{selectedProgram.duration}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '8px' }}>
        {Array.from({ length: 8 }, (_, i) => {
          const wNum = i + 1;
          const isCurrent = wNum === enrollment.currentWeek;
          const isPassed = wNum < enrollment.currentWeek || (wNum === 8 && enrollment.status === 'COMPLETED');
          const isLocked = wNum > enrollment.currentWeek;
          const isTabActive = activeWeekTab === wNum;

          let bgColor = '#f8fafc';
          let borderColor = '#e2e8f0';
          let labelColor = '#9ea8b3';
          let statusText = '🔒';

          if (isPassed) {
            bgColor = 'rgba(141, 198, 63, 0.1)';
            borderColor = 'rgba(141, 198, 63, 0.4)';
            labelColor = '#4a7a10';
            statusText = '✅';
          } else if (isCurrent) {
            bgColor = '#8dc63f';
            borderColor = '#6aa513';
            labelColor = '#1a1a1a';
            statusText = '🟢';
          }

          if (isTabActive && !isCurrent) {
            borderColor = '#8dc63f';
          }

          return (
            <div
              key={wNum}
              onClick={() => { if (!isLocked) setActiveWeekTab(wNum); }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '12px 6px', borderRadius: 'var(--radius-md)',
                background: isTabActive && !isCurrent ? 'rgba(141, 198, 63, 0.08)' : bgColor,
                border: `2px solid ${borderColor}`,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.55 : 1,
                transition: 'all 0.2s', textAlign: 'center',
                boxShadow: isCurrent ? '0 4px 14px rgba(141, 198, 63, 0.3)' : 'none'
              }}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: isPassed ? 'rgba(141, 198, 63, 0.2)' : isCurrent ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px'
              }}>
                {isPassed ? <Check size={14} color="#5a9a1a" /> : isCurrent ? <Play size={14} color="#1a1a1a" /> : <Lock size={13} color="#9ea8b3" />}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: labelColor }}>W{wNum}</div>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: labelColor, marginTop: '2px' }}>
                {statusText}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTaskModal(true);
                }}
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  border: 'none',
                  background: isLocked ? '#e2e8f0' : isCurrent ? 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)' : 'linear-gradient(135deg, #8dc63f 0%, #75a831 100%)',
                  color: isLocked ? '#9ea8b3' : '#fff',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  boxShadow: isLocked ? 'none' : isCurrent ? '0 3px 8px rgba(26, 32, 44, 0.25)' : '0 3px 8px rgba(141, 198, 63, 0.25)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  width: '90%'
                }}
                disabled={isLocked}
                onMouseOver={(e) => { if (!isLocked) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseOut={(e) => { if (!isLocked) e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Send size={10} /> Task
              </button>
            </div>
          );
        })}
      </div>

      {showTaskModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="glass-card" style={{ padding: '24px', maxWidth: '400px', width: '90%', textAlign: 'center', background: '#fff' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', color: '#1a1a2e' }}>Task Notification</h3>
            <p style={{ marginBottom: '24px', color: '#4a5568' }}>Your task has been sent to email.</p>
            <button className="btn-primary" onClick={() => setShowTaskModal(false)} style={{ width: '100%' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
