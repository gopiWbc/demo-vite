import { useEffect, useMemo, useState } from "react";
import { Button, Input, Modal } from "antd";

export type CustomPanelItem = {
  id: string;
  panelNumber: string;
  panelCode: string;
  panelName: string;
  loinc: string;
  description: string;
};

type CustomPanelModalProps = {
  open: boolean;
  initial: CustomPanelItem | null;
  onClose: () => void;
  onSave: (item: CustomPanelItem) => void;
};

const CustomPanelModal = ({ open, initial, onClose, onSave }: CustomPanelModalProps) => {
  const [form, setForm] = useState<Omit<CustomPanelItem, "id">>({
    panelNumber: "",
    panelCode: "",
    panelName: "",
    loinc: "",
    description: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        panelNumber: initial.panelNumber,
        panelCode: initial.panelCode,
        panelName: initial.panelName,
        loinc: initial.loinc,
        description: initial.description,
      });
    } else {
      setForm({ panelNumber: "", panelCode: "", panelName: "", loinc: "", description: "" });
    }
  }, [initial, open]);

  const isEdit = useMemo(() => Boolean(initial), [initial]);

  const canSubmit = form.panelNumber.trim() && form.panelCode.trim() && form.panelName.trim();

  const handleChange = <Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const payload: CustomPanelItem = {
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
      title={isEdit ? "Edit Custom Panel" : "Add Custom Panel"}
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
            Panel number <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.panelNumber}
            onChange={(event) => handleChange("panelNumber", event.target.value)}
            placeholder="Enter panel number"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Panel code <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.panelCode}
            onChange={(event) => handleChange("panelCode", event.target.value)}
            placeholder="Enter panel code"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">
            Panel name <span className="text-rose-500">*</span>
          </span>
          <Input
            size="large"
            value={form.panelName}
            onChange={(event) => handleChange("panelName", event.target.value)}
            placeholder="Enter panel name"
          />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">LOINC</span>
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

export default CustomPanelModal;
