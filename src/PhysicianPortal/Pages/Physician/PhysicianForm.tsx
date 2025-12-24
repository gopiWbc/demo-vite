import { Input, Select } from "antd";

export type PhysicianFormData = {
  physicianId?: string;
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
};

interface PhysicianFormProps {
  formData: PhysicianFormData;
  onChange: (field: keyof PhysicianFormData, value: string) => void;
}

const PhysicianForm: React.FC<PhysicianFormProps> = ({ formData, onChange }) => {
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

  const stateOptions = [
    { label: "--Select State--", value: "" },
    { label: "California", value: "California" },
    { label: "Texas", value: "Texas" },
    { label: "New York", value: "New York" },
    { label: "Florida", value: "Florida" },
  ];

  const countryOptions = [
    { label: "--Select--", value: "" },
    { label: "United States", value: "United States" },
    { label: "Canada", value: "Canada" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "India", value: "India" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        <div className="flex-1">
          <Section title="Physician Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Physician ID - shown only in edit mode, always disabled */}
              {formData.physicianId && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                    Physician ID
                  </label>
                  <Input
                    size="large"
                    value={formData.physicianId}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              )}

              {/* First name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  First name <span className="text-rose-500">*</span>
                </label>
                <Input
                  size="large"
                  value={formData.firstName}
                  onChange={(e) => onChange("firstName", e.target.value)}
                />
              </div>

              {/* Last name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Last name <span className="text-rose-500">*</span>
                </label>
                <Input
                  size="large"
                  value={formData.lastName}
                  onChange={(e) => onChange("lastName", e.target.value)}
                />
              </div>

              {/* Middle name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Middle name
                </label>
                <Input
                  size="large"
                  value={formData.middleName}
                  onChange={(e) => onChange("middleName", e.target.value)}
                />
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Email ID <span className="text-rose-500">*</span>
                </label>
                <Input
                  size="large"
                  type="email"
                  value={formData.email}
                  onChange={(e) => onChange("email", e.target.value)}
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

              {/* Fax */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Fax
                </label>
                <Input
                  size="large"
                  value={formData.fax}
                  onChange={(e) => onChange("fax", e.target.value)}
                />
              </div>
            </div>
          </Section>
        </div>

        <div className="flex-1">
          <Section title="Address & Contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Address-1 */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Address-1
                </label>
                <Input
                  size="large"
                  value={formData.address1}
                  onChange={(e) => onChange("address1", e.target.value)}
                />
              </div>

              {/* Address-2 */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Address-2
                </label>
                <Input
                  size="large"
                  value={formData.address2}
                  onChange={(e) => onChange("address2", e.target.value)}
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  City
                </label>
                <Input
                  size="large"
                  value={formData.city}
                  onChange={(e) => onChange("city", e.target.value)}
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  State
                </label>
                <Select
                  size="large"
                  options={stateOptions}
                  value={formData.state}
                  onChange={(value) => onChange("state", value)}
                  className="w-full"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Country
                </label>
                <Select
                  size="large"
                  options={countryOptions}
                  value={formData.country}
                  onChange={(value) => onChange("country", value)}
                  className="w-full"
                />
              </div>

              {/* ZipCode */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  ZipCode
                </label>
                <Input
                  size="large"
                  value={formData.zipCode}
                  onChange={(e) => onChange("zipCode", e.target.value)}
                />
              </div>

              {/* Phone-1 */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Phone-1
                </label>
                <Input
                  size="large"
                  value={formData.phone1}
                  onChange={(e) => onChange("phone1", e.target.value)}
                />
              </div>

              {/* Phone-2 */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  Phone-2
                </label>
                <Input
                  size="large"
                  value={formData.phone2}
                  onChange={(e) => onChange("phone2", e.target.value)}
                />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PhysicianForm;
