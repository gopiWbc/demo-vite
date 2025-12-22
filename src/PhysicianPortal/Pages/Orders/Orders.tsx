import { useState } from "react";
import AppTabs from "../../../PatientPortal-V3/Protected/components/AppTabs";
import OrderList from "./tabs/OrderList";



const Orders = () => {
  const [activeTab, setActiveTab] = useState("view-orders");


  const tabs = [
    { key: "create-order", label: "Create Order" },
    { key: "view-orders", label: "View Orders" },
    { key: "psc-orders", label: "PSC Orders" },
    { key: "standing-orders", label: "Standing" },
  ];

  return (
    <div className="space-y-6">

      <AppTabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

      {activeTab === "view-orders" ? (
        <OrderList/>
      ) : (
        <OrderList/>
      )}
    </div>
  );
};

export default Orders;