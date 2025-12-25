import { useState } from "react";
import { PenLine, Save, X } from "lucide-react";
import type { User } from "./UserList";
import UserForm from "./UserForm";

interface UserDetailsProps {
  user: User;
  onBack: () => void;
  onUpdate: (updatedUser: User) => void;
}

const UserDetails = ({ user, onBack, onUpdate }: UserDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const InfoField = ({ label, value }: { label: string; value?: string | React.ReactNode }) => (
    <div>
      <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="mt-1 block text-sm font-semibold text-gray-900">
        {value || "--"}
      </span>
    </div>
  );

  const Section = ({
    title,
    actions,
    children,
  }: {
    title: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-indigo-50">
        <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-900">
          {title}
        </h3>
        {actions}
      </div>
      <div className="px-6 py-6 space-y-6">{children}</div>
    </div>
  );

  return (
    <div className="space-y-2 px-4 pb-10">
      <nav className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li className="text-indigo-600 font-semibold cursor-pointer" onClick={onBack}>
            Users
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600 font-semibold">User Details</li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
              {formData.firstName} {formData.lastName}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>Role: {formData.role}</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>Status: {formData.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing && (
                <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-indigo-700 transition hover:border-indigo-400 hover:text-indigo-900"
                onClick={() => setIsEditing(true)}
                >
                <PenLine className="h-4 w-4" /> Edit User
                </button>
            )}
            <button
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-400 hover:text-gray-900"
            >
                <X className="h-4 w-4" /> Close
            </button>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-6">
            <UserForm formData={formData} onChange={handleChange} />
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
                onClick={handleSave}
              >
                <Save className="h-4 w-4" /> Save Changes
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 transition hover:border-rose-400 hover:text-rose-500"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
        </div>
      ) : (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 justify-between">
                <div className="flex-1">
                    <Section title="Account Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            <InfoField label="User ID" value={formData.userId} />
                            <InfoField label="User Type" value={formData.role} />
                            <InfoField label="Email" value={formData.email} />
                            
                            {/* Password Expiry */}
                            <InfoField label="Password Expiry (days)" value={formData.passwordExpiry} />
                            
                            <InfoField label="User Status" value={formData.status} />

                            {/* Email as Username - Read-only view */}
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Email as Username
                                </span>
                                <span className="mt-1 block text-sm font-semibold text-gray-900">
                                    {formData.emailAsUsername ? "Yes" : "No"}
                                </span>
                            </div>

                            {/* Username - Conditional */}
                            {!formData.emailAsUsername && (
                                <InfoField label="Username" value={formData.username} />
                            )}
                        </div>
                    </Section>
                </div>

                <div className="flex-1">
                    <Section title="Personal Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            <InfoField label="First Name" value={formData.firstName} />
                            <InfoField label="Last Name" value={formData.lastName} />
                            <InfoField label="Middle Name" value={formData.middleName} />
                            <InfoField label="Mobile" value={formData.mobile} />
                            <InfoField label="Alternate Mobile" value={formData.alternateMobile} />
                            <InfoField label="Language" value={formData.language} />
                            <InfoField label="Created Date" value={formData.createdDate} />
                            <InfoField label="Last Login" value={formData.lastLogin} />
                        </div>
                    </Section>
                </div>
            </div>

            <Section title="Preferences">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <InfoField label="Records per page" value={formData.recordsPerPage?.toString() || "10"} />
                    <InfoField label="Can Order Test" value={formData.canOrderTest || "No"} />
                    <InfoField label="Show Results" value={formData.showResults || "All"} />
                    <InfoField label="Critical Alert" value={formData.criticalAlert || "No"} />
                    <InfoField label="Special Result Watch" value={formData.specialResultWatch} />
                    <InfoField label="Result to be Watched" value={formData.resultToBeWatched} />
                    <InfoField label="Alerts - Starting Hour" value={formData.alertsStartingHour ? `${formData.alertsStartingHour}:00` : "--"} />
                    <InfoField label="Alerts - How Many Hours" value={formData.alertsHowManyHours} />
                </div>
            </Section>


        </div>
      )}
    </div>
  );
};

export default UserDetails;
