import React, { useState, useEffect } from "react";
import { BarChart3, PackageCheck, TrendingUp, UsersRound } from "lucide-react";
import { AdminLayout } from "../layouts/AdminLayout";
import { ChartCard } from "../components/ChartCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { startChartDataStream } from "../services/mockApiService";
import {
  revenueData,
  usersData,
  ordersData,
  conversionData,
} from "../data/mockData";
import "./AnalyticsPage.css";

/**
 * AnalyticsPage - Analytics charts and visualizations
 */
export const AnalyticsPage = () => {
  const [revenue, setRevenue] = useState(revenueData);
  const [users, setUsers] = useState(usersData);
  const [orders, setOrders] = useState(ordersData);
  const [conversion, setConversion] = useState(conversionData);

  useEffect(() => {
    const cleanupRevenue = startChartDataStream(setRevenue, "revenue", 5000);
    const cleanupUsers = startChartDataStream(setUsers, "users", 6000);
    const cleanupOrders = startChartDataStream(setOrders, "orders", 7000);
    const cleanupConversion = startChartDataStream(
      setConversion,
      "conversion",
      8000,
    );

    return () => {
      cleanupRevenue();
      cleanupUsers();
      cleanupOrders();
      cleanupConversion();
    };
  }, []);

  return (
    <AdminLayout title="Analytics" isLive={true}>
      <div className="analytics-page">
        <div className="charts-grid">
          {/* Revenue Chart */}
          <ChartCard title="Revenue Trend">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                  formatter={(value) => `$${value}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Users Chart */}
          <ChartCard title="User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={users}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6" }}
                />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Orders Chart */}
          <ChartCard title="Order Volume">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orders}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Bar dataKey="orders" fill="#f59e0b" />
                <Bar dataKey="completed" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Conversion Rate Chart */}
          <ChartCard title="Conversion Rate">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                  formatter={(value) => `${value.toFixed(2)}%`}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ fill: "#ec4899" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Analytics Summary */}
        <div className="analytics-summary">
          <h2 className="section-title">Performance Summary</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <h4>
                <TrendingUp
                  size={15}
                  style={{ marginRight: 8, verticalAlign: "text-bottom" }}
                />
                Revenue Growth
              </h4>
              <p className="summary-value">+23.5%</p>
              <p className="summary-detail">Week over week</p>
            </div>
            <div className="summary-card">
              <h4>
                <UsersRound
                  size={15}
                  style={{ marginRight: 8, verticalAlign: "text-bottom" }}
                />
                User Acquisition
              </h4>
              <p className="summary-value">+445</p>
              <p className="summary-detail">New users this week</p>
            </div>
            <div className="summary-card">
              <h4>
                <PackageCheck
                  size={15}
                  style={{ marginRight: 8, verticalAlign: "text-bottom" }}
                />
                Order Fulfillment
              </h4>
              <p className="summary-value">98.5%</p>
              <p className="summary-detail">On-time delivery rate</p>
            </div>
            <div className="summary-card">
              <h4>
                <BarChart3
                  size={15}
                  style={{ marginRight: 8, verticalAlign: "text-bottom" }}
                />
                Revenue Per User
              </h4>
              <p className="summary-value">$197</p>
              <p className="summary-detail">Average this period</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
