import { useState, useEffect } from "react";
import { Modal, Input, Button, Badge, Checkbox } from "antd";
import { Search, ArrowRight, ArrowLeft, CircleCheck, ArrowRightFromLine, ArrowLeftToLine } from "lucide-react";

export type AssignType = "Physician" | "Sales Rep" | "Client" | "ICD Codes" | "Panel";

interface AssignPanelProps {
  open: boolean;
  onClose: () => void;
  assignType: AssignType | null;
  user: {
    id: string;
    name: string;
  } | null;
}

interface Item {
  id: string;
  label: string;
}

const MOCK_UNASSIGNED: Item[] = [
  { id: "123", label: "123 :: 123" },
  { id: "13494", label: "13494 :: 13494" },
  { id: "135", label: "135 :: 135-client" },
  { id: "Wbctester123", label: "Wbctester123 :: ajith" },
  { id: "565656", label: "565656 :: akil" },
  { id: "200", label: "200 :: Alexis" },
  { id: "98989", label: "98989 :: Amelia" },
  { id: "11622", label: "11622 :: Ancrew" },
  { id: "CT0012", label: "CT0012 :: Angelina" },
  { id: "CLNT890", label: "CLNT890 :: ANITHASHREEJOEL" },
  { id: "CLID12", label: "CLID12 :: Anjal" },
  { id: "13131", label: "13131 :: Anthony" },
  { id: "35353", label: "35353 :: Anthony" },
  { id: "65656", label: "65656 :: Anthony" },
  { id: "78", label: "78 :: Anula" },
];

const MOCK_ASSIGNED: Item[] = [];

export default function AssignPanel({ open, onClose, assignType, user }: AssignPanelProps) {
  const [unassigned, setUnassigned] = useState<Item[]>(MOCK_UNASSIGNED);
  const [assigned, setAssigned] = useState<Item[]>(MOCK_ASSIGNED);
  const [selectedUnassigned, setSelectedUnassigned] = useState<string[]>([]);
  const [selectedAssigned, setSelectedAssigned] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open) {
      setUnassigned(MOCK_UNASSIGNED);
      setAssigned(MOCK_ASSIGNED);
      setSelectedUnassigned([]);
      setSelectedAssigned([]);
      setSearchQuery("");
    }
  }, [open]);

  const handleMoveRight = () => {
    const itemsToMove = unassigned.filter((item) => selectedUnassigned.includes(item.id));
    setAssigned([...assigned, ...itemsToMove]);
    setUnassigned(unassigned.filter((item) => !selectedUnassigned.includes(item.id)));
    setSelectedUnassigned([]);
  };

  const handleMoveLeft = () => {
    const itemsToMove = assigned.filter((item) => selectedAssigned.includes(item.id));
    setUnassigned([...unassigned, ...itemsToMove]);
    setAssigned(assigned.filter((item) => !selectedAssigned.includes(item.id)));
    setSelectedAssigned([]);
  };

  const handleMoveAllRight = () => {
    const visibleItems = filteredUnassigned;
    setAssigned([...assigned, ...visibleItems]);
    setUnassigned(unassigned.filter((item) => !visibleItems.find(v => v.id === item.id)));
    setSelectedUnassigned([]);
  };

  const handleMoveAllLeft = () => {
    const visibleItems = filteredAssigned;
    setUnassigned([...unassigned, ...visibleItems]);
    setAssigned(assigned.filter((item) => !visibleItems.find(v => v.id === item.id)));
    setSelectedAssigned([]);
  };

  const toggleSelection = (id: string, listType: "unassigned" | "assigned") => {
    if (listType === "unassigned") {
      setSelectedUnassigned((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setSelectedAssigned((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
  };

  const toggleSelectAll = (listType: "unassigned" | "assigned") => {
    if (listType === "unassigned") {
      if (selectedUnassigned.length === filteredUnassigned.length) {
        setSelectedUnassigned([]);
      } else {
        setSelectedUnassigned(filteredUnassigned.map(item => item.id));
      }
    } else {
      if (selectedAssigned.length === filteredAssigned.length) {
        setSelectedAssigned([]);
      } else {
        setSelectedAssigned(filteredAssigned.map(item => item.id));
      }
    }
  };

  const filteredUnassigned = unassigned.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return item.label.toLowerCase().includes(searchLower);
  });

  const filteredAssigned = assigned.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return item.label.toLowerCase().includes(searchLower);
  });

  const title = assignType ? `Assign ${assignType}` : "Assign";

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={900}
      title={
        <div className="flex items-center gap-2 text-lg font-semibold">
          {title}
          <span className="text-sm font-normal ml-2">
             for {user?.name}
          </span>
        </div>
      }
      centered
      classNames={{
        container: "!p-0 [&_.ant-modal-close]:!text-white",
        header: "bg-app-primary !p-4",
        title: "!text-white",
        body: "!px-4",
        footer: "!px-4 !pb-4",
      }}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          size="large"
          className="!rounded-lg !font-medium"
        >
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={onClose}
          size="large"
          className="!rounded-lg !font-medium btn-primary border-none hover:shadow-lg"
        >
          Save Changes
        </Button>,
      ]}
    >
      <div className="flex flex-col h-[65vh]">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <Input
            placeholder="Search by ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search className="h-4 w-4 text-gray-400" />}
            allowClear
            className="rounded-lg"
          />
        </div>

        {/* Transfer Area */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 h-full">
            
            {/* Unassigned List */}
            <div className="flex flex-col border-2 border-gray-200 rounded-xl overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b-2 border-gray-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800">Available</span>
                <div className="flex items-center gap-3">
                   {filteredUnassigned.length > 0 && (
                    <Checkbox
                      checked={selectedUnassigned.length === filteredUnassigned.length && filteredUnassigned.length > 0}
                      indeterminate={selectedUnassigned.length > 0 && selectedUnassigned.length < filteredUnassigned.length}
                      onChange={() => toggleSelectAll("unassigned")}
                      className="text-xs font-medium"
                    >
                      <span className="text-xs font-medium text-gray-700">Select All</span>
                    </Checkbox>
                  )}
                  <Badge 
                    count={filteredUnassigned.length} 
                    showZero 
                    className="[&_.ant-badge-count]:!bg-gradient-to-r [&_.ant-badge-count]:!from-gray-600 [&_.ant-badge-count]:!to-gray-700 [&_.ant-badge-count]:!text-white [&_.ant-badge-count]:!font-semibold [&_.ant-badge-count]:!px-2.5 [&_.ant-badge-count]:!shadow-md"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gradient-to-b from-white to-gray-50/30">
                {filteredUnassigned.map((item) => {
                  const isSelected = selectedUnassigned.includes(item.id);
                  const [id, name] = item.label.split(" :: ");
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelection(item.id, "unassigned")}
                      className={`
                        group relative flex items-start gap-3 px-3.5 py-1 rounded-lg cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 shadow-md scale-[1.02] py-1" 
                          : "bg-white border-2 border-transparent hover:border-gray-300 hover:shadow-md hover:scale-[1.01]"
                        }
                      `}
                    >
                      <div className={`flex-1 min-w-0`}>
                        <p className={`font-semibold text-sm mb-0.5 ${isSelected ? "text-indigo-900" : "text-gray-800"}`}>
                          {id} - <span className={`text-xs truncate ${isSelected ? "text-indigo-700" : "text-gray-500"}`}>
                          {name}
                        </span>
                        </p>
                      
                      </div>
                      {isSelected && (
                        <div className="flex-shrink-0 ">
                            <CircleCheck className="size-5 text-indigo-700" />
                        </div>
                      )}
                    </div>
                  );
                })}
                {filteredUnassigned.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <Search className="w-7 h-7 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">No items found</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col justify-center gap-2.5">
              <Button 
                icon={<ArrowRightFromLine size={18} />} 
                onClick={handleMoveAllRight}
                disabled={filteredUnassigned.length === 0}
                title="Move All Right"
                className="!h-11 !w-11 !rounded-xl !font-medium hover:shadow-lg hover:scale-110 transition-all !border-2"
              />
              <Button 
                icon={<ArrowRight size={18} />} 
                type={selectedUnassigned.length > 0 ? "primary" : "default"}
                onClick={handleMoveRight}
                disabled={selectedUnassigned.length === 0}
                title="Move Selected Right"
                className={`!h-11 !w-11 !rounded-xl !font-medium transition-all !border-2 ${selectedUnassigned.length > 0 ? 'btn-primary border-none hover:shadow-xl hover:scale-110' : 'hover:shadow-lg hover:scale-110'}`}
              />
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1" />
              <Button 
                icon={<ArrowLeft size={18} />} 
                type={selectedAssigned.length > 0 ? "primary" : "default"}
                onClick={handleMoveLeft}
                disabled={selectedAssigned.length === 0}
                title="Move Selected Left"
                className={`!h-11 !w-11 !rounded-xl !font-medium transition-all !border-2 ${selectedAssigned.length > 0 ? 'btn-primary border-none hover:shadow-xl hover:scale-110' : 'hover:shadow-lg hover:scale-110'}`}
              />
              <Button 
                icon={<ArrowLeftToLine size={18} />} 
                onClick={handleMoveAllLeft}
                disabled={filteredAssigned.length === 0}
                title="Move All Left"
                className="!h-11 !w-11 !rounded-xl !font-medium hover:shadow-lg hover:scale-110 transition-all !border-2"
              />
            </div>

            {/* Assigned List */}
            <div className="flex flex-col border-2 border-gray-200 rounded-xl overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b-2 border-gray-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800">Assigned</span>
                <div className="flex items-center gap-3">
                   {filteredAssigned.length > 0 && (
                    <Checkbox
                      checked={selectedAssigned.length === filteredAssigned.length && filteredAssigned.length > 0}
                      indeterminate={selectedAssigned.length > 0 && selectedAssigned.length < filteredAssigned.length}
                      onChange={() => toggleSelectAll("assigned")}
                      className="text-xs font-medium"
                    >
                      <span className="text-xs font-medium text-gray-700">Select All</span>
                    </Checkbox>
                  )}
                  <Badge 
                    count={filteredAssigned.length} 
                    showZero 
                    className="[&_.ant-badge-count]:!bg-gradient-to-r [&_.ant-badge-count]:!from-gray-600 [&_.ant-badge-count]:!to-gray-700 [&_.ant-badge-count]:!text-white [&_.ant-badge-count]:!font-semibold [&_.ant-badge-count]:!px-2.5 [&_.ant-badge-count]:!shadow-md"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gradient-to-b from-white to-gray-50/30">
                {filteredAssigned.map((item) => {
                  const isSelected = selectedAssigned.includes(item.id);
                  const [id, name] = item.label.split(" :: ");
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelection(item.id, "assigned")}
                      className={`
                        group relative flex items-start gap-3 px-3.5 py-1 rounded-lg cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 shadow-md scale-[1.02] py-1" 
                          : "bg-white border-2 border-transparent hover:border-gray-300 hover:shadow-md hover:scale-[1.01]"
                        }
                      `}
                    >
                      <div className={`flex-1 min-w-0`}>
                        <p className={`font-semibold text-sm mb-0.5 ${isSelected ? "text-indigo-900" : "text-gray-800"}`}>
                          {id} - <span className={`text-xs truncate ${isSelected ? "text-indigo-700" : "text-gray-500"}`}>
                          {name}
                        </span>
                        </p>
                      
                      </div>
                      {isSelected && (
                        <div className="flex-shrink-0 ">
                            <CircleCheck className="size-5 text-indigo-700" />
                        </div>
                      )}
                    </div>
                  );
                })}
                {filteredAssigned.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <CircleCheck className="w-7 h-7 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">No items assigned</p>
                    <p className="text-xs text-gray-400 mt-1">Move items from available list</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </Modal>
  );
}