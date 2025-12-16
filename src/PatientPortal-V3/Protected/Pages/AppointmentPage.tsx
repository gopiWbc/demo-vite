import { useState } from 'react';
import { Calendar, Clock, User, MapPin, Plus, X, Check } from 'lucide-react';

const AppointmentPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState<any>([]);

  const [formData, setFormData] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    reason: ''
  });

  const doctors = [
    { name: "Dr. Sarah Mitchell", specialty: "Cardiology" },
    { name: "Dr. James Chen", specialty: "Dermatology" },
    { name: "Dr. Emily Rodriguez", specialty: "Pediatrics" },
    { name: "Dr. Michael Thompson", specialty: "Orthopedics" }
  ];

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const handleSubmit = () => {
    if (!formData.doctor || !formData.date || !formData.time) return;
    
    const newAppointment = {
      id: appointments.length + 1,
      doctor: formData.doctor,
      specialty: formData.specialty,
      date: formData.date,
      time: formData.time,
      location: "Building A, Floor 3",
      status: "pending"
    };
    setAppointments([...appointments, newAppointment]);
    setShowModal(false);
    setFormData({ doctor: '', specialty: '', date: '', time: '', reason: '' });
  };

  const handleDoctorChange = (doctorName: string) => {
    const selectedDoctor = doctors.find(d => d.name === doctorName);
    setFormData({
      ...formData,
      doctor: doctorName,
      specialty: selectedDoctor ? selectedDoctor.specialty : ''
    });
  };

  return (
    <>
      {/* Main Content */}
      <div className="space-y-8">
        {/* Quick Actions */}
        <div className="space-y-3">
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary shadow-lg text-white px-6 py-3 rounded-lg font-medium hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={20} />
            Schedule New Appointment
          </button>
          <p className="text-gray-600 text-sm mt-3">
            Book a new appointment with your preferred healthcare provider. Select a doctor, choose your convenient time slot, and we'll confirm your visit.
          </p>
        </div>

        {/* Appointments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Appointments</h2>
          <p className="text-gray-600 text-sm mb-6">
            View and manage your scheduled appointments. All times are displayed in your local timezone.
          </p>
          
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">You have no scheduled appointments at this time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt: any) => (
                <div key={apt.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <User size={24} className="text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{apt.doctor}</h3>
                          <p className="text-sm text-gray-600">{apt.specialty}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar size={18} className="text-indigo-600" />
                          <span className="text-sm">{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={18} className="text-indigo-600" />
                          <span className="text-sm">{apt.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin size={18} className="text-indigo-600" />
                          <span className="text-sm">{apt.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col md:items-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {apt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Schedule Appointment</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Doctor
                </label>
                <select
                  value={formData.doctor}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.map(doc => (
                    <option key={doc.name} value={doc.name}>
                      {doc.name} - {doc.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {formData.specialty && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <input
                    type="text"
                    value={formData.specialty}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit (Optional)
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Brief description of your concern..."
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end sm:items-center">
                <button
                  onClick={handleSubmit}
                  disabled={!formData.doctor || !formData.date || !formData.time}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Check size={20} />
                  Confirm Appointment
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentPage;