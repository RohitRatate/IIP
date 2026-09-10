import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';
import { UserCheck, X, CheckCircle2, XCircle } from 'lucide-react';

export const ReviewPanel: React.FC = () => {
  const { reviewModalOpen, setReviewModalOpen, reviewTaskNum, enrollment, reviewSubmission, role, selectedProgram } = useInternship();
  const [feedback, setFeedback] = useState('Excellent project architecture and code cleanliness! Task approved.');

  if (!reviewModalOpen) return null;
  const submission = enrollment.taskSubmissions[reviewTaskNum];

  const handleApprove = () => { reviewSubmission(reviewTaskNum, 'APPROVED', feedback); setReviewModalOpen(false); };
  const handleReject = () => { setReviewModalOpen(false); };

  return (
    <div className="modal-overlay" onClick={() => setReviewModalOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#f8fafc', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(141, 198, 63, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck color="#5a9a1a" size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a1a2e' }}>Review Milestone Deliverable</h3>
              <div style={{ fontSize: '0.78rem', color: '#718096' }}>Evaluating: {enrollment.studentName} ({selectedProgram.title})</div>
            </div>
          </div>
          <button onClick={() => setReviewModalOpen(false)} style={{ background: 'transparent', color: '#9ea8b3' }}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#5a9a1a', textTransform: 'uppercase', marginBottom: '4px' }}>Submitted Link</div>
            <a href={submission?.submissionLink} target="_blank" rel="noreferrer" style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '0.92rem', wordBreak: 'break-all', textDecoration: 'underline', textDecorationColor: '#8dc63f' }}>
              {submission?.submissionLink || 'No link'}
            </a>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ea8b3', textTransform: 'uppercase', marginTop: '10px', marginBottom: '4px' }}>Student Notes</div>
            <p style={{ fontSize: '0.85rem', color: '#4a5568' }}>{submission?.notes || 'No notes.'}</p>
          </div>
          <div className="form-group">
            <label>Reviewer Feedback & Comments ({role})</label>
            <textarea className="form-control" rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Enter detailed feedback..." required />
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between', background: '#f8fafc', borderRadius: '0 0 var(--radius-xl) var(--radius-xl)' }}>
          <button onClick={handleReject} className="btn-secondary" style={{ color: '#c53030', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
            <XCircle size={16} /> Cancel Review
          </button>
          <button onClick={handleApprove} className="btn-success">
            <CheckCircle2 size={16} /> Approve & Update Score
          </button>
        </div>
      </div>
    </div>
  );
};
