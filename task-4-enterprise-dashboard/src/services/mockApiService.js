/**
 * Mock API Service - Simulates real-time data streaming
 * DISCLAIMER: This is a frontend simulation for demonstration purposes
 * In production, use a real backend API
 */

import {
  BarChart3,
  CircleDollarSign,
  Package,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  initialMetrics,
  revenueData,
  usersData,
  ordersData,
  conversionData,
} from "../data/mockData";

/**
 * Simulate incoming JSON metrics
 * Returns updated metrics with slight variations
 */
export function simulateMetricsUpdate(currentMetrics) {
  const variance = (value, percent = 0.05) => {
    const change = value * percent * (Math.random() - 0.5) * 2;
    return Math.max(0, Math.round((value + change) * 100) / 100);
  };

  return {
    totalRevenue: variance(currentMetrics.totalRevenue, 0.03),
    activeUsers: variance(currentMetrics.activeUsers, 0.02),
    totalOrders: variance(currentMetrics.totalOrders, 0.02),
    conversionRate: variance(currentMetrics.conversionRate, 0.05),
    systemPerformance: variance(currentMetrics.systemPerformance, 0.01),
  };
}

/**
 * Stream metrics updates at specified interval
 * Returns a callback function to set metrics
 */
export function startMetricsStream(setMetrics, interval = 5000) {
  // Initial metrics
  let currentMetrics = { ...initialMetrics };
  setMetrics(currentMetrics);

  // Stream updates every interval (5 seconds)
  const intervalId = setInterval(() => {
    currentMetrics = simulateMetricsUpdate(currentMetrics);
    setMetrics(currentMetrics);
  }, interval);

  // Return cleanup function
  return () => clearInterval(intervalId);
}

/**
 * Start chart data stream
 * Simulates incoming chart data
 */
export function startChartDataStream(setChartData, dataType, interval = 5000) {
  let dataMap = {
    revenue: [...revenueData],
    users: [...usersData],
    orders: [...ordersData],
    conversion: [...conversionData],
  };

  const currentData = dataMap[dataType] || [];
  setChartData(currentData);

  const intervalId = setInterval(() => {
    // Simulate new data point
    const lastItem = currentData[currentData.length - 1];
    const dayNum = currentData.length + 1;

    let newItem;
    switch (dataType) {
      case "revenue":
        newItem = {
          date: `Jan ${dayNum}`,
          revenue: Math.floor(Math.random() * 20000 + 25000),
          target: 20000,
        };
        break;
      case "users":
        newItem = {
          date: `Jan ${dayNum}`,
          users: lastItem.users + Math.floor(Math.random() * 100),
          activeUsers: lastItem.activeUsers + Math.floor(Math.random() * 80),
        };
        break;
      case "orders":
        newItem = {
          date: `Jan ${dayNum}`,
          orders: lastItem.orders + Math.floor(Math.random() * 200),
          completed: lastItem.completed + Math.floor(Math.random() * 150),
        };
        break;
      case "conversion":
        newItem = {
          date: `Jan ${dayNum}`,
          rate: Math.min(10, lastItem.rate + (Math.random() - 0.5) * 0.5),
        };
        break;
      default:
        return;
    }

    // Keep last 7 days
    if (currentData.length > 7) {
      currentData.shift();
    }
    currentData.push(newItem);
    setChartData([...currentData]);
  }, interval);

  return () => clearInterval(intervalId);
}

/**
 * Get metrics with change indicators
 * Used for dashboard metric cards
 */
export function getMetricsWithChange(currentMetrics, previousMetrics) {
  const calculateChange = (current, previous) => {
    if (previous === 0) return 0;
    return (((current - previous) / previous) * 100).toFixed(2);
  };

  return {
    totalRevenue: {
      value: `PKR ${(currentMetrics.totalRevenue / 1000).toFixed(1)}K`,
      change: calculateChange(
        currentMetrics.totalRevenue,
        initialMetrics.totalRevenue,
      ),
      icon: CircleDollarSign,
    },
    activeUsers: {
      value: currentMetrics.activeUsers.toLocaleString(),
      change: calculateChange(
        currentMetrics.activeUsers,
        initialMetrics.activeUsers,
      ),
      icon: Users,
    },
    totalOrders: {
      value: currentMetrics.totalOrders.toLocaleString(),
      change: calculateChange(
        currentMetrics.totalOrders,
        initialMetrics.totalOrders,
      ),
      icon: Package,
    },
    conversionRate: {
      value: `${currentMetrics.conversionRate.toFixed(2)}%`,
      change: calculateChange(
        currentMetrics.conversionRate,
        initialMetrics.conversionRate,
      ),
      icon: TrendingUp,
    },
    systemPerformance: {
      value: `${currentMetrics.systemPerformance.toFixed(1)}%`,
      change: calculateChange(
        currentMetrics.systemPerformance,
        initialMetrics.systemPerformance,
      ),
      icon: Zap,
    },
  };
}
