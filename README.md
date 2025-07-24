# CursorCloud

## Overview

CursorCloud is a next-generation AI-powered code generation and prototyping platform. It enables users to describe what they want to build in natural language, chat with an AI assistant, and instantly generate, edit, and preview full-stack React projects in the browser. CursorCloud is designed for rapid prototyping, learning, and developer productivity.

---

## Features

- **Conversational AI Chat**: Describe your project or feature in plain English; the AI generates code, explanations, and project structure.
- **Live Code Editor**: Edit generated code in real time using an embedded Sandpack (CodeSandbox) editor.
- **Instant Preview**: See your app running live as you edit.
- **Workspace Management**: Each project/conversation is a workspace with persistent chat and code history.
- **Authentication**: Google OAuth for user accounts and workspace persistence.
- **Guest Mode**: Try out the platform without signing in (localStorage-based session).
- **Token-based Usage**: (Optional) Track usage and limit features based on tokens.
- **Modern UI/UX**: Responsive, dark-themed, and animated interface.
- **Easy Customization**: Update logo, favicon, and project name with minimal effort.

---

## Technology Stack

- **Frontend**: Next.js 15 (App Router)
- **Database/Backend**: Convex (real-time database)
- **AI Integration**: Google Gemini AI (via @google/generative-ai)
- **Live Code Editor**: Sandpack (by CodeSandbox)
- **UI Components**: shadcn/ui, Tailwind CSS, Lucide Icons
- **Authentication**: Google OAuth
- **State Management**: React Context
- **Animation**: Framer Motion

---

## Project Structure

```
cursor-cloud/
├── app/                # Next.js app directory (pages, layout, providers, API routes)
│   ├── (main)/workspace/[id]/page.jsx  # Workspace page (chat + code)
│   ├── api/             # API routes for AI chat and code generation
│   ├── ConvexClientProvider.jsx
│   ├── globals.css
│   ├── layout.js        # App layout and metadata
│   ├── page.js          # Landing page (Hero)
│   └── provider.jsx     # Context providers (theme, user, messages)
├── components/          # UI and custom components
│   ├── custom/          # AppSideBar, ChatView, CodeView, Header, Hero, etc.
│   └── ui/              # Reusable UI primitives (button, sidebar, etc.)
├── configs/             # AI model config
├── context/             # React Contexts (Messages, UserDetail)
├── convex/              # Convex schema and server functions
├── data/                # Static data (colors, prompts, lookup)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── public/              # Static assets (images, favicon, SVGs)
├── README.md            # Project documentation
├── package.json         # Project metadata and dependencies
└── ...
```

---

## Setup Instructions

### 1. **Clone the Repository**
```bash
git clone https://github.com/sudhansu-24/cursor-cloud.git
cd cursor-cloud
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Environment Variables**
Create a `.env` file in the root with:
```
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
NEXT_PUBLIC_GEMINI_API_KEY=<your-google-gemini-api-key>
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=<your-google-oauth-client-id>
```

### 4. **Google OAuth Setup**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create OAuth 2.0 credentials
- Add these to **Authorized JavaScript origins**:
  - `http://localhost:3000`
  - (and your ngrok/public URL if using network access)
- Add these to **Authorized redirect URIs**:
  - `http://localhost:3000/`
  - (and your ngrok/public URL if using network access)

### 5. **(Optional) Network Access with ngrok**
To access from other devices:
```bash
ngrok http 3000
```
Add the ngrok URL to your Google OAuth settings as above.

### 6. **Run the App**
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage Guide

### Landing Page
- Enter a prompt or click a suggestion to start a new project.
- The AI will respond and create a new workspace for your project.

### Authentication & Guest Mode
- **Sign In**: Use Google Sign-In for persistent workspaces and token tracking.
- **Guest Mode**: Try out the platform without signing in (data stored in localStorage, not persistent across devices).

### Workspace
- **Chat**: Continue the conversation with the AI to refine your project.
- **Code Editor**: Edit generated code in real time using the Sandpack editor.
- **Preview**: Switch between code and live preview tabs to see your app running.
- **Sidebar**: Access your workspace history and settings.

### Branding & Customization
- **Logo & Favicon**: Update `public/cursor-cloud.svg` and logo text in `Header.jsx` and `AppSideBar.jsx`.
- **Favicon**: Set in `app/layout.js` via `<link rel="icon" href="/cursor-cloud.svg" />`.
- **Theme**: Tailwind and shadcn/ui for easy theming.
- **Prompts & Suggestions**: Edit `data/Prompt.jsx` and `data/Lookup.jsx`.

---

## Contribution Guidelines

- Pull requests and issues are welcome!
- Please open an issue to discuss major changes before submitting a PR.
- Follow the existing code style and structure.
- Add comments and documentation for new features.

---

## License

This project is for educational and prototyping purposes. See `LICENSE` for details.

---

## Contact

For questions, suggestions, or collaboration, open an issue or contact the maintainer.
