import { DatePicker, Input, Select, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import dayjs from "dayjs";
import { UploadCloud } from "lucide-react";

import type { SalesLogFormData } from "./types";

const { TextArea } = Input;
const dateTimeFormat = "MM/DD/YYYY HH:mm";

const visitStatusOptions = [
  { label: "--Select visit status--", value: "" },
  { label: "Callback", value: "Callback" },
  { label: "Closed", value: "Closed" },
  { label: "Pending", value: "Pending" },
  { label: "Follow-up", value: "Follow-up" },
];

const salesTeamOptions = [
  { label: "--Select--", value: "" },
  { label: "Self", value: "Self" },
  { label: "Sales Team A", value: "Sales Team A" },
  { label: "Sales Team B", value: "Sales Team B" },
];

type SalesLogFormProps = {
  formData: SalesLogFormData;
  onChange: <Key extends keyof SalesLogFormData>(key: Key, value: SalesLogFormData[Key]) => void;
};

const SalesLogForm = ({ formData, onChange }: SalesLogFormProps) => {
  const handleDateChange = (key: "logDateTime" | "callbackDateTime", value?: string | null) => {
    onChange(key, value ?? "");
  };

  const uploadProps: UploadProps = {
    multiple: true,
    beforeUpload: () => false,
    fileList: formData.attachments as UploadFile[],
    onChange: ({ fileList }) => onChange("attachments", fileList),
    accept: ".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt",
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-indigo-50">
        <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-900">{title}</h3>
      </div>
      <div className="px-6 py-6 space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        <div className="flex-1">
          <Section title="Log Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">
                  Date <span className="text-rose-500">*</span>
                </span>
                <DatePicker
                  size="large"
                  showTime
                  format={dateTimeFormat}
                  value={formData.logDateTime ? dayjs(formData.logDateTime, dateTimeFormat) : undefined}
                  onChange={(_, dateString) => handleDateChange("logDateTime", dateString)}
                  className="w-full"
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">Callback date</span>
                <DatePicker
                  size="large"
                  showTime
                  format={dateTimeFormat}
                  value={formData.callbackDateTime ? dayjs(formData.callbackDateTime, dateTimeFormat) : undefined}
                  onChange={(_, dateString) => handleDateChange("callbackDateTime", dateString)}
                  className="w-full"
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">
                  Subject <span className="text-rose-500">*</span>
                </span>
                <Input
                  size="large"
                  value={formData.subject}
                  onChange={(event) => onChange("subject", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">Visit status</span>
                <Select
                  size="large"
                  value={formData.visitStatus || undefined}
                  onChange={(value) => onChange("visitStatus", value)}
                  options={visitStatusOptions}
                  className="w-full"
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">Sales Team</span>
                <Select
                  size="large"
                  value={formData.salesTeam || undefined}
                  onChange={(value) => onChange("salesTeam", value)}
                  options={salesTeamOptions}
                  className="w-full"
                />
              </label>
            </div>

            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
              <span className="mb-2 inline-block">Message</span>
              <TextArea
                rows={4}
                value={formData.message}
                onChange={(event) => onChange("message", event.target.value)}
              />
            </label>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Attachments
              </span>
              <Upload.Dragger {...uploadProps} className="rounded-xl">
                <p className="ant-upload-drag-icon flex justify-center text-indigo-600">
                  <UploadCloud className="h-8 w-8" />
                </p>
                <p className="ant-upload-text text-sm font-medium text-gray-700">
                  Drag and drop files here or click to upload
                </p>
                <p className="ant-upload-hint text-xs text-gray-500">
                  Supports multiple uploads. Allowed types: jpg, png, pdf, doc, xls, csv, txt
                </p>
              </Upload.Dragger>
            </div>
          </Section>
        </div>

        <div className="flex-1">
          <Section title="Client Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">
                  Sales Rep Name <span className="text-rose-500">*</span>
                </span>
                <Input
                  size="large"
                  value={formData.name}
                  onChange={(event) => onChange("name", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">Mobile phone</span>
                <Input
                  size="large"
                  value={formData.mobilePhone}
                  onChange={(event) => onChange("mobilePhone", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">
                  Client name <span className="text-rose-500">*</span>
                </span>
                <Input
                  size="large"
                  value={formData.clientName}
                  onChange={(event) => onChange("clientName", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">Client contact info.</span>
                <Input
                  size="large"
                  value={formData.clientContactInfo}
                  onChange={(event) => onChange("clientContactInfo", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">Physician name</span>
                <Input
                  size="large"
                  value={formData.physicianName}
                  onChange={(event) => onChange("physicianName", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">City</span>
                <Input
                  size="large"
                  value={formData.city}
                  onChange={(event) => onChange("city", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">State</span>
                <Input
                  size="large"
                  value={formData.state}
                  onChange={(event) => onChange("state", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 md:col-span-2">
                <span className="mb-2 inline-block">Address 1</span>
                <Input
                  size="large"
                  value={formData.address1}
                  onChange={(event) => onChange("address1", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 md:col-span-2">
                <span className="mb-2 inline-block">Address 2</span>
                <Input
                  size="large"
                  value={formData.address2}
                  onChange={(event) => onChange("address2", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">Zip code</span>
                <Input
                  size="large"
                  value={formData.zipCode}
                  onChange={(event) => onChange("zipCode", event.target.value)}
                />
              </label>

              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                <span className="mb-2 inline-block">Work phone</span>
                <Input
                  size="large"
                  value={formData.workPhone}
                  onChange={(event) => onChange("workPhone", event.target.value)}
                />
              </label>
            </div>
          </Section>
        </div>
      </div>

    </div>
  );
};

export default SalesLogForm;
