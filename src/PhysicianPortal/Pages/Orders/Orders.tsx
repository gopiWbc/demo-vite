import { useState } from "react";
import AppTabs from "../../../PatientPortal-V3/Protected/components/AppTabs";
import OrderList from "./tabs/OrderList";
import SearchPatient from "./Create/SearchPatient";



const Orders = () => {
  const [activeTab, setActiveTab] = useState("create-order");


  const tabs = [
    { key: "create-order", label: "New Order" },
    { key: "view-orders", label: "View Orders" },
    { key: "psc-orders", label: "PSC Orders" },
    { key: "standing-orders", label: "Standing Orders" },
  ];

  return (
    <div className="space-y-6">

      <AppTabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

      {activeTab === "view-orders" ? (
        <OrderList/>
      ) : activeTab === "create-order" ? (
        <SearchPatient/>
      ) : (
        <OrderList/>
      )}
    </div>
  );
};

export default Orders;