import React from "react";
import { ArrowDownToLine, Bookmark, BookmarkCheck, Download, ShieldCheck, Star } from "lucide-react";
import { formatDate, initials } from "../../utils/formatters.js";

function NoteCard({ note, bookmarked, onBookmark, onOpen, onDownload }) {
  return <article className="note-card">
    <div className={`note-cover ${note.color}`}><div className="cover-top"><span className="file-type">{note.type}</span><button className="bookmark-btn" onClick={() => onBookmark(note.id)} aria-label={bookmarked ? "Remove bookmark" : "Bookmark note"}>{bookmarked ? <BookmarkCheck size={17} fill="currentColor" /> : <Bookmark size={17} />}</button></div><div className="cover-graphic"><div className="cover-paper"><i /><i /><i /><i /><b /></div><div className="cover-orb" /><div className="cover-cross">✳</div></div><div className="cover-bottom"><span>{note.subject}</span><span>{note.unit}</span></div></div>
    <div className="note-card-body"><div className="note-card-tags"><span className="note-semester">{note.semester}</span>{note.tag && <span className="note-highlight">{note.tag}</span>}</div><button className="note-title-button" onClick={() => onOpen(note)}><h3>{note.title}</h3></button><p className="note-description">{note.description}</p><div className="note-author"><div className={`tiny-avatar ${note.role === "Teacher" ? "teacher-avatar" : ""}`}>{initials(note.author)}</div><div><strong>{note.author}</strong><span>{note.role === "Teacher" && <ShieldCheck size={11} />} {note.role}</span></div><span className="author-date">{formatDate(note.date)}</span></div><div className="note-card-footer"><span><Download size={13} /> {note.downloads}</span><span><Star size={13} fill="currentColor" /> {note.rating ? note.rating.toFixed(1) : "New"}</span><button onClick={() => onDownload(note)}><ArrowDownToLine size={15} /> Download</button></div></div>
  </article>;
}

export default NoteCard;
