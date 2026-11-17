import React from "react";
import { FileText } from "lucide-react";

function EmptyState({ title, text, action, onAction }) {
  return <div className="empty-state"><div><FileText size={26} /></div><h3>{title}</h3><p>{text}</p><button className="secondary-btn" onClick={onAction}>{action}</button></div>;
}

export default EmptyState;
