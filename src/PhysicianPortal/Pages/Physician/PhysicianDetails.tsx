import { useState } from "react";
import { PenLine, Save, X } from "lucide-react";
import PhysicianForm, { type PhysicianFormData } from "./PhysicianForm";

export type Physician = {
  id: string;
  physicianId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  phone1?: string;
  phone2?: string;
  mobile?: string;
  fax?: string;
  createdDate: string;
  lastModified?: string;
};

type PhysicianDetailsProps = {
  physician: Physician;
  onBack: () => void;
  onUpdate: (physician: Physician) => void;
};

const PhysicianDetails: React.FC<PhysicianDetailsProps> = ({
  physician,
  onBack,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PhysicianFormData>({
    physicianId: physician.physicianId,
    firstName: physician.firstName,
    lastName: physician.lastName,
    middleName: physician.middleName || "",
    email: physician.email,
    address1: physician.address1 || "",
    address2: physician.address2 || "",
    city: physician.city || "",
    state: physician.state || "",
    country: physician.country || "",
    zipCode: physician.zipCode || "",
    phone1: physician.phone1 || "",
    phone2: physician.phone2 || "",
    mobile: physician.mobile || "",
    fax: physician.fax || "",
  });

  const handleChange = (field: keyof PhysicianFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate({
      ...physician,
      ...formData,
      lastModified: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      physicianId: physician.physicianId,
      firstName: physician.firstName,
      lastName: physician.lastName,
      middleName: physician.middleName || "",
      email: physician.email,
      address1: physician.address1 || "",
      address2: physician.address2 || "",
      city: physician.city || "",
      state: physician.state || "",
      country: physician.country || "",
      zipCode: physician.zipCode || "",
      phone1: physician.phone1 || "",
      phone2: physician.phone2 || "",
      mobile: physician.mobile || "",
      fax: physician.fax || "",
    });
    setIsEditing(false);
  };

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 bg-indigo-50">
        <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-900">
          {title}
        </h3>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );

  const InfoField = ({ label, value }: { label: string; value?: string }) => (
    <div>
      <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="mt-1 block text-sm font-semibold text-gray-900">
        {value || "--"}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {physician.firstName} {physician.lastName}
            </h2>
            <p className="text-sm text-gray-500">Physician ID: {physician.physicianId}</p>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing && (
                <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-indigo-700 transition hover:border-indigo-400 hover:text-indigo-900"
                onClick={() => setIsEditing(true)}
                >
                <PenLine className="h-4 w-4" /> Edit Physician
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

      {isEditing ? (
        <div className="space-y-6">
            <PhysicianForm formData={formData} onChange={handleChange} />
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
        <div className="flex flex-col lg:flex-row gap-8">
  {/* Profile Section */}
  <div className="flex-1">
    <Section title="Profile">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InfoField label="Physician ID" value={physician.physicianId} />
        <InfoField label="First Name" value={physician.firstName} />
        <InfoField label="Middle Name" value={physician.middleName} />
        <InfoField label="Last Name" value={physician.lastName} />
        <InfoField label="Email" value={physician.email} />
        <InfoField label="Created Date" value={physician.createdDate} />
        {physician.lastModified && (
          <InfoField label="Last Modified" value={physician.lastModified} />
        )}
      </div>
    </Section>
  </div>

  {/* Address & Contact Section */}
  <div className="flex-1">
    <Section title="Address & Contact">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {/* Address */}
        <InfoField label="Address 1" value={physician.address1} />
        <InfoField label="Address 2" value={physician.address2} />
        <InfoField label="City" value={physician.city} />
        <InfoField label="State" value={physician.state} />
        <InfoField label="Zip Code" value={physician.zipCode} />
        <InfoField label="Country" value={physician.country} />

        {/* Contact */}
        <InfoField label="Phone 1" value={physician.phone1} />
        <InfoField label="Phone 2" value={physician.phone2} />
        <InfoField label="Mobile" value={physician.mobile} />
        <InfoField label="Fax" value={physician.fax} />
      </div>
    </Section>
  </div>
</div>

      )}
    </div>
  );
};

export default PhysicianDetails;
