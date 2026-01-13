# Deployment Guide

This guide details how to deploy your MERN stack application.

## Prerequisites
- GitHub Repository with your project code.
- Accounts on [Render](https://render.com) and [Vercel](https://vercel.com).
- Your MongoDB connection string and Cloudinary/Email credentials.

---

## 🚀 Part 1: Deploy Backend to Render

1.  **Log in to Render** and click **"New +"** -> **"Web Service"**.
2.  **Connect your GitHub repository**.
3.  **Configure the Service**:
    - **Name**: `mini-drive-backend` (or similar)
    - **Region**: Choose the one closest to you.
    - **Branch**: `main`
    - **Root Directory**: `backend` (Important!)
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js`
4.  **Environment Variables**:
    Click on "Advanced" or "Environment" and add the following keys from your `.env` file:
    - `NODE_ENV`: `production`
    - `MONGO_URI`: `your_mongodb_connection_string` (Make sure your IP Allowlist in MongoDB Atlas includes `0.0.0.0/0` or Render's IPs)
    - `JWT_SECRET`: `your_secure_secret`
    - `CLOUDINARY_CLOUD_NAME`: ...
    - `CLOUDINARY_API_KEY`: ...
    - `CLOUDINARY_API_SECRET`: ...
    - `MAIL_HOST`: `smtp.gmail.com`
    - `MAIL_PORT`: `587`
    - `MAIL_USER`: ...
    - `MAIL_PASS`: ...
    - `MAIL_FROM`: ...
    - `CLIENT_URL`: `https://your-frontend-domain.vercel.app` (You will update this *after* deploying frontend)
    - `FRONTEND_URL`: `https://your-frontend-domain.vercel.app`

5.  **Create Web Service**. Render will start building and deploying.
6.  **Copy the Backend URL**: Once deployed, copy the URL (e.g., `https://mini-drive-backend.onrender.com`).

---

## ⚡ Part 2: Deploy Frontend to Vercel

1.  **Log in to Vercel** and click **"Add New..."** -> **"Project"**.
2.  **Import your GitHub repository**.
3.  **Configure Project**:
    - **Framework Preset**: `Vite`
    - **Root Directory**: Click "Edit" and select `frontend`.
4.  **Environment Variables**:
    Add the backend URL you copied from Render:
    - `VITE_API_URL`: `https://mini-drive-backend.onrender.com` (Ensure no trailing slash /)

5.  **Deploy**. Vercel will build and deploy your site.
6.  **Copy the Frontend URL**: (e.g., `https://mini-drive-frontend.vercel.app`).

---

## 🔄 Part 3: Final Configuration

1.  **Update Backend Config**:
    - Go back to your **Render Dashboard**.
    - Update the `CLIENT_URL` and `FRONTEND_URL` environment variables with your new Vercel Frontend URL.
    - Redeploy the backend service if necessary (Render usually auto-redeploys on config change).

2.  **Update MongoDB Whitelist** (If strictly restricted):
    - Ensure your MongoDB Atlas allows connections from Render (easier to allow `0.0.0.0/0` for cloud deployments).

3.  **Test**: Open your Vercel URL and test the login, upload, and sharing features!
