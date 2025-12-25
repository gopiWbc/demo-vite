import { useMemo, useState } from "react";
import { DatePicker, Input, Select, Switch } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Save, RotateCcw, X } from "lucide-react";
import type {
  PatientIdentity,
  NotificationPreferences,
  InsuranceDetails,
  ResponsibleParty,
  FieldConfig,
} from "./PatientDetails";
import {
  billMethodOptions,
  demographicFieldConfigs,
  notificationMethodOptions,
  notificationToggleConfigs,
  insuranceFieldConfigs,
  responsibleFieldConfigs,
} from "./PatientDetails";

type CreatePatientPayload = {
  patient: PatientIdentity;
  notifications: NotificationPreferences;
  insurance: InsuranceDetails;
  billMethod: string;
};

type CreatePatientProps = {
  onCancel: () => void;
  onSubmit?: (payload: CreatePatientPayload) => void;
};

const emptyPatient: PatientIdentity = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  gender: "",
  dob: "",
  patientId: "",
  race: "",
  ethnicity: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phoneNumber: "",
  alternatePhone: "",
  email: "",
};

const emptyResponsibleParty: ResponsibleParty = {
  relationship: "Self",
  firstName: "",
  middleName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phoneNumber: "",
  phoneType: "",
  phoneUsage: "",
};

const emptyInsurance: InsuranceDetails = {
  primaryInsurance: "",
  insuranceId: "",
  groupNumber: "",
  groupName: "",
  insuranceAddressLine1: "",
  insuranceAddressLine2: "",
  insuranceCity: "",
  insuranceState: "",
  insurancePostalCode: "",
  insuranceCountry: "",
  secondaryInsurance: false,
  secondaryInsuranceName: "",
  responsiblePartySameAsPatient: true,
  responsibleParty: emptyResponsibleParty,
};

const defaultNotifications: NotificationPreferences = {
  email: true,
  sms: false,
  phone: false,
  preferredMethod: "Email",
};

const formatDateValue = (value: string): Dayjs | null => {
  if (!value) return null;
  const parsed = dayjs(value, "MM/DD/YYYY", true);
  return parsed.isValid() ? parsed : null;
};

const renderField = <T,>(
  config: FieldConfig<T>,
  value: string,
  onChange: (next: string) => void
) => {
  if (config.type === "select" && config.options) {
    return (
      <Select
        size="large"
        options={config.options}
        value={value}
        onChange={(next) => onChange(next)}
        className="w-full"
      />
    );
  }

  if (config.type === "date") {
    return (
      <DatePicker
        size="large"
        className="w-full"
        format="MM/DD/YYYY"
        value={formatDateValue(value)}
        onChange={(next) => onChange(next ? next.format("MM/DD/YYYY") : "")}
      />
    );
  }

  return (
    <Input
      size="large"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
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
    <div className="px-6 py-6 space-y-4">{children}</div>
  </div>
);

const CreatePatient = ({ onCancel, onSubmit }: CreatePatientProps) => {
  const [patientDraft, setPatientDraft] = useState<PatientIdentity>(emptyPatient);
  const [billMethod, setBillMethod] = useState<string>(billMethodOptions[0]?.value ?? "");
  const [notificationDraft, setNotificationDraft] = useState<NotificationPreferences>(
    defaultNotifications
  );
  const [insuranceDraft, setInsuranceDraft] = useState<InsuranceDetails>(emptyInsurance);

  const draftAge = useMemo(() => {
    const parsed = dayjs(patientDraft.dob, "MM/DD/YYYY", true);
    return parsed.isValid() ? `${dayjs().diff(parsed, "year")} Years` : "";
  }, [patientDraft.dob]);

  const handlePatientChange = <Key extends keyof PatientIdentity>(
    key: Key,
    value: PatientIdentity[Key]
  ) =>
    setPatientDraft((prev) => ({
      ...prev,
      [key]: value,
    }));

  const handleNotificationToggle = (
    key: Exclude<keyof NotificationPreferences, "preferredMethod">,
    value: boolean
  ) =>
    setNotificationDraft((prev) => ({
      ...prev,
      [key]: value,
    }));

  const handlePreferredMethodChange = (
    value: NotificationPreferences["preferredMethod"]
  ) =>
    setNotificationDraft((prev) => ({
      ...prev,
      preferredMethod: value,
    }));

  const handleInsuranceChange = <Key extends keyof InsuranceDetails>(
    key: Key,
    value: InsuranceDetails[Key]
  ) =>
    setInsuranceDraft((prev) => ({
      ...prev,
      [key]: value,
    }));

  const handleResponsibleChange = <Key extends keyof ResponsibleParty>(
    key: Key,
    value: ResponsibleParty[Key]
  ) =>
    setInsuranceDraft((prev) => ({
      ...prev,
      responsibleParty: {
        ...prev.responsibleParty,
        [key]: value,
      },
    }));

  const resetForm = () => {
    setPatientDraft(emptyPatient);
    setBillMethod(billMethodOptions[0]?.value ?? "");
    setNotificationDraft(defaultNotifications);
    setInsuranceDraft(emptyInsurance);
  };

  const handleSubmit = () => {
    onSubmit?.({
      patient: patientDraft,
      notifications: notificationDraft,
      insurance: {
        ...insuranceDraft,
        responsibleParty: { ...insuranceDraft.responsibleParty },
      },
      billMethod,
    });
  };

  return (
    <div className="space-y-2 px-4 pb-10">
      <nav className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li className="text-indigo-600 font-semibold">Orders</li>
          <li className="text-gray-400">/</li>
          <li className="text-indigo-600 font-semibold">Search Patient</li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600 font-semibold">Create Patient</li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
            Create Patient
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span>Complete the form below to add a new patient record.</span>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-rose-400 hover:text-rose-500"
          onClick={onCancel}
        >
          <X className="h-4 w-4" /> Cancel
        </button>
      </div>

      <Section title="Patient Demographics">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {demographicFieldConfigs.map((field) => (
            <label
              key={String(field.key)}
              className="space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-600"
            >
              {field.label}
              {field.required && <span className="text-rose-500">*</span>}
              {renderField<PatientIdentity>(
                field,
                patientDraft[field.key] as string,
                (value) => handlePatientChange(field.key, value as never)
              )}
              {field.type === "date" && draftAge && (
                <span className="block text-[11px] font-medium text-gray-500">
                  Age: {draftAge}
                </span>
              )}
            </label>
          ))}
          <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
            Bill Method
            <Select
              size="large"
              className="w-full"
              options={billMethodOptions}
              value={billMethod}
              onChange={(value) => setBillMethod(value)}
            />
          </label>
          <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
            Preferred Notification Method
            <Select
              size="large"
              className="w-full"
              options={notificationMethodOptions}
              value={notificationDraft.preferredMethod}
              onChange={(value) =>
                handlePreferredMethodChange(
                  value as NotificationPreferences["preferredMethod"]
                )
              }
            />
          </label>
          {notificationToggleConfigs.map((config) => (
            <label
              key={config.key}
              className="space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-600"
            >
              <span className="flex items-center justify-between gap-3 text-sm text-gray-700">
                {config.label}
                <Switch
                  checked={notificationDraft[config.key]}
                  onChange={(checked) => handleNotificationToggle(config.key, checked)}
                />
              </span>
              <span className="text-[11px] font-medium text-gray-500">
                {config.description}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Insurance Information / Responsible Party">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {insuranceFieldConfigs.map((field) => (
            <label
              key={String(field.key)}
              className="space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-600"
            >
              {field.label}
              {field.required && <span className="text-rose-500">*</span>}
              {renderField<InsuranceDetails>(
                field,
                insuranceDraft[field.key] as string,
                (value) => handleInsuranceChange(field.key, value as never)
              )}
            </label>
          ))}
          <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="flex items-center justify-between gap-3 text-sm text-gray-700">
              Secondary Insurance?
              <Switch
                checked={insuranceDraft.secondaryInsurance}
                onChange={(checked) =>
                  handleInsuranceChange("secondaryInsurance", checked as never)
                }
              />
            </span>
            <span className="text-[11px] font-medium text-gray-500">
              Toggle on if the patient has additional coverage.
            </span>
          </label>
          <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="flex items-center justify-between gap-3 text-sm text-gray-700">
              Responsible Party Same as Patient?
              <Switch
                checked={insuranceDraft.responsiblePartySameAsPatient}
                onChange={(checked) =>
                  handleInsuranceChange(
                    "responsiblePartySameAsPatient",
                    checked as never
                  )
                }
              />
            </span>
            <span className="text-[11px] font-medium text-gray-500">
              Disable to enter different responsible party information.
            </span>
          </label>
        </div>

        {!insuranceDraft.responsiblePartySameAsPatient && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Responsible Party Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {responsibleFieldConfigs.map((field) => (
                <label
                  key={String(field.key)}
                  className="space-y-2 text-xs font-semibold uppercase tracking-wide text-gray-600"
                >
                  {field.label}
                  {field.required && <span className="text-rose-500">*</span>}
                  {renderField<ResponsibleParty>(
                    field,
                    insuranceDraft.responsibleParty[field.key] as string,
                    (value) => handleResponsibleChange(field.key, value as never)
                  )}
                </label>
              ))}
            </div>
          </div>
        )}
      </Section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
          onClick={handleSubmit}
        >
          <Save className="h-4 w-4" /> Create Patient
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
          onClick={resetForm}
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 transition hover:border-rose-400 hover:text-rose-500"
          onClick={onCancel}
        >
          <X className="h-4 w-4" /> Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePatient;
