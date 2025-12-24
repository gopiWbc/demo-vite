import { Input, Select, Switch, Radio } from "antd";

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
      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        <div className="flex-1">
          <Section title="Account Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* User ID - shown only in edit mode, always disabled */}
            {formData.userId && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                    User ID
                  </label>
                  <Input
                    size="large"
                    value={formData.userId}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
            )}

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

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Password <span className="text-rose-500">*</span>
              </label>
              <Input.Password
                size="large"
                value={formData.password}
                onChange={(e) => onChange("password", e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Confirm password <span className="text-rose-500">*</span>
              </label>
              <Input.Password
                size="large"
                value={formData.confirmPassword}
                onChange={(e) => onChange("confirmPassword", e.target.value)}
              />
            </div>

            {/* Password Expiry */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Password expiry
              </label>
              <Input
                size="large"
                type="number"
                value={formData.passwordExpiry}
                onChange={(e) => onChange("passwordExpiry", e.target.value)}
                placeholder="(No of days / 7 - 90)"
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
            {!formData.emailAsUsername && (
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
            )}
            </div>
          </Section>
        </div>
        
        <div className="flex-1">
          <Section title="Personal Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
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
                    { label: "French", value: "French" },
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
      </div>

      <Section title="Preferences">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {/* Records per page */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Records per page
              </label>
              <Select
                size="large"
                options={[
                    { label: "10", value: 10 },
                    { label: "25", value: 25 },
                    { label: "50", value: 50 },
                    { label: "100", value: 100 },
                ]}
                value={formData.recordsPerPage || 10}
                onChange={(value) => onChange("recordsPerPage", value)}
                className="w-full"
              />
            </div>

            {/* Can order test Toggle */}
            <label className="text-xs font-semibold tracking-wide text-gray-600 self-center cursor-pointer">
                <span className="flex items-center gap-3 text-sm text-gray-700">
                    <span>
                        Can order test
                        <div className="text-[11px] font-medium text-gray-500">
                            User can {formData.canOrderTest === "Yes" ? "order tests" : "not order tests"}
                        </div>
                    </span>
                    <Switch
                        checked={formData.canOrderTest === "Yes"}
                        onChange={(checked) => onChange("canOrderTest", checked ? "Yes" : "No")}
                    />
                </span>
            </label>

            {/* Show results Radio Buttons */}
            <div className="space-y-2 text-sm font-medium text-slate-600">
                <span className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Show results
                </span>
              <Radio.Group
                value={formData.showResults}
                onChange={(e) => onChange("showResults", e.target.value)}
                className="flex flex-wrap gap-3"
              >
                <Radio.Button value="All">All</Radio.Button>
                <Radio.Button value="Final Only">Final Only</Radio.Button>
                <Radio.Button value="Preliminary Only">Preliminary Only</Radio.Button>
              </Radio.Group>
            </div>

            {/* Critical alert Toggle */}
            <label className="text-xs font-semibold tracking-wide text-gray-600 self-center cursor-pointer">
                <span className="flex items-center gap-3 text-sm text-gray-700">
                    <span>
                        Critical alert
                        <div className="text-[11px] font-medium text-gray-500">
                            Alerts are {formData.criticalAlert === "Yes" ? "enabled" : "disabled"}
                        </div>
                    </span>
                    <Switch
                        checked={formData.criticalAlert === "Yes"}
                        onChange={(checked) => onChange("criticalAlert", checked ? "Yes" : "No")}
                    />
                </span>
            </label>

            {/* Special Result Watch */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Special Result Watch
              </label>
              <Select
                size="large"
                options={[
                    { label: "Critical", value: "Critical" },
                    { label: "Urgent", value: "Urgent" },
                    { label: "Normal", value: "Normal" },
                ]}
                value={formData.specialResultWatch}
                onChange={(value) => onChange("specialResultWatch", value)}
                className="w-full"
                placeholder="--Select--"
              />
            </div>

            {/* Result to be watched */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Result to be watched
              </label>
              <Input
                size="large"
                value={formData.resultToBeWatched}
                onChange={(e) => onChange("resultToBeWatched", e.target.value)}
              />
            </div>

            {/* Alerts Starting Hour */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Alerts Interval - Starting hour
              </label>
              <Select
                size="large"
                options={Array.from({ length: 24 }, (_, i) => ({
                  label: `${i}:00`,
                  value: i,
                }))}
                value={formData.alertsStartingHour}
                onChange={(value) => onChange("alertsStartingHour", value)}
                className="w-full"
                placeholder="--Select--"
              />
            </div>

            {/* Alerts How Many Hours */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                Alerts Interval - How many hours
              </label>
              <Input
                size="large"
                type="number"
                value={formData.alertsHowManyHours}
                onChange={(e) => onChange("alertsHowManyHours", e.target.value)}
              />
            </div>
        </div>
      </Section>


    </div>
  );
};

export default UserForm;
