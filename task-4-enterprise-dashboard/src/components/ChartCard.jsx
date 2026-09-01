import React from "react";
import "./ChartCard.css";

/**
 * ChartCard - Wrapper for chart components
 */
export const ChartCard = ({ title, children, loading = false }) => {
  return (
    <div className="chart-card fade-in">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
      </div>
      <div className="chart-content">
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div className="spinner"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
