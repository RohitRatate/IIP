import React, { createContext, useContext, useState } from 'react';
import {
  InternshipProgram,
  EnrollmentState,
  MOCK_INTERNSHIPS,
  createDefaultEnrollmentState
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
  reviewModalOpen: boolean;
  setReviewModalOpen: (open: boolean) => void;
  reviewTaskNum: number;
  setReviewTaskNum: (taskNum: number) => void;
  
  // Actions
  completeQuizAndEnroll: (score: number) => void;
  submitTask: (taskNum: number, link: string, notes: string) => void;
  reviewSubmission: (taskNum: number, status: 'APPROVED', feedback: string) => void;
  generateCertificate: () => void;
  
  // Demo Simulators
  simSubmitCurrentTask: () => void;
  simApproveTask: () => void;
  simUnlockAllTasks: () => void;
  resetDemo: () => void;
}

const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const InternshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [activeView, setActiveView] = useState<ActiveView>('CATALOG');
  const [programs] = useState<InternshipProgram[]>(MOCK_INTERNSHIPS);
  const [selectedProgram, setSelectedProgram] = useState<InternshipProgram>(MOCK_INTERNSHIPS[0]);
  const [enrollment, setEnrollment] = useState<EnrollmentState>(() => createDefaultEnrollmentState(MOCK_INTERNSHIPS[0].id));

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewTaskNum, setReviewTaskNum] = useState<number>(1);

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
      unlockedTaskCount: 1
    }));
    setActiveView('DASHBOARD');
  };

  const submitTask = (taskNum: number, link: string, notes: string) => {
    setEnrollment((prev) => {
      let newUnlockedCount = prev.unlockedTaskCount;
      const totalTasks = selectedProgram.tasks.length;
      // Immediately unlock next task when current max is submitted
      if (taskNum === prev.unlockedTaskCount && prev.unlockedTaskCount < totalTasks) {
        newUnlockedCount += 1;
      }

      return {
        ...prev,
        unlockedTaskCount: newUnlockedCount,
        taskSubmissions: {
          ...prev.taskSubmissions,
          [taskNum]: {
            ...prev.taskSubmissions[taskNum],
            submitted: true,
            submissionLink: link,
            notes,
            submittedAt: new Date().toLocaleString(),
            status: 'UNDER_REVIEW'
          }
        }
      };
    });
  };

  const reviewSubmission = (taskNum: number, status: 'APPROVED', feedback: string) => {
    setEnrollment((prev) => {
      const updatedSubmissions = {
        ...prev.taskSubmissions,
        [taskNum]: {
          ...prev.taskSubmissions[taskNum],
          status,
          feedback,
          reviewedBy: role === 'TRAINER' ? 'Trainer / Mentor' : role === 'COMPANY' ? selectedProgram.companyName : 'Admin',
          reviewedAt: new Date().toLocaleString()
        }
      };

      // Check if all are completed
      const totalTasks = selectedProgram.tasks.length;
      const allApproved = Object.values(updatedSubmissions).filter(s => s.status === 'APPROVED').length === totalTasks;
      
      return {
        ...prev,
        status: allApproved ? 'COMPLETED' : prev.status,
        taskSubmissions: updatedSubmissions
      };
    });
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
  const simSubmitCurrentTask = () => {
    const curT = enrollment.unlockedTaskCount;
    if (enrollment.taskSubmissions[curT]?.status !== 'NOT_SUBMITTED') return;
    submitTask(curT, `https://github.com/wingz-student/task-${curT}`, `Completed Task ${curT}`);
  };

  const simApproveTask = () => {
    const underReview = Object.values(enrollment.taskSubmissions).find(s => s.status === 'UNDER_REVIEW');
    if (underReview) {
      reviewSubmission(underReview.taskNumber, 'APPROVED', `Great progress on Task ${underReview.taskNumber}!`);
    }
  };

  const simUnlockAllTasks = () => {
    setEnrollment((prev) => {
      const totalTasks = selectedProgram.tasks.length;
      const updatedSubs = { ...prev.taskSubmissions };
      for (let i = 1; i <= totalTasks; i++) {
        updatedSubs[i] = {
          taskNumber: i,
          submitted: true,
          submissionLink: `https://github.com/demo/task-${i}`,
          notes: 'Auto simulated',
          status: 'APPROVED',
          reviewedBy: 'Auto Simulator'
        };
      }
      return { ...prev, unlockedTaskCount: totalTasks, status: 'COMPLETED', taskSubmissions: updatedSubs };
    });
  };

  const resetDemo = () => {
    setEnrollment(createDefaultEnrollmentState(selectedProgram.id));
    setActiveView('DASHBOARD');
  };

  return (
    <InternshipContext.Provider
      value={{
        role, setRole, activeView, setActiveView, programs, selectedProgram, setSelectedProgramById, enrollment,
        reviewModalOpen, setReviewModalOpen, reviewTaskNum, setReviewTaskNum,
        completeQuizAndEnroll, submitTask, reviewSubmission, generateCertificate,
        simSubmitCurrentTask, simApproveTask, simUnlockAllTasks, resetDemo
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternship = () => {
  const context = useContext(InternshipContext);
  if (!context) throw new Error('useInternship must be used within an InternshipProvider');
  return context;
};
