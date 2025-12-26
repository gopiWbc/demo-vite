import { useMemo, useState } from "react";
import { PenLine, Save, X } from "lucide-react";
import type { UploadFile } from "antd/es/upload/interface";

import SalesLogForm from "./SalesLogForm";
import type { SalesLogFormData, SalesLogRecord } from "./types";

type SalesLogDetailsProps = {
  record: SalesLogRecord;
  onBack: () => void;
  onUpdate: (updated: SalesLogRecord) => void;
};

const mapRecordToFormData = (record: SalesLogRecord): SalesLogFormData => ({
  logDateTime: record.logDate && record.logDate !== "--" ? `${record.logDate} ${record.createdAt?.split(" ")[1] || "00:00"}` : "",
  callbackDateTime: record.callbackDate || "",
  subject: record.subject,
  salesTeam: record.salesTeam || "",
  name: record.name,
  mobilePhone: record.mobilePhone || "",
  clientName: record.clientName,
  clientContactInfo: record.clientContactInfo || "",
  physicianName: record.physicianName || "",
  city: record.city || "",
  state: record.state || "",
  address1: record.address1 || "",
  address2: record.address2 || "",
  zipCode: record.zipCode || "",
  workPhone: record.workPhone || "",
  visitStatus: record.visitStatus || "",
  message: record.message || "",
  attachments: (record.attachments || []).map((file) => ({
    uid: file.uid,
    name: file.name,
    status: file.status ?? "done",
    url: file.url,
    type: file.type,
  })) as UploadFile[],
});

const SalesLogDetails = ({ record, onBack, onUpdate }: SalesLogDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<SalesLogFormData>(() => mapRecordToFormData(record));

  const logInfoFields = useMemo(
    () => [
      { label: "Log date", value: record.logDate || "--" },
      { label: "Callback date", value: record.callbackDate || "--" },
      { label: "Sales Team", value: record.salesTeam || "--" },
      { label: "Visit status", value: record.visitStatus || "--" },
      { label: "Subject", value: record.subject },
    ],
    [record],
  );

  const clientFields = useMemo(
    () => [
      { label: "Sales Rep", value: record.name },
      { label: "Mobile phone", value: record.mobilePhone || "--" },
      { label: "Client name", value: record.clientName },
      { label: "Client contact info", value: record.clientContactInfo || "--" },
      { label: "Physician name", value: record.physicianName || "--" },
      { label: "City", value: record.city || "--" },
      { label: "State", value: record.state || "--" },
      { label: "Zip code", value: record.zipCode || "--" },
      { label: "Work phone", value: record.workPhone || "--" },
      { label: "Address 1", value: record.address1 || "--" },
      { label: "Address 2", value: record.address2 || "--" },
    ],
    [record],
  );

  const handleSave = () => {
    const updated: SalesLogRecord = {
      ...record,
      subject: formData.subject,
      salesTeam: formData.salesTeam,
      name: formData.name,
      mobilePhone: formData.mobilePhone,
      clientName: formData.clientName,
      clientContactInfo: formData.clientContactInfo,
      physicianName: formData.physicianName,
      city: formData.city,
      state: formData.state,
      address1: formData.address1,
      address2: formData.address2,
      zipCode: formData.zipCode,
      workPhone: formData.workPhone,
      visitStatus: formData.visitStatus,
      message: formData.message,
      logDate: formData.logDateTime ? formData.logDateTime.split(" ")[0] : record.logDate,
      callbackDate: formData.callbackDateTime ? formData.callbackDateTime.split(" ")[0] : formData.callbackDateTime,
      attachments: (formData.attachments || []).map((file) => ({
        uid: file.uid,
        name: file.name,
        status: file.status,
        url: file.url,
        type: file.type,
      })),
      updatedAt: formData.logDateTime || record.updatedAt,
    };

    onUpdate(updated);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(mapRecordToFormData(record));
    setIsEditing(false);
  };

  const InfoField = ({ label, value }: { label: string; value?: string }) => (
    <div>
      <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <span className="mt-1 block text-sm font-semibold text-gray-900">{value || "--"}</span>
    </div>
  );

  return (
    <div className="space-y-2 px-4 pb-10">
      <nav className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li className="text-indigo-600 font-semibold cursor-pointer" onClick={onBack}>
            Sales Log
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600 font-semibold">Log Details</li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">{record.subject}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>Sales Rep: {record.name}</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>Client: {record.clientName}</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>Status: {record.visitStatus || "--"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing && (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-indigo-700 transition hover:border-indigo-400 hover:text-indigo-900"
                onClick={() => setIsEditing(true)}
              >
                <PenLine className="h-4 w-4" /> Edit Sales Log
              </button>
            )}
            <button
              type="button"
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
          <SalesLogForm formData={formData} onChange={(field, value) => setFormData((prev) => ({ ...prev, [field]: value }))} />
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
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-indigo-50">
                <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-900">Log Information</h3>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5">
                  {logInfoFields.map((field) => (
                    <InfoField key={field.label} label={field.label} value={field.value} />
                  ))}
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Message</span>
                  <span className="mt-1 block text-sm font-semibold text-gray-900">{record.message || "--"}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Attachments</span>
                  {record.attachments?.length ? (
                    <ul className="space-y-2 mt-1">
                      {record.attachments?.map((file) => (
                        <li key={file.uid} className="text-sm text-indigo-600">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="mt-1 block text-sm font-semibold text-gray-900">No attachments</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-indigo-50">
                <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-900">Client Details</h3>
              </div>
              <div className="px-6 py-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5">
                  {clientFields.map((field) => (
                    <InfoField key={field.label} label={field.label} value={field.value} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesLogDetails;
