# 👥 User Matching App

A simple full-stack application that allows users to create a profile (name, age, interests) and find matches based on shared interests. The system uses Supabase as a backend database and Node.js/Express as the API server.

# Screenshot
<img width="1603" height="910" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/e4bd453a-ffa9-4395-9e5b-d887b583ebc1" />


---

## 🚀 Features

- ✅ Create user profiles with name, age, and interests
- ✅ Match users who share **at least two common interests**
- ✅ Uses **Supabase** as the backend database
- ✅ REST API built with **Express.js**
- ✅ Ready for deployment on Render, Railway, or Fly.io

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **HTTP Client**: Axios
- **Frontend**: React

---

## 📁 Folder Structure 
- backend
- frontend

- backend/
- ├── controllers/
- │ └── userController.js
- ├── models/
- │ └── userModel.js
- ├── routes/
- │ └── userRoutes.js
- ├── config/
- │ └── supabaseClient.js
- ├── .env
- ├── index.js

## Install dependencies
```
npm install @supabase/supabase-js@^2.50.5 cors@^2.8.5 dotenv@^17.2.0 express@^5.1.0
```

 ## Setup Supabase
- Go to https://supabase.com → Create a project

- Create a users table with this structure:

```
  create table users (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    age int not null,
    interests text[] not null
   );
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory and add:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-or-service-role-key
PORT=3000
```

## frontend
```
npm install @tailwindcss/vite@^4.1.11 axios@^1.10.0 lucide-react@^0.525.0 react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11
```
- In the services/api.js provide baseURL(Your Backend url)
```
src/
├── components/
│   ├── ProfileForm.jsx          # User profile creation form
│   ├── UserCard.jsx             # Individual user match card component
│   └── MatchesList.jsx          # List of matches with filtering
├── services/
│   └── api.js                   # Axios API service layer
├── App.jsx                      # Main application component
├── main.tsx                     # Application entry point
├── index.css                    # Tailwind CSS imports
└── vite-env.d.ts               # Vite TypeScript definitions

public/
└── vite.svg                     # Vite logo (default)

Root Files:
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TypeScript config
├── tsconfig.node.json          # Node-specific TypeScript config
├── eslint.config.js            # ESLint configuration
└── .gitignore                  # Git ignore rules
```

- Integreate tailwind for beautiful UI
