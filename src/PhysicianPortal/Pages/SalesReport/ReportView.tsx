import { useState } from 'react';
import { Download, TrendingUp, Target, Users, Award, ChevronRight, BarChart3, Calendar, Package, ShoppingCart } from 'lucide-react';
import type { FilterData } from './SalesReport';
import type { RepOrderData } from './mockdata';

interface ReportViewProps {
  data: RepOrderData[];
  filters: FilterData;
}

function ReportView({ data }: ReportViewProps) {
  const [selectedRep, setSelectedRep] = useState(0);
  const [expandedClient, setExpandedClient] = useState<number | null>(null);

  const handleExport = () => {
    alert('Export to Excel functionality');
  };

  const totalOrders = data.reduce((sum, rep) => sum + rep.totalOrders, 0);
  const totalClients = data.reduce((sum, rep) => sum + rep.clients.length, 0);
  const selectedRepData = data[selectedRep];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-700">Sales Performance Dashboard</h2>
            <p className="text-gray-600 text-sm mt-1">Year to Date • Jan 26 - Dec 26, 2025</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white text-app-primary font-semibold rounded-xl hover:bg-app-primary/10 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button> 
        </div>

      {/* Key Metrics Cards */}
     <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  {/* Total Orders */}
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
    <div className="w-10 h-10 bg-app-primary rounded-lg flex items-center justify-center">
      <ShoppingCart className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Orders</p>
      <p className="text-xl font-bold text-gray-900">{totalOrders.toLocaleString()}</p>
    </div>
  </div>

  {/* Sales Team */}
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
    <div className="w-10 h-10 bg-app-primary rounded-lg flex items-center justify-center">
      <Users className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sales Team</p>
      <p className="text-xl font-bold text-gray-900">{data.length}</p>
    </div>
  </div>

  {/* Clients */}
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
    <div className="w-10 h-10 bg-app-primary rounded-lg flex items-center justify-center">
      <Target className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Clients</p>
      <p className="text-xl font-bold text-gray-900">{totalClients}</p>
    </div>
  </div>
</div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Reps Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-8 border border-gray-100">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-app-primary rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Sales Representatives</h3>
                  <p className="text-xs text-slate-500">{data.length} team members</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {data.map((rep, idx) => {
                const isSelected = selectedRep === idx;
                  
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedRep(idx)}
                    className={`w-full text-left p-5 transition-all border-b-0 duration-200 ${
                      isSelected
                        ? 'bg-app-primary/10 border-l-4 border-app-primary'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ${
                          isSelected 
                            ? 'bg-app-primary text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-base mb-1 truncate text-slate-800`}>
                            {rep.salesRep}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={`font-semibold text-slate-500`}>
                              {rep.clients.length} clients
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className={`font-bold text-slate-700`}>
                              {rep.totalOrders.toLocaleString()} orders
                            </span>
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <ChevronRight className="w-5 h-5 text-indigo-600 flex-shrink-0 animate-pulse" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Client Details Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-app-primary rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{selectedRepData.salesRep}</h3>
                      <p className="text-slate-500 text-sm mt-0.5">Performance Details</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {selectedRepData.clients.map((client, idx) => {
                const isExpanded = expandedClient === idx;
                const maxValue = Math.max(...selectedRepData.clients.flatMap(c => c.monthlyOrders));
                
                return (
                  <div
                    key={idx}
                    className={`group rounded-2xl border transition-all duration-300 ${
                      isExpanded 
                        ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-lg' 
                        : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedClient(isExpanded ? null : idx)}
                      className="w-full p-5 text-left"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-lg text-slate-900 truncate mb-1">
                              {client.clientName}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">Account #{String(idx + 1).padStart(4, '0')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="text-right">
                            <p className={`text-2xl font-bold transition-colors ${
                              isExpanded ? 'text-indigo-700' : 'text-slate-700'
                            }`}>
                              {client.totalOrders.toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-500 font-semibold">orders</p>
                          </div>
                          <ChevronRight
                            className={`w-6 h-6 transition-all duration-300 ${
                              isExpanded 
                                ? 'rotate-90 text-indigo-600' 
                                : 'text-slate-400 group-hover:text-indigo-600'
                            }`}
                          />
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-3 border-t border-indigo-200 bg-white/50">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Monthly Performance
                          </p>
                          <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                            12 Months
                          </span>
                        </div>
                        <div className="grid grid-cols-6 gap-3">
                          {client.monthlyOrders.map((value, mIdx) => {
                            const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                            const hasValue = value > 0;
                            
                            return (
                              <div key={mIdx} className="flex flex-col items-center gap-2">
                                <div className="w-full bg-slate-100 rounded-xl relative h-24 flex items-end overflow-hidden group/bar shadow-sm">
                                  <div
                                    className={`w-full rounded-xl transition-all duration-700 ${
                                      hasValue
                                        ? 'bg-app-primary group-hover/bar:bg-app-primary/80'
                                        : 'bg-slate-200'
                                    }`}
                                    style={{ height: `${height}%` }}
                                  />
                                  {hasValue && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/bar:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-black/40 rounded-xl">
                                      <span className="text-sm font-bold text-white drop-shadow-lg">
                                        {value}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <p className={`text-xs font-bold transition-colors ${
                                  hasValue ? 'text-slate-700' : 'text-slate-400'
                                }`}>
                                  {monthNames[mIdx]}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportView;