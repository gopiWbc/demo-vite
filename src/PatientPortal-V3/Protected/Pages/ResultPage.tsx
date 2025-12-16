import { useState } from 'react';
import { Search, Info, ChevronDown, ChevronRight } from 'lucide-react';

interface TestResult {
  id: string;
  orderedTests: string;
  orderFrom: string;
  location: string;
  date: string;
}

export default function ResultsPage() {
  const [selectedPatient, setSelectedPatient] = useState('John Doe');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState<'date' | 'test'>('date');

  const results: TestResult[] = [
    {
      id: '1',
      orderedTests: 'Salivary Cortisol X2, Timed',
      orderFrom: 'Dr. Sarah Mitchell',
      location: 'Springfield Medical Center',
      date: '06/29/2022',
    },
    {
      id: '2',
      orderedTests: 'CMP14+eGFR • UA/M w/rflx Culture, Routine • Testost., Bioavailable w/SHBG • Macroprolactin • Luteinizing Hormone (LH) ECL • Cortisol, Serum LCMS, Endo Sci • IGF-I • Prolactin • FSH, Pediatric • ACTH, Plasma • Ferritin',
      orderFrom: 'Dr. James Rodriguez',
      location: 'Heart Care Clinic',
      date: '06/29/2022',
    },
    {
      id: '3',
      orderedTests: 'CMP14+eGFR • TSH+Free T4 • CBC With Differential/Platelet • Lipid Panel w/ Chol/HDL Ratio • Testost., Bioavailable w/SHBG • Luteinizing Hormone (LH) ECL • Estradiol, LCMS, Endo Sci • Prolactin • FSH, Pediatric',
      orderFrom: 'Dr. Emily Chen',
      location: 'Diabetes & Hormone Center',
      date: '06/03/2022',
    },
  ];

  const filteredResults = results.filter(result =>
    result.orderedTests.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.orderFrom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Results</h1>
              <p className="text-slate-600 text-md mt-2">
                Results are delivered to your Primex Patient account at the same time they are reported to the ordering healthcare provider (unless state or federal laws restrict timing of delivery).
              </p>
            </div>

            {/* Controls */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-semibold text-slate-700">Sort By</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setGroupBy('date')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        groupBy === 'date'
                          ? 'btn-primary text-white'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Date
                    </button>
                    <button
                      onClick={() => setGroupBy('test')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        groupBy === 'test'
                          ? 'btn-primary text-white'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Test
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center space-x-1">
                    <span>Search</span>
                    <Info className="w-4 h-4 text-slate-400" />
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search your results"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-80 pl-4 pr-10 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-app-primary focus:border-transparent text-sm"
                    />
                    <Search className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <p className="text-slate-700 text-sm mb-4">
              Showing results for {selectedPatient}
            </p>

            {/* Results Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Ordered Tests</span>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Order From</span>
                        <Info className="w-4 h-4 text-slate-400" />
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        <Info className="w-4 h-4 text-slate-400" />
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Action</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{result.orderedTests}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{result.orderFrom}</div>
                        <div className="text-sm text-slate-600">{result.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{result.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <button className="btn-text-primary font-medium text-sm flex items-center space-x-1">
                            <span>View</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredResults.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
                <p className="text-slate-600">No results found matching your search.</p>
              </div>
            )}
          </div>
        </div>
  );
}