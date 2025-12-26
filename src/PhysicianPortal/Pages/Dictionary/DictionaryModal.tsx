import { useEffect, useMemo, useState } from "react";
import { Button, Input, Modal, Select } from "antd";

export type DictionaryItem = {
  id: string;
  testCode: string;
  language: string;
  data: string;
};

type DictionaryModalProps = {
  open: boolean;
  initial: DictionaryItem | null;
  onClose: () => void;
  onSave: (item: DictionaryItem) => void;
  testCodeOptions?: { label: string; value: string }[];
  languageOptions?: { label: string; value: string }[];
};

const defaultTestCodeOptions = [
  { label: "Widal Test", value: "WIDAL" },
  { label: "TC234343", value: "TC234343" },
  { label: "Kansamitha", value: "KANSAMITHA" },
  { label: "Test01", value: "TEST01" },
];

const defaultLanguageOptions = [
  { label: "English", value: "English" },
  { label: "Spanish", value: "Spanish" },
  { label: "Chinese", value: "Chinese" },
  { label: "Korean", value: "Korean" },
];

const DictionaryModal = ({
  open,
  initial,
  onClose,
  onSave,
  testCodeOptions = defaultTestCodeOptions,
  languageOptions = defaultLanguageOptions,
}: DictionaryModalProps) => {
  const [form, setForm] = useState<Omit<DictionaryItem, "id">>({
    testCode: "",
    language: "",
    data: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        testCode: initial.testCode,
        language: initial.language,
        data: initial.data,
      });
    } else {
      setForm({ testCode: "", language: "", data: "" });
    }
  }, [initial, open]);

  const isEdit = useMemo(() => Boolean(initial), [initial]);

  const canSubmit = form.testCode.trim() && form.language.trim() && form.data.trim();

  const handleChange = <Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const payload: DictionaryItem = {
      id: initial?.id ?? Date.now().toString(),
      ...form,
    };

    onSave(payload);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={480}
      title={isEdit ? "Edit Dictionary Code" : "Add Dictionary Code"}
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
            Test code <span className="text-rose-500">*</span>
          </span>
          <Select
            size="large"
            value={form.testCode || undefined}
            onChange={(value) => handleChange("testCode", value)}
            placeholder="--Select--"
            options={testCodeOptions}
            className="w-full"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Language <span className="text-rose-500">*</span>
          </span>
          <Select
            size="large"
            value={form.language || undefined}
            onChange={(value) => handleChange("language", value)}
            placeholder="--Select--"
            options={languageOptions}
            className="w-full"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Data <span className="text-rose-500">*</span>
          </span>
          <Input.TextArea
            rows={3}
            value={form.data}
            onChange={(event) => handleChange("data", event.target.value)}
            placeholder="Enter data"
          />
        </label>
      </div>
    </Modal>
  );
};

export default DictionaryModal;
