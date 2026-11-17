import React from "react";
import { ArrowRight, BookOpen, Bookmark, GraduationCap, LayoutDashboard, Library, MessageCircle, Plus, Settings, Sparkles, Users, X } from "lucide-react";
import { initials } from "../../utils/formatters.js";

export default function Sidebar({ showMobileNav, setShowMobileNav, page, setNavigation, selectedSubject, setSelectedSubject, onSelectSubject, subjects, onUpload, userName, role, questionsCount, onEditName }) {
  const navItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Notes Library", icon: Library },
    { label: "Bookmarks", icon: Bookmark },
    { label: "Study Groups", icon: Users },
    { label: "Doubt Forum", icon: MessageCircle },
  ];

  return (
      <aside className={`sidebar ${showMobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><BookOpen size={21} strokeWidth={2.4} /></div>
          <span>campus<span className="brand-accent">notes</span></span>
          <button className="icon-btn mobile-close" onClick={() => setShowMobileNav(false)} aria-label="Close menu"><X size={19} /></button>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${page === label ? "active" : ""}`} onClick={() => setNavigation(label)}>
              <Icon size={18} /><span>{label}</span>
              {label === "Doubt Forum" && <span className="nav-count">{questionsCount}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />
        <div className="workspace-label subject-heading">YOUR SUBJECTS <button className="tiny-add" onClick={() => setNavigation("Notes Library")} aria-label="View subjects"><Plus size={14} /></button></div>
        <div className="subject-nav">
          {subjects.filter((s) => s.code !== "ALL").map((subject) => (
            <button key={subject.code} className={`subject-link ${selectedSubject === subject.name && page === "Notes Library" ? "selected" : ""}`} onClick={() => onSelectSubject(subject.name)}>
              <span className={`subject-dot ${subject.tone}`} />{subject.name}
            </button>
          ))}
        </div>

        <div className="sidebar-spacer" />
        <div className="sidebar-tip">
          <div className="tip-icon"><Sparkles size={17} /></div>
          <strong>Share knowledge.</strong>
          <p>One good note can make someone's whole day easier.</p>
          <button onClick={onUpload}>Contribute notes <ArrowRight size={14} /></button>
        </div>
        <div className="sidebar-profile">
          <div className="avatar avatar-purple">{initials(userName)}</div>
          <div className="profile-copy"><strong>{userName}</strong><span>{role} account</span></div>
          <button className="icon-btn" onClick={onEditName} aria-label="Edit your name" title="Edit your name"><Settings size={17} /></button>
        </div>
      </aside>
  );
}
