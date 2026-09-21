import React from 'react';
import { useInternship } from '../context/InternshipContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const CompanyDetailScreen: React.FC = () => {
  const { selectedProgram, setActiveView } = useInternship();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '860px', margin: '0 auto' }}>
      
      {/* Back */}
      <button onClick={() => setActiveView('CATALOG')} className="btn-secondary" style={{ width: 'fit-content' }}>
        <ArrowLeft size={15} /> Back to Catalog
      </button>

      {/* Hero Card */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '14px',
            background: '#ffffff', border: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0
          }}>
            <img src={selectedProgram.companyLogo} alt={selectedProgram.companyName} style={{ width: '66px', height: '66px', objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8dc63f', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
              {selectedProgram.companyName}
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', lineHeight: 1.2 }}>
              {selectedProgram.title}
            </h1>
            <div style={{ fontSize: '0.88rem', color: '#718096' }}>{selectedProgram.type.replace(/_/g, ' ')} Internship</div>
          </div>
        </div>

        {/* Company Description */}
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>About {selectedProgram.companyName}</h2>
          <p style={{ fontSize: '1.05rem', color: '#4a5568', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
            {selectedProgram.companyDescription || selectedProgram.description}
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
          <button
            onClick={() => setActiveView('DASHBOARD')}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 700 }}
          >
            <span>Start Internship</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
