import { useEffect, useMemo, useState } from "react";
import { Button, Input, Modal, Select } from "antd";

export type IpaClientRoutingItem = {
  id: string;
  client: string;
  acoAffiliation: string;
  ipaClientId: string;
  ipaClientName: string;
  address?: string;
  city?: string;
  clientId: string;
};

type IpaClientRoutingModalProps = {
  open: boolean;
  initial: IpaClientRoutingItem | null;
  onClose: () => void;
  onSave: (record: IpaClientRoutingItem) => void;
  clientOptions?: { label: string; value: string }[];
};

const defaultClientOptions = [
  { label: "--Select--", value: "" },
  { label: "Aptech", value: "Aptech" },
  { label: "TYES", value: "TYES" },
  { label: "Owasp Org", value: "Owasp Org" },
];

const IpaClientRoutingModal = ({
  open,
  initial,
  onClose,
  onSave,
  clientOptions = defaultClientOptions,
}: IpaClientRoutingModalProps) => {
  const [form, setForm] = useState<Omit<IpaClientRoutingItem, "id" | "clientId"> & { clientId?: string }>({
    client: "",
    acoAffiliation: "",
    ipaClientId: "",
    ipaClientName: "",
    address: "",
    city: "",
    clientId: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        client: initial.client,
        acoAffiliation: initial.acoAffiliation,
        ipaClientId: initial.ipaClientId,
        ipaClientName: initial.ipaClientName,
        address: initial.address || "",
        city: initial.city || "",
        clientId: initial.clientId,
      });
    } else {
      setForm({
        client: "",
        acoAffiliation: "",
        ipaClientId: "",
        ipaClientName: "",
        address: "",
        city: "",
        clientId: "",
      });
    }
  }, [initial, open]);

  const isEdit = useMemo(() => Boolean(initial), [initial]);

  const canSubmit = form.client?.trim() && form.ipaClientId.trim() && form.ipaClientName.trim();

  const handleChange = <Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const payload: IpaClientRoutingItem = {
      id: initial?.id ?? Date.now().toString(),
      client: form.client,
      acoAffiliation: form.acoAffiliation,
      ipaClientId: form.ipaClientId,
      ipaClientName: form.ipaClientName,
      address: form.address,
      city: form.city,
      clientId: form.clientId || "",
    };

    onSave(payload);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={560}
      title={isEdit ? "Edit IPA Client Route" : "Add IPA Client Route"}
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
              Client <span className="text-rose-500">*</span>
            </span>
            <Select
              size="large"
              value={form.client || undefined}
              onChange={(value) => handleChange("client", value)}
              options={clientOptions}
              placeholder="--Select--"
              className="w-full"
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">ACO aff</span>
            <Input
              size="large"
              value={form.acoAffiliation}
              onChange={(event) => handleChange("acoAffiliation", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">
              IPA client ID <span className="text-rose-500">*</span>
            </span>
            <Input
              size="large"
              value={form.ipaClientId}
              onChange={(event) => handleChange("ipaClientId", event.target.value)}
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
            <span className="mb-2 inline-block">
              IPA client name <span className="text-rose-500">*</span>
            </span>
            <Input
              size="large"
              value={form.ipaClientName}
              onChange={(event) => handleChange("ipaClientName", event.target.value)}
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
            <span className="mb-2 inline-block">Client ID</span>
            <Input
              size="large"
              value={form.clientId}
              onChange={(event) => handleChange("clientId", event.target.value)}
            />
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default IpaClientRoutingModal;
