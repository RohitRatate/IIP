import React, { useState, useRef } from 'react';
import { useInternship } from '../context/InternshipContext';
import { CheckCircle2, ChevronLeft, ChevronRight, BookOpen, Microscope, UploadCloud, Download } from 'lucide-react';
// @ts-ignore
// Dynamic import will be used in handleDownloadLetter


export const StudentDashboard: React.FC = () => {
  const { selectedProgram, enrollment, generateCertificate, submitTask, simApproveTask } = useInternship();

  const [activeTab, setActiveTab] = useState<'ORIENTATION' | 'INTRO' | number>('ORIENTATION');
  const [orientationStep, setOrientationStep] = useState<number>(1);
  const [isOrientationComplete, setIsOrientationComplete] = useState<boolean>(false);
  const [introStep, setIntroStep] = useState<number>(1);
  const [taskViewMode, setTaskViewMode] = useState<'OVERVIEW' | 'SUBMIT'>('OVERVIEW');
  const [submissionNotes, setSubmissionNotes] = useState('');
  
  const letterRef = useRef<HTMLDivElement>(null);

  const handleDownloadLetter = async () => {
  if (!letterRef.current) return;
  const html2pdf = (await import('html2pdf.js')).default;
  const opt = {
    margin: 10,
    filename: 'Internship_Enrollment_Letter.pdf',
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm' as const, format: 'a4', orientation: 'portrait' as const }
  };
  html2pdf().from(letterRef.current).set(opt).save();
};

  const totalTasksCount = selectedProgram.tasks?.length || 4;
  const approvedTasksCount = Object.values(enrollment.taskSubmissions || {}).filter(
    (s) => s.status === 'APPROVED'
  ).length;

  const enrolledDate = new Date(enrollment.enrolledAt);
  const expiryDate = new Date(enrolledDate);
  expiryDate.setMonth(expiryDate.getMonth() + 2);
  const hasExpired = new Date() > expiryDate;
  
  const canGenerateCertificate = approvedTasksCount === totalTasksCount || hasExpired;

  const currentTaskConfig = selectedProgram.tasks?.find((t) => t.taskNumber === activeTab);

  const handleNextIntroStep = () => {
    if (introStep < 5) {
      setIntroStep(introStep + 1);
    } else {
      setActiveTab(1);
      setTaskViewMode('OVERVIEW');
    }
  };

  const handleTaskAction = () => {
    if (typeof activeTab === 'number') {
      if (taskViewMode === 'OVERVIEW') {
        setTaskViewMode('SUBMIT');
      } else {
        // Submit
        submitTask(activeTab, 'https://github.com/demo/submission', submissionNotes || 'Completed the task.');
        simApproveTask(); // Auto approve for demo
        setSubmissionNotes('');
        
        if (activeTab === totalTasksCount) {
          generateCertificate();
        } else {
          setActiveTab(activeTab + 1);
          setTaskViewMode('OVERVIEW');
        }
      }
    }
  };

  const handleSidebarTabClick = (tab: 'ORIENTATION' | 'INTRO' | number) => {
    if (!isOrientationComplete && tab !== 'ORIENTATION') return;
    setActiveTab(tab);
    if (typeof tab === 'number') {
      setTaskViewMode('OVERVIEW');
    }
  };

  const handleNextOrientationStep = () => {
    if (orientationStep < 5) {
      setOrientationStep(orientationStep + 1);
    } else {
      setIsOrientationComplete(true);
      setActiveTab('INTRO');
      setIntroStep(1);
    }
  };

  const renderOrientationContent = () => {
    switch (orientationStep) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>Founder Video</h2>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe src="https://www.youtube.com/embed/LDB4uaJ87e0" title="Founder Video" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}></iframe>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>HR Induction Video</h2>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe src="https://www.youtube.com/embed/LDB4uaJ87e0" title="HR Induction Video" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}></iframe>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>From Tech Person</h2>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe src="https://www.youtube.com/embed/LDB4uaJ87e0" title="Tech Person Video" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}></iframe>
            </div>
          </div>
        );
      case 4:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>Check Your Understanding</h2>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px' }}>
              <p style={{ marginBottom: '16px', fontWeight: 600 }}>What is the primary goal of our company?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['To innovate technology', 'To provide great customer service', 'To expand globally', 'All of the above'].map((opt, idx) => (
                  <div key={idx} style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', background: '#fff' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input type="radio" name="orientation-quiz" />
                      <span>{opt}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>INTERNSHIP ENROLLMENT LETTER</h2>
              <button onClick={handleDownloadLetter} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={18} />
                Download PDF
              </button>
            </div>
            
            <div ref={letterRef} style={{ 
              background: '#fff', 
              padding: '48px', 
              borderRadius: '12px', 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0', 
              color: '#334155', 
              fontFamily: '"Times New Roman", Times, serif', 
              lineHeight: '1.6',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative top border */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: 'linear-gradient(90deg, #2563eb, #8dc63f)' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <img
                  src={selectedProgram.companyLogo || ''}
                  alt={selectedProgram.companyName}
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  crossOrigin="anonymous"
                />
                <div style={{ textAlign: 'right', fontFamily: 'sans-serif' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 700 }}>ITVedant Education Pvt. Ltd.</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Integrated Internship Program</p>
                </div>
              </div>

              <p style={{ textAlign: 'right', marginBottom: '32px', fontWeight: 600 }}>Date: {new Date().toLocaleDateString()}</p>
              <p>To,</p>
              <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{enrollment.studentName}</p>
              
              <div style={{ background: '#f8fafc', padding: '16px', borderLeft: '4px solid #2563eb', margin: '24px 0', fontFamily: 'sans-serif' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#1e293b' }}>Subject: Enrollment Confirmation — Virtual/Mentored Internship in {selectedProgram.domain}</p>
              </div>
              
              <p style={{ marginTop: '24px' }}>Dear {enrollment.studentName},</p>
              <p style={{ marginTop: '12px', textAlign: 'justify' }}>This is to confirm your enrollment into the following internship under the Integrated Internship Program (IIP), facilitated by ITVedant Education Private Limited:</p>
              
              <div style={{ margin: '24px 0', padding: '24px', background: '#f1f5f9', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr><td style={{ padding: '8px 0', width: '40%', fontWeight: 600, color: '#475569' }}>Domain/Track:</td><td style={{ padding: '8px 0', fontWeight: 700, color: '#0f172a' }}>{selectedProgram.domain}</td></tr>
                    <tr style={{ borderTop: '1px solid #e2e8f0' }}><td style={{ padding: '8px 0', fontWeight: 600, color: '#475569' }}>Internship Type:</td><td style={{ padding: '8px 0', fontWeight: 700, color: '#0f172a' }}>Self-Paced </td></tr>
                    <tr style={{ borderTop: '1px solid #e2e8f0' }}><td style={{ padding: '8px 0', fontWeight: 600, color: '#475569' }}>Case Study Partner:</td><td style={{ padding: '8px 0', fontWeight: 700, color: '#0f172a' }}>{selectedProgram.companyName}</td></tr>
                    <tr style={{ borderTop: '1px solid #e2e8f0' }}><td style={{ padding: '8px 0', fontWeight: 600, color: '#475569' }}>Duration:</td><td style={{ padding: '8px 0', fontWeight: 700, color: '#0f172a' }}>2 Months</td></tr>
                    <tr style={{ borderTop: '1px solid #e2e8f0' }}><td style={{ padding: '8px 0', fontWeight: 600, color: '#475569' }}>Mode:</td><td style={{ padding: '8px 0', fontWeight: 700, color: '#0f172a' }}>Virtual/Remote</td></tr>
                  </tbody>
                </table>
              </div>
              
              <p style={{ marginTop: '16px', textAlign: 'justify' }}>As part of this internship, you will work on a case study/project brief provided in association with <strong>{selectedProgram.companyName}</strong>, under the guidance of your assigned mentor. Your progress will be evaluated on a weekly basis as per the guidelines shared during orientation, and a certificate reflecting your task completion will be issued upon conclusion of the program.</p>
              
              <div style={{ marginTop: '40px', padding: '20px', border: '1px dashed #cbd5e1', borderRadius: '8px', background: '#fff', fontFamily: 'sans-serif' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Important Disclaimer</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '12px', textAlign: 'justify' }}>This letter is issued as part of the Integrated Internship Program, and is NOT issued by, or on behalf of, the Human Resources department of {selectedProgram.companyName} or any other case study/project partner referenced above.</p>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '8px' }}>This letter does NOT constitute:</p>
                <ul style={{ paddingLeft: '24px', fontSize: '0.85rem', color: '#475569', marginTop: '0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>An offer of employment, internship engagement, or any contractual relationship with {selectedProgram.companyName};</li>
                  <li>An employer-employee relationship, or any relationship whatsoever, between the learner and {selectedProgram.companyName};</li>
                  <li>A guarantee of interview, hiring, or future engagement with {selectedProgram.companyName} upon completion of this internship.</li>
                </ul>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '12px', textAlign: 'justify' }}>{selectedProgram.companyName}'s role is limited to providing the case study/project brief used for this internship's structure, and does not extend to direct supervision, selection, or employment of the learner under this track. This letter should not be represented, listed, or claimed as an "offer letter," "internship offer," or any form of employment documentation on any resume, professional network (including but not limited to LinkedIn), or job application.</p>
              </div>
              
              <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontFamily: 'sans-serif' }}>
                <div>
                  <div style={{ width: '150px', height: '60px', borderBottom: '1px solid #94a3b8', marginBottom: '8px' }}></div>
                  <p style={{ fontWeight: 700, margin: 0, color: '#1e293b' }}>Authorized Signatory</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>ITVedant Education Pvt. Ltd.</p>
                </div>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', transform: 'rotate(-15deg)' }}>
                  Official Seal
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderIntroContent = () => {
    switch (introStep) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>Intro & Scenario</h2>
            <p style={{ color: '#4a5568' }}>We're so excited to have you here with us!</p>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Your Role</h3>
              <ul style={{ paddingLeft: '20px', color: '#4a5568', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>You are an intern at {selectedProgram.companyName}.</li>
                <li>You work within a larger team, collaborating with business leaders.</li>
              </ul>
            </div>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Your Goal</h3>
              <ul style={{ paddingLeft: '20px', color: '#4a5568', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Your primary objective is to complete the tasks successfully.</li>
                <li>Throughout the project, ensure your solutions are effective.</li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>Your team at {selectedProgram.companyName}</h2>
            <p style={{ color: '#4a5568' }}>This team specializes in delivering high-quality results.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                <h4 style={{ fontWeight: 700 }}>{enrollment.studentName}</h4>
                <div style={{ fontSize: '0.9rem', color: '#718096' }}>Intern (YOU)</div>
              </div>
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                <h4 style={{ fontWeight: 700 }}>{selectedProgram.mentorName || 'Manager'}</h4>
                <div style={{ fontSize: '0.9rem', color: '#718096' }}>{selectedProgram.mentorRole || 'Supervisor'}</div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>Project briefing</h2>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px' }}>
              <p style={{ marginBottom: '12px' }}><strong>From:</strong> {selectedProgram.mentorName || 'Manager'}</p>
              <p style={{ marginBottom: '12px' }}><strong>To:</strong> {enrollment.studentName}</p>
              <p>Hello,</p>
              <p style={{ marginTop: '12px' }}>I'm assigning you to a new project. We have observed an opportunity to improve our processes. To improve our efficiency, we need you to develop a solution.</p>
              <p style={{ marginTop: '12px' }}>For now, familiarize yourself with the project's objectives and key challenges. More details will be shared as we move forward. You have a 2-month period to complete this simulation. Let me know if you have any questions.</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' }}>Let's see if you're up to speed</h2>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px' }}>
              <p style={{ marginBottom: '16px', fontWeight: 600 }}>{selectedProgram.quizQuestions?.[0]?.question}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedProgram.quizQuestions?.[0]?.options.map((opt, idx) => (
                  <div key={idx} style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', background: '#fff' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input type="radio" name="quiz" />
                      <span>{opt}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <div style={{ fontSize: '4rem' }}>🏃</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a2e' }}>Let's get started!</h2>
          </div>
        );
      default:
        return null;
    }
  };

  const renderTaskContent = () => {
    if (!currentTaskConfig) return null;

    if (taskViewMode === 'SUBMIT') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a2e' }}>Submit your work</h2>
          <p style={{ color: '#4a5568' }}>Upload your deliverables for <strong>{currentTaskConfig.title}</strong> below.</p>
          
          <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
            <UploadCloud size={48} color="#8dc63f" style={{ margin: '0 auto 16px auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Upload files or add a link</h4>
            <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '24px' }}>Support for PDF, DOCX, XLSX, and URLs</p>
            <input 
              type="text" 
              placeholder="Add submission notes or link..." 
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
            />
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a2e' }}>{currentTaskConfig.title}</h2>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#4a5568' }}>Task overview</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* What you'll learn */}
          <div style={{ display: 'flex', gap: '20px', background: '#f8fafc', padding: '24px', borderRadius: '12px' }}>
            <div style={{ color: '#8dc63f' }}><BookOpen size={40} /></div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>What you'll learn</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#4a5568' }}>
                {currentTaskConfig.learn?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>

          {/* What you'll do */}
          <div style={{ display: 'flex', gap: '20px', background: '#f8fafc', padding: '24px', borderRadius: '12px' }}>
            <div style={{ color: '#8dc63f' }}><Microscope size={40} /></div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>What you'll do</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#4a5568' }}>
                {currentTaskConfig.do?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {selectedProgram.orientationVideoUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Watch this brief video before you start this task</h4>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
               <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src={selectedProgram.orientationVideoUrl}
                  title="Video"
                  allowFullScreen
                />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
      
      {/* Sidebar */}
      <div style={{ width: '320px', borderRight: '1px solid #e2e8f0', padding: '24px 0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '0 24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '72px', height: '72px', marginBottom: '16px',
            background: '#ffffff', border: '1px solid #e2e8f0',
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
          }}>
            <img src={selectedProgram.companyLogo} alt={selectedProgram.companyName} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textAlign: 'center' }}>{selectedProgram.title}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Orientation Tab */}
          <button
            onClick={() => handleSidebarTabClick('ORIENTATION')}
            style={{
              padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left',
              background: activeTab === 'ORIENTATION' ? '#f8fafc' : 'transparent',
              borderLeft: activeTab === 'ORIENTATION' ? '4px solid #8dc63f' : '4px solid transparent',
              cursor: 'pointer', borderTop: 'none', borderRight: 'none', borderBottom: 'none'
            }}
          >
            <CheckCircle2 size={20} color={isOrientationComplete ? "#8dc63f" : "#cbd5e1"} />
            <div>
              <div style={{ fontWeight: 700, color: '#1a1a2e' }}>Company Orientation</div>
              <div style={{ fontSize: '0.8rem', color: '#718096' }}>Welcome & Introduction</div>
            </div>
          </button>

          {/* Intro Tab */}
          <button
            onClick={() => handleSidebarTabClick('INTRO')}
            disabled={!isOrientationComplete}
            style={{
              padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left',
              background: activeTab === 'INTRO' ? '#f8fafc' : 'transparent',
              borderLeft: activeTab === 'INTRO' ? '4px solid #8dc63f' : '4px solid transparent',
              cursor: isOrientationComplete ? 'pointer' : 'not-allowed', opacity: isOrientationComplete ? 1 : 0.5,
              borderTop: 'none', borderRight: 'none', borderBottom: 'none'
            }}
          >
            <CheckCircle2 size={20} color={introStep === 5 ? "#8dc63f" : "#cbd5e1"} />
            <div>
              <div style={{ fontWeight: 700, color: '#1a1a2e' }}>Intro & Scenario</div>
              <div style={{ fontSize: '0.8rem', color: '#718096' }}>Background context and your project team</div>
            </div>
          </button>

          {/* Tasks Tabs */}
          {selectedProgram.tasks?.map((task) => {
            const isUnlocked = enrollment.unlockedTaskCount >= task.taskNumber;
            const isApproved = enrollment.taskSubmissions[task.taskNumber]?.status === 'APPROVED';
            
            return (
              <button
                key={task.taskNumber}
                onClick={() => isUnlocked && handleSidebarTabClick(task.taskNumber)}
                style={{
                  padding: '16px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px', width: '100%', textAlign: 'left',
                  background: activeTab === task.taskNumber ? '#f8fafc' : 'transparent',
                  borderLeft: activeTab === task.taskNumber ? '4px solid #8dc63f' : '4px solid transparent',
                  cursor: (isUnlocked && isOrientationComplete) ? 'pointer' : 'not-allowed', opacity: (isUnlocked && isOrientationComplete) ? 1 : 0.5,
                  borderTop: 'none', borderRight: 'none', borderBottom: 'none'
                }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isApproved ? '#8dc63f' : '#e2e8f0', color: isApproved ? '#fff' : '#718096', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0
                }}>
                  {isApproved ? '✓' : task.taskNumber}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1a1a2e', marginBottom: '4px', lineHeight: 1.3 }}>{task.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#718096' }}>{task.learn?.[0] || 'Task description'}</div>
                </div>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: 'auto', padding: '24px' }}>
           <button 
             onClick={generateCertificate} 
             disabled={!canGenerateCertificate}
             style={{ 
               width: '100%', padding: '12px', 
               background: canGenerateCertificate ? 'transparent' : '#f8fafc', 
               color: canGenerateCertificate ? '#1a56db' : '#94a3b8', 
               border: `1px solid ${canGenerateCertificate ? '#1a56db' : '#cbd5e1'}`, 
               borderRadius: '6px', fontWeight: 600, 
               cursor: canGenerateCertificate ? 'pointer' : 'not-allowed' 
             }}>
             Generate Certificate
           </button>
           {!canGenerateCertificate && (
             <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '8px', textAlign: 'center', lineHeight: 1.4 }}>
               Available after completing all tasks or when your 2-month period expires.
             </div>
           )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
        {activeTab === 'ORIENTATION' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
              <div style={{ fontWeight: 700, color: '#4a5568' }}>Company Orientation</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setOrientationStep(Math.max(1, orientationStep - 1))} disabled={orientationStep === 1} style={{ background: 'none', border: 'none', cursor: orientationStep === 1 ? 'not-allowed' : 'pointer', color: '#718096' }}><ChevronLeft size={18} /></button>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setOrientationStep(s)} style={{
                    width: '24px', height: '24px', borderRadius: '4px', border: 'none',
                    background: orientationStep === s ? '#2563eb' : 'transparent',
                    color: orientationStep === s ? '#fff' : '#718096', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem'
                  }}>
                    {s}
                  </button>
                ))}
                <button onClick={() => setOrientationStep(Math.min(5, orientationStep + 1))} disabled={orientationStep === 5} style={{ background: 'none', border: 'none', cursor: orientationStep === 5 ? 'not-allowed' : 'pointer', color: '#718096' }}><ChevronRight size={18} /></button>
              </div>
            </div>

            {renderOrientationContent()}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
               <button onClick={handleNextOrientationStep} className="btn-primary" style={{ padding: '12px 24px' }}>
                 {orientationStep === 5 ? 'Continue to Intro & Scenario' : 'Next'}
               </button>
            </div>
          </>
        )}

        {activeTab === 'INTRO' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
              <div style={{ fontWeight: 700, color: '#4a5568' }}>Intro & Scenario</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setIntroStep(Math.max(1, introStep - 1))} disabled={introStep === 1} style={{ background: 'none', border: 'none', cursor: introStep === 1 ? 'not-allowed' : 'pointer', color: '#718096' }}><ChevronLeft size={18} /></button>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setIntroStep(s)} style={{
                    width: '24px', height: '24px', borderRadius: '4px', border: 'none',
                    background: introStep === s ? '#2563eb' : 'transparent',
                    color: introStep === s ? '#fff' : '#718096', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem'
                  }}>
                    {s}
                  </button>
                ))}
                <button onClick={() => setIntroStep(Math.min(5, introStep + 1))} disabled={introStep === 5} style={{ background: 'none', border: 'none', cursor: introStep === 5 ? 'not-allowed' : 'pointer', color: '#718096' }}><ChevronRight size={18} /></button>
              </div>
            </div>

            {renderIntroContent()}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
               <button onClick={handleNextIntroStep} className="btn-primary" style={{ padding: '12px 24px' }}>
                 {introStep === 5 ? 'Start Next Task' : 'Next'}
               </button>
            </div>
          </>
        )}

        {typeof activeTab === 'number' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
              <div style={{ fontWeight: 700, color: '#4a5568' }}>{currentTaskConfig?.title}</div>
            </div>

            {renderTaskContent()}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
               <button onClick={handleTaskAction} className={taskViewMode === 'SUBMIT' ? 'btn-success' : 'btn-primary'} style={{ padding: '12px 24px' }}>
                 {taskViewMode === 'OVERVIEW' ? 'Next' : (activeTab === totalTasksCount ? 'Submit & Get Certificate' : 'Submit Task')}
               </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
};
