# **PulsePen**

Dynamic Blogging Platform where users can explore, write, and share articles seamlessly.

## **Overview**

PulsePen is a full-stack blogging platform with rich features for readers, writers, and administrators. It offers users the ability to browse articles as guests, while registered users can enjoy personalized experiences like writing and managing articles. Admins have powerful tools to manage users and content.

### **Key Features**

- **Guest Access**: 
  - Read articles without signing in.
  - Search and sort articles by category or date.

- **User Account**:
  - Register via email/password or Google authentication.
  - Update profile details anytime.
  - Comment on articles.

- **Writer Account**:
  - Switch to writer mode to publish articles.
  - Manage (edit/delete) published articles.

- **Admin Features**:
  - Access an admin dashboard.
  - Manage users (view/remove users).
  - Manage posts (view/remove articles).

---

## **Demo**

[Watch the Demo](https://youtu.be/DoTnMPMpBE4)

---

## **Tech Stack**

- **Frontend**: React.js, Redux, TailwindCSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication, JWT (JSON Web Tokens)

---

## **Installation and Setup**

### **Prerequisites**

Make sure you have the following installed:
- Node.js
- MongoDB

### **Steps to Run Locally**

1. **Clone the Repository**:
   - `git clone https://github.com/your-username/pulsepen.git`
   - `cd pulsepen`
2. **Install Dependencies**:
    - For the backend: 
       - `cd api`
       - `npm install`
    - For the frontend: 
       - `cd Client`
       - `npm install`
3. **Run the Application**:
    - Start the backend server:
       - `cd api`
       - `npm run dev`
    - Start the frontend:
       - `cd Client`
       - `npm run dev`
4. **Open the App: Navigate to `http://localhost:5173` in your browser.**
 
---

## **Project Structure**
```plaintext
PulsePen/
├── api/                     # Backend (Node.js, Express)
│   ├── controllers/         # Business logic for routes
│   ├── models/              # Mongoose models (schemas)
│   ├── routes/              # API route definitions
│   ├── utils/               # Utility functions
│   └── index.js             # Backend entry point
├── Client/                  # Frontend (React with Vite)
│   ├── dist/                # Production build
│   ├── public/              # Static files
│   ├── src/                 # Source code
│       ├── assets/          # Images and other assets
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page components (views)
│       ├── redux/           # State management using Redux
│       ├── App.jsx          # Main app component
│       ├── firebase.js      # Firebase configuration
│       ├── index.css        # Global styles
│       └── main.jsx         # React app entry point
├── .env                     # Environment variables
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration for React
├── README.md                # Documentation (this file)
├── package.json             # Project metadata and dependencies
└── .gitignore               # Files to ignore in Git
```
---

### **Usage**
1. **Browse**: Explore articles as a guest.
2. **Register**: Create an account or use Google to log in.
3. **Write**: Switch to writer mode to publish and manage articles.
4. **Administer**: Manage users and content via the admin dashboard.
