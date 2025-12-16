import { useState } from "react";
import { Edit2, User, Calendar, Phone, MapPin, Shield, Mail, Check, X } from "lucide-react";

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John Doe",
    lastName: "M",
    middleInitial: "",
    patientId: "PL00000042",
    dob: "08/09/2003",
    age: "21",
    gender: "Male",
    race: "I prefer not to say",
    ethnicity: "I prefer not to say",
    patientType: "Outpatient",
    phoneNumber: "+919344766756",
    email: "john.doe@example.com",
    streetAddress: "1/15 South Coast street",
    city: "New York",
    state: "NY",
    zipCode: "67201",
    country: "United States",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const InfoRow = ({ label, value, icon: Icon }: any) => (
    <div className="flex items-center gap-3 py-2">
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-6">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-4">
              <div className="p-3 bg-app-primary dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">
                <User className="size-8 text-white" />
              </div>
              <div className="">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formData.firstName} {formData.lastName}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  Patient ID: {formData.patientId} • {formData.patientType}
                </p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 bg-app-primary text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 bg-app-primary text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
        {/* Main Content - 2 columns */}
          {/* Personal Information Card */}
          <div className="bg-white lg:col-span-3 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-app-primary rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              Personal Information
            </h2>

            {!isEditing ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                <InfoRow label="First Name" value={formData.firstName} />
                <InfoRow label="Last Name" value={formData.lastName} />
                <InfoRow label="Middle Initial" value={formData.middleInitial || "—"} />
                <InfoRow label="Gender" value={formData.gender} />
                <InfoRow label="Date of Birth" value={formData.dob} />
                <InfoRow label="Age" value={`${formData.age} years`} />
                <InfoRow label="Race" value={formData.race} />
                <InfoRow label="Ethnicity" value={formData.ethnicity} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Middle Initial
                    </label>
                    <input
                      type="text"
                      name="middleInitial"
                      value={formData.middleInitial}
                      onChange={handleChange}
                      maxLength={1}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>I'd rather not say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Race
                    </label>
                    <select
                      name="race"
                      value={formData.race}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    >
                      <option>I prefer not to say</option>
                      <option>Asian</option>
                      <option>Black or African American</option>
                      <option>White</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Ethnicity
                    </label>
                    <select
                      name="ethnicity"
                      value={formData.ethnicity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    >
                      <option>I prefer not to say</option>
                      <option>Hispanic or Latino</option>
                      <option>Not Hispanic or Latino</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Contact Information Card */}
          <div className="bg-white lg:col-span-3 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-app-primary rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              Contact Information
            </h2>

            {!isEditing ? (
              <div className="space-y-1">
                <InfoRow label="Phone Number" value={formData.phoneNumber} icon={Phone} />
                <InfoRow label="Email" value={formData.email} icon={Mail} />
                <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                  <InfoRow label="Address" value={formData.streetAddress} icon={MapPin} />
                  <InfoRow 
                    label="City, State ZIP" 
                    value={`${formData.city}, ${formData.state} ${formData.zipCode}`} 
                  />
                  <InfoRow label="Country" value={formData.country} />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    >
                      <option>NY</option>
                      <option>CA</option>
                      <option>TX</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      ZIP *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-app-primary focus:ring-2 focus:ring-app-primary/20"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>
            )}
          </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6  lg:col-span-2">

          {/* Security Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-app-primary rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Security</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Enable multifactor authentication (MFA) for enhanced account security.
            </p>
            <button className="w-full px-4 py-2 bg-app-primary text-white text-sm rounded-lg font-semibold hover:shadow-md transition-all">
              Enable MFA
            </button>
          </div>

          {/* Help Card */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm border border-blue-200 dark:border-gray-600 p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Need Help?</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
              Contact our support team if you need assistance updating your profile.
            </p>
            <button className="text-xs text-app-primary dark:text-cyan-400 font-semibold hover:underline">
              Contact Support →
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="text-xs text-amber-900 dark:text-amber-200">
            <span className="font-semibold">Note:</span> By saving changes, you confirm that you have read and agree to our Terms and Conditions and Privacy Policy.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;