import { useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Select } from "antd";
import { CircleCheck, LayoutGrid, List as ListIcon, Plus, Search, ShoppingCart, Trash2, Package } from "lucide-react";

import AppTable from "../../Components/AppTable";

type SupplyItem = {
  id: string;
  name: string;
  category: string;
  code: string;
  description: string;
  image: string;
};

const clients = [
  { label: "City Medical Center", value: "city-medical" },
  { label: "Evergreen Clinic", value: "evergreen" },
  { label: "Sunrise Health", value: "sunrise" },
];

const supplyFilters = [
  { key: "all", label: "All Supplies" },
  { key: "kits", label: "Kits" },
  { key: "swabs", label: "Swabs" },
  { key: "containers", label: "Containers" },
];

const supplies: SupplyItem[] = [
  {
    id: "kit-std",
    name: "Standard Collection Kit",
    category: "Kits",
    code: "KIT-STD",
    description: "Comprehensive phlebotomy kit with collection tubes and swabs.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "cnt-ur",
    name: "Urine Container 50ml",
    category: "Containers",
    code: "CNT-UR",
    description: "Sterile 50ml containers sealed for urine specimen transport.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "kit-flu",
    name: "Influenza Nasal Swab Kit",
    category: "Swabs",
    code: "KIT-FLU",
    description: "Soft-tipped nasal swabs with transport medium for flu panels.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "kit-blood",
    name: "Blood Collection Set",
    category: "Kits",
    code: "KIT-BLD",
    description: "Butterfly needles, tubes, and holders for blood collection.",
    image: "https://images.unsplash.com/photo-1581391492920-44d612196ad6?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "cnt-bio",
    name: "Biohazard Transport Bag",
    category: "Containers",
    code: "CNT-BIO",
    description: "Zippered transport bags with absorbent liner for bio specimens.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=160&q=80",
  },
];

const SupplyOrderCreate = () => {
  const [selectedClient, setSelectedClient] = useState<string | undefined>(clients[0]?.value);
  const [orderedBy, setOrderedBy] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredSupplies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return supplies.filter((item) => {
      const matchesFilter =
        activeFilter === "all" || item.category.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const handleAddToCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id];
      if (current && current > 0) {
        return { ...prev, [id]: current };
      }
      return { ...prev, [id]: 1 };
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const handleCartQuantityChange = (id: string, qtyValue: number | null) => {
    const qty = Math.max(1, Number(qtyValue) || 1);
    setCart((prev) => ({ ...prev, [id]: qty }));
  };

  const cartEntries = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const item = supplies.find((supply) => supply.id === id);
        if (!item) return null;
        return { item, qty };
      })
      .filter(Boolean) as { item: SupplyItem; qty: number }[];
  }, [cart]);

  const listColumns = useMemo(
    () => [
      {
        title: "Item No.",
        dataIndex: "code",
        key: "code",
        width: 100,
        render: (code: string) => (
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 sm:text-sm">
            #{code}
          </div>
        ),
      },
      {
        title: "Supply",
        dataIndex: "name",
        key: "name",
        render: (_: string, item: SupplyItem) => (
          <div className="flex min-w-0 items-start gap-2 sm:gap-3">
            <div className="relative h-12 w-12 flex-shrink-0 sm:h-16 sm:w-16">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-full w-full rounded-lg object-cover ring-1 ring-gray-200" 
              />
            </div>
            <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
              <div className="text-xs font-semibold text-gray-900 leading-tight break-words sm:text-sm">{item.name}</div>
              <p className="hidden text-xs leading-relaxed text-gray-600 break-words sm:block">
                {item.description}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 110,
        render: (category: string) => (
          <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 sm:px-3 sm:py-1.5">
            {category}
          </span>
        ),
      },
      {
        title: "",
        key: "actions",
        width: 60,
        fixed: "right" as "right",
        render: (_: string, item: SupplyItem) => {
          const inCart = Boolean(cart[item.id]);
          return (
            <Button
              size="small"
              type="primary"
              className="btn-primary flex items-center justify-center rounded-lg h-8 w-8 !p-0 sm:h-10 sm:w-10"
              onClick={() => handleAddToCart(item.id)}
              icon={inCart ? <CircleCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            />
          );
        },
      },
    ],
    [cart],
  );

  const effectiveViewMode = isMobile ? "grid" : viewMode;

  return (
    <>
      {/* Mobile Cart Badge - Shows only on mobile when cart has items */}
      {cartEntries.length > 0 && (
        <div className="lg:hidden fixed bottom-8 right-4 z-50">
          <button
            onClick={() => {
              const cartSection = document.getElementById("cart-section");
              cartSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 btn-primary text-white rounded-full px-4 py-3 shadow-lg hover:bg-indigo-700 transition-all"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="font-bold">{cartEntries.length}</span>
          </button>
        </div>
      )}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] space-y-4 sm:space-y-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
            <div className="mb-4 sm:mb-6 flex flex-col gap-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Browse Supplies</h2>
              <p className="text-xs sm:text-sm text-gray-500">Search and add collection materials to your order.</p>
            </div>
            {/* Search and View Toggle */}
            <div className="flex flex-col gap-3 mb-4 sm:gap-4 sm:mb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 w-full">
                <Input
                  prefix={
                    <Search className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
                  }
                  size="large"
                  placeholder="Search supplies..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="rounded-lg w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex w-full rounded-lg border border-gray-300 bg-gray-50 p-0.5 sm:p-1 sm:w-auto">
                  {!isMobile && (
                    <button
                      type="button"
                      className={`flex-1 px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all rounded-md ${
                        effectiveViewMode === "list"
                          ? "bg-white text-indigo-700 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setViewMode("list")}
                    >
                      <ListIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden xs:inline">List</span>
                    </button>
                  )}
                  <button
                    type="button"
                    className={`flex-1 px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all rounded-md ${
                      effectiveViewMode === "grid"
                        ? "bg-white text-indigo-700 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Grid</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex overflow-x-auto gap-2 mb-4 pb-2 sm:mb-6 sm:flex-wrap">
              {supplyFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`
        flex-shrink-0 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all
        ${
          activeFilter === filter.key
            ? "bg-app-primary text-white shadow-sm"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
        }
      `}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Results */}
            {effectiveViewMode === "list" ? (
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <AppTable<SupplyItem>
                  columns={listColumns}
                  data={filteredSupplies}
                  rowKey="id"
                  pagination={{ pageSize: 5, hideOnSinglePage: true }}
                  showCheckbox={false}
                />
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredSupplies.map((item) => {
                  const inCart = Boolean(cart[item.id]);
                  return (
                    <Card
                      key={item.id}
                      className="border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover ring-1 ring-gray-200"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                            #{item.code}
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2 sm:text-base">
                            {item.name}
                          </h3>
                          <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 sm:px-2.5 sm:py-1">
                            {item.category}
                          </span>
                          <p className="hidden text-xs text-gray-600 leading-relaxed line-clamp-2 sm:block">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex shrink-0">
                          <Button
                            size="middle"
                            type="primary"
                            className={`btn-primary flex h-9 w-9 items-center justify-center rounded-lg !p-0 sm:h-10 sm:w-10 ${
                              inCart
                                ? "!bg-indigo-700 hover:!bg-indigo-800"
                                : ""
                            }`}
                            icon={
                              inCart ? (
                                <CircleCheck className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )
                            }
                            onClick={() => handleAddToCart(item.id)}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div id="cart-section" className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 lg:sticky lg:top-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Order Details</h2>
              <p className="text-xs sm:text-sm text-gray-500">Confirm client information and review items before submitting.</p>
            </div>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2 uppercase tracking-wide">
                  Client
                </label>
                <Select
                  size="large"
                  className="w-full"
                  placeholder="Select client"
                  value={selectedClient}
                  onChange={setSelectedClient}
                  options={clients}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2 uppercase tracking-wide">
                  Ordered By
                </label>
                <Input
                  size="large"
                  placeholder="Enter name"
                  value={orderedBy}
                  onChange={(event) => setOrderedBy(event.target.value)}
                />
              </div>
            </div>

            {/* Cart Section */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow">
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                      Your Cart
                    </h3>
                    <p className="text-xs text-gray-600 hidden sm:block">
                      Review items before submitting
                    </p>
                  </div>
                </div>
                <div className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700 sm:px-3 sm:py-1">
                  {cartEntries.length}
                </div>
              </div>

              <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 sm:space-y-3 sm:max-h-[360px]">
                {cartEntries.length ? (
                  cartEntries.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="group relative border border-gray-200 rounded-lg p-2 bg-white hover:border-indigo-300 hover:shadow-sm transition-all sm:p-2.5"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-200 group-hover:ring-indigo-200 sm:h-14 sm:w-14"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-900 truncate leading-tight sm:text-sm">
                            {item.name}
                          </h4>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">
                            {item.code}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          <div className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-gray-200 bg-white px-1.5 py-0.5 text-xs font-medium text-gray-700 shadow-sm sm:px-2 sm:py-1 sm:text-sm">
                            <Button
                              type="text"
                              size="small"
                              className="h-5 w-5 rounded-full p-0 text-gray-500 hover:text-gray-900 sm:h-6 sm:w-6"
                              icon={
                                <span className="inline-block leading-none text-sm">
                                  –
                                </span>
                              }
                              onClick={() =>
                                handleCartQuantityChange(item.id, qty - 1)
                              }
                            />
                            <span className="min-w-[1rem] text-center sm:min-w-[1.5rem]">
                              {qty}
                            </span>
                            <Button
                              type="text"
                              size="small"
                              className="h-5 w-5 rounded-full p-0 text-gray-500 hover:text-gray-900 sm:h-6 sm:w-6"
                              icon={
                                <span className="inline-block leading-none text-sm">
                                  +
                                </span>
                              }
                              onClick={() =>
                                handleCartQuantityChange(item.id, qty + 1)
                              }
                            />
                          </div>
                          <Button
                            type="text"
                            size="small"
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors sm:h-7 sm:w-7"
                            icon={<Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-gray-200 bg-white p-8 sm:p-10 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <ShoppingCart className="h-6 w-6 text-gray-500" />
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                      Your cart is empty
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                      Start adding supplies to create an order
                    </p>

                    <button
                      type="button"
                      className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow hover:bg-indigo-700 transition-all"
                    >
                      Browse Supplies
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 sm:pt-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2 uppercase tracking-wide">
                Special Notes
              </label>
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder="Add any special instructions..."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="rounded-lg text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-4 sm:pt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <Button
                size="large"
                className="w-full font-semibold text-sm sm:text-base text-gray-700 hover:text-gray-900 hover:border-gray-400"
              >
                Cancel
              </Button>
              <Button
                size="large"
                className="w-full font-semibold text-sm sm:text-base border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Save as Draft
              </Button>
              <Button
                type="primary"
                size="large"
                className="btn-primary w-full font-semibold text-sm sm:text-base shadow-md"
                disabled={cartEntries.length === 0}
              >
                Submit Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplyOrderCreate;