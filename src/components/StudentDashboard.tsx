import React, { useState, useEffect } from 'react';
import { useInternship } from '../context/InternshipContext';
import { TimelineStepper } from './TimelineStepper';
import { Calendar, FileCode, Video, Award, AlertTriangle, RefreshCw, Clock, Building2, UserCheck, Sparkles } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { selectedProgram, enrollment, role, generateCertificate } = useInternship();

  const [activeTaskTab, setActiveTaskTab] = useState<number>(enrollment.unlockedTaskCount || 1);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'TASK_DETAILS' | 'RECAP'>('TASK_DETAILS');

  const totalTasksCount = selectedProgram.tasks?.length || 8;
  const approvedTasksCount = Object.values(enrollment.taskSubmissions || {}).filter(
    (s) => s.status === 'APPROVED'
  ).length;
  const certificateScorePercent = Math.round((approvedTasksCount / totalTasksCount) * 1000) / 10;

  const currentTaskConfig = selectedProgram.tasks?.find((t) => t.taskNumber === activeTaskTab) || selectedProgram.tasks[0];
  const currentSubmission = enrollment.taskSubmissions?.[activeTaskTab];

  const tabStyle = (active: boolean) => ({
    display: 'flex', alignItems: 'center', gap: '7px',
    padding: '10px 18px', borderRadius: 'var(--radius-md)',
    fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
    background: active ? '#8dc63f' : '#ffffff',
    color: active ? '#1a1a2e' : '#718096',
    border: `1px solid ${active ? '#6aa513' : '#e2e8f0'}`,
    boxShadow: active ? '0 2px 10px rgba(141, 198, 63, 0.3)' : 'none',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
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

          {enrollment.status === 'COMPLETED' || approvedTasksCount === totalTasksCount ? (
            <button onClick={generateCertificate} className="btn-success" style={{ fontSize: '0.95rem', padding: '12px 22px' }}>
              <Award size={18} /> Generate Certificate
            </button>
          ) : (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: '#9ea8b3', textTransform: 'uppercase', fontWeight: 700 }}>Program Status</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#5a9a1a' }}>
                In Progress 🟢
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
              <span>Certificate Progress</span><span style={{ color: '#5a9a1a', fontWeight: 800 }}>{certificateScorePercent}%</span>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(approvedTasksCount / totalTasksCount) * 100}%`, background: 'linear-gradient(90deg, #8dc63f, #5a9a1a)', borderRadius: '4px', transition: 'width 0.4s' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ea8b3', marginBottom: '2px' }}>Completed Milestones</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: approvedTasksCount > 0 ? '#4a7a10' : '#1a1a2e' }}>
              {approvedTasksCount} Approved {approvedTasksCount > 0 ? '✅' : '🔒'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ea8b3', marginBottom: '2px' }}>Active Stage</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#5a9a1a' }}>
              Unlocked & Active 🟢
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ea8b3', marginBottom: '2px' }}>Evaluation Policy</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#c17d0a', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
              Only Approved Counts
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Project / Case Study Deliverable & Rules Overview (Above Task List) */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '0.75rem', fontWeight: 800, color: '#4a7a10',
                background: 'rgba(141, 198, 63, 0.15)', padding: '4px 10px', borderRadius: '6px'
              }}>
                {selectedProgram.badgeText}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 700 }}>
                {selectedProgram.duration} Intensive Capstone Track
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a1a2e', marginTop: '6px' }}>
              Project Case Study & 2-Month Deliverable Scope
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveWorkspaceTab('TASK_DETAILS')}
              style={tabStyle(activeWorkspaceTab === 'TASK_DETAILS')}
            >
              <FileCode size={16} /> Scope & Deliverable Brief
            </button>
            <button
              onClick={() => setActiveWorkspaceTab('RECAP')}
              style={tabStyle(activeWorkspaceTab === 'RECAP')}
            >
              <Video size={16} /> Orientation Video
            </button>
          </div>
        </div>

        {/* Tab Content: Project Scope & Deliverable Overview */}
        {activeWorkspaceTab === 'TASK_DETAILS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#f0fdf4', border: '1px solid rgba(141, 198, 63, 0.35)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5a9a1a', textTransform: 'uppercase', marginBottom: '6px' }}>
                  2-Month Internship Objective
                </div>
                <p style={{ fontSize: '0.92rem', color: '#1a1a2e', lineHeight: 1.6 }}>
                  {selectedProgram.description}
                </p>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c17d0a', textTransform: 'uppercase', marginBottom: '6px' }}>
                  What You Will Deliver & Complete
                </div>
                <p style={{ fontSize: '0.92rem', color: '#1a1a2e', lineHeight: 1.6 }}>
                  Deliver an end-to-end production-grade case study solution. Each task must be submitted sequentially and evaluated by mentors to earn the official completion certificate.
                </p>
              </div>
            </div>

            {/* Rules & Policies */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#8dc63f" /> Program Delivery Rules & Regulations:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                {selectedProgram.rules.map((rule, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#4a5568' }}>
                    <span style={{ color: '#5a9a1a', fontWeight: 800 }}>✓</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Video Briefing */}
        {activeWorkspaceTab === 'RECAP' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '40%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', border: '1px solid #e2e8f0' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src={selectedProgram.orientationVideoUrl}
                title={selectedProgram.orientationVideoTitle}
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: Vertical Task Curriculum (Below Deliverable Section) */}
      <TimelineStepper activeTaskTab={activeTaskTab} setActiveTaskTab={setActiveTaskTab} />
    </div>
  );
};
