import React from 'react';
import { useInternship } from '../context/InternshipContext';
import { Calendar, Sun, Moon, CheckCircle2, Plus, ExternalLink } from 'lucide-react';

interface DailyUpdatesTabProps {
  weekNum: number;
}

export const DailyUpdatesTab: React.FC<DailyUpdatesTabProps> = ({ weekNum }) => {
  const { enrollment, setSodModalOpen, setEodModalOpen, setActiveDayNum, role } = useInternship();

  const dailyLogs = enrollment.dailyLogs[weekNum] || [];
  const completedDaysCount = dailyLogs.filter((d) => d.sodSubmitted && d.eodSubmitted).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Summary bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Calendar color="#8dc63f" size={22} />
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a2e' }}>
              Week {weekNum} Daily Work Updates (5 Days / Week)
            </div>
            <div style={{ fontSize: '0.82rem', color: '#718096' }}>
              2 updates required per day: Start of Day (SOD) & End of Day (EOD)
            </div>
          </div>
        </div>
        <span style={{
          background: 'rgba(141, 198, 63, 0.15)', color: '#4a7a10',
          border: '1px solid rgba(141, 198, 63, 0.4)',
          padding: '5px 14px', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 700
        }}>
          {completedDaysCount} / 5 Days Complete ✅
        </span>
      </div>

      {/* 5-Day Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {dailyLogs.map((day) => {
          const isFullyComplete = day.sodSubmitted && day.eodSubmitted;
          return (
            <div key={day.dayNumber} style={{
              background: '#ffffff',
              border: '1px solid',
              borderColor: isFullyComplete ? 'rgba(141, 198, 63, 0.5)' : day.sodSubmitted ? 'rgba(141, 198, 63, 0.3)' : '#e2e8f0',
              borderRadius: 'var(--radius-md)', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '12px',
              boxShadow: isFullyComplete ? '0 2px 12px rgba(141, 198, 63, 0.12)' : 'var(--shadow-card)'
            }}>
              {/* Day header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1a1a2e' }}>
                  Day {day.dayNumber}
                </span>
                {isFullyComplete ? (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(141, 198, 63, 0.15)', color: '#4a7a10', border: '1px solid rgba(141, 198, 63, 0.4)' }}>Done ✅</span>
                ) : day.sodSubmitted ? (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.12)', color: '#9a6b00', border: '1px solid rgba(245, 158, 11, 0.35)' }}>EOD Pending</span>
                ) : (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', background: '#f8fafc', color: '#9ea8b3', border: '1px solid #e2e8f0' }}>Not Started</span>
                )}
              </div>

              {/* SOD */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 700, color: '#c17d0a' }}>
                    <Sun size={13} /> Start of Day (SOD)
                  </div>
                  {day.sodSubmitted && <span style={{ fontSize: '0.7rem', color: '#4a7a10', fontWeight: 700 }}>{day.sodTimestamp} ✓</span>}
                </div>
                {day.sodSubmitted ? (
                  <div style={{ fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.4 }}>
                    <div><strong>Focus:</strong> {day.todayWorkFocus}</div>
                    <div style={{ color: '#718096', fontSize: '0.72rem', marginTop: '2px' }}>{day.plannedTasks}</div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '0.72rem', color: '#9ea8b3', marginBottom: '6px' }}>Planned tasks & expected outcome</div>
                    {role === 'STUDENT' && (
                      <button onClick={() => { setActiveDayNum(day.dayNumber); setSodModalOpen(true); }} className="btn-primary btn-sm" style={{ width: '100%', fontSize: '0.75rem', padding: '5px' }}>
                        <Plus size={13} /> Start My Day
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* EOD */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 700, color: '#5a9a1a' }}>
                    <Moon size={13} /> End of Day (EOD)
                  </div>
                  {day.eodSubmitted && <span style={{ fontSize: '0.7rem', color: '#4a7a10', fontWeight: 700 }}>{day.eodTimestamp} ✓</span>}
                </div>
                {day.eodSubmitted ? (
                  <div style={{ fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.4 }}>
                    <div><strong>Completed:</strong> {day.completedWork}</div>
                    <div style={{ color: '#4a7a10', fontSize: '0.72rem', marginTop: '2px' }}>Progress: {day.progressPercent}%</div>
                    {day.attachmentsLink && (
                      <a href={day.attachmentsLink} target="_blank" rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#5a9a1a', fontSize: '0.72rem', marginTop: '4px', textDecoration: 'none', fontWeight: 600 }}>
                        <ExternalLink size={11} /> View Deliverable
                      </a>
                    )}
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '0.72rem', color: '#9ea8b3', marginBottom: '6px' }}>Completed work, blockers & learnings</div>
                    {role === 'STUDENT' && (
                      <button
                        onClick={() => { setActiveDayNum(day.dayNumber); setEodModalOpen(true); }}
                        disabled={!day.sodSubmitted}
                        className="btn-success btn-sm"
                        style={{ width: '100%', fontSize: '0.75rem', padding: '5px', opacity: day.sodSubmitted ? 1 : 0.45, cursor: day.sodSubmitted ? 'pointer' : 'not-allowed' }}
                      >
                        <Plus size={13} /> Submit EOD Update
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
