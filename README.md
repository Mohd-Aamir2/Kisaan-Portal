# 🌾 Kisaan Portal

A full-stack web platform built to help farmers access useful farming services, crop guidance, and information in one place, in their own language.

**Live Backend:** https://kisaan-portal.onrender.com

---

## ✨ Features

- 🔐 **User Authentication**: register and login for farmers
- 🌐 **Multi-language Support**: language selector on the login/register page
- 🌱 **Crop Guidance**: detailed guides for different crops
- 🎥 **Video Tutorials**: watch YouTube tutorials for a crop directly inside the app, with a search fallback when no video is available
- 📊 **Farmer Dashboard**: a single place to access all services
- 🛠️ **Admin Panel**: separate dashboard to manage the portal

## 🚀 Roadmap

- 🤖 AI agent that answers farming queries and analyzes the farmer's profile
- 📚 RAG-based farming knowledge base
- 💬 WhatsApp bot so farmers can log farming activities easily
- 📈 Farming status tracking

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, TypeScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Admin Panel | Vite, React, TypeScript |
| Deployment | Render (backend) |

---

## 📁 Project Structure

```
Kisaan-Portal/
├── frontend/       # Next.js farmer-facing app
├── backend/        # Express/Node REST API
└── admin-pannel/   # Vite + React admin dashboard
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or above)
- npm
- A MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Mohd-Aamir2/Kisaan-Portal.git
cd Kisaan-Portal
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm start
```

### 3. Setup the Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the development server:

```bash
npm run dev
```

The app will be available at **http://localhost:9002**

### 4. Setup the Admin Panel

```bash
cd admin-pannel
npm install
npm run dev
```

---

## 🔑 Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | `frontend/.env.local` | Base URL of the backend API |
| `MONGO_URI` | `backend/.env` | MongoDB connection string |
| `JWT_SECRET` | `backend/.env` | Secret key for authentication tokens |
| `PORT` | `backend/.env` | Port for the backend server |

> ⚠️ Never commit your `.env` files or secrets to GitHub.

---

## 🌍 Deployment

- **Backend:** deployed on [Render](https://render.com)
- **Database:** hosted on MongoDB Atlas
- **Frontend:** can be deployed on Vercel or any Node hosting platform

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Mohd Aamir**
GitHub: [@Mohd-Aamir2](https://github.com/Mohd-Aamir2)

---

## 📄 License

This project is for educational purposes. Add a license of your choice (e.g., MIT) if you plan to open-source it.
