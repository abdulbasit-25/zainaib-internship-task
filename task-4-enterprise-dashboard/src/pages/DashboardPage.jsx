import React, { useState, useEffect } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  Minus,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
  TriangleAlert,
  UsersRound,
} from "lucide-react";
import { AdminLayout } from "../layouts/AdminLayout";
import { MetricCard } from "../components/MetricCard";
import { DataTable } from "../components/DataTable";
import { useTable } from "../hooks";
import {
  startMetricsStream,
  getMetricsWithChange,
} from "../services/mockApiService";
import {
  activityFeed,
  initialMetrics as mockInitialMetrics,
} from "../data/mockData";
import "./DashboardPage.css";

const quickStats = [
  {
    key: "revenue",
    label: "Today's Revenue",
    icon: CircleDollarSign,
    value: "$12,450",
    change: "8.2% vs yesterday",
    direction: "up",
  },
  {
    key: "pending",
    label: "Pending Orders",
    icon: PackageCheck,
    value: "234",
    change: "No change",
    direction: "flat",
  },
  {
    key: "signups",
    label: "New Signups",
    icon: UsersRound,
    value: "42",
    change: "15.3% vs last week",
    direction: "up",
  },
  {
    key: "aov",
    label: "Avg Order Value",
    icon: TrendingUp,
    value: "$450",
    change: "3.5% vs last month",
    direction: "up",
  },
];

const directionIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
};

const activityIconMap = {
  sale: CircleDollarSign,
  user: UsersRound,
  alert: TriangleAlert,
  system: ShieldCheck,
};

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
  const metricsDisplay = getMetricsWithChange(metrics, mockInitialMetrics);

  // Setup activity table
  const activityTable = useTable(activityFeed, "id");

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
              {
                key: "icon",
                label: "Type",
                render: (_, item) => {
                  const Icon = activityIconMap[item.type] || Activity;
                  return <Icon size={14} />;
                },
              },
              { key: "message", label: "Event" },
              { key: "timestamp", label: "Time" },
            ]}
            data={activityTable.data}
          />
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          {quickStats.map((stat) => {
            const StatIcon = stat.icon;
            const ChangeIcon = directionIcon[stat.direction];

            return (
              <div className="stat-box" key={stat.key}>
                <h4>
                  <StatIcon size={15} className="stat-box-icon" />
                  {stat.label}
                </h4>
                <p className="stat-value">{stat.value}</p>
                <p className={`stat-change stat-change--${stat.direction}`}>
                  <ChangeIcon size={13} className="stat-change-icon" />
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Indicator Info */}
        <div className="info-box">
          <p>
            <strong className="info-box-title">
              <Activity size={14} className="info-box-icon" />
              Live Streaming Active:
            </strong>{" "}
            The metrics above update every 3 seconds with simulated data. This
            demonstrates real-time dashboard capabilities.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};
