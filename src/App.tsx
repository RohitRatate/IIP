import React from 'react';
import { InternshipProvider, useInternship } from './context/InternshipContext';
import { Header } from './components/Header';
import { DemoToolbar } from './components/DemoToolbar';
import { CatalogScreen } from './components/CatalogScreen';
import { OnboardingModal } from './components/OnboardingModal';
import { StudentDashboard } from './components/StudentDashboard';
import { CertificateViewer } from './components/CertificateViewer';
import { ReviewPanel } from './components/ReviewPanel';

const MainApp: React.FC = () => {
  const { activeView } = useInternship();

  return (
    <div className="app-wrapper">
      <Header />
      <DemoToolbar />

      <main className="main-content">
        {activeView === 'CATALOG' && <CatalogScreen />}
        {activeView === 'ONBOARDING' && <OnboardingModal />}
        {activeView === 'DASHBOARD' && <StudentDashboard />}
        {activeView === 'CERTIFICATE' && <CertificateViewer />}
      </main>

      {/* Global Modals */}
      <ReviewPanel />
    </div>
  );
};

export function App() {
  return (
    <InternshipProvider>
      <MainApp />
    </InternshipProvider>
  );
}

export default App;
