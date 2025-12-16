import { useState } from 'react';
import { Edit2 } from 'lucide-react';

export default function ProfilePage() {
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({
    personal: false,
    contact: false,
    address: false,
  });

  const [formData, setFormData] = useState({
    name: 'John Doe',
    dateOfBirth: '08/09/2003',
    sex: 'Male',
    race: 'I prefer not to say',
    ethnicity: 'I prefer not to say',
    email: 'john.doe@email.address',
    phone: '+91 597 978 545',
    streetAddress: '1/15 South Coast street',
    apartment: '',
    city: 'New York',
    state: 'NY - New York',
    zipCode: '62701',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEdit = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: false }));
    // Save logic here
  };

  const handleCancel = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: false }));
    // Reset to original values
  };

  return (
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-600 text-base">
            Manage your personal information and account settings.
          </p>
        </div>
        <div className="border-t border-gray-200" />
        {/* Personal Information Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{formData.name}</h2>
            {!editingSections.personal && (
              <button
                onClick={() => toggleEdit('personal')}
                className="btn-text-primary text-sm flex items-center space-x-1"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {editingSections.personal ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  value={formData.name}
                  onChange={(v) => handleInputChange('name', v)}
                  isEditing={true}
                />
                <InputField
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(v) => handleInputChange('dateOfBirth', v)}
                  isEditing={true}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                  <div className="space-y-1.5">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={formData.sex === 'Male'}
                        onChange={(e) => handleInputChange('sex', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-900">Male</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={formData.sex === 'Female'}
                        onChange={(e) => handleInputChange('sex', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-900">Female</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sex"
                        value="I'd rather not say"
                        checked={formData.sex === "I'd rather not say"}
                        onChange={(e) => handleInputChange('sex', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-900">I'd rather not say</span>
                    </label>
                  </div>
                </div>

                <SelectField
                  label="Race"
                  value={formData.race}
                  onChange={(v) => handleInputChange('race', v)}
                  isEditing={true}
                  options={['I prefer not to say', 'Asian', 'Black or African American', 'White', 'Other']}
                />
              </div>

              <SelectField
                label="Ethnicity"
                value={formData.ethnicity}
                onChange={(v) => handleInputChange('ethnicity', v)}
                isEditing={true}
                options={['I prefer not to say', 'Hispanic or Latino', 'Not Hispanic or Latino']}
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2 pt-2">
                <button
                  onClick={() => handleSave('personal')}
                  className="btn-primary px-6 py-2 rounded-md text-sm font-medium transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel('personal')}
                  className="text-gray-600 hover:text-gray-900 px-6 py-2 text-sm font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <DisplayField label="Date of Birth" value={formData.dateOfBirth} />
              <DisplayField label="Sex" value={formData.sex} />
              <DisplayField label="Race" value={formData.race} />
              <DisplayField label="Ethnicity" value={formData.ethnicity} />
            </div>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* Contact Information Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            {!editingSections.address && (
              <button
                onClick={() => toggleEdit('address')}
                className="btn-text-primary text-sm flex items-center space-x-1"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {editingSections.address ? (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-gray-900">Address</h3>
              
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 mb-2">Primary</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Street, PO Box"
                    value={formData.streetAddress}
                    onChange={(v) => handleInputChange('streetAddress', v)}
                    isEditing={true}
                  />
                  <InputField
                    label="Apartment, Suite, Floor"
                    value={formData.apartment}
                    onChange={(v) => handleInputChange('apartment', v)}
                    isEditing={true}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InputField
                    label="City"
                    value={formData.city}
                    onChange={(v) => handleInputChange('city', v)}
                    isEditing={true}
                  />
                  <SelectField
                    label="State"
                    value={formData.state}
                    onChange={(v) => handleInputChange('state', v)}
                    isEditing={true}
                    options={['NY - New York', 'CA - California', 'TX - Texas', 'FL - Florida']}
                  />
                  <InputField
                    label="ZIP Code"
                    value={formData.zipCode}
                    onChange={(v) => handleInputChange('zipCode', v)}
                    isEditing={true}
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => handleSave('address')}
                  className="btn-primary px-6 py-2 rounded-md text-sm font-medium transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel('address')}
                  className="text-gray-600 hover:text-gray-900 px-6 py-2 text-sm font-medium transition-all"
                >
                  Cancel
                </button>
              </div>

              <div className="pt-3">
                <button className="btn-text-primary text-sm font-medium">
                  + Add Another Address
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Primex communications for the selected patient will be sent to their primary address
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Address</h3>
              <div className="border-l-4 border-app-primary pl-3">
                <p className="text-xs font-medium text-gray-500 mb-1">Primary</p>
                <p className="text-sm text-gray-900">{formData.streetAddress}, {formData.city}, {formData.state.split(' - ')[0]} {formData.zipCode}</p>
              </div>
              <div className="mt-4">
                <button className="btn-text-primary text-sm font-medium">
                  + Add Another Address
                </button>
                <p className="text-xs text-gray-500 mt-1.5">
                  Primex communications for the selected patient will be sent to their primary address
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Security Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>

          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Multifactor Authentication</h3>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              We take your privacy and security seriously. Turn on multifactor authentication (MFA) for an added layer of account security.
            </p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Note: Currently, multifactor authentication is available for the web and mobile versions of Primex Patient, but it must be enabled from a web browser.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
              <button className="bg-white hover:bg-gray-50 border-2 btn-text-primary border-app-primary px-5 py-2 rounded-md text-sm font-medium transition-all">
                Turn On Multifactor Authentication
              </button>
              <button className="btn-text-primary text-sm font-medium">
                Learn more about Multifactor Authentication
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

interface DisplayFieldProps {
  label: string;
  value: string;
  icon?: React.ElementType;
}

function DisplayField({ label, value, icon: Icon }: DisplayFieldProps) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        <p className="text-sm text-gray-900">{value}</p>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  icon?: React.ElementType;
  type?: string;
  placeholder?: string;
}

function InputField({ label, value, onChange, isEditing, icon: Icon, type = 'text', placeholder }: InputFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={!isEditing}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg 
            focus:ring-1 focus:ring-app-primary outline-none transition-all 
            text-sm text-gray-900 placeholder-gray-400 bg-white
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            hover:border-gray-400`}
        />
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  options: string[];
  placeholder?: string;
}

function SelectField({ label, value, onChange, isEditing, options, placeholder }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isEditing}
          className="w-full pl-3 pr-9 py-2 border border-gray-300 rounded-lg 
            focus:ring-1 focus:ring-app-primary outline-none transition-all 
            text-sm text-gray-900 appearance-none bg-white
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            hover:border-gray-400 cursor-pointer"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}