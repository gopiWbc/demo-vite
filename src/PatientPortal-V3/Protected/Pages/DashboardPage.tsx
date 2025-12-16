import { useState } from 'react';
import { Calendar, FileText, Bell, Users, ChevronRight } from 'lucide-react';

const DashboardPage = () => {
  const [notifications] = useState([
    { id: 1, type: 'result', message: 'New lab results available', date: '2025-01-08', unread: true },
    { id: 2, type: 'appointment', message: 'Upcoming appointment with Dr. Mitchell', date: '2025-01-15', unread: true }
  ]);

  const recentResults = [
    {
      id: 1,
      test: 'CMP14+eGFR • UA/M w/rflx Culture, Routine • Testost., Bioavailable w/SHBG • Macroprolactin',
      doctor: 'Dr. Sarah Mitchell',
      facility: 'Springfield Medical Center',
      date: '06/29/2022',
      status: 'unread'
    },
    {
      id: 2,
      test: 'Lipid Panel w/ Chol/HDL Ratio • TSH+Free T4 • CBC With Differential/Platelet',
      doctor: 'Dr. James Rodriguez',
      facility: 'Heart Care Clinic',
      date: '06/29/2022',
      status: 'read'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Mitchell',
      specialty: 'Cardiology',
      date: '2025-01-15',
      time: '10:00 AM',
      location: 'Building A, Floor 3'
    },
    {
      id: 2,
      doctor: 'Dr. James Chen',
      specialty: 'Dermatology',
      date: '2025-01-22',
      time: '2:30 PM',
      location: 'Building B, Floor 2'
    }
  ];

  const quickActions = [
    { icon: Calendar, title: 'Schedule Appointment', description: 'Book a new visit', color: 'blue', link: '/appointments' },
    { icon: FileText, title: 'View Results', description: 'Check lab reports', color: 'green', link: '/results' },
    { icon: Users, title: 'My Physicians', description: 'Contact your care team', color: 'blue', link: '/physicians' }
  ];

  return (
   
      <div className="space-y-8">    
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, John Doe</h2>
          <p className="text-gray-600">Here's an overview of your health information and upcoming activities.</p>
        </div>

        {notifications.filter(n => n.unread).length > 0 && (
          <div className="bg-app-primary text-white rounded-xl p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <Bell size={24} />
              <div>
                <p className="font-bold">You have {notifications.filter(n => n.unread).length} new notifications</p>
                <p className="text-sm">Stay updated with your latest health information</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="group p-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className={`w-12 h-12 rounded-lg bg-${action.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className={`text-${action.color}-600`} size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
              <ChevronRight className="text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">            
            {/* Recent Results */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    Results
                    <span className="px-2 py-1 text-app-primary bg-app-secondary text-xs font-semibold rounded-full">
                      {recentResults.filter(r => r.status === 'unread').length} New
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    This section displays up to 6 results that were reported in the last 3 months or are unread.
                  </p>
                </div>
                <button className="px-4 py-2 btn-primary rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {recentResults.map(result => (
                  <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white/40 backdrop-blur-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="text-green-600" size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 font-medium leading-relaxed">{result.test}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="space-y-1">
                            <p className="text-gray-500">Order From</p>
                            <p className="text-gray-900 font-medium">{result.doctor}</p>
                            <p className="text-gray-600 text-xs">{result.facility}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-500">Date</p>
                            <p className="text-gray-900 font-medium">{result.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {result.status === 'unread' && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                            Unread
                          </span>
                        )}
                        <button className="btn-text-primary font-medium text-sm flex items-center gap-1">
                          View
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Your scheduled visits with healthcare providers. All times are displayed in your local timezone.
                  </p>
                </div>
                <button className="px-4 py-2 btn-primary rounded-lg font-medium transition-colors text-sm">
                  Schedule
                </button>
              </div>

              <div className="space-y-3">
                {upcomingAppointments.map(apt => (
                  <div key={apt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white/40 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Users size={24} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{apt.doctor}</h4>
                        <p className="text-sm text-gray-600">{apt.specialty}</p>
                      </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="space-y-1">
                        <p className="text-gray-500 text-xs">Date</p>
                        <p className="text-gray-900 font-medium">{new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 text-xs">Time</p>
                        <p className="text-gray-900 font-medium">{apt.time}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 text-xs">Location</p>
                        <p className="text-gray-900 font-medium text-xs">{apt.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  );
};

export default DashboardPage;