# 🏋️ Gold GYM — AI Fitness Coach Chatbot

A dark terminal-themed AI fitness coach chatbot built with Next.js and powered by **Groq (Llama 3.1)** — completely free to run!

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Groq](https://img.shields.io/badge/Groq-Llama%203.1-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📸 Preview

> Dark terminal UI with green accents, monospace font, and real-time AI responses.
- **Live Demo** : https://chat-bot-delta-fawn-29.vercel.app/
---

## ✨ Features

- ⚡ **AI-powered** fitness coaching via Groq (Llama 3.1 8B)
- 🖥️ **Dark terminal UI** with green accents and monospace font
- 🧠 **Multi-turn memory** — Gold GYM remembers the full conversation
- 🎯 **Quick prompt buttons** for instant workout, nutrition & recovery advice
- 🔒 **Secure backend proxy** — API key never exposed to the browser
- 📱 **Responsive** — works on desktop and mobile
- 🆓 **100% Free** to run using Groq's free API

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Next.js 14 |
| Backend | Next.js API Routes (serverless) |
| AI Model | Llama 3.1 8B via Groq API |
| Styling | Inline CSS (dark terminal theme) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
apex-fitness-coach/
├── pages/
│   ├── index.js        # Frontend — chatbot UI
│   ├── _app.js         # Next.js app wrapper
│   └── api/
│       └── chat.js     # Backend — Groq API proxy
├── styles/
│   └── globals.css     # Global styles
├── .env.local          # API keys (not committed)
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/amanahma/ChatBot.git
cd ChatBot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a FREE Groq API Key

1. Sign up at [console.groq.com](https://console.groq.com) — no credit card needed
2. Go to **API Keys → Create API Key**
3. Copy the key (starts with `gsk_...`)

### 4. Set up environment variables

Create a `.env.local` file in the root folder:

```bash
GROQ_API_KEY=gsk_your_api_key_here
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```

Then in Vercel Dashboard → **Settings → Environment Variables**, add:
```
GROQ_API_KEY = gsk_your_api_key_here
```

Redeploy:
```bash
vercel --prod
```

---

## 💬 What Can APEX Help With?

- 🏋️ Personalized workout plans (strength, cardio, HIIT)
- 🥗 Nutrition advice (macros, meal plans, hydration)
- 😴 Recovery strategies (sleep, stretching, injury prevention)
- 🎯 Goal setting and progress tracking
- 🧘 Mental fitness and consistency habits

---

## ⚠️ Disclaimer

Gold GYM is an AI assistant and **not a substitute for professional medical advice**. Always consult a doctor or certified trainer for medical concerns or injuries.

---

## 👤 Author

**Aman Ahmad**
- GitHub: [@amanahma](https://github.com/amanahma)


