import React, { useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { DataTable } from "../components/DataTable";
import { useTable } from "../hooks";
import { usersTableData } from "../data/mockData";
import "./UsersPage.css";

/**
 * UsersPage - User management page
 */
export const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const tableState = useTable(usersTableData, "name");

  const columns = [
    {
      key: "avatar",
      label: "Avatar",
      render: (value) => (
        <img
          src={value}
          alt="User"
          style={{ width: 32, height: 32, borderRadius: "50%" }}
        />
      ),
    },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "lastActive", label: "Last Active" },
  ];

  return (
    <AdminLayout title="Users Management">
      <div className="users-page">
        <div className="page-header">
          <h1 className="page-title">Users</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                tableState.handleFilter(e.target.value, "name");
              }}
            />
            <button className="btn-primary">+ Add User</button>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{usersTableData.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Active</span>
            <span className="stat-value" style={{ color: "#10b981" }}>
              {usersTableData.filter((u) => u.status === "Active").length}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Inactive</span>
            <span className="stat-value" style={{ color: "#ef4444" }}>
              {usersTableData.filter((u) => u.status === "Inactive").length}
            </span>
          </div>
        </div>

        <div className="table-card">
          <DataTable
            columns={columns}
            data={tableState.data}
            onSort={tableState.handleSort}
            sortKey={tableState.sortKey}
            sortOrder={tableState.sortOrder}
          />
        </div>
      </div>
    </AdminLayout>
  );
};
