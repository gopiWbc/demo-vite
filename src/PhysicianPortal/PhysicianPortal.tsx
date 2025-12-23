import { useState } from 'react';
import TopHeader from './Components/TopHeader';
import PhysicianFooter from './Components/PhysicianFooter';
import Profile from './Pages/Profile';
import ResultList from './Pages/ResultList';
import Orders from './Pages/Orders/Orders';
import Dashboard from './Pages/Dashboard/Dashboard';

import UserList from './Pages/User/UserList';

function PhysicianPortal() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'result-list':
        return <ResultList />;
      case 'orders':
        return <Orders />;
      case 'users':
        return <UserList />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <TopHeader currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-3">
          <section className="space-y-6 lg:col-span-3 xl:col-span-4">
            {renderPage()}
          </section>
      </main>
      <PhysicianFooter />
    </div>
  );
}

export default PhysicianPortal;
