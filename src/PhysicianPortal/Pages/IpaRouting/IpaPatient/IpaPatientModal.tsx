import { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import dayjs from "dayjs";

export type IpaPatientItem = {
  id: string;
  ipaClient: string;
  patientId: string;
  ipaPatientId: string;
  firstName: string;
  lastName: string;
  gender?: string;
  bmi?: string;
  dob?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
};

type IpaPatientModalProps = {
  open: boolean;
  initial: IpaPatientItem | null;
  onClose: () => void;
  onSave: (record: IpaPatientItem) => void;
  ipaClientOptions?: { label: string; value: string }[];
  genderOptions?: { label: string; value: string }[];
};

const defaultIpaClientOptions = [
  { label: "--Select IPA client--", value: "" },
  { label: "CL1", value: "CL1" },
  { label: "Client5001", value: "Client5001" },
  { label: "KL90", value: "KL90" },
];

const defaultGenderOptions = [
  { label: "--Select gender--", value: "" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const IpaPatientModal = ({
  open,
  initial,
  onClose,
  onSave,
  ipaClientOptions = defaultIpaClientOptions,
  genderOptions = defaultGenderOptions,
}: IpaPatientModalProps) => {
  const [form, setForm] = useState<Omit<IpaPatientItem, "id">>({
    ipaClient: "",
    patientId: "",
    ipaPatientId: "",
    firstName: "",
    lastName: "",
    gender: "",
    bmi: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        ipaClient: initial.ipaClient,
        patientId: initial.patientId,
        ipaPatientId: initial.ipaPatientId,
        firstName: initial.firstName,
        lastName: initial.lastName,
        gender: initial.gender || "",
        bmi: initial.bmi || "",
        dob: initial.dob || "",
        address: initial.address || "",
        city: initial.city || "",
        state: initial.state || "",
        zipCode: initial.zipCode || "",
      });
    } else {
      setForm({
        ipaClient: "",
        patientId: "",
        ipaPatientId: "",
        firstName: "",
        lastName: "",
        gender: "",
        bmi: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  }, [initial, open]);

  const isEdit = useMemo(() => Boolean(initial), [initial]);

  const canSubmit =
    form.ipaClient && form.ipaPatientId.trim() && form.patientId.trim() && form.firstName.trim() && form.lastName.trim();

  const handleChange = <Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const payload: IpaPatientItem = {
      id: initial?.id ?? Date.now().toString(),
      ...form,
    };

    onSave(payload);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={620}
      title={isEdit ? "Edit IPA Patient Route" : "Add IPA Patient Route"}
      classNames={{
        container: "!p-0 [&_.ant-modal-close]:!text-white",
        header: "bg-app-primary !p-4",
        title: "!text-white",
        body: "!px-5",
        footer: "!px-5 !pb-5",
      }}
      footer={[
        <Button key="cancel" onClick={onClose} size="large" className="!rounded-lg !font-medium">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          size="large"
          className="!rounded-lg !text-white !font-medium btn-primary border-none hover:shadow-lg"
          onClick={handleSubmit}
        >
          {isEdit ? "Save Changes" : "Submit"}
        </Button>,
      ]}
    >
      <div className="space-y-6 py-4 max-h-[65vh] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">
              IPA client <span className="text-rose-500">*</span>
            </span>
            <Select
              size="large"
              value={form.ipaClient || undefined}
              onChange={(value) => handleChange("ipaClient", value)}
              placeholder="--Select IPA client--"
              options={ipaClientOptions}
              className="w-full"
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">
              Patient ID <span className="text-rose-500">*</span>
            </span>
            <Input
              size="large"
              value={form.patientId}
              onChange={(event) => handleChange("patientId", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">
              IPA patient ID <span className="text-rose-500">*</span>
            </span>
            <Input
              size="large"
              value={form.ipaPatientId}
              onChange={(event) => handleChange("ipaPatientId", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">
              First name <span className="text-rose-500">*</span>
            </span>
            <Input
              size="large"
              value={form.firstName}
              onChange={(event) => handleChange("firstName", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">
              Last name <span className="text-rose-500">*</span>
            </span>
            <Input
              size="large"
              value={form.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">Gender</span>
            <Select
              size="large"
              value={form.gender || undefined}
              onChange={(value) => handleChange("gender", value)}
              options={genderOptions}
              placeholder="--Select gender--"
              className="w-full"
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">BMI</span>
            <Input
              size="large"
              value={form.bmi}
              onChange={(event) => handleChange("bmi", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">Date of birth</span>
            <DatePicker
              size="large"
              format="MM/DD/YYYY"
              value={form.dob ? dayjs(form.dob, "MM/DD/YYYY") : undefined}
              onChange={(_, dateString) => handleChange("dob", dateString ?? "")}
              className="w-full"
              allowClear
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 md:col-span-2">
            <span className="mb-2 inline-block">Address</span>
            <Input.TextArea
              rows={3}
              value={form.address}
              onChange={(event) => handleChange("address", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">City</span>
            <Input
              size="large"
              value={form.city}
              onChange={(event) => handleChange("city", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">State</span>
            <Input
              size="large"
              value={form.state}
              onChange={(event) => handleChange("state", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">Zip code</span>
            <Input
              size="large"
              value={form.zipCode}
              onChange={(event) => handleChange("zipCode", event.target.value)}
            />
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default IpaPatientModal;
