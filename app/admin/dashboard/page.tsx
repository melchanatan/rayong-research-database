"use client";
import ResearchListView from "@/components/ResearchListView";
import React, { useState } from "react";

const DashboardPage = () => {
  const [researches, setResearhes] = useState(["sd", "sd", "sd"]);
  return (
    <div className="main-container py-[7vh] h-screen flex flex-col gap-2">
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>

      {researches.map((research) => (
        <ResearchListView
          research={research}
          tagName={"sd"}
          id={"yes"}
          admin={true}
        ></ResearchListView>
      ))}
    </div>
  );
};

export default DashboardPage;
