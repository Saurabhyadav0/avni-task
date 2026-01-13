# Mini Drive

A full-stack file management application built with the MERN stack (MongoDB, Express, React, Node.js). It features file uploading, sharing with specific permissions (View/Edit/Delete), email notifications, and an admin dashboard.

## Features

- **User Authentication**: Secure Login and Signup using JWT.
- **File Management**: Upload (Cloudinary), View, Rename, and Delete files.
- **Sharing System**:
    - Share files with other users via email.
    - Set Granular permissions: Viewer, Editor.
    - **"Shared with me"** section to view files shared by others.
    - Public/Private access controls.
- **Email Notifications**: Automatic emails sent when a file is shared or access is granted.
- **Admin Dashboard**: distinct dashboard for admins to view system statistics and manage users/files.
- **Modern UI**: Built with Shadcn UI, Tailwind CSS, and Lucide React Icons.
- **Responsive Design**: Fully responsive layout for Desktop and Mobile.

## Project Structure

```
mini-drive/
├── backend/          # Express server
│   ├── config/      # DB, Cloudinary, Mailer config
│   ├── controllers/ # Request handlers
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   ├── services/    # Email services
│   └── utils/       # Logger, etc.
├── frontend/         # React application (Vite)
│   ├── src/
│   │   ├── components/  # UI Components (Shadcn)
│   │   ├── pages/       # Application Pages
│   │   └── context/     # Auth Context
└── package.json      # Root package
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas Account
- Cloudinary Account
- Gmail Account (for SMTP)

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_specific_password
MAIL_FROM=Mini Drive <your_email@gmail.com>
CLIENT_URL=http://localhost:5173
```

### Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the Backend:
```bash
cd backend
npm run dev
```

2. Start the Frontend:
```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI, React Router DOM, React Hot Toast, Axios, Lucide React.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JsonWebToken, BCrypt, Multer, Cloudinary, Nodemailer, Winston.

## Admin Access (Default)
- **Role**: Admin privileges are set in the database (`role: 'admin'`).
