import React from 'react';
import { useInternship, UserRole } from '../context/InternshipContext';
import { Award, BookOpen, UserCheck, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, activeView, setActiveView, selectedProgram, enrollment } = useInternship();

  const rolesList: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    { id: 'STUDENT', label: 'Student', icon: <BookOpen size={14} /> },
    { id: 'TRAINER', label: 'Trainer', icon: <UserCheck size={14} /> },
    { id: 'COMPANY', label: 'Company', icon: <Building2 size={14} /> },
    { id: 'ADMIN', label: 'Admin', icon: <ShieldCheck size={14} /> }
  ];

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '2px solid #e2e8f0',
      padding: '14px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Logo */}
        <div
          onClick={() => setActiveView('CATALOG')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8dc63f 0%, #5a9a1a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(141, 198, 63, 0.35)'
          }}>
            <Sparkles color="#ffffff" size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1a2e' }}>
                Wingz
              </span>
              <span style={{
                background: 'rgba(141, 198, 63, 0.18)',
                color: '#4a7a10',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700,
                border: '1px solid rgba(141, 198, 63, 0.35)'
              }}>
                IIP Portal
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#718096', fontWeight: 500 }}>
              Integrated Internship Program
            </p>
          </div>

          {activeView !== 'CATALOG' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingLeft: '16px',
              borderLeft: '2px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '1.2rem' }}>{selectedProgram.companyLogo}</span>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1a2e' }}>{selectedProgram.title}</div>
                <div style={{ fontSize: '0.72rem', color: '#718096' }}>{selectedProgram.companyName}</div>
              </div>
            </div>
          )}
        </div>

        {/* Center Nav */}
        {activeView !== 'CATALOG' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#f8fafc',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setActiveView('CATALOG')}
              className="btn-secondary btn-sm"
              style={{ border: 'none', background: 'transparent' }}
            >
              Catalog
            </button>
            <button
              onClick={() => setActiveView('DASHBOARD')}
              className={activeView === 'DASHBOARD' ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}
              style={{ border: 'none', background: activeView === 'DASHBOARD' ? undefined : 'transparent' }}
            >
              Dashboard
            </button>
            {enrollment.status === 'COMPLETED' && (
              <button
                onClick={() => setActiveView('CERTIFICATE')}
                className={activeView === 'CERTIFICATE' ? 'btn-success btn-sm' : 'btn-secondary btn-sm'}
                style={{ border: 'none', gap: '6px' }}
              >
                <Award size={14} /> Certificate
              </button>
            )}
          </div>
        )}

        {/* Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ea8b3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            View as:
          </span>
          <div style={{
            display: 'flex',
            background: '#f8fafc',
            padding: '3px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            gap: '3px'
          }}>
            {rolesList.map((r) => {
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: isActive ? '#1a1a1a' : '#718096',
                    background: isActive ? 'linear-gradient(135deg, #8dc63f 0%, #6aa513 100%)' : 'transparent',
                    boxShadow: isActive ? '0 2px 8px rgba(141, 198, 63, 0.35)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
