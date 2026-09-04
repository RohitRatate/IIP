import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';
import { TimelineStepper } from './TimelineStepper';
import { DailyUpdatesTab } from './DailyUpdatesTab';
import { WeeklyTaskTab } from './WeeklyTaskTab';
import { Calendar, FileCode, Video, Award, AlertTriangle, RefreshCw, Clock, Building2, UserCheck, Sparkles } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { selectedProgram, enrollment, role, reopenInternship, generateCertificate } = useInternship();

  const [activeWeekTab, setActiveWeekTab] = useState<number>(enrollment.currentWeek);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'DAILY' | 'WEEKLY' | 'RECAP'>('DAILY');

  const completedWeeksCount = Math.min(enrollment.currentWeek - 1, 8);
  const overallProgressPercent = Math.round((completedWeeksCount / 8) * 100);
  const curDailyLogs = enrollment.dailyLogs[activeWeekTab] || [];
  const completedDaysInActiveWeek = curDailyLogs.filter((d) => d.sodSubmitted && d.eodSubmitted).length;

  const tabStyle = (active: boolean) => ({
    display: 'flex', alignItems: 'center', gap: '7px',
    padding: '10px 18px', borderRadius: 'var(--radius-md)',
    fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
    background: active ? '#8dc63f' : '#ffffff',
    color: active ? '#1a1a1a' : '#718096',
    border: `1px solid ${active ? '#6aa513' : '#e2e8f0'}`,
    boxShadow: active ? '0 2px 10px rgba(141, 198, 63, 0.3)' : 'none',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Paused Banner */}
      {enrollment.status === 'PAUSED_INCOMPLETE' && (
        <div style={{
          background: '#fff5f5', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-lg)',
          padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={28} color="#ef4444" />
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a1a2e' }}>Internship Status: Paused / Incomplete</div>
              <div style={{ fontSize: '0.85rem', color: '#9b2c2c' }}>A required weekly deadline was missed. Admin or Mentor must reopen this internship.</div>
            </div>
          </div>
          {(role === 'ADMIN' || role === 'TRAINER') && (
            <button onClick={reopenInternship} className="btn-success" style={{ gap: '8px' }}>
              <RefreshCw size={15} /> Reopen Internship ({role})
            </button>
          )}
        </div>
      )}

      {/* Header Summary Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '58px', height: '58px', borderRadius: '16px',
              background: 'rgba(141, 198, 63, 0.12)', border: '2px solid rgba(141, 198, 63, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem'
            }}>
              {selectedProgram.companyLogo}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>{selectedProgram.title}</h1>
                <span style={{ background: 'rgba(141, 198, 63, 0.15)', color: '#4a7a10', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(141, 198, 63, 0.4)' }}>
                  {selectedProgram.badgeText}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: '#718096' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Building2 size={13} color="#8dc63f" /> {selectedProgram.companyName}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><UserCheck size={13} color="#8dc63f" /> {enrollment.studentName}</span>
              </div>
            </div>
          </div>

          {enrollment.status === 'COMPLETED' || enrollment.currentWeek > 8 ? (
            <button onClick={generateCertificate} className="btn-success" style={{ fontSize: '0.95rem', padding: '12px 22px' }}>
              <Award size={18} /> Generate Certificate
            </button>
          ) : (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: '#9ea8b3', textTransform: 'uppercase', fontWeight: 700 }}>Current Status</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: enrollment.status === 'PAUSED_INCOMPLETE' ? '#ef4444' : '#5a9a1a' }}>
                Week {enrollment.currentWeek} of 8 • Active 🟢
              </div>
            </div>
          )}
        </div>

        {/* Metrics Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px',
          background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#718096', marginBottom: '6px' }}>
              <span>Overall Progress</span><span style={{ color: '#5a9a1a' }}>{overallProgressPercent}%</span>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${overallProgressPercent}%`, background: 'linear-gradient(90deg, #8dc63f, #5a9a1a)', borderRadius: '4px', transition: 'width 0.4s' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ea8b3', marginBottom: '2px' }}>Completed Weeks</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a1a2e' }}>{completedWeeksCount} / 8 ✅</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ea8b3', marginBottom: '2px' }}>Week {activeWeekTab} Daily Logs</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#5a9a1a' }}>{completedDaysInActiveWeek} / 5 Days</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ea8b3', marginBottom: '2px' }}>Next Deadline</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c17d0a', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={15} /> Sunday 11:59 PM
            </div>
          </div>
        </div>
      </div>

      {/* 8-Week Timeline */}
      <TimelineStepper activeWeekTab={activeWeekTab} setActiveWeekTab={setActiveWeekTab} />

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveWorkspaceTab('DAILY')} style={tabStyle(activeWorkspaceTab === 'DAILY')}>
          <Calendar size={17} /> Daily Work Updates (SOD & EOD)
        </button>
        <button onClick={() => setActiveWorkspaceTab('WEEKLY')} style={tabStyle(activeWorkspaceTab === 'WEEKLY')}>
          <FileCode size={17} /> Weekly Task & Submission
        </button>
        <button onClick={() => setActiveWorkspaceTab('RECAP')} style={tabStyle(activeWorkspaceTab === 'RECAP')}>
          <Video size={17} /> Orientation Recap
        </button>
      </div>

      {/* Active Tab Content */}
      {activeWorkspaceTab === 'DAILY' && <DailyUpdatesTab weekNum={activeWeekTab} />}
      {activeWorkspaceTab === 'WEEKLY' && <WeeklyTaskTab weekNum={activeWeekTab} />}
      {activeWorkspaceTab === 'RECAP' && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#8dc63f" /> Program Orientation Briefing & Rules
          </h3>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '40%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', border: '1px solid #e2e8f0' }}>
            <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} src={selectedProgram.orientationVideoUrl} title={selectedProgram.orientationVideoTitle} allowFullScreen />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '10px' }}>Rules Summary</h4>
            <ul style={{ paddingLeft: '20px', color: '#4a5568', lineHeight: 1.7 }}>
              {selectedProgram.rules.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
