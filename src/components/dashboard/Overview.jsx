import React from "react";
import { ArrowRight, BookOpen, Check, ChevronRight, CircleHelp, Clock3, CloudUpload, Download, FileText, Flame, Library, Lightbulb, MoreHorizontal, Plus, Sparkles, Users } from "lucide-react";
import StatCard from "./StatCard.jsx";
import { formatDate } from "../../utils/formatters.js";

function Overview({ notes, questions, groups, totalDownloads, myUploads, onBrowse, onUpload, onOpenNote, onPage, onBookmark, bookmarks, userName }) {
  const recent = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  return <section>
    <div className="welcome-row"><div><div className="eyebrow"><span className="sparkle-small">✦</span> YOUR CAMPUS LEARNING SPACE</div><h1>Good to see you, {userName}! <span className="wave">✋</span></h1><p className="page-subtitle">A little progress every day adds up to big results. Keep going.</p></div><div className="welcome-date"><span className="date-icon"><Clock3 size={16} /></span><div><strong>Study space</strong><span>Make today count</span></div></div></div>

    <div className="hero-card"><div className="hero-content"><span className="hero-chip"><Sparkles size={13} /> LEARN · SHARE · GROW</span><h2>Your next big idea<br />starts with a <em>good note.</em></h2><p>Explore class notes, learn from your seniors and share what you know with your campus.</p><div className="hero-buttons"><button className="hero-primary" onClick={onBrowse}>Explore notes <ArrowRight size={16} /></button><button className="hero-secondary" onClick={onUpload}><Plus size={16} /> Share your notes</button></div></div><div className="hero-art"><div className="art-circle circle-one" /><div className="art-circle circle-two" /><div className="floating-note note-back"><FileText size={23} /><span>Unit 02</span><i /></div><div className="floating-note note-front"><div className="mini-lines"><i /><i /><i /></div><div className="mini-doc-icon"><BookOpen size={22} /></div><strong>Study smarter</strong><span>One page at a time</span><div className="mini-stars">✦ ✦ ✦</div></div><div className="art-sparkle sparkle-a">✳</div><div className="art-sparkle sparkle-b">✦</div><div className="art-dots">••••<br />••••<br />••••</div></div></div>

    <div className="stats-grid">
      <StatCard icon={Library} label="Notes in library" value={notes.length} change="Across all subjects" tone="violet" />
      <StatCard icon={Download} label="Community downloads" value={totalDownloads.toLocaleString("en-IN")} change="Learning shared forward" tone="blue" />
      <StatCard icon={Users} label="Study groups" value={groups.length} change="Find your study circle" tone="orange" />
      <StatCard icon={CloudUpload} label="Your contributions" value={myUploads} change="Notes you have shared" tone="green" />
    </div>

    <div className="overview-columns">
      <div className="overview-main">
        <div className="section-title-row"><div><h2>Recently added</h2><p>Fresh resources from your campus.</p></div><button className="text-btn" onClick={onBrowse}>View all <ArrowRight size={15} /></button></div>
        <div className="recent-list">{recent.map((note) => <button className="recent-item" key={note.id} onClick={() => onOpenNote(note)}><div className={`recent-file ${note.color}`}><FileText size={20} /><span>{note.type}</span></div><div className="recent-copy"><strong>{note.title}</strong><span>{note.subject} <i>·</i> {note.author}</span></div><div className="recent-date">{formatDate(note.date)}</div><ChevronRight className="recent-arrow" size={17} /></button>)}</div>
      </div>
      <div className="overview-side">
        <div className="streak-card"><div className="streak-top"><div className="streak-icon"><Flame size={19} /></div><span>YOUR MOMENTUM</span><MoreHorizontal size={18} /></div><div className="streak-number">3 <span>day streak</span></div><p>You're building a great habit. Come back tomorrow to keep it going.</p><div className="week-dots">{["M","T","W","T","F","S","S"].map((d, i) => <div className={i > 3 ? "future" : "done"} key={i}><span>{d}</span><i>{i < 4 ? <Check size={12} /> : ""}</i></div>)}</div></div>
        <div className="quick-card"><div className="quick-icon"><CircleHelp size={18} /></div><div><strong>Need a little help?</strong><span>Ask your campus community.</span></div><button onClick={() => onPage("Doubt Forum")} aria-label="Open doubt forum"><ArrowRight size={17} /></button></div>
      </div>
    </div>
    <div className="bottom-callout"><div className="callout-icon"><Lightbulb size={20} /></div><div><strong>Knowledge grows when it is shared.</strong><span>Have useful notes? Help someone else ace their next exam.</span></div><button onClick={onUpload}>Upload a resource <ArrowRight size={15} /></button></div>
  </section>;
}

export default Overview;
