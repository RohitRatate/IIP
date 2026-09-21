import { ArrowRight, Award, Building, Building2, Clock, Sparkles, UserCheck, Users } from 'lucide-react';
import React from 'react';
import { useInternship } from '../context/InternshipContext';
import { InternshipProgram } from '../data/internshipsData';

export const CatalogScreen: React.FC = () => {
  const { programs, setSelectedProgramById, setActiveView } = useInternship();

  const handleSelectProgram = (program: InternshipProgram) => {
    setSelectedProgramById(program.id);
    setActiveView('COMPANY_DETAIL');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SELF_PLACED': return <Users size={22} color="#8dc63f" />;
      case 'MENTOR_GUIDED': return <UserCheck size={22} color="#5a9a1a" />;
      case 'COMPANY_REMOTE': return <Building2 size={22} color="#2563eb" />;
      case 'COMPANY_ON_PREMISES': return <Building size={22} color="#7c3aed" />;
      default: return <Sparkles size={22} color="#8dc63f" />;
    }
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'SELF_PLACED': return { background: 'rgba(141, 198, 63, 0.15)', color: '#4a7a10', border: '1px solid rgba(141, 198, 63, 0.4)' };
      case 'MENTOR_GUIDED': return { background: 'rgba(90, 154, 26, 0.12)', color: '#3d6810', border: '1px solid rgba(90, 154, 26, 0.35)' };
      case 'COMPANY_REMOTE': return { background: 'rgba(59, 130, 246, 0.12)', color: '#1d4ed8', border: '1px solid rgba(59, 130, 246, 0.35)' };
      case 'COMPANY_ON_PREMISES': return { background: 'rgba(139, 92, 246, 0.12)', color: '#6d28d9', border: '1px solid rgba(139, 92, 246, 0.35)' };
      default: return {};
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(26, 26, 46, 0.25)'
      }}>
        {/* Lime-green decorative accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '250px', height: '250px',
          background: 'radial-gradient(circle, rgba(141, 198, 63, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', left: '-30px',
          width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(141, 198, 63, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '800px', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(141, 198, 63, 0.2)',
            border: '1px solid rgba(141, 198, 63, 0.4)',
            padding: '4px 14px', borderRadius: '9999px',
            fontSize: '0.78rem', fontWeight: 700, color: '#8dc63f',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>
            <Sparkles size={12} /> Wingz Integrated Internship Program (IIP)
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.2, color: '#ffffff', marginBottom: '14px' }}>
            Learning <span style={{ color: '#8dc63f' }}>→</span> Internship{' '}
            <span style={{ color: '#8dc63f' }}>→</span> Industry Experience{' '}
            <span style={{ color: '#8dc63f' }}>→</span> Certification
          </h1>
          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Choose from 4 specialized internship tracks designed to build real-world work habits with structured milestone tasks, daily SOD/EOD updates, mentor reviews, and verified credentials.
          </p>
        </div>
      </div>

      {/* 4 Internship Track Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {programs.map((prog, idx) => (
          <div
            key={prog.id}
            className="glass-card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'default' }}
          >
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '10px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                flexShrink: 0
              }}>
                <img src={prog.companyLogo} alt={prog.companyName} style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
              </div>
              <span style={{
                ...getTypeBadgeStyle(prog.type),
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '4px 12px', borderRadius: '9999px',
                fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>
                {prog.badgeText}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8dc63f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Track {idx + 1}: {prog.type.replace(/_/g, ' ')}
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>
              {prog.title}
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '18px', minHeight: '54px', lineHeight: 1.5 }}>
              {prog.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4a5568' }}>
                <Clock size={15} color="#8dc63f" />
                <span><strong>Duration:</strong> {prog.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4a5568' }}>
                <Award size={15} color="#8dc63f" />
                <span><strong>Mode:</strong> {prog.enrollmentMode}</span>
              </div>
              {prog.mentorName && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4a5568' }}>
                  <UserCheck size={15} color="#8dc63f" />
                  <span><strong>Mentor:</strong> {prog.mentorName}</span>
                </div>
              )}
            </div>



            <button
              onClick={() => handleSelectProgram(prog)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Explore Internship Process</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
