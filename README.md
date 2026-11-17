<<<<<<< HEAD
# CampusNotes

CampusNotes is a notes sharing frontend for college students and teachers. Users can find notes by subject, upload study material, save useful notes, join study groups and ask questions.

## Run the project

Install Node.js, open this folder in VS Code and run these commands in the terminal:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal. Vite usually uses `http://localhost:5173`.

To make a production build:

```bash
npm run build
npm run preview
```

## Features

- First-time name entry and a personalised dashboard greeting.
- The name is saved in the browser and can be changed from the sidebar settings icon.
- Notes library with subject filters, semester filters, search and sorting.
- Upload PDF, DOC, DOCX, PPT, PPTX and TXT files up to 8 MB.
- Open note details, save bookmarks and download uploaded files.
- Student and Teacher demo role selector.
- Study groups with join and leave buttons.
- Doubt forum with a form to post questions.
- Responsive layout for desktop and mobile screens.

## Folder structure

```text
CampusNotes/
│
├── public/
│   └── README.txt
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── WelcomeScreen.jsx
│   │   ├── common/
│   │   │   ├── EmptyState.jsx
│   │   │   └── Modal.jsx
│   │   ├── dashboard/
│   │   │   ├── Overview.jsx
│   │   │   └── StatCard.jsx
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   └── notes/
│   │       └── NoteCard.jsx
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   ├── data/
│   │   └── initialData.js
│   ├── utils/
│   │   ├── fileManagement.js
│   │   └── formatters.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── index.html
├── vite.config.js
├── package.json
├── PRODUCT-ASSUMPTIONS.md
├── DESIGN-SYSTEM.md
├── PROJECT-PLAN.md
├── WIREFRAME-PLAN.md
└── MILESTONE-CHECKLIST.md
```

## What the main folders do

- `components`: UI parts used in the application.
- `context`: shared information such as notes, bookmarks, user name and role.
- `data`: sample notes, subjects, questions and groups.
- `utils`: file checks, file downloads and small formatting functions.
- `public`: static files such as images and icons.

## File management

The `fileManagement.js` file checks the file type and file size before an upload. It reads the selected file, shows its size and starts a download when the user selects Download. The maximum file size is 8 MB.

## React Context

`AppContext.jsx` stores shared app information. Components use `useAppContext()` to read or update that information. The app saves these values in the current browser using localStorage.

## Current project limits

This is a frontend project and does not have a backend or real login system. The Student / Teacher switch is only for the demo. Uploaded notes, questions and group changes are stored in the current browser, so they are not shared with other users or devices. Sample notes do not include the original files, so only files uploaded in the browser can be downloaded.

## Note about the college milestone

This folder uses React JS with Vite, as requested. The supplied Milestone-1 instructions list Next.js as a required technology. A React + Vite version may therefore not satisfy that specific requirement. Please check this with your faculty before submitting it.

The instructions also say that the Product Assumptions document must be written by the students. The included file is only a blank outline for your team to complete in your own words.
=======
# campus-crew
>>>>>>> 584d5310f618ca03bc33b283f842de2e11c41057
