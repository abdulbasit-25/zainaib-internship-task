import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import "./AdminLayout.css";

/**
 * AdminLayout - Main layout wrapper for authenticated pages
 */
export const AdminLayout = ({ children, title, isLive = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("novaops-theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("novaops-theme", theme);
  }, [theme]);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="admin-wrapper">
        <Navbar
          title={title}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isLive={isLive}
          theme={theme}
          onToggleTheme={() =>
            setTheme((currentTheme) =>
              currentTheme === "light" ? "dark" : "light",
            )
          }
        />

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};
