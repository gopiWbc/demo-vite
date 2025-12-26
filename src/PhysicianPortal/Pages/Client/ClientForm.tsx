import { useRef } from "react";
import { Input, Radio, Select, Switch } from "antd";
import type { ClientFormData } from "./types";

interface ClientFormProps {
  formData: ClientFormData;
  onChange: <Key extends keyof ClientFormData>(key: Key, value: ClientFormData[Key]) => void;
  onLogoChange: (file: File | null) => void;
}

const stateOptions = [
  { label: "--Select state--", value: "" },
  { label: "Alabama", value: "Alabama" },
  { label: "California", value: "California" },
  { label: "Florida", value: "Florida" },
  { label: "Georgia", value: "Georgia" },
  { label: "Illinois", value: "Illinois" },
  { label: "New York", value: "New York" },
  { label: "Texas", value: "Texas" },
  { label: "Washington", value: "Washington" },
];

const resultFolders = [
  { label: "Select folder", value: "" },
  { label: "Main Results", value: "main" },
  { label: "QA Review", value: "qa" },
  { label: "Archive", value: "archive" },
];

const ClientForm = ({ formData, onChange, onLogoChange }: ClientFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const triggerUpload = () => {
    inputRef.current?.click();
  };

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
      <div className="px-6 py-6 space-y-5">{children}</div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-between">
      <div className="flex-1">
        <Section title="Client Details">
          <div className="flex justify-center mb-4">
            <div
              className="relative h-24 w-24 rounded-full bg-indigo-50 border border-dashed border-indigo-300 flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={triggerUpload}
            >
              {formData.logo ? (
                <img src={formData.logo} alt="Client logo preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[11px] font-medium text-indigo-500 text-center px-4">Tap to upload</span>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => onLogoChange(event.target.files?.[0] ?? null)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                Type <span className="text-rose-500">*</span>
              </label>
              <Radio.Group
                value={formData.type}
                onChange={(e) => onChange("type", e.target.value)}
                className="flex flex-wrap gap-3 pt-1"
              >
                <Radio.Button value="Lab">Lab</Radio.Button>
                <Radio.Button value="IPA">IPA</Radio.Button>
              </Radio.Group>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                Client ID <span className="text-rose-500">*</span>
              </label>
              <Input size="large" value={formData.clientId} onChange={(e) => onChange("clientId", e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                Client name <span className="text-rose-500">*</span>
              </label>
              <Input size="large" value={formData.clientName} onChange={(e) => onChange("clientName", e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">Result folder</label>
              <Select
                size="large"
                value={formData.resultFolder || undefined}
                options={resultFolders}
                onChange={(value) => onChange("resultFolder", value)}
                className="w-full"
              />
            </div>
              <label className="text-xs font-semibold tracking-wide text-gray-600 self-center cursor-pointer">
                <span className="flex items-center gap-3 text-sm text-gray-700">
                  <span>
                    SMS alert
                    <div className="text-[11px] font-medium text-gray-500">Send SMS alert to patients</div>
                  </span>
                  <Switch checked={formData.sendSmsAlert} onChange={(checked) => onChange("sendSmsAlert", checked)} />
                </span>
              </label>
          </div>
        </Section>
      </div>

      <div className="flex-1">
        <Section title="Address and Contact Details">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">Address</label>
              <Input size="large" value={formData.address} onChange={(e) => onChange("address", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">City</label>
              <Input size="large" value={formData.city} onChange={(e) => onChange("city", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">State</label>
              <Select
                size="large"
                value={formData.state || undefined}
                options={stateOptions}
                onChange={(value) => onChange("state", value)}
                showSearch
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">Zip code</label>
              <Input size="large" value={formData.zipCode} onChange={(e) => onChange("zipCode", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">Phone number</label>
              <Input size="large" value={formData.phone} onChange={(e) => onChange("phone", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">Fax no.</label>
              <Input size="large" value={formData.fax} onChange={(e) => onChange("fax", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">Mobile</label>
              <Input size="large" value={formData.mobile} onChange={(e) => onChange("mobile", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">Email ID</label>
              <Input size="large" value={formData.email} onChange={(e) => onChange("email", e.target.value)} />
            </div>
          </div>
        </Section>
      </div>

      
    </div>
  );
};

export default ClientForm;
