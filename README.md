# Vibe Chat

Vibe Chat is a real-time messaging application that allows users to securely communicate with others. The application features user authentication and real-time message updates.

## Features

- User authentication (signup, login)
- Real-time messaging
- Protected routes for authenticated users
- Modern and responsive UI

## Technologies Used

- **Frontend**:

  - React
  - Vite (for fast development and optimized builds)
  - TailwindCSS (for styling)

- **Backend & Services**:

  - Firebase Authentication (for user management)
  - Firestore (for real-time database)

- **Development Tools**:
  - ESLint (for code quality)
  - Git (for version control)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Set up your Firebase configuration in `/src/firebase/config.js`
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Building for Production

```bash
npm run build
# or
yarn build
```

## Additional Information

This project was built using Vite with React. The current implementation uses:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
