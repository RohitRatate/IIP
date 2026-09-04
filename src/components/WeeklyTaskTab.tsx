import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';
import { Target, FileCode, BookOpen, ExternalLink, CheckCircle2, Clock, Send, MessageSquare, UserCheck } from 'lucide-react';

interface WeeklyTaskTabProps {
  weekNum: number;
}

export const WeeklyTaskTab: React.FC<WeeklyTaskTabProps> = ({ weekNum }) => {
  const { selectedProgram, enrollment, submitWeeklyTask, role, setReviewModalOpen, setReviewWeekNum } = useInternship();

  const weekConfig = selectedProgram.weeks.find((w) => w.weekNumber === weekNum) || selectedProgram.weeks[0];
  const submission = enrollment.submissions[weekNum] || { weekNumber: weekNum, submitted: false, status: 'NOT_SUBMITTED' };
  const dailyLogs = enrollment.dailyLogs[weekNum] || [];
  const completedDaysCount = dailyLogs.filter((d) => d.sodSubmitted && d.eodSubmitted).length;
  const isEligibleToSubmit = completedDaysCount === 5 || role !== 'STUDENT';

  const [submissionLink, setSubmissionLink] = useState(submission.submissionLink || `https://github.com/wingz-student/iip-week-${weekNum}`);
  const [notes, setNotes] = useState(submission.notes || `Completed all Week ${weekNum} requirements.`);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); submitWeeklyTask(weekNum, submissionLink, notes); };
  const handleOpenReview = () => { setReviewWeekNum(weekNum); setReviewModalOpen(true); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Objective Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Target color="#8dc63f" size={22} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a2e' }}>
            Week {weekNum}: {weekConfig.title}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid rgba(141, 198, 63, 0.35)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#5a9a1a', textTransform: 'uppercase', marginBottom: '6px' }}>Weekly Objective</div>
            <p style={{ fontSize: '0.9rem', color: '#1a1a2e', lineHeight: 1.5 }}>{weekConfig.objective}</p>
          </div>
          <div style={{ background: '#fffbeb', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c17d0a', textTransform: 'uppercase', marginBottom: '6px' }}>Weekly Task Deliverable</div>
            <p style={{ fontSize: '0.9rem', color: '#1a1a2e', lineHeight: 1.5 }}>{weekConfig.task}</p>
          </div>
        </div>

        {/* Resources */}
        <div style={{ marginTop: '18px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ea8b3', textTransform: 'uppercase', marginBottom: '10px' }}>
            Learning Resources
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {weekConfig.resources.map((res) => (
              <a key={res.id} href={res.url} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '7px 14px',
                borderRadius: 'var(--radius-md)', background: 'rgba(141, 198, 63, 0.1)',
                border: '1px solid rgba(141, 198, 63, 0.35)', color: '#4a7a10',
                fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s'
              }}>
                <BookOpen size={13} /><span>{res.name} ({res.type})</span><ExternalLink size={11} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Submission + Review Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
        {/* Submission Card */}
        <div className="glass-card">
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode color="#8dc63f" size={19} /> Week {weekNum} Deliverable Submission
          </h4>

          {!isEligibleToSubmit ? (
            <div style={{ background: '#fffbeb', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: 'var(--radius-md)', padding: '14px', fontSize: '0.88rem', color: '#1a1a2e' }}>
              <div style={{ fontWeight: 700, color: '#c17d0a', marginBottom: '4px' }}>Complete All 5 Daily Updates First</div>
              You have completed {completedDaysCount} / 5 daily updates. Submit all 5 working day logs to unlock task submission.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label>Repository / Demo Link</label>
                <input type="url" className="form-control" value={submissionLink} onChange={(e) => setSubmissionLink(e.target.value)} placeholder="https://github.com/..." required />
              </div>
              <div className="form-group">
                <label>Submission Notes</label>
                <textarea className="form-control" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Summarize key features..." required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={15} /> Submit Deliverable for Review
              </button>
            </form>
          )}
        </div>

        {/* Review Status Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck color="#8dc63f" size={19} /> Review & Approval
            </h4>
            <span style={{
              padding: '3px 10px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700,
              background: submission.status === 'APPROVED' ? 'rgba(141, 198, 63, 0.15)' : submission.status === 'PENDING_REVIEW' ? 'rgba(245, 158, 11, 0.12)' : submission.status === 'REJECTED' ? 'rgba(239, 68, 68, 0.12)' : '#f8fafc',
              color: submission.status === 'APPROVED' ? '#4a7a10' : submission.status === 'PENDING_REVIEW' ? '#c17d0a' : submission.status === 'REJECTED' ? '#c53030' : '#9ea8b3',
              border: `1px solid ${submission.status === 'APPROVED' ? 'rgba(141, 198, 63, 0.4)' : submission.status === 'PENDING_REVIEW' ? 'rgba(245, 158, 11, 0.35)' : submission.status === 'REJECTED' ? 'rgba(239, 68, 68, 0.3)' : '#e2e8f0'}`
            }}>
              {submission.status.replace('_', ' ')}
            </span>
          </div>

          {submission.submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '12px', fontSize: '0.85rem' }}>
                <div style={{ color: '#9ea8b3', fontSize: '0.72rem', marginBottom: '3px' }}>Submitted Link:</div>
                <a href={submission.submissionLink} target="_blank" rel="noreferrer" style={{ color: '#5a9a1a', fontWeight: 700, wordBreak: 'break-all', textDecoration: 'none' }}>
                  {submission.submissionLink}
                </a>
                <div style={{ color: '#9ea8b3', fontSize: '0.72rem', marginTop: '5px' }}>Submitted: {submission.submittedAt}</div>
              </div>

              {submission.status === 'APPROVED' && (
                <div style={{ background: '#f0fdf4', border: '1px solid rgba(141, 198, 63, 0.4)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4a7a10', fontWeight: 700, marginBottom: '5px' }}>
                    <CheckCircle2 size={15} /> Approved by {submission.reviewedBy}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#1a1a2e' }}>"{submission.feedback}"</p>
                  <div style={{ fontSize: '0.72rem', color: '#9ea8b3', marginTop: '4px' }}>Reviewed: {submission.reviewedAt}</div>
                </div>
              )}

              {submission.status === 'PENDING_REVIEW' && (
                <div style={{ background: '#fffbeb', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c17d0a', fontWeight: 700, marginBottom: '5px' }}>
                    <Clock size={15} /> Awaiting Evaluation
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#718096' }}>Your submission is pending review by the assigned mentor or company.</p>
                  {role !== 'STUDENT' && (
                    <button onClick={handleOpenReview} className="btn-primary btn-sm" style={{ marginTop: '10px' }}>
                      Evaluate Submission ({role})
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 16px', color: '#9ea8b3', fontSize: '0.88rem' }}>
              <MessageSquare size={32} color="#d1d5db" style={{ marginBottom: '8px' }} />
              <div style={{ color: '#4a5568', fontWeight: 600 }}>No submission yet for Week {weekNum}</div>
              <div style={{ fontSize: '0.75rem', color: '#9ea8b3', marginTop: '4px' }}>Complete daily logs and submit a deliverable link.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
