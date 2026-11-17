import React from "react";

function StatCard({ icon: Icon, label, value, change, tone }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19} /></div><div className="stat-label">{label}</div><strong className="stat-value">{value}</strong><span className="stat-change">{change}</span></div>;
}

export default StatCard;
