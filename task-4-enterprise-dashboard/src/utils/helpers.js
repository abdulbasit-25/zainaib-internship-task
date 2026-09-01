export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export const formatPercent = (value) => {
  return `${(value * 100).toFixed(2)}%`;
};

export const getStatusColor = (status) => {
  const colors = {
    Active: "#10b981",
    Inactive: "#ef4444",
    Pending: "#f59e0b",
    Completed: "#3b82f6",
    Failed: "#ef4444",
    "In Stock": "#10b981",
    "Low Stock": "#f59e0b",
    Critical: "#ef4444",
  };
  return colors[status] || "#6b7280";
};

export const getStatusBgColor = (status) => {
  const colors = {
    Active: "#ecfdf5",
    Inactive: "#fef2f2",
    Pending: "#fffbeb",
    Completed: "#eff6ff",
    Failed: "#fef2f2",
    "In Stock": "#ecfdf5",
    "Low Stock": "#fffbeb",
    Critical: "#fef2f2",
  };
  return colors[status] || "#f3f4f6";
};

export const sortBy = (arr, key, order = "asc") => {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });
};

export const filterBy = (arr, key, value) => {
  return arr.filter((item) =>
    item[key].toString().toLowerCase().includes(value.toLowerCase()),
  );
};

export const getPercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(2);
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
