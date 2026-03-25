# 🚀 SmartAI Hub (MERN AI SaaS Platform)

## 📌 Overview

**SmartAI Hub** is a full-stack AI-powered SaaS web application built using the MERN stack.
It provides multiple AI tools in one platform with authentication and a credit-based usage system.

---

## ✨ Features

### 🤖 AI Tools

* AI Chat (ChatGPT-like)
* AI Image Generator (Hugging Face API)
* Resume Analyzer (PDF upload + AI feedback)
* Notes Summarizer

### 🔐 Authentication

* User Registration
* User Login
* JWT-based authentication
* Protected API routes

### 💰 Credit System

* Each user gets **20 credits**
* Each AI request deducts **1 credit**
* API blocked when credits = 0

### 📊 Data Handling

* MongoDB database
* User-specific data
* Chat & notes history

### 🎨 Frontend

* React + Vite
* Tailwind CSS
* Sidebar layout
* Image history (localStorage)

---

## 🏗️ Project Structure

### 📁 Backend (`/backend/server`)

```
server/
│
├── controllers/
│   ├── authController.js
│   ├── chatController.js
│   ├── imageController.js
│   ├── resumeController.js
│   ├── notesController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   ├── imageRoutes.js
│   ├── resumeRoutes.js
│   ├── notesRoutes.js
│
├── models/
│   ├── User.js
│   ├── Chat.js
│   ├── Credit.js
│
├── middleware/
│   ├── authMiddleware.js
│
├── services/
│   ├── openaiService.js
│   ├── stripeService.js
│
├── uploads/
│   ├── (resume PDFs)
│
├── config/
│   ├── db.js
│
├── server.js
└── package.json
```

---

### 📁 Frontend (`/frontend/client`)

```
client/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Chat.jsx
│   │   ├── ImageGen.jsx
│   │   ├── Resume.jsx
│   │   ├── Notes.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │
│   ├── utils/
│   │   ├── api.js   (centralized API handling)
│   │
│   ├── App.jsx
│   ├── main.jsx
│
└── package.json
```

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### AI APIs

* Hugging Face (Image Generation)
* OpenAI / Gemini (Text-based AI)

### Authentication

* JWT (jsonwebtoken)
* bcryptjs (password hashing)

---

## 📦 Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/smart-ai-hub.git
cd smart-ai-hub
```

---

### 2️⃣ Backend Setup

```
cd backend/server
npm install
```

#### Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
HUGGINGFACE_API_KEY=your_api_key
```

#### Start backend

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend/client
npm install
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers → password hashed using bcrypt
2. User logs in → JWT token generated
3. Token stored in localStorage
4. All API requests use token via `api.js`
5. Protected routes validate token using middleware

---

## 💰 Credit System Logic

* Default credits = 20
* On every AI request:

  ```
  credits -= 1
  ```
* If credits ≤ 0:

  ```
  Access denied
  ```

---

## 🧠 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/me`

### AI Features

* POST `/api/chat`
* POST `/api/image`
* POST `/api/resume`
* POST `/api/notes/summarize`
* GET `/api/notes`

---

## 🖼️ Image Generator

* Uses Hugging Face Stable Diffusion
* Returns base64 image
* Stores history in localStorage
* Click history to reload image

---

## 📄 Resume Analyzer

* Upload PDF
* Extract text
* Send to AI for analysis
* Returns structured feedback

---

## 📝 Notes Summarizer

* Input long text
* AI returns short summary
* History stored in MongoDB

---

## 🧹 Best Practices Used

* MVC architecture
* Middleware-based auth
* Centralized API handling (api.js)
* Reusable components
* Clean folder structure
* Environment variables for secrets

---

## 🚀 Future Improvements

* Payment Integration (Stripe)
* Real-time chat streaming
* Voice-to-text input
* Advanced dashboard UI
* Mobile-first optimization
* AI usage analytics

---

## 👨‍💻 Author

**Rishikesh Pandey 🚀**

---

## ⭐ Final Note

This project is built as a **production-ready AI SaaS platform** using modern technologies and scalable architecture.

Feel free to fork, improve, and deploy 🚀
