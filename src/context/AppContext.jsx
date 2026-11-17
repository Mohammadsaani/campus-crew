import React, { createContext, useContext, useEffect, useState } from "react";
import { initialNotes, initialQuestions, initialGroups } from "../data/initialData.js";

const AppContext = createContext(null);

const storageKeys = {
  notes: "campusnotes.notes.v1",
  bookmarks: "campusnotes.bookmarks.v1",
  questions: "campusnotes.questions.v1",
  groups: "campusnotes.groups.v1",
  role: "campusnotes.role.v1",
  userName: "campusnotes.userName.v1"
};

function readStorage(key, defaultValue) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function useSavedValue(key, defaultValue) {
  const [value, setValue] = useState(() => readStorage(key, defaultValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep the current session working if browser storage is full.
    }
  }, [key, value]);

  return [value, setValue];
}

export function AppProvider({ children }) {
  const [notes, setNotes] = useSavedValue(storageKeys.notes, initialNotes);
  const [bookmarks, setBookmarks] = useSavedValue(storageKeys.bookmarks, ["n1", "n3"]);
  const [questions, setQuestions] = useSavedValue(storageKeys.questions, initialQuestions);
  const [groups, setGroups] = useSavedValue(storageKeys.groups, initialGroups);
  const [role, setRole] = useSavedValue(storageKeys.role, "Student");
  const [userName, setUserName] = useSavedValue(storageKeys.userName, "");

  const appData = {
    notes, setNotes,
    bookmarks, setBookmarks,
    questions, setQuestions,
    groups, setGroups,
    role, setRole,
    userName, setUserName
  };

  return (
    <AppContext.Provider value={appData}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
