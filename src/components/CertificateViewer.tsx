import React from 'react';
import { useInternship } from '../context/InternshipContext';
import { Award, Printer, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const CertificateViewer: React.FC = () => {
  const { enrollment, selectedProgram, setActiveView } = useInternship();
  const certId = enrollment.certificateId || `WNGZ-IIP-2026-8849`;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Action Bar */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px' }}>
        <button onClick={() => setActiveView('DASHBOARD')} className="btn-secondary"><ArrowLeft size={15} /> Back to Dashboard</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ background: 'rgba(141, 198, 63, 0.15)', color: '#4a7a10', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(141, 198, 63, 0.4)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={13} /> Certificate Verified & Issued
          </span>
          <button onClick={() => window.print()} className="btn-primary"><Printer size={15} /> Print / Save PDF</button>
        </div>
      </div>

      {/* Certificate Canvas */}
      <div id="certificate-print-area" style={{
        background: '#ffffff',
        border: '3px solid #e2e8f0',
        borderRadius: 'var(--radius-xl)',
        padding: '48px 44px',
        boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.15)',
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>
        {/* Top decorative green stripe */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '7px', background: 'linear-gradient(90deg, #8dc63f 0%, #5a9a1a 50%, #1a1a2e 100%)' }} />

        {/* Corner accent */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(141, 198, 63, 0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #f1f5f9', paddingBottom: '24px', marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #8dc63f 0%, #5a9a1a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(141, 198, 63, 0.35)' }}>
              <Sparkles color="#ffffff" size={28} />
            </div>
            <div>
              <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#1a1a2e', letterSpacing: '-0.02em' }}>Wingz Tech Academy</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8dc63f', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Integrated Internship Program (IIP)</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#9ea8b3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Certificate ID</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a1a2e', fontFamily: 'monospace' }}>{certId}</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#8dc63f', marginBottom: '12px' }}>
            OFFICIAL CERTIFICATE OF COMPLETION
          </div>
          <p style={{ fontSize: '1rem', color: '#718096', marginBottom: '16px' }}>This is to certify that</p>
          <h1 style={{
            fontSize: '2.6rem', fontWeight: 800, color: '#1a1a2e',
            borderBottom: '3px solid #8dc63f', display: 'inline-block',
            paddingBottom: '8px', marginBottom: '20px', letterSpacing: '-0.01em'
          }}>
            {enrollment.studentName}
          </h1>
          <p style={{ fontSize: '1rem', color: '#4a5568', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
            has successfully completed the intensive <strong style={{ color: '#1a1a2e' }}>{selectedProgram.title}</strong> ({selectedProgram.type.replace('_', ' ')}) internship under <strong style={{ color: '#1a1a2e' }}>{selectedProgram.companyName}</strong>, fulfilling all required case study milestones and capstone project deliverables.
          </p>
        </div>

        {/* Metadata */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px',
          background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-lg)', padding: '18px', textAlign: 'center', marginBottom: '40px'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ea8b3', textTransform: 'uppercase' }}>Internship Track</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1a1a2e', marginTop: '4px' }}>{selectedProgram.type.replace('_', ' ')}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ea8b3', textTransform: 'uppercase' }}>Partner Organization</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#5a9a1a', marginTop: '4px' }}>{selectedProgram.companyName}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ea8b3', textTransform: 'uppercase' }}>Issued Date</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1a1a2e', marginTop: '4px' }}>September 2026</div>
          </div>
        </div>

        {/* Signatures */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: '2px solid #f1f5f9', paddingTop: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'cursive', fontSize: '1.5rem', color: '#5a9a1a', marginBottom: '4px' }}>Dr. Sarah Jenkins</div>
            <div style={{ width: '160px', height: '2px', background: '#8dc63f', margin: '0 auto 6px auto' }} />
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1a1a2e' }}>Lead Trainer & Mentor</div>
            <div style={{ fontSize: '0.7rem', color: '#9ea8b3' }}>Wingz IIP Academic Board</div>
          </div>

          {/* Seal */}
          <div style={{
            width: '82px', height: '82px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #8dc63f 0%, #5a9a1a 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 24px rgba(141, 198, 63, 0.45)', border: '4px solid #d4edaa'
          }}>
            <Award size={32} color="#ffffff" />
            <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase' }}>VERIFIED</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'cursive', fontSize: '1.5rem', color: '#5a9a1a', marginBottom: '4px' }}>Alex Rivera</div>
            <div style={{ width: '160px', height: '2px', background: '#8dc63f', margin: '0 auto 6px auto' }} />
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1a1a2e' }}>Industry Partner Lead</div>
            <div style={{ fontSize: '0.7rem', color: '#9ea8b3' }}>{selectedProgram.companyName}</div>
          </div>
        </div>

        {/* Bottom green stripe */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, #1a1a2e 0%, #5a9a1a 50%, #8dc63f 100%)' }} />
      </div>
    </div>
  );
};
