import React, { createContext, useContext, useState } from 'react';
import {
  InternshipProgram,
  EnrollmentState,
  MOCK_INTERNSHIPS,
  createDefaultEnrollmentState,
  DailyLog
} from '../data/internshipsData';

export type UserRole = 'STUDENT' | 'TRAINER' | 'COMPANY' | 'ADMIN';
export type ActiveView = 'CATALOG' | 'ONBOARDING' | 'DASHBOARD' | 'CERTIFICATE';

interface InternshipContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  programs: InternshipProgram[];
  selectedProgram: InternshipProgram;
  setSelectedProgramById: (id: string) => void;
  enrollment: EnrollmentState;
  // Modal states
  sodModalOpen: boolean;
  setSodModalOpen: (open: boolean) => void;
  eodModalOpen: boolean;
  setEodModalOpen: (open: boolean) => void;
  activeDayNum: number;
  setActiveDayNum: (day: number) => void;
  reviewModalOpen: boolean;
  setReviewModalOpen: (open: boolean) => void;
  reviewWeekNum: number;
  setReviewWeekNum: (week: number) => void;
  
  // Actions
  completeQuizAndEnroll: (score: number) => void;
  submitSOD: (weekNum: number, dayNum: number, data: { plannedTasks: string; todayWorkFocus: string; expectedOutcome: string }) => void;
  submitEOD: (weekNum: number, dayNum: number, data: { completedWork: string; progressPercent: number; challengesBlockers: string; keyLearnings: string; attachmentsLink: string }) => void;
  submitWeeklyTask: (weekNum: number, link: string, notes: string) => void;
  reviewSubmission: (weekNum: number, status: 'APPROVED' | 'REJECTED', feedback: string) => void;
  togglePauseState: () => void;
  reopenInternship: () => void;
  generateCertificate: () => void;
  
  // Demo Simulators
  simFillActiveDay: () => void;
  simApproveCurrentWeek: () => void;
  simUnlockAllWeeks: () => void;
  resetDemo: () => void;
}

const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const InternshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [activeView, setActiveView] = useState<ActiveView>('CATALOG');
  const [programs] = useState<InternshipProgram[]>(MOCK_INTERNSHIPS);
  const [selectedProgram, setSelectedProgram] = useState<InternshipProgram>(MOCK_INTERNSHIPS[0]);
  const [enrollment, setEnrollment] = useState<EnrollmentState>(() => createDefaultEnrollmentState(MOCK_INTERNSHIPS[0].id));

  // Modal dialog states
  const [sodModalOpen, setSodModalOpen] = useState(false);
  const [eodModalOpen, setEodModalOpen] = useState(false);
  const [activeDayNum, setActiveDayNum] = useState<number>(1);
  
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewWeekNum, setReviewWeekNum] = useState<number>(1);

  const setSelectedProgramById = (id: string) => {
    const prog = programs.find((p) => p.id === id) || programs[0];
    setSelectedProgram(prog);
    setEnrollment(createDefaultEnrollmentState(prog.id));
  };

  const completeQuizAndEnroll = (score: number) => {
    setEnrollment((prev) => ({
      ...prev,
      quizPassed: true,
      quizScore: score,
      status: 'IN_PROGRESS',
      currentWeek: 1
    }));
    setActiveView('DASHBOARD');
  };

  const submitSOD = (
    weekNum: number,
    dayNum: number,
    data: { plannedTasks: string; todayWorkFocus: string; expectedOutcome: string }
  ) => {
    setEnrollment((prev) => {
      const currentLogs = [...(prev.dailyLogs[weekNum] || [])];
      const dayIndex = currentLogs.findIndex((d) => d.dayNumber === dayNum);
      if (dayIndex !== -1) {
        currentLogs[dayIndex] = {
          ...currentLogs[dayIndex],
          sodSubmitted: true,
          plannedTasks: data.plannedTasks,
          todayWorkFocus: data.todayWorkFocus,
          expectedOutcome: data.expectedOutcome,
          sodTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return {
        ...prev,
        dailyLogs: {
          ...prev.dailyLogs,
          [weekNum]: currentLogs
        }
      };
    });
  };

  const submitEOD = (
    weekNum: number,
    dayNum: number,
    data: { completedWork: string; progressPercent: number; challengesBlockers: string; keyLearnings: string; attachmentsLink: string }
  ) => {
    setEnrollment((prev) => {
      const currentLogs = [...(prev.dailyLogs[weekNum] || [])];
      const dayIndex = currentLogs.findIndex((d) => d.dayNumber === dayNum);
      if (dayIndex !== -1) {
        currentLogs[dayIndex] = {
          ...currentLogs[dayIndex],
          eodSubmitted: true,
          completedWork: data.completedWork,
          progressPercent: data.progressPercent,
          challengesBlockers: data.challengesBlockers,
          keyLearnings: data.keyLearnings,
          attachmentsLink: data.attachmentsLink,
          eodTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return {
        ...prev,
        dailyLogs: {
          ...prev.dailyLogs,
          [weekNum]: currentLogs
        }
      };
    });
  };

  const submitWeeklyTask = (weekNum: number, link: string, notes: string) => {
    setEnrollment((prev) => ({
      ...prev,
      submissions: {
        ...prev.submissions,
        [weekNum]: {
          weekNumber: weekNum,
          submitted: true,
          submissionLink: link,
          notes,
          submittedAt: new Date().toLocaleString(),
          status: 'PENDING_REVIEW'
        }
      }
    }));
  };

  const reviewSubmission = (weekNum: number, status: 'APPROVED' | 'REJECTED', feedback: string) => {
    setEnrollment((prev) => {
      const updatedSubmissions = {
        ...prev.submissions,
        [weekNum]: {
          ...prev.submissions[weekNum],
          status,
          feedback,
          reviewedBy: role === 'TRAINER' ? 'Trainer / Mentor' : role === 'COMPANY' ? selectedProgram.companyName : 'Admin',
          reviewedAt: new Date().toLocaleString()
        }
      };

      let newCurrentWeek = prev.currentWeek;
      let newStatus = prev.status;

      if (status === 'APPROVED') {
        if (weekNum === prev.currentWeek && weekNum < 8) {
          newCurrentWeek = weekNum + 1;
        } else if (weekNum === 8) {
          newStatus = 'COMPLETED';
        }
      }

      return {
        ...prev,
        currentWeek: newCurrentWeek,
        status: newStatus,
        submissions: updatedSubmissions
      };
    });
  };

  const togglePauseState = () => {
    setEnrollment((prev) => ({
      ...prev,
      status: prev.status === 'PAUSED_INCOMPLETE' ? 'IN_PROGRESS' : 'PAUSED_INCOMPLETE'
    }));
  };

  const reopenInternship = () => {
    setEnrollment((prev) => ({
      ...prev,
      status: 'IN_PROGRESS'
    }));
  };

  const generateCertificate = () => {
    setEnrollment((prev) => ({
      ...prev,
      certificateGenerated: true,
      certificateId: `WNGZ-IIP-2026-${Math.floor(1000 + Math.random() * 9000)}`
    }));
    setActiveView('CERTIFICATE');
  };

  // Demo Toolbar Simulators
  const simFillActiveDay = () => {
    const curW = enrollment.currentWeek;
    const logs = enrollment.dailyLogs[curW] || [];
    const nextUnfilled = logs.find((l) => !l.eodSubmitted);
    const dayToFill = nextUnfilled ? nextUnfilled.dayNumber : 1;

    submitSOD(curW, dayToFill, {
      plannedTasks: `Planned development for Day ${dayToFill} objectives.`,
      todayWorkFocus: `Feature implementation & bug fixes`,
      expectedOutcome: `Completed unit component with passing checks.`
    });

    submitEOD(curW, dayToFill, {
      completedWork: `Successfully delivered Day ${dayToFill} task requirements with documentation.`,
      progressPercent: 100,
      challengesBlockers: `Handled minor edge case in dynamic state update.`,
      keyLearnings: `Refactored logic into re-usable hook.`,
      attachmentsLink: `https://github.com/wingz-student/day-${dayToFill}-code`
    });
  };

  const simApproveCurrentWeek = () => {
    const curW = enrollment.currentWeek;
    // Ensure 5 days filled
    for (let d = 1; d <= 5; d++) {
      submitSOD(curW, d, {
        plannedTasks: `Auto-filled SOD for Day ${d}`,
        todayWorkFocus: `Core Task Execution`,
        expectedOutcome: `Verified outcome`
      });
      submitEOD(curW, d, {
        completedWork: `Auto-filled EOD for Day ${d}`,
        progressPercent: 100,
        challengesBlockers: `None`,
        keyLearnings: `Verified module execution.`,
        attachmentsLink: `https://github.com/wingz-student/week-${curW}`
      });
    }

    submitWeeklyTask(curW, `https://github.com/wingz-student/iip-week-${curW}-final`, `Week ${curW} completed with test suites.`);
    reviewSubmission(curW, 'APPROVED', `Great progress on Week ${curW}! Requirements approved.`);
  };

  const simUnlockAllWeeks = () => {
    for (let w = 1; w <= 8; w++) {
      for (let d = 1; d <= 5; d++) {
        submitSOD(w, d, {
          plannedTasks: `SOD Week ${w} Day ${d}`,
          todayWorkFocus: `Focus Week ${w}`,
          expectedOutcome: `Expected outcome`
        });
        submitEOD(w, d, {
          completedWork: `Completed Week ${w} Day ${d}`,
          progressPercent: 100,
          challengesBlockers: `None`,
          keyLearnings: `Key learnings`,
          attachmentsLink: `https://github.com/wingz-student/week-${w}`
        });
      }
      submitWeeklyTask(w, `https://github.com/wingz-student/week-${w}`, `Week ${w} deliverable`);
      reviewSubmission(w, 'APPROVED', `Week ${w} approved by Trainer.`);
    }
  };

  const resetDemo = () => {
    setEnrollment(createDefaultEnrollmentState(selectedProgram.id));
    setActiveView('DASHBOARD');
  };

  return (
    <InternshipContext.Provider
      value={{
        role,
        setRole,
        activeView,
        setActiveView,
        programs,
        selectedProgram,
        setSelectedProgramById,
        enrollment,
        sodModalOpen,
        setSodModalOpen,
        eodModalOpen,
        setEodModalOpen,
        activeDayNum,
        setActiveDayNum,
        reviewModalOpen,
        setReviewModalOpen,
        reviewWeekNum,
        setReviewWeekNum,
        completeQuizAndEnroll,
        submitSOD,
        submitEOD,
        submitWeeklyTask,
        reviewSubmission,
        togglePauseState,
        reopenInternship,
        generateCertificate,
        simFillActiveDay,
        simApproveCurrentWeek,
        simUnlockAllWeeks,
        resetDemo
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternship = () => {
  const context = useContext(InternshipContext);
  if (!context) {
    throw new Error('useInternship must be used within an InternshipProvider');
  }
  return context;
};
