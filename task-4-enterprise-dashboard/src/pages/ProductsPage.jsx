import React, { useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { DataTable } from "../components/DataTable";
import { useTable } from "../hooks";
import { productsTableData } from "../data/mockData";
import { formatCurrency } from "../utils/helpers";
import "./ProductsPage.css";

/**
 * ProductsPage - Product management page
 */
export const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const tableState = useTable(productsTableData, "name");

  const columns = [
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (value) => formatCurrency(value),
    },
    { key: "stock", label: "Stock" },
    { key: "sales", label: "Sales" },
    { key: "status", label: "Status" },
  ];

  return (
    <AdminLayout title="Products Management">
      <div className="products-page">
        <div className="page-header">
          <h1 className="page-title">Products</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                tableState.handleFilter(e.target.value, "name");
              }}
            />
            <button className="btn-primary">+ Add Product</button>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{productsTableData.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Value</span>
            <span className="stat-value">
              $
              {(
                productsTableData.reduce(
                  (acc, p) => acc + p.price * p.stock,
                  0,
                ) / 1000
              ).toFixed(1)}
              K
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Sales</span>
            <span className="stat-value">
              {productsTableData
                .reduce((acc, p) => acc + p.sales, 0)
                .toLocaleString()}
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
