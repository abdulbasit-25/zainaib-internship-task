import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import "./MetricCard.css";

/**
 * MetricCard - Displays a single metric with change indicator
 */
export const MetricCard = ({ title, value, change, icon, isPositive }) => {
  const changeClass = isPositive ? "positive" : "negative";
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const IconComponent = React.isValidElement(icon) ? null : icon;

  return (
    <div className="metric-card fade-in">
      <div className="metric-header">
        <h3 className="metric-title">{title}</h3>
        <span className="metric-icon">
          {IconComponent ? <IconComponent size={17} /> : icon}
        </span>
      </div>

      <div className="metric-value">{value}</div>

      <div className={`metric-change ${changeClass}`}>
        <span className="change-symbol">
          <TrendIcon size={14} />
        </span>
        <span className="change-value">{Math.abs(change)}%</span>
        <span className="change-text">from last week</span>
      </div>
    </div>
  );
};
