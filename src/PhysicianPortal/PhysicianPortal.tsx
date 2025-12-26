import { useState } from 'react';
import TopHeader from './Components/TopHeader';
import PhysicianFooter from './Components/PhysicianFooter';
import Profile from './Pages/Profile';
import ResultList from './Pages/ResultList';
import Orders from './Pages/Orders/Orders';
import Dashboard from './Pages/Dashboard/Dashboard';
import PhysicianList from './Pages/Physician/PhysicianList';
import UserList from './Pages/User/UserList';
import ClientList from './Pages/Client/ClientList';
import SupplyOrderMaster from './Pages/Supply/SupplyOrderMaster';
import ConfigurationPage from './Pages/Configurations/ConfigurationPage';
import PendingRequestsPage from './Pages/Pending Requests/PendingRequestsPage';
import CustomPanelPage from './Pages/CustomPanel/CustomPanelPage';
import IcdCodePage from './Pages/ICD Code/IcdCodePage';
import UserLogPage from './Pages/UserLog/UserLogPage';
import TestPanelPage from './Pages/Test Panel/TestPanelPage';
import DictionaryPage from './Pages/Dictionary/DictionaryPage';
import IpaClientRoutingPage from './Pages/IpaRouting/IpaClient/IpaClientRoutingPage';
import IpaPatientRoutingPage from './Pages/IpaRouting/IpaPatient/IpaPatientRoutingPage';
import SalesLogList from './Pages/SalesLog/SalesLogList';
import TransactionPage from './Pages/Transactions/TransactionsPage';
import SupplyOrdersPage from './Pages/SupplyOrders/SupplyOrdersPage';
import SalesReport from './Pages/SalesReport/SalesReport';

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
      case 'transactions':
        return <TransactionPage />;
      case 'physicians':
        return <PhysicianList />;
      case 'clients':
        return <ClientList />;
      case 'configuration':
        return <ConfigurationPage />;
      case 'pending-requests':
        return <PendingRequestsPage />;
      case "supply-masters":
        return <SupplyOrderMaster />
      case "supply-orders":
        return <SupplyOrdersPage />
      case "custom-panels":
        return <CustomPanelPage />
      case "icd-code":
        return <IcdCodePage />
      case "test/panel-codes":
        return <TestPanelPage />
      case "dictionary":
        return <DictionaryPage />
      case "user-logs":
        return <UserLogPage />
      case "ipa-client-routing":
        return <IpaClientRoutingPage />
      case "ipa-patient-routing":
        return <IpaPatientRoutingPage />
      case "sales-log":
        return <SalesLogList />
      case "sales-report":
        return <SalesReport />
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
