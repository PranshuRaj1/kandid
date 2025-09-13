# Kandid

This project serves as a full-stack replication of the Leads and Campaigns sections of the [Linkbird.ai](http://Linkbird.ai) platform, built for the Kandid Full Stack Developer internship assignment.

## 🚀 Features Implemented

This submission successfully implements all core requirements outlined in the assignment brief, making it a robust starting point for your projects.

### Authentication System (Better Auth)

- [x] **Credentials Login**: Secure user login with email and password.
- [x] **Google OAuth**: Seamless sign-in and sign-up with a Google account.
- [x] **User Registration**: A complete sign-up flow with form validation.
- [x] **Protected Routes**: Middleware ensures that unauthenticated users are redirected to the login page.
- [x] **Session Management**: Robust session handling to keep users logged in.
- [x] **Logout**: Functionality to securely end a user session.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Authentication**: `better-auth`
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS & `shadcn/ui`
- **Server State Management**: TanStack Query (React Query)
- **Client State Management**: Zustand
- **Password Hashing**: `bcrypt.js`
- **Language**: TypeScript

---

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18+)
- npm
- A running PostgreSQL database.

### Installation & Configuration

First, clone the repository and install the dependencies.

```bash
git clone [https://github.com/PranshuRaj1/kandid](https://github.com/PranshuRaj1/kandid)
cd kandid
npm install
```

