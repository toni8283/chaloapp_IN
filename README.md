# Chalo 🌍☕

### Real-world connections, made effortless.

Chalo is a modern social meetup platform designed to help people connect instantly for small real-life activities — whether it’s grabbing chai, studying together, playing football, going for a walk, coding, gym sessions, photography, or simply meeting new people nearby.

In a world dominated by endless scrolling and isolated online interaction, Chalo focuses on bringing people back into meaningful offline experiences.

---

## ✨ The Idea

Sometimes all someone wants is:

* “Anyone up for tea?”
* “Need a study partner.”
* “Let’s play badminton.”
* “Come for a night walk.”
* “Coding session nearby?”

Chalo turns these small spontaneous thoughts into real human interaction.

The app is designed to feel:

* warm
* minimal
* human
* calm
* smooth like modern iOS apps

Not noisy like traditional social media.

---

# 📱 Features

### 🔐 Authentication

* Phone OTP login
* Secure verification flow
* JWT-based authentication
* Async FastAPI backend

### 👤 Profile System

* Personalized profiles
* Bio & profile image
* Activity history
* Meetup participation tracking

### 🌍 Nearby Meetup Feed

Discover activities happening around you in real-time:

* Tea meetups
* Study sessions
* Sports
* Gym partners
* Music jams
* Coding groups
* Photography walks
* Food hangouts

### ➕ Activity Creation

Create instant plans with:

* title
* category
* time
* location
* participant limits

### 🤝 Join System

Users can:

* join activities
* see who joined
* track upcoming plans
* manage meetups

---

# 🎨 Design Philosophy

Chalo is inspired by:

* Apple-level smoothness
* Airbnb simplicity
* Zenly-style warmth

The UI focuses on:

* soft colors
* rounded layouts
* fluid animations
* breathable spacing
* emotionally comforting design

---

# ⚡ Tech Stack

## Frontend

* React Native (Expo)
* Expo Router
* React Native Reanimated
* AsyncStorage

## Backend

* FastAPI
* PostgreSQL
* Async SQLAlchemy
* asyncpg

## Architecture

* Modern async backend
* REST APIs
* Scalable folder structure
* JWT authentication
* Optimized for low-end Android devices

---

# 📂 Project Structure

```bash
codefile/
├── backend/        # FastAPI backend
├── chalo/          # React Native frontend
```

---

# 🚀 Current Development Progress

## Completed

* Modern onboarding UI
* OTP generation backend
* PostgreSQL integration
* Async FastAPI setup
* Phone authentication flow
* GitHub project setup

## In Progress

* OTP verification
* Profile onboarding
* Home feed
* Activity cards
* Nearby meetup system

## Planned

* Real-time chat
* Maps integration
* Push notifications
* AI meetup recommendations
* Dark mode
* Realtime location feed

---

# 🌱 Vision

Chalo is not just another social media app.

The goal is to create a platform where digital interaction leads to genuine real-world connection.

A place where someone can simply say:

> “Chalo, chai peete hain?”

…and actually find people nearby.

---

# 🛠️ Running Locally

## Frontend

```bash
cd chalo
npm install
npx expo start
```

## Backend

```bash
cd backend

source venv/bin/activate

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

# 👨‍💻 Developer

Built with curiosity, ambition, and lots of chai ☕
by Toni Blair.
