import React, { useState, useEffect } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import { MetricCard } from "../components/MetricCard";
import { ChartCard } from "../components/ChartCard";
import { DataTable } from "../components/DataTable";
import { useTable } from "../hooks";
import {
  startMetricsStream,
  getMetricsWithChange,
  initialMetrics,
} from "../services/mockApiService";
import {
  activityFeed,
  initialMetrics as mockInitialMetrics,
} from "../data/mockData";
import "./DashboardPage.css";

/**
 * DashboardPage - Main dashboard with real-time metrics
 */
export const DashboardPage = () => {
  const [metrics, setMetrics] = useState(mockInitialMetrics);
  const [isLive, setIsLive] = useState(true);

  // Start metrics stream on component mount
  useEffect(() => {
    const cleanup = startMetricsStream(setMetrics, 3000);
    return cleanup;
  }, []);

  // Get metrics with change indicators
  const metricsDisplay = getMetricsWithChange(metrics, initialMetrics);

  // Setup activity table
  const activityTable = useTable(activityFeed, "id");

  const activityColumns = [
    { key: "type", label: "Type" },
    { key: "message", label: "Message" },
    { key: "timestamp", label: "Time" },
  ];

  const renderActivityRow = (value, item) => {
    if (item.type === "sale") return "💰 Sale";
    if (item.type === "user") return "👤 User";
    if (item.type === "alert") return "⚠️ Alert";
    if (item.type === "system") return "✓ System";
    return value;
  };

  return (
    <AdminLayout title="Dashboard" isLive={isLive}>
      <div className="dashboard-page">
        {/* Metrics Grid */}
        <div className="metrics-grid">
          <MetricCard
            title="Total Revenue"
            value={metricsDisplay.totalRevenue.value}
            change={metricsDisplay.totalRevenue.change}
            icon={metricsDisplay.totalRevenue.icon}
            isPositive={parseFloat(metricsDisplay.totalRevenue.change) >= 0}
          />
          <MetricCard
            title="Active Users"
            value={metricsDisplay.activeUsers.value}
            change={metricsDisplay.activeUsers.change}
            icon={metricsDisplay.activeUsers.icon}
            isPositive={parseFloat(metricsDisplay.activeUsers.change) >= 0}
          />
          <MetricCard
            title="Total Orders"
            value={metricsDisplay.totalOrders.value}
            change={metricsDisplay.totalOrders.change}
            icon={metricsDisplay.totalOrders.icon}
            isPositive={parseFloat(metricsDisplay.totalOrders.change) >= 0}
          />
          <MetricCard
            title="Conversion Rate"
            value={metricsDisplay.conversionRate.value}
            change={metricsDisplay.conversionRate.change}
            icon={metricsDisplay.conversionRate.icon}
            isPositive={parseFloat(metricsDisplay.conversionRate.change) >= 0}
          />
          <MetricCard
            title="System Performance"
            value={metricsDisplay.systemPerformance.value}
            change={metricsDisplay.systemPerformance.change}
            icon={metricsDisplay.systemPerformance.icon}
            isPositive={
              parseFloat(metricsDisplay.systemPerformance.change) >= 0
            }
          />
        </div>

        {/* Activity Feed */}
        <div className="activity-section">
          <h2 className="section-title">Recent Activity</h2>
          <DataTable
            columns={[
              { key: "icon", label: "Type", render: (val, item) => item.icon },
              { key: "message", label: "Event" },
              { key: "timestamp", label: "Time" },
            ]}
            data={activityTable.data}
          />
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-box">
            <h4>💰 Today's Revenue</h4>
            <p className="stat-value">$12,450</p>
            <p className="stat-change">↑ 8.2% vs yesterday</p>
          </div>
          <div className="stat-box">
            <h4>📦 Pending Orders</h4>
            <p className="stat-value">234</p>
            <p className="stat-change">→ No change</p>
          </div>
          <div className="stat-box">
            <h4>👥 New Signups</h4>
            <p className="stat-value">42</p>
            <p className="stat-change">↑ 15.3% vs last week</p>
          </div>
          <div className="stat-box">
            <h4>📊 Avg Order Value</h4>
            <p className="stat-value">$450</p>
            <p className="stat-change">↑ 3.5% vs last month</p>
          </div>
        </div>

        {/* Live Indicator Info */}
        <div className="info-box">
          <p>
            <strong>ℹ️ Live Streaming Active:</strong> The metrics above update
            every 3 seconds with simulated data. This demonstrates real-time
            dashboard capabilities.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};
