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
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto md:mx-20 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <section className="space-y-6 lg:col-span-3 xl:col-span-4">
            {renderPage()}
          </section>
          <aside className="lg:col-span-2 xl:col-span-1 hidden lg:block">
            <Additional />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PrimexV3;
