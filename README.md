# Take-a-Chef - Private Chef Booking Platform

> Mobile application connecting clients with professional private chefs for personalized dining experiences at home.

## 📱 Project Overview

Take-a-Chef is a full-stack mobile application built with React Native (Expo) and Node.js that allows users to discover, book, and review private chefs. The platform features a dual-interface for both customers seeking culinary experiences and chefs offering their services.

### Key Features
- 🔐 Secure authentication (JWT) for customers and chefs
- 👨‍🍳 Chef discovery with search and filtering
- 📅 Real-time booking system with status tracking
- ⭐ Rating and review system
- 📱 Beautiful, intuitive mobile interface
- 🔔 Booking history and profile management

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React Native + Expo
- **Navigation:** Expo Router (file-based routing)
- **State Management:** Zustand
- **Data Fetching:** React Query (@tanstack/react-query)
- **HTTP Client:** Axios
- **Secure Storage:** Expo SecureStore
- **UI/UX:** Custom components with Ionicons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcryptjs
- **Documentation:** Swagger/OpenAPI
- **Environment:** dotenv

---

## 📁 Project Structure
```
take-a-chef/
├── frontend/               # React Native mobile app
│   ├── app/               # Expo Router screens
│   │   ├── (auth)/       # Authentication screens
│   │   ├── (tabs)/       # Main app tabs
│   │   ├── chef/         # Chef profile screens
│   │   ├── booking/      # Booking screens
│   │   └── _layout.jsx   # Root layout with navigation guards
│   ├── src/
│   │   ├── config/       # API & React Query config
│   │   ├── stores/       # Zustand stores
│   │   └── hooks/        # Custom React hooks
│   └── constants/        # Theme & constants
│
└── backend/               # Node.js REST API
    ├── src/
    │   ├── config/       # Database & Swagger config
    │   ├── controllers/  # Route handlers
    │   ├── models/       # Sequelize models
    │   ├── routes/       # Express routes
    │   ├── middlewares/  # Auth & error middlewares
    │   └── seeders/      # Database seeders
    └── server.js         # Express app entry point
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (for emulators)

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file in the backend directory:
```env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=take_a_chef
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=15m
```

4. **Create PostgreSQL database:**
```bash
psql -U postgres
CREATE DATABASE take_a_chef;
\q
```

5. **Run database seeder:**
```bash
npm run seed
```

6. **Start backend server:**
```bash
npm start
```

Backend will run on `http://localhost:3000`
API Documentation available at `http://localhost:3000/api-docs`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API endpoint:**
Update `src/config/api.js` with your backend IP:
```javascript
const API_URL = 'http://YOUR_IP_ADDRESS:3000/api';
```

4. **Start Expo development server:**
```bash
npx expo start
```

5. **Run on device/emulator:**
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app for physical device

---

## 🧪 Test Credentials

### Customers
- Email: `sami@gmail.com`
- Password: `samisami`

### Chefs
- Email: `chef00@gmail.com`
- Password: `1234567`
- Other chefs: `susur@takeachef.com`, `mohamed@takeachef.com`, etc.

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Chef Endpoints
- `GET /chefs` - List all chefs (with pagination & search)
- `GET /chefs/:id` - Get chef details
- `GET /chefs/:id/dishes` - Get chef's dishes
- `GET /chefs/:id/reviews` - Get chef's reviews

### Booking Endpoints
- `GET /bookings` - Get user's bookings
- `GET /bookings/:id` - Get booking details
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking status

### User Endpoints
- `GET /users/profile` - Get user profile
- `PUT /users/change-password` - Change password

### Review Endpoints
- `POST /reviews` - Create review for booking

**Full API documentation:** http://localhost:3000/api-docs

---

## 🐳 Docker Deployment

### Using Docker Compose

1. **Build and run containers:**
```bash
docker-compose up --build
```

2. **Stop containers:**
```bash
docker-compose down
```

3. **Run with database persistence:**
```bash
docker-compose up -d
```

### Manual Docker Build

**Backend:**
```bash
cd backend
docker build -t take-a-chef-backend .
docker run -p 3000:3000 take-a-chef-backend
```

---

## 📊 Database Schema

### Tables
- `users` - User accounts (customers & chefs)
- `customers` - Customer profiles
- `chefs` - Chef profiles with specialties
- `dishes` - Chef's menu items
- `bookings` - Booking records with status
- `reviews` - Customer reviews with ratings

### Key Relationships
- User → Customer (1:1)
- User → Chef (1:1)
- Chef → Dishes (1:N)
- Customer → Bookings (1:N)
- Chef → Bookings (1:N)
- Booking → Review (1:1)

---

## 🎯 Features Implemented

### Authentication & Authorization
- ✅ User registration with role selection (customer/chef)
- ✅ Secure login with JWT tokens
- ✅ Token persistence with Expo SecureStore
- ✅ Protected routes and navigation guards
- ✅ Profile management

### Customer Features
- ✅ Browse and search chefs by specialty
- ✅ View chef profiles with dishes and reviews
- ✅ Create bookings with date, guests, and preferences
- ✅ Track booking status (pending, confirmed, completed, cancelled)
- ✅ Leave reviews and ratings after completed bookings
- ✅ View booking history

### Chef Features
- ✅ Chef profile with bio, specialty, and rating
- ✅ Dish portfolio with images and prices
- ✅ Receive booking requests
- ✅ View booking history

### UI/UX
- ✅ Splash screen and onboarding
- ✅ Role-based background images (food for customers, kitchen for chefs)
- ✅ Intuitive tab navigation
- ✅ Beautiful cards and layouts
- ✅ Loading states and error handling

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Secure token storage (Expo SecureStore)
- Protected API routes with middleware
- SQL injection prevention via Sequelize ORM
- Environment variable protection

---

## 📱 App Screens

1. **Splash Screen** - App branding and initialization
2. **Onboarding** - 3-slide introduction (shown once)
3. **Login/Register** - Role-based authentication with backgrounds
4. **Home** - Chef discovery with search and filters
5. **Chefs List** - Browse all available chefs
6. **Chef Profile** - View menu, reviews, and book
7. **Booking Form** - Create booking with preferences
8. **Confirmation** - Booking success screen
9. **History** - View bookings (Upcoming, Pending, History)
10. **Booking Details** - View details and leave review
11. **Profile** - User settings and account management

---

## 🧑‍💻 Development Team

**Student:** Wissal
**Program:** SIMPLON Full-Stack Development Training
**Project:** Projet Fil Rouge (Final Capstone Project)
**Deadline:** February 1, 2026

---

## 📄 License

This project is developed as part of the SIMPLON training program.

---

## 🆘 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure port 3000 is not in use

### Frontend can't connect to backend
- Update API_URL in `src/config/api.js` with your computer's IP
- Ensure backend server is running
- Check firewall settings

### Database errors
- Run seeder: `npm run seed`
- Check database exists: `psql -U postgres -l`
- Verify connection string in `.env`

---

## 📞 Contact & Support

For questions about this project, please contact the development team.

**Email:** wissaloa1@gmail.com 
**Repository:** [[GitHub Link](https://github.com/wiissal/take-a-chef.git)]