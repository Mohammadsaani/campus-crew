# CampusNotes Design System

## Colours

| Use | Colour |
|---|---|
| Primary | `#6E5AE6` |
| Dark purple | `#5744D1` |
| Secondary purple | `#8B7BE9` |
| Page background | `#F7F8FC` |
| Cards | `#FFFFFF` |
| Main text | `#23233A` |
| Secondary text | `#85879A` |
| Borders | `#ECECF3` |
| Success | `#53C49B` |
| Warning | `#F09A54` |

## Fonts

- Headings: Manrope
- Normal text and buttons: DM Sans
- Main heading: around 27 px, bold
- Section heading: around 14–20 px
- Body text: around 9–12 px in the current compact layout

## Components

| Component | File | Use |
|---|---|---|
| WelcomeScreen | `src/components/auth/WelcomeScreen.jsx` | First-time name entry |
| Sidebar | `src/components/layout/Sidebar.jsx` | Main navigation and subject links |
| Topbar | `src/components/layout/Topbar.jsx` | Page name and role selector |
| Overview | `src/components/dashboard/Overview.jsx` | Dashboard content |
| StatCard | `src/components/dashboard/StatCard.jsx` | Dashboard statistics |
| NoteCard | `src/components/notes/NoteCard.jsx` | Shows one notes item |
| Modal | `src/components/common/Modal.jsx` | Pop-up forms and note details |
| EmptyState | `src/components/common/EmptyState.jsx` | Message when a list is empty |

Buttons, form fields, cards and layout styles are kept in `src/styles.css`.
