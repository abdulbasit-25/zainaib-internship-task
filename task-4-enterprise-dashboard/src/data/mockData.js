/**
 * Mock Data - Simulated data for the dashboard
 * This data is used throughout the application
 */

// Initial metrics data
export const initialMetrics = {
  totalRevenue: 245000,
  activeUsers: 1245,
  totalOrders: 8245,
  conversionRate: 4.8,
  systemPerformance: 98.5,
};

// Time series data for charts
export const revenueData = [
  { date: "Jan 1", revenue: 18000, target: 20000 },
  { date: "Jan 2", revenue: 22000, target: 20000 },
  { date: "Jan 3", revenue: 19000, target: 20000 },
  { date: "Jan 4", revenue: 25000, target: 20000 },
  { date: "Jan 5", revenue: 28000, target: 20000 },
  { date: "Jan 6", revenue: 32000, target: 20000 },
  { date: "Jan 7", revenue: 35000, target: 20000 },
];

export const usersData = [
  { date: "Jan 1", users: 800, activeUsers: 600 },
  { date: "Jan 2", users: 920, activeUsers: 680 },
  { date: "Jan 3", users: 1000, activeUsers: 720 },
  { date: "Jan 4", users: 1100, activeUsers: 800 },
  { date: "Jan 5", users: 1180, activeUsers: 880 },
  { date: "Jan 6", users: 1220, activeUsers: 920 },
  { date: "Jan 7", users: 1245, activeUsers: 950 },
];

export const ordersData = [
  { date: "Jan 1", orders: 1200, completed: 1000 },
  { date: "Jan 2", orders: 1400, completed: 1150 },
  { date: "Jan 3", orders: 1600, completed: 1350 },
  { date: "Jan 4", orders: 1800, completed: 1500 },
  { date: "Jan 5", orders: 1900, completed: 1600 },
  { date: "Jan 6", orders: 2100, completed: 1750 },
  { date: "Jan 7", orders: 2245, completed: 1900 },
];

export const conversionData = [
  { date: "Jan 1", rate: 3.2 },
  { date: "Jan 2", rate: 3.5 },
  { date: "Jan 3", rate: 3.8 },
  { date: "Jan 4", rate: 4.1 },
  { date: "Jan 5", rate: 4.3 },
  { date: "Jan 6", rate: 4.6 },
  { date: "Jan 7", rate: 4.8 },
];

// Users mock data
export const usersTableData = [
  {
    id: "usr-001",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    avatar:
      "https://ui-avatars.com/api/?name=Alice+Johnson&background=FF6B9D&color=fff",
  },
  {
    id: "usr-002",
    name: "Bob Smith",
    email: "bob.smith@company.com",
    role: "Manager",
    status: "Active",
    lastActive: "5 minutes ago",
    avatar:
      "https://ui-avatars.com/api/?name=Bob+Smith&background=C44569&color=fff",
  },
  {
    id: "usr-003",
    name: "Carol Davis",
    email: "carol.davis@company.com",
    role: "User",
    status: "Inactive",
    lastActive: "3 days ago",
    avatar:
      "https://ui-avatars.com/api/?name=Carol+Davis&background=F8B195&color=fff",
  },
  {
    id: "usr-004",
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "User",
    status: "Active",
    lastActive: "10 minutes ago",
    avatar:
      "https://ui-avatars.com/api/?name=David+Wilson&background=77B7D9&color=fff",
  },
  {
    id: "usr-005",
    name: "Emma Brown",
    email: "emma.brown@company.com",
    role: "Analyst",
    status: "Active",
    lastActive: "1 hour ago",
    avatar:
      "https://ui-avatars.com/api/?name=Emma+Brown&background=F7CAC9&color=fff",
  },
];

// Products mock data
export const productsTableData = [
  {
    id: "prod-001",
    name: "Premium Dashboard Pro",
    category: "Software",
    price: 299.99,
    stock: 150,
    sales: 1240,
    status: "In Stock",
  },
  {
    id: "prod-002",
    name: "Analytics Suite",
    category: "Software",
    price: 499.99,
    stock: 45,
    sales: 680,
    status: "Low Stock",
  },
  {
    id: "prod-003",
    name: "API Pro License",
    category: "Service",
    price: 799.99,
    stock: 200,
    sales: 2150,
    status: "In Stock",
  },
  {
    id: "prod-004",
    name: "Support Package",
    category: "Service",
    price: 199.99,
    stock: 8,
    sales: 950,
    status: "Low Stock",
  },
  {
    id: "prod-005",
    name: "Enterprise Bundle",
    category: "Bundle",
    price: 1999.99,
    stock: 5,
    sales: 450,
    status: "Critical",
  },
];

// Transactions mock data
export const transactionsTableData = [
  {
    id: "txn-10001",
    customer: "John Smith",
    date: "2024-01-15",
    amount: 1200.5,
    status: "Completed",
    method: "Credit Card",
  },
  {
    id: "txn-10002",
    customer: "Jane Doe",
    date: "2024-01-14",
    amount: 850.0,
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    id: "txn-10003",
    customer: "Michael Brown",
    date: "2024-01-14",
    amount: 2500.0,
    status: "Pending",
    method: "Credit Card",
  },
  {
    id: "txn-10004",
    customer: "Sarah Johnson",
    date: "2024-01-13",
    amount: 450.25,
    status: "Completed",
    method: "PayPal",
  },
  {
    id: "txn-10005",
    customer: "David Wilson",
    date: "2024-01-13",
    amount: 1800.0,
    status: "Failed",
    method: "Credit Card",
  },
  {
    id: "txn-10006",
    customer: "Emily Davis",
    date: "2024-01-12",
    amount: 3200.0,
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    id: "txn-10007",
    customer: "Chris Martin",
    date: "2024-01-12",
    amount: 950.0,
    status: "Completed",
    method: "Credit Card",
  },
  {
    id: "txn-10008",
    customer: "Lisa Anderson",
    date: "2024-01-11",
    amount: 1500.0,
    status: "Pending",
    method: "Bank Transfer",
  },
];

// Activity feed
export const activityFeed = [
  {
    id: 1,
    type: "sale",
    message: "New sale of $2,500 from John Smith",
    timestamp: "2 minutes ago",
    iconKey: "sale",
  },
  {
    id: 2,
    type: "user",
    message: "New user registration: sarah.jones@email.com",
    timestamp: "15 minutes ago",
    iconKey: "user",
  },
  {
    id: 3,
    type: "alert",
    message: "Low stock alert for Support Package",
    timestamp: "1 hour ago",
    iconKey: "alert",
  },
  {
    id: 4,
    type: "system",
    message: "System backup completed successfully",
    timestamp: "2 hours ago",
    iconKey: "system",
  },
  {
    id: 5,
    type: "sale",
    message: "Bulk order placed: 50 units of Premium Dashboard Pro",
    timestamp: "3 hours ago",
    iconKey: "sale",
  },
];
