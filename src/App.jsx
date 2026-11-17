import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppContext } from "./context/AppContext.jsx";
import { subjects } from "./data/initialData.js";
import { formatDate, initials } from "./utils/formatters.js";
import { downloadNoteFile, formatFileSize, readFileAsDataUrl, validateNotesFile } from "./utils/fileManagement.js";
import WelcomeScreen from "./components/auth/WelcomeScreen.jsx";
import Overview from "./components/dashboard/Overview.jsx";
import NoteCard from "./components/notes/NoteCard.jsx";
import EmptyState from "./components/common/EmptyState.jsx";
import Modal from "./components/common/Modal.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Topbar from "./components/layout/Topbar.jsx";
import {
  ArrowDownToLine, ArrowRight, Bookmark, BookmarkCheck, Check,
  CheckCircle2, ChevronDown, CloudUpload, Download, FileText, Filter,
  GraduationCap, Library, Lightbulb, MessageCircle, Plus, Search,
  Send, ShieldCheck, Tag, Upload, Users
} from "lucide-react";

function App() {
  const { notes, setNotes, bookmarks, setBookmarks, questions, setQuestions, groups, setGroups, role, setRole, userName, setUserName } = useAppContext();
  const [nameInput, setNameInput] = useState("");
  const [page, setPage] = useState("Overview");
  const [selectedSubject, setSelectedSubject] = useState("All subjects");
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("All semesters");
  const [sort, setSort] = useState("recent");
  const [showUpload, setShowUpload] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showNameEditor, setShowNameEditor] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [toast, setToast] = useState("");
  const [newQuestion, setNewQuestion] = useState({ title: "", subject: "Data Structures" });
  const [uploadForm, setUploadForm] = useState({
    title: "", subject: "Data Structures", unit: "Unit 1", semester: "Semester 3",
    description: "", file: null
  });
  const fileRef = useRef(null);


  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredNotes = useMemo(() => {
    let result = [...notes];
    if (selectedSubject !== "All subjects") result = result.filter((n) => n.subject === selectedSubject);
    if (semester !== "All semesters") result = result.filter((n) => n.semester === semester);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((n) => [n.title, n.subject, n.author, n.description, n.unit].join(" ").toLowerCase().includes(q));
    }
    if (page === "Bookmarks") result = result.filter((n) => bookmarks.includes(n.id));
    if (sort === "popular") result.sort((a, b) => b.downloads - a.downloads);
    else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => new Date(b.date) - new Date(a.date));
    return result;
  }, [notes, selectedSubject, semester, search, sort, page, bookmarks]);

  const totalDownloads = notes.reduce((sum, note) => sum + note.downloads, 0);
  const myUploads = notes.filter((n) => n.author === userName).length;

  function notify(message) { setToast(message); }

  function handleNameSubmit(event) {
    event.preventDefault();
    const cleanedName = nameInput.trim().replace(/\s+/g, " ");
    if (!cleanedName) return;
    setUserName(cleanedName);
  }

  function handleNameUpdate(event) {
    event.preventDefault();
    const cleanedName = nameInput.trim().replace(/\s+/g, " ");
    if (!cleanedName) return notify("Please enter your name.");
    setUserName(cleanedName);
    setShowNameEditor(false);
    notify("Your name has been updated.");
  }

  function toggleBookmark(id) {
    setBookmarks((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    notify(bookmarks.includes(id) ? "Removed from your saved notes" : "Note saved to your bookmarks");
  }

  async function handleUpload(event) {
    event.preventDefault();
    if (!uploadForm.title.trim()) return notify("Please enter a title for your notes.");
    const file = uploadForm.file;
    const validationError = validateNotesFile(file);
    if (validationError) return notify(validationError);

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const newNote = {
        id: `note-${Date.now()}`, title: uploadForm.title.trim(), subject: uploadForm.subject,
        unit: uploadForm.unit, semester: uploadForm.semester, type: file.name.split(".").pop().toUpperCase(),
        pages: "—", size: formatFileSize(file.size),
        author: userName, role, date: new Date().toISOString().slice(0, 10), downloads: 0,
        rating: 0, description: uploadForm.description || "Community-shared study material.",
        color: "violet", tag: "New upload", fileName: file.name, dataUrl
      };
      setNotes((current) => [newNote, ...current]);
      setUploadForm({ title: "", subject: "Data Structures", unit: "Unit 1", semester: "Semester 3", description: "", file: null });
      if (fileRef.current) fileRef.current.value = "";
      setShowUpload(false);
      setSelectedSubject("All subjects");
      setPage("Notes Library");
      notify("Your notes have been added to the library!");
    } catch (error) {
      notify(error.message || "Could not read this file. Please try again.");
    }
  }

  function downloadNote(note) {
    if (!downloadNoteFile(note)) {
      notify("This is sample content. Upload a real file to enable downloading.");
      return;
    }
    setNotes((current) => current.map((n) => n.id === note.id ? { ...n, downloads: n.downloads + 1 } : n));
    notify("Download started");
  }

  function addQuestion(event) {
    event.preventDefault();
    if (!newQuestion.title.trim()) return notify("Write your question first.");
    setQuestions((current) => [{
      id: `q-${Date.now()}`, title: newQuestion.title.trim(), subject: newQuestion.subject,
      author: userName, replies: 0, time: "Just now", solved: false
    }, ...current]);
    setNewQuestion({ title: "", subject: "Data Structures" });
    setShowQuestion(false);
    setPage("Doubt Forum");
    notify("Your question is live in the doubt forum.");
  }

  function toggleJoin(id) {
    setGroups((current) => current.map((g) => g.id === id ? { ...g, joined: !g.joined, members: g.members + (g.joined ? -1 : 1) } : g));
    notify(groups.find((g) => g.id === id)?.joined ? "You left the study group" : "You joined the study group!");
  }

  function setNavigation(nextPage) {
    setPage(nextPage);
    setShowMobileNav(false);
    setSelectedNote(null);
    if (nextPage !== "Bookmarks") setSelectedSubject("All subjects");
  }



  if (!userName.trim()) {
    return <WelcomeScreen name={nameInput} setName={setNameInput} onContinue={handleNameSubmit} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
        page={page}
        setNavigation={setNavigation}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        onSelectSubject={(subjectName) => { setSelectedSubject(subjectName); setPage("Notes Library"); setShowMobileNav(false); }}
        subjects={subjects}
        onUpload={() => setShowUpload(true)}
        userName={userName}
        role={role}
        questionsCount={questions.length}
        onEditName={() => { setNameInput(userName); setShowNameEditor(true); }}
      />

      {showMobileNav && <button className="scrim" onClick={() => setShowMobileNav(false)} aria-label="Close navigation" />}

      <main className="main-area">
        <Topbar page={page} role={role} setRole={setRole} userName={userName} notify={notify} onOpenMenu={() => setShowMobileNav(true)} />

        <div className="page-content">
          {page === "Overview" && (
            <Overview
              notes={notes} questions={questions} groups={groups} totalDownloads={totalDownloads}
              myUploads={myUploads} onBrowse={() => setNavigation("Notes Library")}
              onUpload={() => setShowUpload(true)} onOpenNote={setSelectedNote}
              onPage={setNavigation} onBookmark={toggleBookmark} bookmarks={bookmarks} userName={userName}
            />
          )}

          {page === "Notes Library" && (
            <section>
              <div className="page-heading-row">
                <div><div className="eyebrow">THE KNOWLEDGE HUB</div><h1>Notes Library <span className="heading-emoji">✦</span></h1><p className="page-subtitle">Find the right notes. Learn at your own pace. Share what you know.</p></div>
                <button className="primary-btn" onClick={() => setShowUpload(true)}><Plus size={17} /> Upload notes</button>
              </div>
              <div className="library-toolbar">
                <div className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes, topics or people..." /><kbd>⌘ K</kbd></div>
                <div className="toolbar-select"><Filter size={15} /><select value={semester} onChange={(e) => setSemester(e.target.value)}><option>All semesters</option><option>Semester 1</option><option>Semester 2</option><option>Semester 3</option><option>Semester 4</option></select><ChevronDown size={13} /></div>
                <div className="toolbar-select"><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">Most recent</option><option value="popular">Most downloaded</option><option value="rating">Top rated</option></select><ChevronDown size={13} /></div>
              </div>
              <div className="subject-pills">
                {subjects.map((subject) => <button key={subject.code} className={`subject-pill ${selectedSubject === subject.name ? "active" : ""}`} onClick={() => setSelectedSubject(subject.name)}>{subject.code === "ALL" ? "✦" : <span className={`subject-dot ${subject.tone}`} />}{subject.name}</button>)}
              </div>
              <div className="results-line"><span><strong>{filteredNotes.length}</strong> resources found</span><span>Community library <span className="live-dot" /></span></div>
              {filteredNotes.length ? <div className="notes-grid">{filteredNotes.map((note) => <NoteCard key={note.id} note={note} bookmarked={bookmarks.includes(note.id)} onBookmark={toggleBookmark} onOpen={setSelectedNote} onDownload={downloadNote} />)}</div> : <EmptyState title="No notes found" text="Try changing your search or subject filter." action="Clear filters" onAction={() => { setSearch(""); setSelectedSubject("All subjects"); setSemester("All semesters"); }} />}
            </section>
          )}

          {page === "Bookmarks" && (
            <section>
              <div className="page-heading-row"><div><div className="eyebrow">YOUR PERSONAL COLLECTION</div><h1>Saved notes <span className="heading-emoji">♡</span></h1><p className="page-subtitle">Keep useful resources close for your next study session.</p></div><button className="secondary-btn" onClick={() => setNavigation("Notes Library")}>Explore library <ArrowRight size={16} /></button></div>
              {filteredNotes.length ? <div className="notes-grid">{filteredNotes.map((note) => <NoteCard key={note.id} note={note} bookmarked onBookmark={toggleBookmark} onOpen={setSelectedNote} onDownload={downloadNote} />)}</div> : <EmptyState title="Nothing saved yet" text="Bookmark notes from the library and they will appear here." action="Explore notes" onAction={() => setNavigation("Notes Library")} />}
            </section>
          )}

          {page === "Study Groups" && (
            <section>
              <div className="page-heading-row"><div><div className="eyebrow">LEARN BETTER, TOGETHER</div><h1>Study groups <span className="heading-emoji">✧</span></h1><p className="page-subtitle">Find your people, stay accountable and prepare together.</p></div><button className="primary-btn" onClick={() => notify("Group creation can be connected to a backend later.")}><Plus size={17} /> Create a group</button></div>
              <div className="feature-banner group-banner"><div className="banner-orb"><Users size={27} /></div><div><span className="banner-kicker">YOUR STUDY COMMUNITY</span><h2>Big goals become easier together.</h2><p>Join a group to share resources, ask questions and keep each other on track.</p></div><div className="banner-decoration">✳</div></div>
              <div className="section-title-row"><div><h2>Discover groups</h2><p>Communities built around the subjects you study.</p></div><span className="muted-label">{groups.filter((g) => g.joined).length} joined</span></div>
              <div className="groups-grid">{groups.map((group) => <div className="group-card" key={group.id}><div className={`group-art ${group.color}`}><Users size={25} /><span>{group.members} members</span></div><div className="group-card-body"><span className="mini-tag">{group.subject}</span><h3>{group.name}</h3><p>{group.topic}</p><div className="group-card-footer"><div className="member-stack"><span>AS</span><span>NK</span><span>+{Math.max(0, group.members - 2)}</span></div><button className={group.joined ? "joined-btn" : "outline-btn"} onClick={() => toggleJoin(group.id)}>{group.joined ? <><Check size={14} /> Joined</> : <><Plus size={14} /> Join group</>}</button></div></div></div>)}</div>
            </section>
          )}

          {page === "Doubt Forum" && (
            <section>
              <div className="page-heading-row"><div><div className="eyebrow">NO QUESTION IS TOO SMALL</div><h1>Doubt forum <span className="heading-emoji">?</span></h1><p className="page-subtitle">Ask questions, help classmates and grow your understanding.</p></div><button className="primary-btn" onClick={() => setShowQuestion(true)}><Plus size={17} /> Ask a question</button></div>
              <div className="forum-layout">
                <div className="question-list-panel"><div className="panel-top"><div><h2>Recent discussions</h2><p>{questions.length} questions from your campus community</p></div><span className="online-pill"><i /> Active</span></div>
                  {questions.map((question) => <div className="question-row" key={question.id}><div className="question-avatar">{initials(question.author)}</div><div className="question-main"><div className="question-meta"><span>{question.author}</span><span>·</span><span>{question.time}</span></div><h3>{question.title}</h3><div className="question-tags"><span>{question.subject}</span>{question.solved && <span className="solved-tag"><CheckCircle2 size={12} /> Solved</span>}</div></div><div className="reply-count"><MessageCircle size={15} /><strong>{question.replies}</strong><span>replies</span></div></div>)}
                </div>
                <aside className="forum-aside"><div className="aside-illustration"><Lightbulb size={28} /></div><h3>Learn by helping</h3><p>Answer a classmate's question. Teaching is one of the best ways to learn.</p><button className="text-btn" onClick={() => notify("Discussion replies will be enabled when a backend is connected.")}>Explore discussions <ArrowRight size={15} /></button><div className="forum-stat"><div><strong>{questions.length}</strong><span>Open questions</span></div><div><strong>{questions.filter((q) => q.solved).length}</strong><span>Marked solved</span></div></div></aside>
              </div>
            </section>
          )}
        </div>
      </main>

      {showUpload && <Modal title="Contribute your notes" subtitle="Share something useful with your campus community." onClose={() => setShowUpload(false)}>
        <form className="modal-form" onSubmit={handleUpload}>
          <label>Notes title<input required value={uploadForm.title} onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })} placeholder="e.g. Unit 2 — Linked Lists Complete Notes" /></label>
          <div className="form-two"><label>Subject<select value={uploadForm.subject} onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}>{subjects.filter((s) => s.code !== "ALL").map((s) => <option key={s.code}>{s.name}</option>)}</select></label><label>Unit<select value={uploadForm.unit} onChange={(e) => setUploadForm({ ...uploadForm, unit: e.target.value })}>{[1,2,3,4,5,6].map((n) => <option key={n}>Unit {n}</option>)}</select></label></div>
          <label>Semester<select value={uploadForm.semester} onChange={(e) => setUploadForm({ ...uploadForm, semester: e.target.value })}>{[1,2,3,4,5,6,7,8].map((n) => <option key={n}>Semester {n}</option>)}</select></label>
          <label>Description <span className="optional">(optional)</span><textarea rows="3" value={uploadForm.description} onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })} placeholder="What topics do these notes cover?" /></label>
          <div className="upload-drop" onClick={() => fileRef.current?.click()} onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()} role="button" tabIndex="0">
            <div className="upload-cloud"><CloudUpload size={22} /></div><strong>{uploadForm.file ? uploadForm.file.name : "Choose a file to upload"}</strong><span>{uploadForm.file ? `${(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB · Ready to upload` : "PDF, DOC, DOCX, PPT, PPTX or TXT · Max 8 MB"}</span>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" hidden onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })} />
          </div>
          <div className="upload-note"><ShieldCheck size={15} /> Upload only material you have permission to share.</div>
          <div className="modal-actions"><button type="button" className="secondary-btn" onClick={() => setShowUpload(false)}>Cancel</button><button className="primary-btn" type="submit"><Upload size={16} /> Publish notes</button></div>
        </form>
      </Modal>}

      {showQuestion && <Modal title="Ask the community" subtitle="Be specific so classmates can help you faster." onClose={() => setShowQuestion(false)}>
        <form className="modal-form" onSubmit={addQuestion}>
          <label>Your question<textarea autoFocus required rows="4" value={newQuestion.title} onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })} placeholder="What are you stuck on? Add the concept or problem..." /></label>
          <label>Subject<select value={newQuestion.subject} onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}>{subjects.filter((s) => s.code !== "ALL").map((s) => <option key={s.code}>{s.name}</option>)}</select></label>
          <div className="modal-actions"><button type="button" className="secondary-btn" onClick={() => setShowQuestion(false)}>Cancel</button><button className="primary-btn" type="submit"><Send size={16} /> Post question</button></div>
        </form>
      </Modal>}

      {showNameEditor && <Modal title="Update your name" subtitle="This is how your name appears across CampusNotes." onClose={() => setShowNameEditor(false)}>
        <form className="modal-form" onSubmit={handleNameUpdate}>
          <label>Your name<input autoFocus required maxLength={40} value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Enter your name" /></label>
          <div className="modal-actions"><button type="button" className="secondary-btn" onClick={() => setShowNameEditor(false)}>Cancel</button><button className="primary-btn" type="submit"><Check size={16} /> Save name</button></div>
        </form>
      </Modal>}

      {selectedNote && <Modal title="Note details" subtitle={selectedNote.subject} onClose={() => setSelectedNote(null)}>
        <div className="note-detail">
          <div className={`file-preview ${selectedNote.color}`}><FileText size={34} /><span>{selectedNote.type}</span></div>
          <div className="detail-title"><h2>{selectedNote.title}</h2><p>{selectedNote.description}</p></div>
          <div className="detail-meta"><span><GraduationCap size={14} /> {selectedNote.semester}</span><span><Tag size={14} /> {selectedNote.unit}</span><span><Download size={14} /> {selectedNote.downloads} downloads</span></div>
          <div className="detail-author"><div className="avatar avatar-purple">{initials(selectedNote.author)}</div><div><strong>{selectedNote.author}</strong><span>{selectedNote.role} · Added {formatDate(selectedNote.date)}</span></div>{selectedNote.role === "Teacher" && <span className="verified"><ShieldCheck size={13} /> Verified</span>}</div>
          <div className="modal-actions"><button className="secondary-btn" onClick={() => toggleBookmark(selectedNote.id)}>{bookmarks.includes(selectedNote.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}{bookmarks.includes(selectedNote.id) ? "Saved" : "Save note"}</button><button className="primary-btn" onClick={() => downloadNote(selectedNote)}><ArrowDownToLine size={16} /> Download file</button></div>
          {!selectedNote.dataUrl && <p className="sample-warning">This is sample library content. Download becomes available when the original file is uploaded.</p>}
        </div>
      </Modal>}

      {toast && <div className="toast"><CheckCircle2 size={17} />{toast}</div>}
    </div>
  );
}

export default App;