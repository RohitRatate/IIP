import React, { useState } from 'react';
import { useInternship } from '../context/InternshipContext';
import { Video, BookOpen, HelpCircle, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { selectedProgram, completeQuizAndEnroll, setActiveView } = useInternship();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [acceptedRules, setAcceptedRules] = useState<boolean[]>(new Array(selectedProgram.rules.length).fill(false));
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScorePercent, setQuizScorePercent] = useState<number | null>(null);

  const toggleRule = (idx: number) => {
    const updated = [...acceptedRules];
    updated[idx] = !updated[idx];
    setAcceptedRules(updated);
  };

  const allRulesAccepted = acceptedRules.every(Boolean);

  const handleEvaluateQuiz = () => {
    let correct = 0;
    selectedProgram.quizQuestions.forEach((q) => { if (selectedAnswers[q.id] === q.correctAnswerIndex) correct++; });
    setQuizScorePercent(Math.round((correct / selectedProgram.quizQuestions.length) * 100));
    setQuizSubmitted(true);
  };

  const stepTabStyle = (num: number) => {
    const isActive = step === num;
    const isDone = step > num;
    return {
      display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 16px',
      borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 700,
      background: isActive ? '#8dc63f' : isDone ? 'rgba(141, 198, 63, 0.12)' : '#f8fafc',
      color: isActive ? '#1a1a1a' : isDone ? '#4a7a10' : '#9ea8b3',
      border: `1px solid ${isActive ? '#6aa513' : isDone ? 'rgba(141, 198, 63, 0.35)' : '#e2e8f0'}`,
      boxShadow: isActive ? '0 2px 10px rgba(141, 198, 63, 0.3)' : 'none'
    };
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Stepper Header */}
      <div className="glass-card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#8dc63f', textTransform: 'uppercase', letterSpacing: '0.06em' }}>IIP Onboarding Workflow</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a1a2e' }}>{selectedProgram.title} — {selectedProgram.badgeText}</h2>
          </div>
          <button onClick={() => setActiveView('CATALOG')} className="btn-secondary btn-sm">← Back to Catalog</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          <div onClick={() => setStep(1)} style={stepTabStyle(1) as React.CSSProperties}><Video size={15} /> 1. Orientation</div>
          <div onClick={() => setStep(2)} style={stepTabStyle(2) as React.CSSProperties}><Video size={15} /> 2. HR</div>
          <div onClick={() => setStep(3)} style={stepTabStyle(3) as React.CSSProperties}><Video size={15} /> 3. Tech</div>
          <div onClick={() => setStep(4)} style={stepTabStyle(4) as React.CSSProperties}><BookOpen size={15} /> 4. Guidelines</div>
          <div onClick={() => allRulesAccepted && setStep(5)} style={{ ...stepTabStyle(5), cursor: allRulesAccepted ? 'pointer' : 'not-allowed', opacity: allRulesAccepted ? 1 : 0.5 } as React.CSSProperties}><HelpCircle size={15} /> 5. Quiz</div>
        </div>
      </div>

      {/* STEP 1: Orientation Video */}
      {step === 1 && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video color="#5a9a1a" /> Step 1: Company Orientation Video
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#718096' }}>Watch the introduction from {selectedProgram.companyName} to understand program expectations.</p>
          </div>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '44%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', border: '1px solid #e2e8f0' }}>
            <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} src={selectedProgram.orientationVideoUrl} title={selectedProgram.orientationVideoTitle} allowFullScreen />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a1a2e' }}>{selectedProgram.orientationVideoTitle}</div>
              <div style={{ fontSize: '0.75rem', color: '#718096' }}>8 Weeks • 5 Working Days/Week</div>
            </div>
            <button onClick={() => setStep(2)} className="btn-primary"><span>Continue to HR Video</span><ArrowRight size={15} /></button>
          </div>
        </div>
      )}

      {/* STEP 2: HR Video */}
      {step === 2 && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video color="#5a9a1a" /> Step 2: HR Welcome Video
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#718096' }}>A welcome message from Human Resources.</p>
          </div>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '44%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', border: '1px solid #e2e8f0' }}>
            <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} src={selectedProgram.orientationVideoUrl} title="HR Welcome Video" allowFullScreen />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
            <button onClick={() => setStep(1)} className="btn-secondary"><ArrowLeft size={15} /> Back</button>
            <button onClick={() => setStep(3)} className="btn-primary"><span>Continue to Tech Video</span><ArrowRight size={15} /></button>
          </div>
        </div>
      )}

      {/* STEP 3: Tech Video */}
      {step === 3 && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video color="#5a9a1a" /> Step 3: Technical Overview
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#718096' }}>A quick introduction from the Technical Lead.</p>
          </div>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '44%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', border: '1px solid #e2e8f0' }}>
            <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} src={selectedProgram.orientationVideoUrl} title="Technical Overview Video" allowFullScreen />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
            <button onClick={() => setStep(2)} className="btn-secondary"><ArrowLeft size={15} /> Back</button>
            <button onClick={() => setStep(4)} className="btn-primary"><span>Continue to Guidelines</span><ArrowRight size={15} /></button>
          </div>
        </div>
      )}

      {/* STEP 4: Rules */}
      {step === 4 && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen color="#5a9a1a" /> Step 4: Program Rules & Guidelines
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#718096' }}>Review and accept all guidelines before proceeding to the eligibility quiz.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedProgram.rules.map((rule, idx) => {
              const isChecked = acceptedRules[idx];
              return (
                <div key={idx} onClick={() => toggleRule(idx)} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px',
                  borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s',
                  background: isChecked ? 'rgba(141, 198, 63, 0.1)' : '#f8fafc',
                  border: `1px solid ${isChecked ? 'rgba(141, 198, 63, 0.4)' : '#e2e8f0'}`
                }}>
                  <input type="checkbox" checked={isChecked} onChange={() => {}} style={{ marginTop: '3px', cursor: 'pointer', accentColor: '#8dc63f', width: '16px', height: '16px' }} />
                  <div style={{ fontSize: '0.9rem', color: '#1a1a2e', lineHeight: 1.4 }}>
                    <strong>Rule {idx + 1}:</strong> {rule}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setStep(3)} className="btn-secondary"><ArrowLeft size={15} /> Back</button>
            <button onClick={() => setStep(5)} disabled={!allRulesAccepted} className="btn-primary" style={{ opacity: allRulesAccepted ? 1 : 0.5, cursor: allRulesAccepted ? 'pointer' : 'not-allowed' }}>
              <span>Take Readiness Quiz</span><ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Quiz */}
      {step === 5 && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle color="#c17d0a" /> Step 5: Eligibility & Readiness Quiz
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#718096' }}>Answer all questions to unlock Week 1 of your internship.</p>
          </div>

          {selectedProgram.quizQuestions.map((q, qIdx) => (
            <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>Q{qIdx + 1}: {q.question}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  return (
                    <div key={optIdx} onClick={() => !quizSubmitted && setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px',
                        background: isSelected ? 'rgba(141, 198, 63, 0.15)' : '#ffffff',
                        border: `1px solid ${isSelected ? '#8dc63f' : '#e2e8f0'}`,
                        cursor: quizSubmitted ? 'default' : 'pointer', fontSize: '0.88rem',
                        color: isSelected ? '#1a1a2e' : '#4a5568', fontWeight: isSelected ? 600 : 400, transition: 'all 0.15s'
                      }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${isSelected ? '#8dc63f' : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#8dc63f', fontWeight: 700 }}>
                        {isSelected ? '✓' : ''}
                      </div>
                      {opt}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {quizSubmitted && (
            <div style={{
              background: quizScorePercent! >= 66 ? '#f0fdf4' : '#fff5f5',
              border: `1px solid ${quizScorePercent! >= 66 ? 'rgba(141, 198, 63, 0.5)' : 'rgba(239, 68, 68, 0.4)'}`,
              borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
            }}>
              {quizScorePercent! >= 66 ? (
                <>
                  <CheckCircle2 size={40} color="#5a9a1a" />
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e' }}>Quiz Passed — {quizScorePercent}% 🎉</div>
                  <p style={{ fontSize: '0.88rem', color: '#718096' }}>You have satisfied all requirements. Week 1 is now unlocked!</p>
                  <button onClick={() => completeQuizAndEnroll(quizScorePercent!)} className="btn-success" style={{ fontSize: '0.95rem', padding: '12px 24px' }}>
                    Enroll & Launch Dashboard <ArrowRight size={16} />
                  </button>
                </>
              ) : (
                <>
                  <AlertCircle size={40} color="#ef4444" />
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a2e' }}>Score: {quizScorePercent}% — Minimum required is 66%</div>
                  <button onClick={() => { setQuizSubmitted(false); setQuizScorePercent(null); }} className="btn-secondary">Retake Quiz</button>
                </>
              )}
            </div>
          )}

          {!quizSubmitted && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(4)} className="btn-secondary"><ArrowLeft size={15} /> Back</button>
              <button
                onClick={handleEvaluateQuiz}
                disabled={Object.keys(selectedAnswers).length < selectedProgram.quizQuestions.length}
                className="btn-primary"
                style={{ opacity: Object.keys(selectedAnswers).length < selectedProgram.quizQuestions.length ? 0.5 : 1 }}
              >
                Submit Quiz & Enroll
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
