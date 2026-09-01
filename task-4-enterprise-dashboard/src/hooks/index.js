import { useState, useEffect, useCallback } from "react";

/**
 * useTable - Custom hook for table operations
 * Handles sorting, filtering, and pagination
 */
export const useTable = (data, defaultSortKey = "id") => {
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sort data
  const sortedData = useCallback(() => {
    return [...filteredData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Get paginated data
  const paginatedData = useCallback(() => {
    const sorted = sortedData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sortedData]);

  // Filter data
  const handleFilter = useCallback(
    (searchTerm, filterKey = "name") => {
      if (!searchTerm) {
        setFilteredData(data);
      } else {
        const filtered = data.filter((item) =>
          item[filterKey]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
        setFilteredData(filtered);
      }
      setCurrentPage(1);
    },
    [data],
  );

  // Handle sort
  const handleSort = useCallback(
    (key) => {
      if (key === sortKey) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortOrder("asc");
      }
    },
    [sortKey, sortOrder],
  );

  return {
    data: paginatedData(),
    sortKey,
    sortOrder,
    handleSort,
    handleFilter,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(filteredData.length / itemsPerPage),
    totalItems: filteredData.length,
  };
};

/**
 * useLocalStorage - Custom hook for localStorage
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
};

/**
 * useAsync - Custom hook for async operations
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [state, setState] = useState({
    status: "idle",
    value: null,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ status: "pending", value: null, error: null });
    try {
      const response = await asyncFunction();
      setState({ status: "success", value: response, error: null });
      return response;
    } catch (error) {
      setState({ status: "error", value: null, error });
      return null;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
};

/**
 * useDebounce - Custom hook for debouncing
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
