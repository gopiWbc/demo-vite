import { Phone, Mail, MapPin, Stethoscope } from 'lucide-react';

interface Physician {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  location: string;
}

export default function PhysicianPage() {
  const physicians: Physician[] = [
    {
      id: '1',
      name: 'Dr. Sarah Mitchell',
      specialty: 'Internal Medicine',
      phone: '(555) 123-4567',
      email: 'sarah.mitchell@primex.com',
      location: 'Springfield Medical Center',
    },
    {
      id: '2',
      name: 'Dr. James Rodriguez',
      specialty: 'Cardiology',
      phone: '(555) 123-4568',
      email: 'james.rodriguez@primex.com',
      location: 'Heart Care Clinic',
    },
    {
      id: '3',
      name: 'Dr. Emily Chen',
      specialty: 'Endocrinology',
      phone: '(555) 123-4569',
      email: 'emily.chen@primex.com',
      location: 'Diabetes & Hormone Center',
    },
  ];

  return (
      <div className="">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900">Your Physicians</h2>

        {/* Description (2 lines) */}
        <p className="text-md text-gray-600 mt-1">
          Your assigned medical team is listed below for easy reference.
          Contact details and address are provided for your convenience.
        </p>

        {/* Cards Grid - 3 Per Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {physicians.map((physician) => (
            <div
              key={physician.id}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all bg-white"
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-app-secondary rounded-full flex items-center justify-center">
                  <Stethoscope className="w-7 h-7 text-app-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    {physician.name}
                  </h3>
                  <p className="text-xs text-gray-600">{physician.specialty}</p>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 space-y-3 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{physician.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{physician.email}</span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>{physician.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
  );
}
