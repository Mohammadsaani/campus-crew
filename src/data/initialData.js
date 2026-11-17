export const subjects = [
  { name: "All subjects", code: "ALL", tone: "violet" },
  { name: "Data Structures", code: "DSA", tone: "blue" },
  { name: "Operating Systems", code: "OS", tone: "orange" },
  { name: "Database Management", code: "DBMS", tone: "green" },
  { name: "Computer Networks", code: "CN", tone: "pink" },
  { name: "Java Programming", code: "JAVA", tone: "yellow" },
  { name: "Mathematics", code: "MATH", tone: "cyan" },
];

export const initialNotes = [
  {
    id: "n1", title: "Arrays & Strings — Complete Class Notes", subject: "Data Structures",
    unit: "Unit 1", semester: "Semester 3", type: "PDF", pages: 24, size: "2.4 MB",
    author: "Aarav Sharma", role: "Student", date: "2026-10-28", downloads: 128,
    rating: 4.9, description: "Clear explanations, diagrams, complexity analysis and solved examples for arrays and strings.",
    color: "blue", tag: "Popular", fileName: "", dataUrl: ""
  },
  {
    id: "n2", title: "Process Management & CPU Scheduling", subject: "Operating Systems",
    unit: "Unit 2", semester: "Semester 3", type: "PDF", pages: 18, size: "1.8 MB",
    author: "Prof. Meera Rao", role: "Teacher", date: "2026-10-27", downloads: 96,
    rating: 5.0, description: "Lecture notes covering process states, scheduling algorithms and numerical problems.",
    color: "orange", tag: "Teacher verified", fileName: "", dataUrl: ""
  },
  {
    id: "n3", title: "SQL Queries & Normalization Cheatsheet", subject: "Database Management",
    unit: "Unit 3", semester: "Semester 3", type: "PDF", pages: 12, size: "980 KB",
    author: "Nisha K.", role: "Student", date: "2026-10-25", downloads: 74,
    rating: 4.8, description: "Quick revision sheet for joins, functional dependencies and normal forms.",
    color: "green", tag: "Quick revision", fileName: "", dataUrl: ""
  },
  {
    id: "n4", title: "OSI Model — Layer-wise Explanation", subject: "Computer Networks",
    unit: "Unit 1", semester: "Semester 3", type: "PPT", pages: 32, size: "3.1 MB",
    author: "Prof. Kiran Shetty", role: "Teacher", date: "2026-10-24", downloads: 62,
    rating: 4.9, description: "Visual presentation of the seven layers with protocols and real-world examples.",
    color: "pink", tag: "Teacher verified", fileName: "", dataUrl: ""
  },
  {
    id: "n5", title: "OOP Concepts & Java Collections", subject: "Java Programming",
    unit: "Unit 4", semester: "Semester 3", type: "PDF", pages: 29, size: "2.0 MB",
    author: "Rahul M.", role: "Student", date: "2026-10-22", downloads: 51,
    rating: 4.7, description: "Inheritance, polymorphism, interfaces and an introduction to Java collections.",
    color: "yellow", tag: "Exam ready", fileName: "", dataUrl: ""
  },
  {
    id: "n6", title: "Matrices, Determinants & Eigenvalues", subject: "Mathematics",
    unit: "Unit 2", semester: "Semester 3", type: "PDF", pages: 21, size: "1.5 MB",
    author: "Prof. Ananya", role: "Teacher", date: "2026-10-20", downloads: 43,
    rating: 4.8, description: "Worked examples and practice questions for the most important matrix topics.",
    color: "cyan", tag: "Teacher verified", fileName: "", dataUrl: ""
  },
];

export const initialQuestions = [
  { id: "q1", title: "Can someone explain the difference between process and thread?", subject: "Operating Systems", author: "Sana", replies: 6, time: "18 min ago", solved: false },
  { id: "q2", title: "Best way to remember the 1NF, 2NF and 3NF rules?", subject: "Database Management", author: "Aditya", replies: 3, time: "1 hr ago", solved: false },
  { id: "q3", title: "Is there a good approach to solve spiral matrix questions?", subject: "Data Structures", author: "Diya", replies: 9, time: "Yesterday", solved: true },
];

export const initialGroups = [
  { id: "g1", name: "DSA Daily Practice", topic: "Arrays, strings and problem solving", members: 28, subject: "Data Structures", joined: false, color: "blue" },
  { id: "g2", name: "OS Exam Prep", topic: "Unit-wise revision and previous papers", members: 16, subject: "Operating Systems", joined: true, color: "orange" },
  { id: "g3", name: "DBMS Study Circle", topic: "SQL practice and normalization", members: 21, subject: "Database Management", joined: false, color: "green" },
];