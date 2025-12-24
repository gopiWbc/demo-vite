import { useEffect, useState } from "react";
import { PenLine, Save, X } from "lucide-react";
import ClientForm from "./ClientForm";
import type { Client, ClientFormData } from "./types";

interface ClientDetailsProps {
  client: Client;
  onBack: () => void;
  onUpdate: (updatedClient: Client) => void;
}

const ClientDetails = ({ client, onBack, onUpdate }: ClientDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Client>(client);

  useEffect(() => {
    setFormData(client);
    setIsEditing(false);
  }, [client]);

  const handleFormChange = <Key extends keyof ClientFormData>(
    key: Key,
    value: ClientFormData[Key]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(client);
    setIsEditing(false);
  };

  const InfoField = ({ label, value }: { label: string; value?: string | boolean }) => (
    <div>
      <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="mt-1 block text-sm font-semibold text-gray-900">
        {value !== undefined && value !== "" ? String(value) : "--"}
      </span>
    </div>
  );

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-indigo-50">
        <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-900">
          {title}
        </h3>
      </div>
      <div className="px-6 py-6 space-y-6">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6 px-4 pb-10">
      <nav className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li
            className="text-indigo-600 font-semibold cursor-pointer"
            onClick={onBack}
          >
            Clients
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600 font-semibold">Client Details</li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
              {formData.clientName}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>Client ID: {formData.clientId}</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>Type: {formData.type}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing && (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-indigo-700 transition hover:border-indigo-400 hover:text-indigo-900"
                onClick={() => setIsEditing(true)}
              >
                <PenLine className="h-4 w-4" /> Edit Client
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
          <ClientForm
            formData={formData}
            onChange={handleFormChange}
            onLogoChange={(file) => {
              handleFormChange("logo", file ? URL.createObjectURL(file) : null);
            }}
          />
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
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <div className="flex-1">
            <Section title="Client Details">
              <div className="flex justify-center mb-4">
                <div className="relative h-24 w-24 rounded-full bg-indigo-50 border border-dashed border-indigo-300 flex items-center justify-center overflow-hidden">
                  {formData.logo ? (
                    <img src={formData.logo} alt="Client logo" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-[11px] font-medium text-indigo-500 text-center px-4">No logo</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                <InfoField label="Client ID" value={formData.clientId} />
                <InfoField label="Type" value={formData.type} />
                <InfoField label="Result Folder" value={formData.resultFolder} />
                <InfoField label="Created Date" value={formData.createdDate} />
                <InfoField label="SMS Alert" value={formData.sendSmsAlert ? "Enabled" : "Disabled"} />
              </div>
            </Section>
          </div>

          <div className="flex-1">
            <Section title="Address and Contact Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoField label="Address" value={formData.address} />
                <InfoField label="City" value={formData.city} />
                <InfoField label="State" value={formData.state} />
                <InfoField label="Zip Code" value={formData.zipCode} />
                <InfoField label="Phone" value={formData.phone} />
                <InfoField label="Fax" value={formData.fax} />
                <InfoField label="Mobile" value={formData.mobile} />
                <InfoField label="Email" value={formData.email} />
              </div>
            </Section>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
