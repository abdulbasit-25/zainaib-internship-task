import React from "react";
import { getStatusColor, getStatusBgColor } from "../utils/helpers";
import "./DataTable.css";

/**
 * DataTable - Reusable table component with sorting and filtering
 */
export const DataTable = ({
  columns,
  data,
  onSort,
  sortKey,
  sortOrder,
  onFilter,
  searchValue,
  loading = false,
  emptyMessage = "No data available",
}) => {
  const renderCell = (item, column) => {
    const value = item[column.key];

    // Custom renderers
    if (column.render) {
      return column.render(value, item);
    }

    // Status badge
    if (column.key === "status") {
      return (
        <span
          className="status-badge"
          style={{
            backgroundColor: getStatusBgColor(value),
            color: getStatusColor(value),
          }}
        >
          {value}
        </span>
      );
    }

    // Avatar
    if (column.key === "avatar") {
      return <img src={value} alt="avatar" className="table-avatar" />;
    }

    return value;
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} onClick={() => onSort && onSort(column.key)}>
                <div className="column-header">
                  <span>{column.label}</span>
                  {onSort && sortKey === column.key && (
                    <span className="sort-indicator">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index}>
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`}>
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
