import React from "react";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles } from "lucide-react";

function WelcomeScreen({ name, setName, onContinue }) {
  return (
    <main className="welcome-screen">
      <div className="welcome-background-shape shape-left" />
      <div className="welcome-background-shape shape-right" />
      <section className="welcome-panel">
        <div className="welcome-brand">
          <div className="brand-mark"><BookOpen size={22} strokeWidth={2.4} /></div>
          <span>campus<span className="brand-accent">notes</span></span>
        </div>
        <div className="welcome-illustration">
          <div className="welcome-illustration-circle circle-a" />
          <div className="welcome-illustration-circle circle-b" />
          <div className="welcome-book-card"><BookOpen size={42} /><span>YOUR LEARNING SPACE</span><i /><i /><i /></div>
          <span className="welcome-spark spark-one">✦</span>
          <span className="welcome-spark spark-two">✳</span>
          <span className="welcome-spark spark-three">✧</span>
        </div>
        <div className="welcome-copy">
          <span className="eyebrow"><Sparkles size={13} /> LEARN · SHARE · GROW</span>
          <h1>Learning is better<br />when we do it <em>together.</em></h1>
          <p>Welcome to your campus learning space. Let's make it yours before you get started.</p>
        </div>
        <form className="name-entry-form" onSubmit={onContinue}>
          <label htmlFor="campus-user-name">What should we call you?</label>
          <input
            id="campus-user-name"
            type="text"
            autoFocus
            autoComplete="given-name"
            maxLength={40}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
          <button className="primary-btn welcome-continue" type="submit" disabled={!name.trim()}>
            Enter CampusNotes <ArrowRight size={17} />
          </button>
          <span className="welcome-privacy"><ShieldCheck size={13} /> Your name is saved only in this browser.</span>
        </form>
      </section>
      <div className="welcome-footer">A little progress every day adds up to big results. <span>✦</span></div>
    </main>
  );
}

export default WelcomeScreen;
