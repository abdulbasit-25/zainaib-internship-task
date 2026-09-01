import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import "./AdminLayout.css";

/**
 * AdminLayout - Main layout wrapper for authenticated pages
 */
export const AdminLayout = ({ children, title, isLive = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="admin-wrapper">
        <Navbar
          title={title}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isLive={isLive}
        />

        <main className="admin-content">{children}</main>

        <footer className="app-footer">
          <p>Made By Zainab faraz</p>
        </footer>
      </div>
    </div>
  );
};
