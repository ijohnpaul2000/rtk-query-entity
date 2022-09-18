import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.app.isSidebarOpen);
  return (
    <div className={`${isSidebarOpen ? "sidebar" : "sidebar close"}`}>
      <div className="__header">
        <h3>Todo List</h3>
      </div>
    </div>
  );
};

export default Sidebar;
