import React from "react";
import AddSeries from "./AddSeries/AddSeries";
import AllSeries from "./AllSeries/AllSeries";


export default function Series() {
  return (
    <div className="series">
      <AddSeries />
      <AllSeries/>
    </div>
  );
}
