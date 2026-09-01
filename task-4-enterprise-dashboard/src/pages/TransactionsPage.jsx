import React, { useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { DataTable } from "../components/DataTable";
import { useTable } from "../hooks";
import { transactionsTableData } from "../data/mockData";
import { formatCurrency, formatDate } from "../utils/helpers";
import "./TransactionsPage.css";

/**
 * TransactionsPage - Transaction management page
 */
export const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const tableState = useTable(transactionsTableData, "date");

  // Filter by status
  const filteredByStatus =
    statusFilter === "All"
      ? tableState.data
      : tableState.data.filter((t) => t.status === statusFilter);

  const columns = [
    { key: "id", label: "Transaction ID" },
    { key: "customer", label: "Customer" },
    {
      key: "date",
      label: "Date",
      render: (value) => formatDate(value),
    },
    {
      key: "amount",
      label: "Amount",
      render: (value) => formatCurrency(value),
    },
    { key: "status", label: "Status" },
    { key: "method", label: "Method" },
  ];

  const stats = {
    total: transactionsTableData.length,
    completed: transactionsTableData.filter((t) => t.status === "Completed")
      .length,
    pending: transactionsTableData.filter((t) => t.status === "Pending").length,
    failed: transactionsTableData.filter((t) => t.status === "Failed").length,
    revenue: transactionsTableData
      .filter((t) => t.status === "Completed")
      .reduce((acc, t) => acc + t.amount, 0),
  };

  return (
    <AdminLayout title="Transactions Management">
      <div className="transactions-page">
        <div className="page-header">
          <h1 className="page-title">Transactions</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search transactions..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                tableState.handleFilter(e.target.value, "customer");
              }}
            />
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Total Transactions</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completed</span>
            <span className="stat-value" style={{ color: "#3b82f6" }}>
              {stats.completed}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Pending</span>
            <span className="stat-value" style={{ color: "#f59e0b" }}>
              {stats.pending}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Failed</span>
            <span className="stat-value" style={{ color: "#ef4444" }}>
              {stats.failed}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">
              PKR {(stats.revenue / 1000).toFixed(1)}K
            </span>
          </div>
        </div>

        <div className="filters-bar">
          <span className="filter-label">Filter by Status:</span>
          {["All", "Completed", "Pending", "Failed"].map((status) => (
            <button
              key={status}
              className={`filter-btn ${statusFilter === status ? "active" : ""}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="table-card">
          <DataTable
            columns={columns}
            data={filteredByStatus}
            onSort={tableState.handleSort}
            sortKey={tableState.sortKey}
            sortOrder={tableState.sortOrder}
          />
        </div>
      </div>
    </AdminLayout>
  );
};
