# Book Store MERN Stack

## Group 11 Information
- **Members:**
  - Thuận
  - Phát

## Project Overview
The Book Store project is an online bookstore website built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

### Key Features
- **User:**
  - Login/Register (integrated with Firebase Authentication)
  - Search and filter books by various criteria
  - Shopping cart and checkout
  - Track orders
  - View purchase history

- **Admin:**
  - Manage books (CRUD operations)
  - Manage orders
  - Revenue statistics
  - Dashboard with key metrics

## Technologies Used
- **Frontend:**
  - React.js
  - Redux Toolkit
  - Tailwind CSS
  - React Router DOM
  - Axios
  - React Hook Form
  - React Icons
  - React Toastify
  - Swiper

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT
  - Cors

- **Authentication:**
  - Firebase

## Installation Guide

### System Requirements
- Node.js
- MongoDB
- Git

### Installation Steps

1. **Clone the repository**

```bash
git clone [Repository URL]
```

2. **Install backend dependencies**

```bash
cd admin
npm install
```

3. **Install frontend dependencies**

```bash
cd client
npm install
```

4. **Create a .env file in the admin folder**

```
PORT=5000
MONGODB_URI=[Your MongoDB URL]
```

5. **Create a .env file in the client folder**

```
VITE_FIREBASE_API_KEY=[Firebase API Key]
VITE_FIREBASE_AUTH_DOMAIN=[Firebase Auth Domain]
VITE_FIREBASE_PROJECT_ID=[Firebase Project ID]
VITE_FIREBASE_STORAGE_BUCKET=[Firebase Storage Bucket]
VITE_FIREBASE_MESSAGING_SENDER_ID=[Firebase Sender ID]
VITE_FIREBASE_APP_ID=[Firebase App ID]
```

6. **Run the application**

**Backend:**
```bash
cd admin
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

The application will run at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Default Admin Account
- Username: admin
- Password: 123456

## Contributions

If you would like to contribute to this project, please create a pull request or contact us via email.

## Contact

- **Thuận:** 22110240@student.hcmute.edu.vn
- **Phát:** 22110197@student.hcmute.edu.vn

