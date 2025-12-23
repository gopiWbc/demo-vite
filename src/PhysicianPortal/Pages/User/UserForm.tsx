import React from "react";
import { Input, Select, Switch } from "antd";

interface UserFormProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ formData, onChange }) => {
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
      <div className="px-6 py-6 space-y-4">{children}</div>
    </div>
  );



  return (
    <div className="space-y-2">
      <Section title="Account & Personal Details">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Email ID <span className="text-rose-500">*</span>
              </label>
              <Input
                size="large"
                value={formData.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>

            {/* User Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                User Type <span className="text-rose-500">*</span>
              </label>
              <Select
                size="large"
                options={[
                    { label: "Administrator", value: "Administrator" },
                    { label: "Physician", value: "Physician" },
                    { label: "Lab Technician", value: "Lab Technician" },
                    { label: "Front Desk", value: "Front Desk" },
                ]}
                value={formData.role}
                onChange={(value) => onChange("role", value)}
                className="w-full"
                placeholder="--Select--"
              />
            </div>

            {/* User Status Toggle */}
            <label className="text-xs font-semibold tracking-wide text-gray-600 self-center cursor-pointer">
                <span className="flex items-center gap-3 text-sm text-gray-700">
                    <span>
                        Active
                        <div className="text-[11px] font-medium text-gray-500">
                            User is {formData.status.toLowerCase()}
                        </div>
                    </span>
                    <Switch
                        checked={formData.status === "Active"}
                        onChange={(checked) => onChange("status", checked ? "Active" : "Inactive")}
                    />
                </span>
            </label>

            {/* Email as Username Toggle */}
            <label className="text-xs font-semibold tracking-wide text-gray-600 self-center cursor-pointer">
                <span className="flex items-center gap-3 text-sm text-gray-700">
                    <span>
                        Email as Username
                        <div className="text-[11px] font-medium text-gray-500">
                            Use email for login
                        </div>
                    </span>
                    <Switch
                        checked={formData.emailAsUsername}
                        onChange={(checked) => onChange("emailAsUsername", checked)}
                    />
                </span>
            </label>

            {/* Username - Conditional */}
            {!formData.emailAsUsername ? (
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        Username <span className="text-rose-500">*</span>
                    </label>
                    <Input
                        size="large"
                        value={formData.username}
                        onChange={(e) => onChange("username", e.target.value)}
                    />
                </div>
            ) : (
                <div className="hidden lg:block"></div>
            )}

            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                First Name <span className="text-rose-500">*</span>
              </label>
              <Input
                size="large"
                value={formData.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Last Name <span className="text-rose-500">*</span>
              </label>
              <Input
                size="large"
                value={formData.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
              />
            </div>

            {/* Middle Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Middle Name
              </label>
              <Input
                size="large"
                value={formData.middleName}
                onChange={(e) => onChange("middleName", e.target.value)}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Mobile
              </label>
              <Input
                size="large"
                value={formData.mobile}
                onChange={(e) => onChange("mobile", e.target.value)}
              />
            </div>

            {/* Alternate Mobile */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Alternate Mobile
              </label>
              <Input
                size="large"
                value={formData.alternateMobile}
                onChange={(e) => onChange("alternateMobile", e.target.value)}
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Language
              </label>
              <Select
                size="large"
                options={[
                    { label: "English", value: "English" },
                    { label: "Spanish", value: "Spanish" },
                ]}
                value={formData.language}
                onChange={(value) => onChange("language", value)}
                className="w-full"
                placeholder="--Select--"
              />
            </div>

        </div>
      </Section>


    </div>
  );
};

export default UserForm;
