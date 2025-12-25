import { useMemo, useState } from "react";
import { DatePicker, Input, Select, Switch } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { PenLine, Save, RotateCcw, X } from "lucide-react";
import CreateOrder from "./CreateOrder";

export type PatientIdentity = {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  gender: string;
  dob: string;
  patientId: string;
  race: string;
  ethnicity: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  alternatePhone: string;
  email: string;
};

export type ResponsibleParty = {
  relationship: string;
  firstName: string;
  middleName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  phoneType: string;
  phoneUsage: string;
};

export type NotificationPreferences = {
  email: boolean;
  sms: boolean;
  phone: boolean;
  preferredMethod: "Email" | "SMS" | "Phone";
};

export type InsuranceDetails = {
  primaryInsurance: string;
  insuranceId: string;
  groupNumber: string;
  groupName: string;
  insuranceAddressLine1: string;
  insuranceAddressLine2: string;
  insuranceCity: string;
  insuranceState: string;
  insurancePostalCode: string;
  insuranceCountry: string;
  secondaryInsurance: boolean;
  secondaryInsuranceName: string;
  responsiblePartySameAsPatient: boolean;
  responsibleParty: ResponsibleParty;
};

export type PatientDetailsData = {
  billMethod: string;
  metadata: {
    createdOn: string;
    lastModifiedOn: string;
    lastModifiedBy: string;
  };
  patient: PatientIdentity;
  insurance: InsuranceDetails;
  notifications: NotificationPreferences;
};

export type FieldConfig<T> = {
  key: keyof T;
  label: string;
  required?: boolean;
  type?: "text" | "select" | "date";
  options?: { label: string; value: string }[];
};

export const billMethodOptions = [
  "Private Insurance",
  "Medicare",
  "Client Bill",
].map((value) => ({ label: value, value }));

const genderOptions = ["Female", "Male", "Other", "Unknown"].map((value) => ({
  label: value,
  value,
}));

const countryOptions = [
  "United States of America",
  "Canada",
  "Mexico",
].map((value) => ({ label: value, value }));

const stateOptions = [
  "AL",
  "CA",
  "GA",
  "IL",
  "NY",
  "TN",
  "TX",
].map((value) => ({ label: value, value }));

const phoneTypeOptions = ["Mobile", "Home", "Work"].map((value) => ({
  label: value,
  value,
}));

const relationshipOptions = [
  "Self",
  "Parent",
  "Guardian",
  "Spouse",
  "Other",
].map((value) => ({ label: value, value }));

export const notificationMethodOptions = ["Email", "SMS", "Phone"].map((value) => ({
  label: value,
  value,
}));

export const notificationToggleConfigs: {
  key: Exclude<keyof NotificationPreferences, "preferredMethod">;
  label: string;
  description: string;
}[] = [
  {
    key: "email",
    label: "Email Alerts",
    description: "Send order updates and reminders via email.",
  },
  {
    key: "sms",
    label: "SMS Alerts",
    description: "Send text message notifications.",
  },
  {
    key: "phone",
    label: "Phone Call Alerts",
    description: "Call for critical updates.",
  },
];

export const demographicFieldConfigs: FieldConfig<PatientIdentity>[] = [
  { key: "lastName", label: "Last Name", required: true },
  { key: "firstName", label: "First Name", required: true },
  { key: "middleName", label: "Middle Name" },
  { key: "suffix", label: "Suffix" },
  { key: "dob", label: "Date of Birth", required: true, type: "date" },
  { key: "gender", label: "Gender", required: true, type: "select", options: genderOptions },
  { key: "patientId", label: "Patient ID" },
  { key: "race", label: "Race" },
  { key: "ethnicity", label: "Ethnicity" },
  { key: "addressLine1", label: "Address Line 1", required: true },
  { key: "addressLine2", label: "Address Line 2" },
  { key: "city", label: "City/Town" },
  { key: "state", label: "State/Province/Region", type: "select", options: stateOptions },
  { key: "postalCode", label: "Postal Code", required: true },
  { key: "country", label: "Country", type: "select", required: true, options: countryOptions },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "alternatePhone", label: "Alternate Phone" },
  { key: "email", label: "Email Address" },
];

export const insuranceFieldConfigs: FieldConfig<InsuranceDetails>[] = [
  { key: "primaryInsurance", label: "Primary Insurance", required: true },
  { key: "insuranceId", label: "Insurance ID", required: true },
  { key: "groupNumber", label: "Group Number" },
  { key: "groupName", label: "Group Name" },
  { key: "insuranceAddressLine1", label: "Address Line 1" },
  { key: "insuranceAddressLine2", label: "Address Line 2" },
  { key: "insuranceCity", label: "City/Town" },
  { key: "insuranceState", label: "State/Province/Region", type: "select", options: stateOptions },
  { key: "insurancePostalCode", label: "Postal Code" },
  { key: "insuranceCountry", label: "Country", type: "select", options: countryOptions },
  { key: "secondaryInsuranceName", label: "Secondary Insurance Name" },
];

export const responsibleFieldConfigs: FieldConfig<ResponsibleParty>[] = [
  { key: "relationship", label: "Patient's Relationship", required: true, type: "select", options: relationshipOptions },
  { key: "firstName", label: "First Name", required: true },
  { key: "middleName", label: "Middle Name" },
  { key: "lastName", label: "Last Name", required: true },
  { key: "addressLine1", label: "Address Line 1" },
  { key: "addressLine2", label: "Address Line 2" },
  { key: "city", label: "City/Town" },
  { key: "state", label: "State/Province/Region", type: "select", options: stateOptions },
  { key: "postalCode", label: "Postal Code" },
  { key: "country", label: "Country", type: "select", options: countryOptions },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "phoneType", label: "Phone Type", type: "select", options: phoneTypeOptions },
  { key: "phoneUsage", label: "Phone Usage", type: "select", options: phoneTypeOptions },
];

const initialDetails: PatientDetailsData = {
  billMethod: "Private Insurance",
  metadata: {
    createdOn: "01/18/2022",
    lastModifiedOn: "01/18/2022",
    lastModifiedBy: "admin@wbcsoftwarelab.com",
  },
  patient: {
    firstName: "Jacqueline",
    middleName: "",
    lastName: "Lynch",
    suffix: "",
    gender: "Female",
    dob: "09/05/1976",
    patientId: "8634643",
    race: "--",
    ethnicity: "--",
    addressLine1: "535 S Kingsley Dr Apt 412",
    addressLine2: "",
    city: "Los Angeles",
    state: "CA",
    postalCode: "90020",
    country: "United States of America",
    phoneNumber: "(773) 303-1025",
    alternatePhone: "",
    email: "",
  },
  insurance: {
    primaryInsurance: "Cigna",
    insuranceId: "U7028576502",
    groupNumber: "3324083",
    groupName: "",
    insuranceAddressLine1: "PO Box 188033",
    insuranceAddressLine2: "",
    insuranceCity: "Chattanooga",
    insuranceState: "TN",
    insurancePostalCode: "37422",
    insuranceCountry: "United States of America",
    secondaryInsurance: false,
    secondaryInsuranceName: "",
    responsiblePartySameAsPatient: true,
    responsibleParty: {
      relationship: "Self",
      firstName: "Jacqueline",
      middleName: "",
      lastName: "Lynch",
      addressLine1: "535 S Kingsley Dr Apt 412",
      addressLine2: "",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90020",
      country: "United States of America",
      phoneNumber: "(773) 303-1025",
      phoneType: "Mobile",
      phoneUsage: "Mobile",
    },
  },
  notifications: {
    email: true,
    sms: false,
    phone: false,
    preferredMethod: "Email",
  },
};

const formattedAge = (dob: string) => {
  const parsed = dayjs(dob, "MM/DD/YYYY", true);
  if (!parsed.isValid()) return "";
  return `${dayjs().diff(parsed, "year")} Years`;
};

const formatDateValue = (value: string): Dayjs | null => {
  if (!value) return null;
  const parsed = dayjs(value, "MM/DD/YYYY", true);
  return parsed.isValid() ? parsed : null;
};

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

const Section = ({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-indigo-50">
      <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-900">
        {title}
      </h3>
      {actions}
    </div>
    <div className="px-6 py-6 space-y-6">{children}</div>
  </div>
);

const PatientDetails = () => {
  const [createOrder, setCreateOrder] = useState(false);
  const [details, setDetails] = useState<PatientDetailsData>(initialDetails);
  const [patientDraft, setPatientDraft] = useState<PatientIdentity>(() => ({
    ...initialDetails.patient,
  }));
  const [insuranceDraft, setInsuranceDraft] = useState<InsuranceDetails>(() => ({
    ...initialDetails.insurance,
    responsibleParty: { ...initialDetails.insurance.responsibleParty },
  }));
  const [notificationDraft, setNotificationDraft] = useState<NotificationPreferences>(
    () => ({
      ...initialDetails.notifications,
    })
  );
  const [billMethodDraft, setBillMethodDraft] = useState(initialDetails.billMethod);
  const [isEditingPatient, setIsEditingPatient] = useState(false);
  const [isEditingInsurance, setIsEditingInsurance] = useState(false);

  const viewAge = useMemo(() => formattedAge(details.patient.dob), [details]);
  const editPatientAge = useMemo(() => formattedAge(patientDraft.dob), [patientDraft]);

  const handlePatientChange = <Key extends keyof PatientIdentity>(
    key: Key,
    value: PatientIdentity[Key]
  ) =>
    setPatientDraft((prev) => ({
      ...prev,
      [key]: value,
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

  const startPatientEditing = () => {
    setPatientDraft({ ...details.patient });
    setBillMethodDraft(details.billMethod);
    setNotificationDraft({ ...details.notifications });
    setIsEditingPatient(true);
  };

  const confirmPatient = () => {
    setDetails((prev) => ({
      ...prev,
      billMethod: billMethodDraft,
      patient: { ...patientDraft },
      notifications: { ...notificationDraft },
    }));
    setIsEditingPatient(false);
  };

  const resetPatient = () => {
    setPatientDraft({ ...details.patient });
    setBillMethodDraft(details.billMethod);
    setNotificationDraft({ ...details.notifications });
  };

  const cancelPatient = () => {
    setPatientDraft({ ...details.patient });
    setBillMethodDraft(details.billMethod);
    setNotificationDraft({ ...details.notifications });
    setIsEditingPatient(false);
  };

  const startInsuranceEditing = () => {
    setInsuranceDraft({
      ...details.insurance,
      responsibleParty: { ...details.insurance.responsibleParty },
    });
    setIsEditingInsurance(true);
  };

  const confirmInsurance = () => {
    setDetails((prev) => ({
      ...prev,
      insurance: {
        ...insuranceDraft,
        responsibleParty: { ...insuranceDraft.responsibleParty },
      },
    }));
    setIsEditingInsurance(false);
  };

  const resetInsurance = () => {
    setInsuranceDraft({
      ...details.insurance,
      responsibleParty: { ...details.insurance.responsibleParty },
    });
  };

  const cancelInsurance = () => {
    resetInsurance();
    setIsEditingInsurance(false);
  };

  const renderField = <T,>(config: FieldConfig<T>, value: string, onChange: (next: string) => void) => {
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

  const renderFormActions = ({
    onConfirm,
    onReset,
    onCancel,
  }: {
    onConfirm: () => void;
    onReset: () => void;
    onCancel: () => void;
  }) => (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <button
        type="button"
        className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
        onClick={onConfirm}
      >
        <Save className="h-4 w-4" /> Confirm/Update
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
        onClick={onReset}
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
  );

  if (createOrder) {
    return <CreateOrder />;
  }

  return (
    <div className="space-y-2 px-4 pb-10">
      <nav className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li className="text-indigo-600 font-semibold">Orders</li>
          <li className="text-gray-400">/</li>
          <li className="text-indigo-600 font-semibold">Search Patient</li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600 font-semibold">Patient Details</li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
              {`${details.patient.lastName}, ${details.patient.firstName}`}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>
                Date of Birth: {details.patient.dob}
                {viewAge && <span> (Age {viewAge})</span>}
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>Gender: {details.patient.gender || "--"}</span>
            </div>
          </div>

          <button
            onClick={() => setCreateOrder(true)}
            type="button"
            className="btn-primary inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
          >
            Create Order
          </button>
        </div>

      </div>

      <Section
        title="Patient Demographics"
        actions={
          !isEditingPatient && (
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-600">
              <span>
                Creation Date: <span className="text-gray-900">{details.metadata.createdOn}</span>
              </span>
              <span>
                Last Modified: <span className="text-gray-900">{details.metadata.lastModifiedOn}</span>
              </span>
              <span>
                Last Modified By: <span className="text-indigo-600">{details.metadata.lastModifiedBy}</span>
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 transition hover:border-indigo-400 hover:text-indigo-900"
                onClick={startPatientEditing}
              >
                <PenLine className="h-4 w-4" /> Edit Patient
              </button>
            </div>
          )
        }
      >
        {isEditingPatient ? (
          <div className="space-y-6">
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
                  {field.type === "date" && editPatientAge && (
                    <span className="block text-[11px] font-medium text-gray-500">
                      Age: {editPatientAge}
                    </span>
                  )}
                </label>
              ))}
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
                      onChange={(checked) =>
                        handleNotificationToggle(config.key, checked)
                      }
                    />
                  </span>
                  <span className="text-[11px] font-medium text-gray-500">
                    {config.description}
                  </span>
                </label>
              ))}
            </div>

            {renderFormActions({
              onConfirm: confirmPatient,
              onReset: resetPatient,
              onCancel: cancelPatient,
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            <InfoField
              label="Name"
              value={`${details.patient.lastName}, ${details.patient.firstName}`}
            />
            <InfoField
              label="Email Notifications"
              value={details.notifications.email ? "Enabled" : "Disabled"}
            />
            <InfoField
              label="SMS Notifications"
              value={details.notifications.sms ? "Enabled" : "Disabled"}
            />
            <InfoField
              label="Phone Call Notifications"
              value={details.notifications.phone ? "Enabled" : "Disabled"}
            />
            <InfoField
              label="Preferred Notification Method"
              value={details.notifications.preferredMethod}
            />
            <InfoField
              label="Date of Birth"
              value={`${details.patient.dob}${viewAge ? ` (Age ${viewAge})` : ""}`}
            />
            <InfoField label="Gender" value={details.patient.gender} />
            <InfoField label="Patient ID" value={details.patient.patientId} />
            <InfoField label="Race" value={details.patient.race} />
            <InfoField label="Ethnicity" value={details.patient.ethnicity} />
            <InfoField label="Phone" value={details.patient.phoneNumber} />
            <InfoField label="Alternate Phone" value={details.patient.alternatePhone} />
            <InfoField label="Email" value={details.patient.email} />
            <InfoField
              label="Address"
              value={`${details.patient.addressLine1}${details.patient.addressLine2 ? `, ${details.patient.addressLine2}` : ""}`}
            />
            <InfoField
              label="City/State"
              value={`${details.patient.city}, ${details.patient.state} ${details.patient.postalCode}`}
            />
            <InfoField label="Country" value={details.patient.country} />
            <InfoField label="Bill Method" value={details.billMethod} />
          </div>
        )}
      </Section>

      <Section
        title="Insurance Information / Responsible Party"
        actions={
          !isEditingInsurance && (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 transition hover:border-indigo-400 hover:text-indigo-900"
              onClick={startInsuranceEditing}
            >
              <PenLine className="h-4 w-4" /> Edit Insurance
            </button>
          )
        }
      >
        {isEditingInsurance ? (
          <div className="space-y-6">
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
                      handleInsuranceChange("responsiblePartySameAsPatient", checked as never)
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

            {renderFormActions({
              onConfirm: confirmInsurance,
              onReset: resetInsurance,
              onCancel: cancelInsurance,
            })}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              <InfoField label="Primary Insurance" value={details.insurance.primaryInsurance} />
              <InfoField label="Insurance ID" value={details.insurance.insuranceId} />
              <InfoField label="Group Number" value={details.insurance.groupNumber} />
              <InfoField label="Group Name" value={details.insurance.groupName} />
              <InfoField
                label="Insurance Address"
                value={`${details.insurance.insuranceAddressLine1}${details.insurance.insuranceAddressLine2 ? `, ${details.insurance.insuranceAddressLine2}` : ""}`}
              />
              <InfoField
                label="Insurance City/State"
                value={`${details.insurance.insuranceCity}, ${details.insurance.insuranceState} ${details.insurance.insurancePostalCode}`}
              />
              <InfoField label="Insurance Country" value={details.insurance.insuranceCountry} />
              <InfoField
                label="Secondary Insurance"
                value={details.insurance.secondaryInsurance ? "Yes" : "No"}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                Responsible Party
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                <InfoField
                  label="Relationship"
                  value={details.insurance.responsibleParty.relationship}
                />
                <InfoField
                  label="Name"
                  value={`${details.insurance.responsibleParty.lastName}, ${details.insurance.responsibleParty.firstName}`}
                />
                <InfoField
                  label="Address"
                  value={`${details.insurance.responsibleParty.addressLine1}${details.insurance.responsibleParty.addressLine2 ? `, ${details.insurance.responsibleParty.addressLine2}` : ""}`}
                />
                <InfoField
                  label="City/State"
                  value={`${details.insurance.responsibleParty.city}, ${details.insurance.responsibleParty.state} ${details.insurance.responsibleParty.postalCode}`}
                />
                <InfoField label="Country" value={details.insurance.responsibleParty.country} />
                <InfoField label="Phone" value={details.insurance.responsibleParty.phoneNumber} />
                <InfoField label="Phone Type" value={details.insurance.responsibleParty.phoneType} />
                <InfoField label="Phone Usage" value={details.insurance.responsibleParty.phoneUsage} />
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
};

export default PatientDetails;