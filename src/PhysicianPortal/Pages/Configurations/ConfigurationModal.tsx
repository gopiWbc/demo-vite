import { useEffect, useMemo, useState } from "react";
import { Button, Input, Modal, Select } from "antd";

export type ConfigurationItem = {
  id: string;
  configType: string;
  configName: string;
  configValue: string;
};

type ConfigurationModalProps = {
  open: boolean;
  initial: ConfigurationItem | null;
  onClose: () => void;
  onSave: (item: ConfigurationItem) => void;
  typeOptions?: { label: string; value: string }[];
};

const defaultTypeOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Admin1", value: "Admin1" },
  { label: "Email", value: "Email" },
  { label: "Sms", value: "Sms" },
  { label: "Portal", value: "Portal" },
];

const ConfigurationModal = ({
  open,
  initial,
  onClose,
  onSave,
  typeOptions = defaultTypeOptions,
}: ConfigurationModalProps) => {
  const [form, setForm] = useState<Omit<ConfigurationItem, "id">>({
    configType: "",
    configName: "",
    configValue: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        configType: initial.configType,
        configName: initial.configName,
        configValue: initial.configValue,
      });
    } else {
      setForm({ configType: "", configName: "", configValue: "" });
    }
  }, [initial, open]);

  const isEdit = useMemo(() => Boolean(initial), [initial]);

  const canSubmit = form.configType.trim() && form.configName.trim() && form.configValue.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;

    const payload: ConfigurationItem = {
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
      title={isEdit ? "Edit Configuration" : "Add Configuration"}
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
      <div className="space-y-6 py-4">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Config type <span className="text-rose-500">*</span>
          </span>
          <Select
            size="large"
            value={form.configType || undefined}
            onChange={(value) => setForm((prev) => ({ ...prev, configType: value }))}
            placeholder="--Select--"
            options={typeOptions}
            className="w-full"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Config name <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.configName}
            onChange={(event) => setForm((prev) => ({ ...prev, configName: event.target.value }))}
            placeholder="Enter config name"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Config value <span className="text-rose-500">*</span>
          </span>
          <Input.TextArea
            rows={3}
            value={form.configValue}
            onChange={(event) => setForm((prev) => ({ ...prev, configValue: event.target.value }))}
            placeholder="Enter config value"
          />
        </label>
      </div>
    </Modal>
  );
};

export default ConfigurationModal;
