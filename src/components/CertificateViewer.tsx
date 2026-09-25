import { ArrowLeft, Award, Download, Linkedin, Copy } from 'lucide-react';
import React, { useMemo, useRef } from 'react';
import { useInternship } from '../context/InternshipContext';
// @ts-ignore
// Dynamic import will be used in handleDownloadPdf



export const CertificateViewer: React.FC = () => {
  const { enrollment, selectedProgram, setActiveView } = useInternship();
  const certRef = useRef<HTMLDivElement>(null);

  const totalTasksCount = selectedProgram.tasks?.length || 4;
  const approvedTasksCount = Object.values(enrollment.taskSubmissions || {}).filter(
    (s) => s.status === 'APPROVED'
  ).length;
  const isFullyCompleted = approvedTasksCount === totalTasksCount;

  const companyLogoUrl = selectedProgram.companyLogo;

  // Stable certificate ID
  const certId = useMemo(() => enrollment.certificateId || `CERT-${Date.now().toString(36).toUpperCase()}`, [enrollment.certificateId]);

  const skills = Array.from(new Set(
    selectedProgram.tasks?.flatMap(task => task.learn || []) || []
  ));

  // Dates
  const enrolledDate = new Date(enrollment.enrolledAt);
  const endDate = new Date(enrolledDate);
  endDate.setMonth(endDate.getMonth() + 2);
  const formatDate = (d: Date) => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // Track type label
  const trackLabel = (() => {
    switch (selectedProgram.type) {
      case 'SELF_PLACED': return 'Self-Paced';
      case 'MENTOR_GUIDED': return 'Mentor-Guided';
      case 'COMPANY_REMOTE': return 'Company-Assisted (Remote)';
      case 'COMPANY_ON_PREMISES': return 'Company-Assisted (On-Premises)';
      default: return 'Self-Paced';
    }
  })();

  const handleDownloadPdf = async () => {
  if (!certRef.current) return;
  const html2pdf = (await import('html2pdf.js')).default;
  const opt = {
    margin: 0,
    filename: `Certificate_of_Internship_${enrollment.studentName.replace(/\\s/g, '_')}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm' as const, format: 'a4', orientation: 'landscape' as const }
  };
  html2pdf().from(certRef.current).set(opt).save();
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
          {isFullyCompleted ? 'Congratulations' : 'Great effort'}, {enrollment.studentName.split(' ')[0]}!
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4a5568' }}>
          {isFullyCompleted
            ? 'You have completed all tasks. Your certificate is ready below.'
            : `You completed ${approvedTasksCount} of ${totalTasksCount} tasks. Your certificate is ready below.`}
        </p>
      </div>

      {/* ─── CERTIFICATE VISUAL ─── */}
      <div ref={certRef} id="certificate-print-area" style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '0',
        boxShadow: '0 24px 64px -12px rgba(0,0,0,0.14)',
        position: 'relative',
        overflow: 'hidden',
        border: '3px solid #1a56db',
      }}>
        {/* Decorative top gradient */}
        <div style={{ height: '10px', background: 'linear-gradient(90deg, #1a56db 0%, #3b82f6 40%, #8dc63f 100%)' }} />

        {/* Inner border effect */}
        <div style={{ margin: '16px', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '48px 56px', position: 'relative' }}>

          {/* Corner ornaments */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '40px', height: '40px', borderTop: '3px solid #1a56db', borderLeft: '3px solid #1a56db', borderRadius: '4px 0 0 0' }} />
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '40px', height: '40px', borderTop: '3px solid #1a56db', borderRight: '3px solid #1a56db', borderRadius: '0 4px 0 0' }} />
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '40px', height: '40px', borderBottom: '3px solid #1a56db', borderLeft: '3px solid #1a56db', borderRadius: '0 0 0 4px' }} />
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '40px', height: '40px', borderBottom: '3px solid #1a56db', borderRight: '3px solid #1a56db', borderRadius: '0 0 4px 0' }} />

          {/* Award watermark */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03 }}>
            <Award size={300} />
          </div>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '64px', height: '64px', background: '#fff',
                border: '1px solid #e2e8f0', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
              }}>
                <img
                  src={companyLogoUrl || ''}
                  alt={selectedProgram.companyName}
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  crossOrigin="anonymous"
                />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1a2e' }}>{selectedProgram.companyName}</div>
                <div style={{ fontSize: '0.8rem', color: '#718096' }}>{selectedProgram.title}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'sans-serif' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>ITVedant Education Pvt. Ltd.</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Integrated Internship Program</div>
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8dc63f', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Certificate of</div>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#1a56db', margin: 0, letterSpacing: '0.04em' }}>INTERNSHIP</h2>
            <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, #1a56db, #8dc63f)', margin: '12px auto 0' }} />
          </div>

          {/* Body text */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px', lineHeight: 1.8, fontFamily: '"Times New Roman", Times, serif', fontSize: '1rem', color: '#334155' }}>
            <p style={{ margin: '0 0 16px 0' }}>
              This is to certify that <strong style={{ color: '#1a1a2e', fontSize: '1.15rem', borderBottom: '2px solid #1a56db', paddingBottom: '2px' }}>{enrollment.studentName}</strong> participated in the Virtual Internship Program in <strong style={{ color: '#1a1a2e' }}>{selectedProgram.domain}</strong> conducted from <strong>{formatDate(enrolledDate)}</strong> to <strong>{formatDate(endDate)}</strong> under the <strong>{trackLabel}</strong> track, facilitated in partnership with <strong>ITVedant Education Private Limited</strong>.
            </p>
            <p style={{ margin: '0 0 16px 0' }}>
              During this period, the participant completed <strong style={{ color: '#1a56db', fontSize: '1.1rem' }}>{approvedTasksCount} of {totalTasksCount}</strong> assigned milestones of the case study, and was evaluated by the designated mentor/evaluator based on the work submitted.
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', background: '#e2e8f0', margin: '24px 0' }} />

          {/* Disclaimer */}
          <div style={{ padding: '20px 24px', border: '1px dashed #cbd5e1', borderRadius: '8px', background: '#fafbfc', fontFamily: 'sans-serif', marginBottom: '32px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.8rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Important Disclaimer</h4>
            <p style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '8px', lineHeight: 1.6, textAlign: 'justify' }}>
              This certificate is issued solely to acknowledge the participant's engagement in a structured, project-based virtual learning exercise, to the extent of the task completion recorded above. It does NOT constitute:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.78rem', color: '#475569', margin: '0 0 8px 0', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: 1.5 }}>
              <li>(a) An offer, confirmation, or evidence of employment with {selectedProgram.companyName};</li>
              <li>(b) An employer-employee relationship of any kind between the participant and {selectedProgram.companyName};</li>
              <li>(c) Professional work experience, and must not be represented, listed, or claimed as "work experience," "employment," or "professional experience" on any resume, professional network (including but not limited to LinkedIn), or job application.</li>
            </ul>
            <p style={{ fontSize: '0.78rem', color: '#475569', margin: '8px 0 0 0', lineHeight: 1.5, textAlign: 'justify' }}>
              This certificate may only be described, in any format or platform, as: <strong>"Completed {approvedTasksCount} of {totalTasksCount} Tasks of a Virtual Internship Program."</strong> Any description that omits the completion ratio stated above, or that implies full completion when the ratio reflects otherwise, is a misrepresentation of this document. Any misuse or misrepresentation of this certificate may result in its revocation and disqualification from future programs.
            </p>
          </div>

          {/* Signatures row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            {/* Left - Authorized Signatory */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.3rem', color: '#1a56db', marginBottom: '4px' }}>Dr. Priya Sharma</div>
              <div style={{ width: '150px', height: '2px', background: '#1a56db', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a2e' }}>Authorized Signatory</div>
              <div style={{ fontSize: '0.7rem', color: '#718096' }}>Program Director, IIP</div>
            </div>

            {/* Center - Seal */}
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a56db, #3b82f6)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(26,86,219,0.35)', border: '4px solid #bfdbfe'
            }}>
              <Award size={24} color="#fff" />
              <span style={{ fontSize: '0.48rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', marginTop: '2px' }}>VERIFIED</span>
            </div>

            {/* Right - Date of Issue */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.3rem', color: '#1a56db', marginBottom: '4px' }}>{formatDate(new Date())}</div>
              <div style={{ width: '150px', height: '2px', background: '#1a56db', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a2e' }}>Date of Issue</div>
              <div style={{ fontSize: '0.7rem', color: '#718096' }}>{selectedProgram.companyName}</div>
            </div>
          </div>

          {/* Certificate ID */}
          <div style={{ textAlign: 'center', marginTop: '24px', padding: '10px', background: '#f1f5f9', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569' }}>Certificate ID: </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1a56db', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{certId}</span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: '8px' }}>(for verification)</span>
          </div>
        </div>

        {/* Bottom gradient */}
        <div style={{ height: '10px', background: 'linear-gradient(90deg, #8dc63f 0%, #3b82f6 50%, #1a56db 100%)' }} />
      </div>

      {/* ─── ACTION BUTTONS ─── */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={handleDownloadPdf}
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
              { label: 'Domain', value: selectedProgram.domain },
              { label: 'Program', value: selectedProgram.title },
              { label: 'Company', value: selectedProgram.companyName },
              { label: 'Track', value: trackLabel },
              { label: 'Duration', value: `${formatDate(enrolledDate)} — ${formatDate(endDate)}` },
              { label: 'Tasks completed', value: `${approvedTasksCount} of ${totalTasksCount}` },
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
