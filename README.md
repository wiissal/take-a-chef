# 🍽️ Take A Chef

> A mobile application connecting independent chefs with customers seeking high-quality culinary services

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Timeline](#project-timeline)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

**Take A Chef** is a mobile application developed as part of the SIMPLON Mobile Development training program. The app addresses the challenge faced by independent chefs and small restaurants in Morocco to reach a wider audience while providing customers with an innovative way to discover local culinary talent and book at-home chef services.

### Problem Statement

Independent chefs and small restaurants struggle with:
- Limited reach to potential customers
- Inefficient booking management
- Lack of digital presence

### Solution

A mobile platform that:
- Connects chefs directly with customers
- Enables easy chef discovery and menu consultation
- Streamlines the booking process
- Provides a secure, user-friendly experience

---

## ✨ Features

### For Customers 👤

- **Authentication & Security**
  - Secure signup/login with JWT
  - Token refresh mechanism
  - Password recovery

- **Chef Discovery**
  - Browse available chefs
  - Search and filter functionality
  - View detailed chef profiles and menus

- **Booking System**
  - Select date and time
  - Instant booking confirmation
  - Booking history and management
  - Modify or cancel reservations

- **Reviews & Ratings**
  - Leave reviews for chefs
  - Rate culinary experiences
  - View other customer feedback

### For Chefs 👨‍🍳

- **Profile Management**
  - Create and customize chef profile
  - Upload portfolio images
  - Set availability calendar

- **Menu Management**
  - Add/edit/delete dishes
  - Set pricing
  - Manage special offers

- **Booking Management**
  - Receive booking notifications
  - Accept or reject requests
  - Update booking status

- **Dashboard**
  - View earnings statistics
  - Track ratings and reviews
  - Monitor reservations

### Admin Features 🛠️ (Optional)

- User management
- Content moderation
- Platform statistics

---

## 🛠️ Tech Stack

### Backend

```
Node.js 18+
Express.js
PostgreSQL / MySQL
Sequelize 
JWT Authentication
bcrypt (Password Hashing)
Swagger (API Documentation)
Jest  (Testing)
```

### Frontend (Mobile)

```
React Native
Expo
Expo Router
Zustand (State Management)
Axios
Expo SecureStore
AsyncStorage
```

### DevOps

```
Docker & docker-compose
Railway 
Git & GitHub
GitHub Actions (CI/CD - Optional)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker and Docker Compose
- Expo CLI
- PostgreSQL (or MySQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wiissal/take-a-chef.git
   cd take-a-chef
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your .env file with database credentials
   npm run migrate
   npm run seed
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure your API endpoint
   npx expo start
   ```

4. **Docker Setup (Alternative)**
   ```bash
   docker-compose up --build
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/takeachef
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
```

---

## 🏗️ Architecture

### Database Schema

```
Users (customers & chefs)
├── Profiles
├── Menus
│   └── Dishes
├── Bookings
└── Reviews
```

### API Structure

```
/api/v1
├── /auth
│   ├── POST /register
│   ├── POST /login
│   └── POST /refresh
├── /chefs
│   ├── GET /
│   ├── GET /:id
│   └── GET /:id/menu
├── /bookings
│   ├── POST /
│   ├── GET /
│   ├── PUT /:id
│   └── DELETE /:id
└── /reviews
    ├── POST /
    └── GET /chef/:id
```

### Project Structure

```
take-a-chef/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── config/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── store/
│   │   ├── services/
│   │   └── utils/
│   ├── assets/
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 📚 API Documentation

API documentation is available via Swagger UI:

- **Local**: `http://localhost:3000/api-docs`
- **Production**: `https://your-app.railway.app/api-docs`

You can also import the Postman collection from `/docs/postman_collection.json`

---

## 🔒 Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt (10 rounds)
- SQL injection protection via ORM
- Input validation and sanitization
- HTTPS in production
- Secure token storage (Expo SecureStore)
- Rate limiting on API endpoints

---

## 📊 Performance Optimization

- API response time target: < 500ms
- Pagination: 10 items per page
- Image optimization and compression
- Database indexing on frequently queried fields
- Efficient state management with Zustand

---

## 🐳 Deployment

### Docker Deployment

```bash
# Build images
docker-compose build

# Run containers
docker-compose up -d

# View logs
docker-compose logs -f
```

### Production Deployment

The application is deployed on:
- **Backend**: Railway / Render
- **Database**: Railway PostgreSQL
- **Mobile App**: Expo Go (Development) / EAS Build (Production)

---

## 📅 Project Timeline

| Phase | Deadline | Status |
|-------|----------|--------|
| Planning & UML | 22/12/2025 | ✅ |
| Backend Development | 05/01/2026 | 🔄 |
| Frontend Integration | 19/01/2026 | ⏳ |
| Dockerization | 26/01/2026 | ⏳ |
| Presentation | 30/01/2026 | ⏳ |
| **Final Deadline** | **01/02/2026** | ⏳ |

---

## 📝 Documentation

Complete documentation is available in the `/docs` folder:

- Requirements Specification
- UML Diagrams (Use Case, Class, Sequence)
- API Documentation (Swagger)
- Docker Guide
- SQL Schema
- Postman Collection

---

## ✅ Success Criteria

### Technical
- ✅ Deployed and accessible API
- ✅ Functional mobile application
- ✅ All user stories implemented
- ✅ Tests passing (80%+ coverage)
- ✅ Clean, documented code

### Professional
- ✅ Complete documentation
- ✅ Well-designed architecture
- ✅ Production-ready deployment

---

## 🤝 Contributing

This is an educational project developed as part of SIMPLON training. Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Wissal Ouboudjemaa**

- Training: Mobile Development @ SIMPLON
- Project: Projet Fil Rouge
- Duration: 4 months

---

## 📄 License

This project is part of an educational program and is available for learning purposes.

---


<div align="center">

**Made with ❤️ for the culinary community**


</div>
