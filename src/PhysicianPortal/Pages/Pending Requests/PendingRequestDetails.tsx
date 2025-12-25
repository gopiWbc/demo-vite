import { useEffect, useMemo, useState } from "react";
import { Button, Input, Select, Switch } from "antd";
import type { AssignType } from "../User/AssignPanel";

export type PendingRequestRecord = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  mobile: string;
  carrier: string;
  password: string;
  confirmPassword: string;
  emailAsUsername: boolean;
  enableClient: boolean;
  clientId: string;
  clientName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  fax: string;
  salesRepresentative: string;
  registeredDate: string;
};

interface PendingRequestDetailsProps {
  request: PendingRequestRecord;
  onBack: () => void;
  onUpdate: (updated: PendingRequestRecord) => void;
  onApprove: (updated: PendingRequestRecord) => void;
  onCancel: () => void;
  onAssign: (type: AssignType) => void;
}

const carrierOptions = [
  { label: "--Select Carrier--", value: "" },
  { label: "AT&T", value: "att" },
  { label: "Verizon", value: "verizon" },
  { label: "T-Mobile", value: "tmobile" },
];

const stateOptions = [
  { label: "--Select State--", value: "" },
  { label: "California", value: "CA" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
];

const PendingRequestDetails = ({
  request,
  onBack,
  onUpdate,
  onApprove,
  onCancel,
  onAssign,
}: PendingRequestDetailsProps) => {
  const [form, setForm] = useState<PendingRequestRecord>(request);

  useEffect(() => {
    setForm(request);
  }, [request]);

  const Section = useMemo(
    () =>
      function SectionComponent({
        title,
        children,
        className,
      }: {
        title: string;
        children: React.ReactNode;
        className?: string;
      }) {
        return (
          <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden ${className ?? ""}`}>
            <div className="px-6 py-4 bg-indigo-50 flex items-center justify-between">
              <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-900">
                {title}
              </h3>
            </div>
            <div className="px-6 py-6 space-y-4">{children}</div>
          </div>
        );
      },
    []
  );

  const handleChange = <Key extends keyof PendingRequestRecord>(
    key: Key,
    value: PendingRequestRecord[Key]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleApprove = () => {
    onApprove(form);
  };

  const handleSubmit = () => {
    onUpdate(form);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Pending Request</h1>
          <p className="text-sm text-gray-500">Review and approve pending user request</p>
        </div>
        <Button onClick={onBack} className="rounded-lg px-4 py-2 text-sm font-semibold">
          Back
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Section title="User Details" className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
            <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              First Name <span className="text-rose-500">*</span>
            </label>
            <Input
              size="large"
              value={form.firstName}
              onChange={(event) => handleChange("firstName", event.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <Input
              size="large"
              value={form.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Middle Name
            </label>
            <Input
              size="large"
              value={form.middleName}
              onChange={(event) => handleChange("middleName", event.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Mobile
            </label>
            <Input
              size="large"
              value={form.mobile}
              onChange={(event) => handleChange("mobile", event.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Carrier
            </label>
            <Select
              className="w-full"
              size="large"
              value={form.carrier || undefined}
              onChange={(value) => handleChange("carrier", value)}
              options={carrierOptions}
              placeholder="--Select Carrier--"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Email ID <span className="text-rose-500">*</span>
            </label>
            <Input
              size="large"
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Password <span className="text-rose-500">*</span>
            </label>
            <Input.Password
              size="large"
              value={form.password}
              onChange={(event) => handleChange("password", event.target.value)}
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Confirm Password <span className="text-rose-500">*</span>
            </label>
            <Input.Password
              size="large"
              value={form.confirmPassword}
              onChange={(event) => handleChange("confirmPassword", event.target.value)}
            />
          </div>

            <label className="text-xs font-semibold tracking-wide text-gray-600 self-center cursor-pointer">
              <span className="flex items-center gap-3 text-sm text-gray-700">
                <span>
                  Email ID as username
                  <div className="text-[11px] font-medium text-gray-500">
                    Use email for login
                  </div>
                </span>
                <Switch
                  checked={form.emailAsUsername}
                  onChange={(checked) => handleChange("emailAsUsername", checked)}
                />
              </span>
            </label>

            {!form.emailAsUsername && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Username <span className="text-rose-500">*</span>
                </label>
                <Input
                  size="large"
                  value={form.username}
                  onChange={(event) => handleChange("username", event.target.value)}
                  placeholder="Enter username"
                />
              </div>
            )}
          </div>
        </Section>

        <Section title="Client Details" className="flex-1">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <label className="text-xs font-semibold tracking-wide text-gray-600 cursor-pointer">
              <span className="flex items-center gap-3 text-sm text-gray-700">
                <span>
                  Enable client
                  <div className="text-[11px] font-medium text-gray-500">
                    Toggle to capture client information
                  </div>
                </span>
                <Switch
                  checked={form.enableClient}
                  onChange={(checked) => handleChange("enableClient", checked)}
                />
              </span>
            </label>

            <Button type="primary" className="btn-primary" onClick={() => onAssign("Client")}>
              Assign
            </Button>
          </div>

          {form.enableClient && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Client ID <span className="text-rose-500">*</span>
                </label>
                <Input
                  size="large"
                  value={form.clientId}
                  onChange={(event) => handleChange("clientId", event.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Client Name <span className="text-rose-500">*</span>
                </label>
                <Input
                  size="large"
                  value={form.clientName}
                  onChange={(event) => handleChange("clientName", event.target.value)}
                />
              </div>

              <div className="md:col-span-1 lg:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <Input
                  size="large"
                  value={form.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Fax No.
                </label>
                <Input
                  size="large"
                  value={form.fax}
                  onChange={(event) => handleChange("fax", event.target.value)}
                />
              </div>

              <div className="">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Address
                </label>
                <Input
                  size="large"
                  value={form.address}
                  onChange={(event) => handleChange("address", event.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  City
                </label>
                <Input
                  size="large"
                  value={form.city}
                  onChange={(event) => handleChange("city", event.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  State
                </label>
                <Select
                  className="w-full"
                  size="large"
                  value={form.state || undefined}
                  onChange={(value) => handleChange("state", value)}
                  options={stateOptions}
                  placeholder="--Select State--"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Zip Code
                </label>
                <Input
                  size="large"
                  value={form.zipCode}
                  onChange={(event) => handleChange("zipCode", event.target.value)}
                />
              </div>
            </div>
          )}
        </Section>
      </div>
      

      {/* <Section title="Assignment">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Sales Representative
            </label>
            <Input
              size="large"
              value={form.salesRepresentative}
              onChange={(event) => handleChange("salesRepresentative", event.target.value)}
              placeholder="Assign sales representative"
            />
         </div>
          <div className="flex items-end">
            <Button type="primary" className="btn-primary" onClick={() => onAssign("Sales Rep")}>
              Assign
            </Button>
          </div>
        </div>
      </Section> */}

      <div className="flex items-center justify-end gap-3">
        <Button onClick={onCancel} className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600">
          Save
        </Button>
        <Button type="primary" className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md" onClick={handleApprove}>
          Approve
        </Button>
      </div>
    </div>
  );
};

export default PendingRequestDetails;
