import { useState } from 'react';
import PhysicianPage from './Protected/Pages/PhysicianPage';
import ProfilePage from './Protected/Pages/ProfilePage';
import ResultsPage from './Protected/Pages/ResultPage';
import Navigation from './Protected/components/Navigation';
import Additional from './Protected/components/Additional';
import AppointmentPage from './Protected/Pages/AppointmentPage';
import Footer from './Protected/components/Footer';
import DashboardPage from './Protected/Pages/DashboardPage';

export type Page = 'profile' | 'appointment' | 'results' | 'physicians' | 'dashboard';

function PrimexV3() {
  const [currentPage, setCurrentPage] = useState<Page>('profile');

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage />;
      case 'results':
        return <ResultsPage />;
      case 'physicians':
        return <PhysicianPage />;
      case 'appointment':
        return <AppointmentPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 mx-10 px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="mb-8 col-span-4">
        {renderPage()}
        </div>
        <div>
          <Additional />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PrimexV3;
