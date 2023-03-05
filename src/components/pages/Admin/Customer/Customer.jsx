import React from "react";
import ContactUser from "./ContactUser/ContactUser";
import "./Customer.scss";
import CustomerTable from "./CustomerTable/CustomerTable";

export default function Customer() {
  return <div className="customer">
   <CustomerTable/>
   <ContactUser/>
  </div>;
}
