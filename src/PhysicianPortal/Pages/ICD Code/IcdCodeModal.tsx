import { useEffect, useMemo, useState } from "react";
import { Button, Input, Modal, Select } from "antd";

export type IcdCodeItem = {
  id: string;
  icdNumber: string;
  icdName: string;
  codeType: string;
  description: string;
};

type IcdCodeModalProps = {
  open: boolean;
  initial: IcdCodeItem | null;
  onClose: () => void;
  onSave: (item: IcdCodeItem) => void;
  codeTypeOptions?: { label: string; value: string }[];
};

const defaultCodeTypeOptions = [
  { label: "ICD9", value: "ICD9" },
  { label: "ICD10", value: "ICD10" },
];

const IcdCodeModal = ({
  open,
  initial,
  onClose,
  onSave,
  codeTypeOptions = defaultCodeTypeOptions,
}: IcdCodeModalProps) => {
  const [form, setForm] = useState<Omit<IcdCodeItem, "id">>({
    icdNumber: "",
    icdName: "",
    codeType: "",
    description: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        icdNumber: initial.icdNumber,
        icdName: initial.icdName,
        codeType: initial.codeType,
        description: initial.description,
      });
    } else {
      setForm({ icdNumber: "", icdName: "", codeType: "", description: "" });
    }
  }, [initial, open]);

  const isEdit = useMemo(() => Boolean(initial), [initial]);

  const canSubmit = form.icdNumber.trim() && form.icdName.trim() && form.codeType.trim();

  const handleChange = <Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const payload: IcdCodeItem = {
      id: initial?.id ?? Date.now().toString(),
      ...form,
    };

    onSave(payload);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={520}
      title={isEdit ? "Edit ICD Code" : "Add ICD Code"}
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
          disabled={!canSubmit}
        >
          {isEdit ? "Save Changes" : "Submit"}
        </Button>,
      ]}
    >
      <div className="space-y-6 py-4">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            ICD number <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.icdNumber}
            onChange={(event) => handleChange("icdNumber", event.target.value)}
            placeholder="Enter ICD number"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            ICD name <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.icdName}
            onChange={(event) => handleChange("icdName", event.target.value)}
            placeholder="Enter ICD name"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            ICD code type <span className="text-rose-500">*</span>
          </span>
          <Select
            size="large"
            value={form.codeType || undefined}
            onChange={(value) => handleChange("codeType", value)}
            placeholder="--Select--"
            options={codeTypeOptions}
            className="w-full"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">Description</span>
          <Input.TextArea
            rows={3}
            value={form.description}
            onChange={(event) => handleChange("description", event.target.value)}
            placeholder="Enter description"
          />
        </label>
      </div>
    </Modal>
  );
};

export default IcdCodeModal;
