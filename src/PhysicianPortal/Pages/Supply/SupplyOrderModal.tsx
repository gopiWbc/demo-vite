import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Input, Select, Switch, Button } from "antd";

export type SupplyItem = {
  id: string;
  code: string;
  name: string;
  category: string;
  status: "Active" | "Inactive";
  image?: string | null;
  notes?: string;
};

export type SupplyFormValues = Omit<SupplyItem, "id">;

interface SupplyOrderModalProps {
  open: boolean;
  initial: SupplyItem | null;
  onClose: () => void;
  onSave: (item: SupplyItem) => void;
}

const categoryOptions = [
  { label: "Containers", value: "Containers" },
  { label: "Swabs", value: "Swabs" },
  { label: "Kits", value: "Kits" },
  { label: "Forms", value: "Forms" },
];

const SupplyOrderModal: React.FC<SupplyOrderModalProps> = ({ open, initial, onClose, onSave }) => {
  const [form, setForm] = useState<SupplyFormValues>({
    code: "",
    name: "",
    category: "",
    status: "Active",
    image: null,
    notes: "",
  });

  const fileRef = useRef<HTMLInputElement | null>(null);
  const isEdit = Boolean(initial);

  useEffect(() => {
    if (initial) {
      setForm({
        code: initial.code,
        name: initial.name,
        category: initial.category,
        status: initial.status,
        image: initial.image ?? null,
        notes: initial.notes ?? "",
      });
    } else {
      setForm({ code: "", name: "", category: "", status: "Active", image: null, notes: "" });
    }
  }, [initial, open]);

  useEffect(() => {
    return () => {
      if (form.image && typeof form.image === "string" && form.image.startsWith("blob:")) {
        URL.revokeObjectURL(form.image);
      }
    };
  }, [form.image]);

  const handleUploadClick = () => fileRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: url }));
  };

  const headerTitle = useMemo(() => (isEdit ? "Edit Supply" : "Add Supply"), [isEdit]);

  const canSave = form.code.trim() && form.name.trim() && form.category.trim();

  const handleSave = () => {
    if (!canSave) return;
    const payload: SupplyItem = {
      id: initial?.id ?? Date.now().toString(),
      ...form,
    } as SupplyItem;
    onSave(payload);
  };

  return (
    <Modal
      title={headerTitle}
      classNames={{
        container: "!p-0 [&_.ant-modal-close]:!text-white",
        header: "bg-app-primary !p-4",
        title: "!text-white",
        body: "!px-4",
        footer: "!px-4 !pb-4",
      }}
      open={open}
      onCancel={onClose}
      width={720}
      footer={[
        <Button key="cancel" onClick={onClose} size="large" className="!rounded-lg !font-medium">
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          disabled={!canSave}
          onClick={handleSave}
          size="large"
          className="!rounded-lg !font-medium btn-primary border-none hover:shadow-lg"
        >
          {isEdit ? "Save Changes" : "Create"}
        </Button>,
      ]}
    >
      <div className="space-y-6 py-4">
        <div className="flex justify-center">
          <div
            className="relative h-24 w-24 rounded-full bg-indigo-50 border border-dashed border-indigo-300 flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={handleUploadClick}
            title="Click to upload image"
          >
            {form.image ? (
              <img src={form.image} alt="Supply" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[11px] font-medium text-indigo-500 text-center px-4">Tap to upload</span>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">Code <span className="text-rose-500">*</span></span>
            <Input size="large" value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))} />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">Name <span className="text-rose-500">*</span></span>
            <Input size="large" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">Category <span className="text-rose-500">*</span></span>
            <Select
              size="large"
              value={form.category || undefined}
              onChange={(value) => setForm((p) => ({ ...p, category: value }))}
              options={categoryOptions}
              className="w-full"
              placeholder="--Select--"
            />
          </label>
          <label className="text-xs font-semibold tracking-wide text-gray-600 self-center cursor-pointer">
            <span className="flex items-center gap-3 text-sm text-gray-700">
              <span>
                Status
                <div className="text-[11px] font-medium text-gray-500">{form.status.toLowerCase()}</div>
              </span>
              <Switch
                checked={form.status === "Active"}
                onChange={(checked) => setForm((p) => ({ ...p, status: checked ? "Active" : "Inactive" }))}
              />
            </span>
          </label>
        </div>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="mb-2 inline-block">Notes</span>
          <Input.TextArea rows={3} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
        </label>
      </div>
    </Modal>
  );
};

export default SupplyOrderModal;
