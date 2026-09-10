import { Check, Lock, Play, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';

interface TimelineStepperProps {
  activeTaskTab: number;
  setActiveTaskTab: (t: number) => void;
}

export const TimelineStepper: React.FC<TimelineStepperProps> = ({ activeTaskTab, setActiveTaskTab }) => {
  const { enrollment, selectedProgram } = useInternship();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [modalTaskNumber, setModalTaskNumber] = useState<number | null>(null);

  const handleOpenModal = (taskNum: number) => {
    setModalTaskNumber(taskNum);
    setShowTaskModal(true);
  };

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(141, 198, 63, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={16} color="#5a9a1a" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a2e', margin: 0 }}>
              Case Study Curriculum & Tasks
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#718096' }}>
              Sequential Delivery • Top task is unlocked, submit to unlock subsequent milestones
            </span>
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, background: '#f8fafc', padding: '5px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#4a5568' }}>
          {selectedProgram.duration} Program
        </span>
      </div>

      {/* Vertical Tasks Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(selectedProgram.tasks || []).map((taskConfig, idx) => {
          const tNum = taskConfig.taskNumber || idx + 1;
          const submission = enrollment.taskSubmissions[tNum];
          const isLocked = tNum > enrollment.unlockedTaskCount;
          const isApproved = submission?.status === 'APPROVED';
          const isUnderReview = submission?.status === 'UNDER_REVIEW';
          const isCurrent = tNum === enrollment.unlockedTaskCount && !isApproved && !isUnderReview;
          const isSelected = activeTaskTab === tNum;

          let badgeText = 'Locked';
          let badgeColor = '#9ea8b3';
          let badgeBg = '#f1f5f9';
          let borderStyle = isSelected ? '2px solid #8dc63f' : '1px solid #e2e8f0';
          let cardBg = '#ffffff';

          if (isApproved) {
            badgeText = 'Completed (Approved) ✅';
            badgeColor = '#4a7a10';
            badgeBg = 'rgba(141, 198, 63, 0.15)';
            borderStyle = isSelected ? '2px solid #8dc63f' : '1px solid rgba(141, 198, 63, 0.35)';
          } else if (isUnderReview) {
            badgeText = 'Under Review ⏳';
            badgeColor = '#b8640e';
            badgeBg = 'rgba(245, 158, 11, 0.15)';
            borderStyle = isSelected ? '2px solid #8dc63f' : '1px solid rgba(245, 158, 11, 0.35)';
          } else if (isCurrent) {
            badgeText = 'Current / Unlocked 🟢';
            badgeColor = '#2b6cb0';
            badgeBg = 'rgba(66, 153, 225, 0.12)';
            borderStyle = '2px solid #8dc63f';
            cardBg = 'rgba(141, 198, 63, 0.03)';
          }

          return (
            <div
              key={taskConfig.taskNumber || idx}
              onClick={() => {
                if (!isLocked) setActiveTaskTab(tNum);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 'var(--radius-lg)',
                background: isLocked ? '#fbfcfe' : cardBg,
                border: borderStyle,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.6 : 1,
                boxShadow: isCurrent ? '0 4px 16px rgba(141, 198, 63, 0.15)' : 'none',
                transition: 'all 0.2s',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              {/* Left Column: Icon/Status + Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 320px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: isApproved ? 'rgba(141, 198, 63, 0.2)' : isCurrent ? '#8dc63f' : isUnderReview ? 'rgba(245, 158, 11, 0.2)' : '#edf2f7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    color: isCurrent ? '#1a1a2e' : isApproved ? '#4a7a10' : isUnderReview ? '#b8640e' : '#a0aec0',
                    flexShrink: 0
                  }}
                >
                  {isApproved ? <Check size={18} color="#4a7a10" /> : isLocked ? <Lock size={16} color="#a0aec0" /> : isCurrent ? <Play size={16} color="#1a1a2e" /> : <Send size={16} color="#718096" />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#718096' }}>MILESTONE</span>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px',
                      background: badgeBg, color: badgeColor
                    }}>
                      {badgeText}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: isLocked ? '#718096' : '#1a1a2e', marginTop: '3px' }}>
                    {taskConfig.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#718096', marginTop: '2px', lineHeight: 1.4 }}>
                    {taskConfig.objective}
                  </p>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLocked) handleOpenModal(tNum);
                  }}
                  disabled={isLocked}
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    background: isLocked ? '#e2e8f0' : isCurrent ? 'linear-gradient(135deg, #8dc63f 0%, #6aa513 100%)' : '#1a1a2e',
                    color: isLocked ? '#a0aec0' : '#ffffff',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    boxShadow: isLocked ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isLocked ? (
                    <>
                      <Lock size={12} /> Locked
                    </>
                  ) : isApproved ? (
                    <>
                      <Check size={13} /> View Submission
                    </>
                  ) : isUnderReview ? (
                    <>
                      <Send size={13} /> Under Review
                    </>
                  ) : (
                    <>
                      <Send size={13} /> Task
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showTaskModal && modalTaskNumber && (
        <TaskModal
          taskNumber={modalTaskNumber}
          onClose={() => setShowTaskModal(false)}
        />
      )}
    </div>
  );
};

const TaskModal: React.FC<{ taskNumber: number; onClose: () => void }> = ({ taskNumber, onClose }) => {
  const { selectedProgram, enrollment, submitTask, role, setReviewModalOpen, setReviewTaskNum } = useInternship();
  const taskConfig = selectedProgram.tasks.find((t) => t.taskNumber === taskNumber) || selectedProgram.tasks[0];
  const submission = enrollment.taskSubmissions[taskNumber];

  const [link, setLink] = useState(submission?.submissionLink || `https://github.com/wingz-student/task-${taskNumber}`);
  const [notes, setNotes] = useState(submission?.notes || `Completed all requirements for Task ${taskNumber}.`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTask(taskNumber, link, notes);
    onClose();
  };

  const handleOpenTrainerReview = () => {
    setReviewTaskNum(taskNumber);
    setReviewModalOpen(true);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          padding: '28px', maxWidth: '520px', width: '100%',
          background: '#ffffff', maxHeight: '90vh', overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{
              fontSize: '0.75rem', fontWeight: 800, color: '#5a9a1a',
              background: 'rgba(141, 198, 63, 0.15)', padding: '3px 8px', borderRadius: '6px'
            }}>
              MILESTONE DELIVERABLE
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e', marginTop: '6px' }}>
              {taskConfig.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#9ea8b3' }}
          >
            ✕
          </button>
        </div>

        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', marginBottom: '18px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase', marginBottom: '4px' }}>
            Objective
          </div>
          <p style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: 1.5 }}>{taskConfig.objective}</p>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase', marginTop: '10px', marginBottom: '4px' }}>
            Deliverable
          </div>
          <p style={{ fontSize: '0.85rem', color: '#1a1a2e', fontWeight: 600, lineHeight: 1.5 }}>{taskConfig.task}</p>
        </div>

        {/* Current Status Box */}
        <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#718096' }}>Status:</span>
          <span style={{
            fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '9999px',
            background: submission?.status === 'APPROVED' ? 'rgba(141, 198, 63, 0.15)' : submission?.status === 'UNDER_REVIEW' ? 'rgba(245, 158, 11, 0.15)' : '#edf2f7',
            color: submission?.status === 'APPROVED' ? '#4a7a10' : submission?.status === 'UNDER_REVIEW' ? '#c17d0a' : '#718096'
          }}>
            {submission?.status === 'APPROVED' ? 'Completed (Approved) ✅' : submission?.status === 'UNDER_REVIEW' ? 'Under Review ⏳' : 'Current / Unlocked 🟢'}
          </span>
        </div>

        {/* Trainer Review shortcut if under review */}
        {role !== 'STUDENT' && submission?.status === 'UNDER_REVIEW' && (
          <div style={{ background: '#fffbeb', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c17d0a', marginBottom: '6px' }}>
              Trainer Evaluation Ready
            </div>
            <button
              onClick={handleOpenTrainerReview}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '8px' }}
            >
              Evaluate & Approve Deliverable ({role})
            </button>
          </div>
        )}

        {/* Submission Form */}
        {submission?.status === 'NOT_SUBMITTED' ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4a5568' }}>Repository / Deliverable Link</label>
              <input
                type="url"
                className="form-control"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://github.com/..."
                required
              />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4a5568' }}>Submission Notes</label>
              <textarea
                className="form-control"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Summarize key features..."
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                Submit Deliverable
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', fontSize: '0.82rem' }}>
              <div style={{ color: '#9ea8b3', marginBottom: '2px' }}>Submitted Link:</div>
              <a href={submission?.submissionLink} target="_blank" rel="noreferrer" style={{ color: '#5a9a1a', fontWeight: 700, wordBreak: 'break-all' }}>
                {submission?.submissionLink}
              </a>
              {submission?.feedback && (
                <div style={{ marginTop: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                  <div style={{ color: '#4a7a10', fontWeight: 700 }}>Feedback by {submission?.reviewedBy}:</div>
                  <div style={{ color: '#1a1a2e', fontStyle: 'italic', marginTop: '2px' }}>"{submission.feedback}"</div>
                </div>
              )}
            </div>
            <button onClick={onClose} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
