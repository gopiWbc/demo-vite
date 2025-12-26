  import type { FC, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Modal,
  Radio,
  Select,
  Switch,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { X, Check } from "lucide-react";
import {
  CalendarDays,
  ClipboardList,
  Search,
  Trash2,
} from "lucide-react";

const { TextArea } = Input;

type SectionProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
};

const Section: FC<SectionProps> = ({ title, subtitle, actions, children }) => (
  <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
    <header className="flex flex-col gap-2 bg-indigo-50 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-900">{title}</h2>
        {subtitle ? <p className="text-xs font-medium text-indigo-600">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </header>
    <div className="px-6 py-6 space-y-5">{children}</div>
  </section>
);

type OrderedTest = {
  id: string;
  type: "panel" | "test";
  value: string;
  label: string;
  description?: string;
  icdCodes: string[];
};

type TestPanelOption = {
  label: string;
  value: string;
  description?: string;
  category: "Test" | "Panel";
};

const clientOptions = [
  { label: "Select client", value: "" },
  { label: "Wellness Partners", value: "wellness" },
  { label: "CareOne Medical", value: "careone" },
  { label: "Summit Diagnostics", value: "summit" },
];

const physicianOptions = [
  { label: "Select physician", value: "" },
  { label: "Dr. Amelia Stone", value: "amelia-stone" },
  { label: "Dr. Noah Carter", value: "noah-carter" },
  { label: "Dr. Leena Patel", value: "leena-patel" },
];

const testPanelOptions: TestPanelOption[] = [
  {
    label: "164657 · Saccharomyces Cerevisiae Panel",
    value: "164657",
    description: "Panel focused on Saccharomyces Cerevisiae markers",
    category: "Panel",
  },
  {
    label: "835040 · Fatty Acid Balance",
    value: "835040",
    description: "Comprehensive fatty acid assessment",
    category: "Panel",
  },
  {
    label: "1224 · Comprehensive Metabolic Panel",
    value: "1224",
    description: "CMP blood draw",
    category: "Panel",
  },
  {
    label: "90456 · Vitamin D, 25-Hydroxy",
    value: "90456",
    description: "Vitamin D status for wellness screening",
    category: "Test",
  },
  {
    label: "72145 · Complete Blood Count",
    value: "72145",
    description: "CBC with differential",
    category: "Test",
  },
];

const icdOptions = [
  {
    code: "D16.8",
    description: "Ben Neoplasm Pelv Bone Sacrum Coccyx",
  },
  {
    code: "A02.25",
    description: "Salmonella Pyelonephritis",
  },
  {
    code: "E11.9",
    description: "Type 2 Diabetes Mellitus Without Complication",
  },
  {
    code: "I10",
    description: "Essential (primary) Hypertension",
  },
  {
    code: "M54.50",
    description: "Low Back Pain, Unspecified",
  },
];

type IcdModalContext =
  | { mode: "general" }
  | { mode: "test"; testId: string; testLabel: string };

const CreateOrder: FC = () => {
  const [collectionDate, setCollectionDate] = useState<Dayjs | null>(dayjs());
  const [client, setClient] = useState<string>("");
  const [physician, setPhysician] = useState<string>("");
  const [requisitionId, setRequisitionId] = useState<string>("");
  const [orderedTests, setOrderedTests] = useState<OrderedTest[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [standingOrderEnabled, setStandingOrderEnabled] = useState<boolean>(false);
  const [standingFrequency, setStandingFrequency] = useState<string>("weekly");
  const [standingOccurrences, setStandingOccurrences] = useState<string>("4");
  const [icdModalOpen, setIcdModalOpen] = useState<boolean>(false);
  const [icdModalContext, setIcdModalContext] = useState<IcdModalContext | null>(null);
  const [icdSearch, setIcdSearch] = useState<string>("");
  const [selectedIcdCodes, setSelectedIcdCodes] = useState<string[]>([]);
  const [generalIcdCodes, setGeneralIcdCodes] = useState<string[]>([]);
  const [notifyMe, setNotifyMe] = useState<boolean>(true);
  const [reportStatus, setReportStatus] = useState<string>("both");

  const filteredIcdOptions = useMemo(() => {
    if (!icdSearch.trim()) return icdOptions;
    const query = icdSearch.toLowerCase();
    return icdOptions.filter(
      (option) =>
        option.code.toLowerCase().includes(query) ||
        option.description.toLowerCase().includes(query)
    );
  }, [icdSearch]);

  const addTestPanelSelection = (value: string) => {
    const option = testPanelOptions.find((item) => item.value === value);
    if (!option) return;

    setOrderedTests((previous) => {
      const exists = previous.some((test) => test.value === value);
      if (exists) return previous;

      return [
        ...previous,
        {
          id: `${option.category.toLowerCase()}-${value}`,
          type: option.category === "Panel" ? "panel" : "test",
          value,
          label: option.label,
          description: option.description,
          icdCodes: [],
        },
      ];
    });
  };

  const removeTest = (id: string) => {
    setOrderedTests((previous) => previous.filter((test) => test.id !== id));
  };

  const openGeneralIcdModal = () => {
    setIcdModalContext({ mode: "general" });
    setSelectedIcdCodes(generalIcdCodes);
    setIcdSearch("");
    setIcdModalOpen(true);
  };

  const openTestIcdModal = (testId: string) => {
    const targetTest = orderedTests.find((test) => test.id === testId);
    if (!targetTest) return;

    const initialCodes = targetTest.icdCodes.length > 0 ? targetTest.icdCodes : generalIcdCodes;
    setIcdModalContext({ mode: "test", testId, testLabel: targetTest.label });
    setSelectedIcdCodes(initialCodes);
    setIcdSearch("");
    setIcdModalOpen(true);
  };

  const handleIcdModalClose = () => {
    setIcdModalOpen(false);
    setIcdModalContext(null);
    setSelectedIcdCodes([]);
    setIcdSearch("");
  };

  const handleIcdModalDone = () => {
    if (!icdModalContext) {
      handleIcdModalClose();
      return;
    }

    if (icdModalContext.mode === "general") {
      setGeneralIcdCodes(selectedIcdCodes);
    } else {
      const { testId } = icdModalContext;
      setOrderedTests((previous) =>
        previous.map((test) =>
          test.id === testId
            ? {
                ...test,
                icdCodes: [...selectedIcdCodes],
              }
            : test
        )
      );
    }

    handleIcdModalClose();
  };

  const toggleIcdCode = (code: string) => {
    setSelectedIcdCodes((previous) =>
      previous.includes(code)
        ? previous.filter((item) => item !== code)
        : [...previous, code]
    );
  };

  const standingOrderSummary = standingOrderEnabled
    ? `Repeats ${standingFrequency} · ${standingOccurrences} occurrence(s)`
    : "Standing order disabled";

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">Lynch, Jacqueline</h1>
          <p className="text-sm text-slate-500">
            Complete the order details below.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-base font-medium text-slate-500">
          <span className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
            <CalendarDays className="h-4 w-4 text-indigo-500" />
            {dayjs().format("MMM DD, YYYY")}
          </span>
          <span className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
            <ClipboardList className="h-4 w-4 text-indigo-500" /> Status: Draft
          </span>
        </div>
      </header>

      <Section
        title="Order Information"
        subtitle="Ensure patient and collection details match requisition paperwork."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Requisition ID
            <Input
              size="large"
              placeholder="Enter requisition ID"
              value={requisitionId}
              onChange={(event) => setRequisitionId(event.target.value)}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Client
            <Select
              size="large"
              value={client}
              onChange={setClient}
              options={clientOptions}
              className="w-full"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Physician
            <Select
              size="large"
              value={physician}
              onChange={setPhysician}
              options={physicianOptions}
              className="w-full"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Collection Date and Time
            <DatePicker
              size="large"
              className="w-full"
              value={collectionDate}
              onChange={setCollectionDate}
              format="MM/DD/YYYY hh:mm A"
            />
          </label>
            <label className="text-xs font-semibold tracking-wide text-gray-600 self-center">
              <span className="flex items-center justify-between gap-3 text-sm text-gray-700">
              <span>
                Notify Me
                <div className="text-[11px] font-medium text-gray-500">
                {notifyMe ? "Enabled" : "Disabled"} Notification for this order
              </div>
              </span>
                <Switch
                  checked={notifyMe}
                  onChange={(checked) =>setNotifyMe(checked)}
                />
              </span>
            </label>
            {notifyMe && <label className="text-sm font-medium text-slate-600">
            Notify Status
            <Select
              size="large"
              value={reportStatus}
              onChange={setReportStatus}
              options={[
                { label: "Preliminary Only", value: "preliminary" },
                { label: "Final Only", value: "final" },
                { label: "Both", value: "both" },
              ]}
              className="w-full"
            />
          </label>}
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            <label className="text-xs font-semibold tracking-wide text-gray-600 self-center">
            <span className="flex items-center justify-between text-sm text-gray-700">
            <span>
              Standing Order
              <div className="text-[11px] font-medium text-gray-500">
              {standingOrderSummary}
            </div>
            </span>
              <Switch
                checked={standingOrderEnabled}
                onChange={(checked) =>setStandingOrderEnabled(checked)}
              />
            </span>
          </label>
          {standingOrderEnabled && (
            <>
            <div className="space-y-2 text-sm font-medium text-slate-600">
                <span className="mr-2">
                    Order Frequency
                </span>
              <Radio.Group
                value={standingFrequency}
                onChange={(event) => setStandingFrequency(event.target.value)}
                className="flex flex-wrap gap-3"
              >
                <Radio.Button value="daily">Daily</Radio.Button>
                <Radio.Button value="weekly">Weekly</Radio.Button>
                <Radio.Button value="biweekly">Bi-Weekly</Radio.Button>
                <Radio.Button value="monthly">Monthly</Radio.Button>
              </Radio.Group>
            </div>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                Start Date and Time
                <DatePicker
                  size="large"
                  className="w-full"
                  value={collectionDate}
                  onChange={setCollectionDate}
                  format="MM/DD/YYYY hh:mm A"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                Number of Occurrences
                <Input
                  size="large"
                  placeholder="e.g. 4"
                  value={standingOccurrences}
                  onChange={(event) => setStandingOccurrences(event.target.value)}
                />
              </label>
              </>)}
            </div>
      </Section>
     <Section
        title="Order Tests & Panels"
        subtitle="Search and add tests or panels to this order. Assign ICD codes individually or apply general codes."
      >
        <div className="space-y-5">
          {/* Search and General ICD Bar */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            <div className="flex-1">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Search Tests & Panels
                </span>
                <Select
                  size="large"
                  showSearch
                  allowClear
                  value={null}
                  placeholder="Enter test code, name, or keyword..."
                  optionFilterProp="label"
                  onChange={(value) => {
                    if (!value) return;
                    addTestPanelSelection(value);
                  }}
                  options={testPanelOptions.map((option) => ({
                    label: (
                      <div className="flex items-center gap-3 py-1">
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          option.category === 'Panel' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-teal-100 text-teal-700'
                        }`}>
                          {option.category}
                        </span>
                        <div className="flex-1">
                          <span className="font-semibold text-slate-800">{option.label}</span>
                          {option.description && (
                            <span className="ml-2 text-xs text-slate-500">· {option.description}</span>
                          )}
                        </div>
                      </div>
                    ),
                    value: option.value,
                    optionLabelProp: undefined,
                    className: "py-2",
                  }))}
                  className="w-full md:w-1/2"
                  suffixIcon={<Search className="h-4 w-4 text-slate-400" />}
                />
              </label>
            </div>
            <div className="lg:pt-6 flex justify-end">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border-2 border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-all hover:border-indigo-300 hover:bg-indigo-50"
                onClick={openGeneralIcdModal}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                  generalIcdCodes.length > 0 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {generalIcdCodes.length || '+'}
                </span>
                General ICD Codes
              </button>
            </div>
          </div>

          {/* General ICD Codes Display */}
          {generalIcdCodes.length > 0 && (
            <div className="flex items-center gap-3 rounded-lg border-l-4 border-indigo-500 bg-indigo-50 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600">
                <ClipboardList className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-900">
                  Default ICD Codes for All Tests
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {generalIcdCodes.map((code) => (
                    <span
                      key={code}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-0.5 text-xs font-semibold text-indigo-700 shadow-sm"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Ordered Items ({orderedTests.length})
              </span>
            </div>
          </div>

          {/* Ordered Tests Table/List */}
          {orderedTests.length !== 0 &&  (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <div className="min-w-[800px]">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3">
                  <div className="col-span-1 text-xs font-bold uppercase tracking-wider text-slate-600">#</div>
                  <div className="col-span-5 text-xs font-bold uppercase tracking-wider text-slate-600">Test / Panel</div>
                  <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-600">ICD Codes</div>
                  <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-600 text-right">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-slate-100 bg-white">
                  {orderedTests.map((test, index) => (
                    <div
                      key={test.id}
                      className="grid grid-cols-12 gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                    >
                      {/* Number */}
                      <div className="col-span-1 flex items-start pt-0.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                          {index + 1}
                        </span>
                      </div>

                      {/* Test Info */}
                      <div className="col-span-5 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            test.type === 'panel' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-teal-100 text-teal-700'
                          }`}>
                            {test.type}
                          </span>
                          <p className="font-semibold text-slate-900">{test.label}</p>
                        </div>
                        {test.description && (
                          <p className="text-xs text-slate-500">{test.description}</p>
                        )}
                      </div>

                      {/* ICD Codes Status */}
                      <div className="col-span-3 flex items-start pt-0.5">
                        {test.icdCodes.length > 0 ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                              <span className="text-xs font-semibold text-slate-700">
                                {test.icdCodes.length} Assigned
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {test.icdCodes.map((code) => (
                                <span
                                  key={`${test.id}-${code}`}
                                  className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                                >
                                  {code}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                            <span className="text-xs font-medium text-slate-600">
                              {generalIcdCodes.length > 0 ? 'Using general codes' : 'No codes assigned'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="col-span-3 flex items-start justify-end gap-2 pt-0.5">
                        <button
                          type="button"
                          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                          onClick={() => openTestIcdModal(test.id)}
                        >
                          {test.icdCodes.length > 0 ? `Edit ICD (${test.icdCodes.length})` : 'Add ICD'}
                        </button>
                        <button
                          type="button"
                          className="rounded-md border border-rose-200 bg-rose-50 p-1.5 text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-100"
                          onClick={() => removeTest(test.id)}
                          title="Remove test"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div className="space-y-2 pt-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Additional Notes & Instructions
              </span>
              <TextArea
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add special handling instructions, clinical notes, or important details for lab processing..."
                className="md:!w-1/2 !rounded-lg !border-slate-200 !text-sm placeholder:text-slate-400 focus:!border-indigo-300 focus:!ring-2 focus:!ring-indigo-100"
              />
            </label>
          </div>
        </div>
      </Section>

      <footer className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-700"
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-lg border border-indigo-200 px-5 py-2 text-sm font-semibold text-indigo-600 transition hover:border-indigo-300 hover:text-indigo-700"
        >
          Draft
        </button>
        <button
          type="button"
          className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
        >
          Submit
        </button>
      </footer>

      <Modal
  title={icdModalContext?.mode === "test" ? `ICD Codes · ${icdModalContext.testLabel}` : "General ICD Codes"}
  classNames={{
    container: "!p-0 [&_.ant-modal-close]:!text-white",
    header: "bg-app-primary !p-4",
    title: "!text-white",
    body: "!px-4",
    footer: "!px-4 !pb-4",
  }}
  open={icdModalOpen}
  onCancel={handleIcdModalClose}
  width={640}
  footer={[
    <Button
      key="clear"
      onClick={() => setSelectedIcdCodes([])}
      size="large"
      className="!rounded-lg !font-medium"
    >
      Clear
    </Button>,
    <Button
      key="done"
      type="primary"
      onClick={handleIcdModalDone}
      size="large"
      className="!rounded-lg !font-medium btn-primary border-none hover:shadow-lg"
    >
      Done
    </Button>,
  ]}
>
  <div className="space-y-4 py-4">
    {/* Enhanced Search Bar */}
    <div className="relative">
      <Input
        size="large"
        placeholder="Search by code or description..."
        value={icdSearch}
        onChange={(event) => setIcdSearch(event.target.value)}
        prefix={<Search className="h-4 w-4 text-slate-400" />}
        suffix={
          icdSearch && (
            <button
              onClick={() => setIcdSearch("")}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )
        }
        className="!rounded-xl !border-slate-300 !shadow-sm hover:!border-indigo-400 focus:!border-indigo-500 transition-all"
      />
      {filteredIcdOptions.length > 0 && (
        <div className="mt-2 text-xs text-slate-500">
          {filteredIcdOptions.length} code{filteredIcdOptions.length !== 1 ? "s" : ""} found
        </div>
      )}
    </div>

    {/* Enhanced Results List */}
    <div className="max-h-72 space-y-2.5 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
      {filteredIcdOptions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Search className="h-7 w-7 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-900">No ICD codes found</p>
          <p className="mt-1 text-xs text-slate-500">Adjust your search and try again</p>
        </div>
      ) : (
        filteredIcdOptions.map((option) => {
          const isSelected = selectedIcdCodes.includes(option.code);
          return (
            <label
              key={option.code}
              className={`
                group flex cursor-pointer items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 transition-all
                ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 hover:shadow-sm"
                }
              `}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-700"
                    }`}
                  >
                    {option.code}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {option.description}
                </p>
              </div>
              <Checkbox
                checked={isSelected}
                onChange={() => toggleIcdCode(option.code)}
                className="flex-shrink-0"
              />
            </label>
          );
        })
      )}
    </div>

    {/* Enhanced Selected Summary */}
    {selectedIcdCodes.length > 0 && (
      <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
            <Check className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <span className="text-sm font-semibold text-indigo-900">
            {selectedIcdCodes.length} Code{selectedIcdCodes.length !== 1 ? "s" : ""} Selected
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedIcdCodes.map((code) => (
            <span
              key={code}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-indigo-700 shadow-sm ring-1 ring-indigo-200"
            >
              {code}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleIcdCode(code);
                }}
                className="text-indigo-400 hover:text-indigo-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
</Modal>
    </div>
  );
};

export default CreateOrder;