import React from "react";
import { Bell, ChevronDown, ChevronRight, GraduationCap, Menu } from "lucide-react";
import { initials } from "../../utils/formatters.js";

export default function Topbar({ page, role, setRole, userName, notify, onOpenMenu }) {
  return (
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn menu-trigger" onClick={onOpenMenu} aria-label="Open menu"><Menu size={21} /></button>
            <div className="breadcrumb">Workspace <ChevronRight size={14} /> <strong>{page}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="role-switch">
              <GraduationCap size={15} />
              <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Choose account role">
                <option>Student</option><option>Teacher</option>
              </select>
              <ChevronDown size={13} />
            </div>
            <button className="icon-btn notification-btn" onClick={() => notify("You're all caught up!")} aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className="avatar avatar-purple top-avatar">{initials(userName)}</div>
          </div>
        </header>
  );
}
