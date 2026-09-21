import { ArrowLeft, Award, Copy, Download, Linkedin, Star } from 'lucide-react';
import React, { useMemo } from 'react';
import { useInternship } from '../context/InternshipContext';


export const CertificateViewer: React.FC = () => {
  const { enrollment, selectedProgram, setActiveView } = useInternship();

  const totalTasksCount = selectedProgram.tasks?.length || 4;
  const approvedTasksCount = Object.values(enrollment.taskSubmissions || {}).filter(
    (s) => s.status === 'APPROVED'
  ).length;
  const isFullyCompleted = approvedTasksCount === totalTasksCount;
  const scorePercent = Math.round((approvedTasksCount / totalTasksCount) * 100);

  // Use the local logo directly from selectedProgram
  const companyLogoUrl = selectedProgram.companyLogo;

  // Stable certificate ID (based on enrollment, not random on every render)
  const certId = useMemo(() => enrollment.certificateId || `CERT-${Date.now().toString(36).toUpperCase()}`, [enrollment.certificateId]);

  const skills = Array.from(new Set(
    selectedProgram.tasks?.flatMap(task => task.learn || []) || []
  ));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Back Button */}
      <button onClick={() => setActiveView('DASHBOARD')} className="btn-secondary" style={{ width: 'fit-content' }}>
        <ArrowLeft size={15} /> Back to Dashboard
      </button>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#1a56db', marginBottom: '8px' }}>
          Great work, {enrollment.studentName.split(' ')[0]}!
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4a5568' }}>
          {isFullyCompleted
            ? 'You have completed all tasks. Your certificate is ready below.'
            : `You completed ${approvedTasksCount} of ${totalTasksCount} tasks. Your score-based certificate is ready below.`}
        </p>
      </div>

      {/* ─── CERTIFICATE VISUAL ─── */}
      <div id="certificate-print-area" style={{
        background: '#fff',
        border: '2px solid #e2e8f0',
        borderRadius: '16px',
        padding: '56px 60px',
        boxShadow: '0 24px 64px -12px rgba(0,0,0,0.14)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top color bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: 'linear-gradient(90deg, #1a56db 0%, #3b82f6 60%, #8dc63f 100%)' }} />

        {/* Corner watermark */}
        <div style={{ position: 'absolute', top: 20, right: 20, opacity: 0.04 }}>
          <Award size={160} />
        </div>

        {/* Header row: company logo left, issuer right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '72px', height: '72px', background: '#fff',
              border: '1px solid #e2e8f0', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}>
              <img src={companyLogoUrl} alt={selectedProgram.companyName} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1a1a2e' }}>{selectedProgram.companyName}</div>
              <div style={{ fontSize: '0.82rem', color: '#718096', marginTop: '2px' }}>{selectedProgram.title}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8dc63f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {isFullyCompleted ? 'Certificate of Completion' : 'Certificate of Participation'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#718096', marginTop: '4px', fontFamily: 'monospace' }}>{certId}</div>
          </div>
        </div>

        {/* Main text */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '1rem', color: '#718096', marginBottom: '12px', letterSpacing: '0.04em' }}>
            THIS IS TO CERTIFY THAT
          </p>
          <h2 style={{
            fontSize: '3.2rem', fontWeight: 800, color: '#1a1a2e', margin: '0 0 20px 0',
            borderBottom: '3px solid #1a56db', display: 'inline-block', paddingBottom: '8px'
          }}>
            {enrollment.studentName}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#4a5568', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
            has {isFullyCompleted ? 'successfully completed' : 'participated in'} the <strong style={{ color: '#1a1a2e' }}>{selectedProgram.title}</strong> internship program offered by <strong style={{ color: '#1a1a2e' }}>{selectedProgram.companyName}</strong>.
          </p>
        </div>

        {/* Score & metadata strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0',
          background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px',
          overflow: 'hidden', marginBottom: '40px'
        }}>
          {[
            { label: 'Score', value: `${approvedTasksCount} / ${totalTasksCount}` },
            { label: 'Percentage', value: `${scorePercent}%` },
            { label: 'Duration', value: selectedProgram.duration },
            { label: 'Issued', value: 'September 2026' },
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '16px 20px', textAlign: 'center',
              borderRight: idx < 3 ? '1px solid #e2e8f0' : 'none'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9ea8b3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1a2e', marginTop: '4px' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Stars for score */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '40px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={24}
              fill={star <= Math.ceil(scorePercent / 20) ? '#f59e0b' : 'none'}
              color={star <= Math.ceil(scorePercent / 20) ? '#f59e0b' : '#e2e8f0'}
            />
          ))}
        </div>

        {/* Signatures */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '28px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'cursive', fontSize: '1.4rem', color: '#1a56db', marginBottom: '4px' }}>Dr. Priya Sharma</div>
            <div style={{ width: '140px', height: '2px', background: '#1a56db', margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a2e' }}>Program Director</div>
            <div style={{ fontSize: '0.7rem', color: '#718096' }}>Wingz IIP Academic Board</div>
          </div>

          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a56db, #3b82f6)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(26,86,219,0.35)', border: '4px solid #bfdbfe'
          }}>
            <Award size={28} color="#fff" />
            <span style={{ fontSize: '0.52rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase' }}>VERIFIED</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'cursive', fontSize: '1.4rem', color: '#1a56db', marginBottom: '4px' }}>{selectedProgram.mentorName || 'Alex Rivera'}</div>
            <div style={{ width: '140px', height: '2px', background: '#1a56db', margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a2e' }}>Industry Partner Lead</div>
            <div style={{ fontSize: '0.7rem', color: '#718096' }}>{selectedProgram.companyName}</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, #8dc63f 0%, #3b82f6 50%, #1a56db 100%)' }} />
      </div>

      {/* ─── DOWNLOAD BUTTON ─── */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={handlePrint}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#1a56db', color: '#fff', border: 'none',
            borderRadius: '8px', padding: '14px 28px', fontSize: '1rem', fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(26,86,219,0.3)'
          }}
        >
          <Download size={20} /> Download Certificate (PDF)
        </button>
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#fff', color: '#1a56db', border: '2px solid #1a56db',
            borderRadius: '8px', padding: '14px 28px', fontSize: '1rem', fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Linkedin size={20} /> Add to LinkedIn
        </button>
      </div>

      {/* ─── SKILLS & INFO CARDS ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Skills */}
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Skills earned</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            {skills.length > 0 ? skills.map((skill, idx) => (
              <div key={idx} style={{
                border: '1px solid #1a56db', color: '#1a56db', padding: '4px 14px',
                borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase'
              }}>
                {skill}
              </div>
            )) : (
              <div style={{ color: '#718096', fontSize: '0.9rem' }}>No specific skills listed.</div>
            )}
          </div>
          <button style={{ color: '#1a56db', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.9rem' }}>
            <Copy size={16} /> Copy to clipboard
          </button>
        </div>

        {/* Summary */}
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Internship summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Program', value: selectedProgram.title },
              { label: 'Company', value: selectedProgram.companyName },
              { label: 'Type', value: selectedProgram.type.replace(/_/g, ' ') },
              { label: 'Tasks completed', value: `${approvedTasksCount} of ${totalTasksCount}` },
              { label: 'Final score', value: `${scorePercent}%` },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ color: '#718096' }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: '#1a1a2e' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
