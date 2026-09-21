import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';
import { CheckCircle2, ChevronLeft, ChevronRight, BookOpen, Microscope, UploadCloud } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { selectedProgram, enrollment, generateCertificate, submitTask, simApproveTask } = useInternship();

  const [activeTab, setActiveTab] = useState<'INTRO' | number>('INTRO');
  const [introStep, setIntroStep] = useState<number>(1);
  const [taskViewMode, setTaskViewMode] = useState<'OVERVIEW' | 'SUBMIT'>('OVERVIEW');
  const [submissionNotes, setSubmissionNotes] = useState('');

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

  const handleSidebarTabClick = (tab: 'INTRO' | number) => {
    setActiveTab(tab);
    if (typeof tab === 'number') {
      setTaskViewMode('OVERVIEW');
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
          {/* Intro Tab */}
          <button
            onClick={() => handleSidebarTabClick('INTRO')}
            style={{
              padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left',
              background: activeTab === 'INTRO' ? '#f8fafc' : 'transparent',
              borderLeft: activeTab === 'INTRO' ? '4px solid #8dc63f' : '4px solid transparent',
              cursor: 'pointer', borderTop: 'none', borderRight: 'none', borderBottom: 'none'
            }}
          >
            <CheckCircle2 size={20} color="#8dc63f" />
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
                  cursor: isUnlocked ? 'pointer' : 'not-allowed', opacity: isUnlocked ? 1 : 0.5,
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
