import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LabCards from "./LabCards";
import LabDetails from "./LabDetails";
import TestOffered from "./Test-offered/TestOffered";

const AllLabs = () => {
  return (
    <>
      <div>
        <TestOffered />
      </div>
    </>
  );
};

export default AllLabs;
