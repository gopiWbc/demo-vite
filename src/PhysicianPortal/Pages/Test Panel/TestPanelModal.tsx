import { useEffect, useMemo, useState } from "react";
import { Button, Input, Modal } from "antd";

export type TestPanelItem = {
  id: string;
  testCode: string;
  testNumber: string;
  testName: string;
  loinc: string;
  description: string;
};

type TestPanelModalProps = {
  open: boolean;
  initial: TestPanelItem | null;
  onClose: () => void;
  onSave: (item: TestPanelItem) => void;
};

const TestPanelModal = ({ open, initial, onClose, onSave }: TestPanelModalProps) => {
  const [form, setForm] = useState<Omit<TestPanelItem, "id">>({
    testCode: "",
    testNumber: "",
    testName: "",
    loinc: "",
    description: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        testCode: initial.testCode,
        testNumber: initial.testNumber,
        testName: initial.testName,
        loinc: initial.loinc,
        description: initial.description,
      });
    } else {
      setForm({ testCode: "", testNumber: "", testName: "", loinc: "", description: "" });
    }
  }, [initial, open]);

  const isEdit = useMemo(() => Boolean(initial), [initial]);

  const canSubmit = form.testCode.trim() && form.testNumber.trim() && form.testName.trim();

  const handleChange = <Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const payload: TestPanelItem = {
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
      title={isEdit ? "Edit Test Panel" : "Add Test Panel"}
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
            Test code <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.testCode}
            onChange={(event) => handleChange("testCode", event.target.value)}
            placeholder="Enter test code"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Test number <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.testNumber}
            onChange={(event) => handleChange("testNumber", event.target.value)}
            placeholder="Enter test number"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Test name <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.testName}
            onChange={(event) => handleChange("testName", event.target.value)}
            placeholder="Enter test name"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">Loinc</span>
          <Input
            size="large"
            value={form.loinc}
            onChange={(event) => handleChange("loinc", event.target.value)}
            placeholder="Enter LOINC"
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

export default TestPanelModal;
