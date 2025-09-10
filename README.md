# 🔐 Authentication MERN Stack – Tanveer Ahmed

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4433FF?style=for-the-badge&logo=zustand&logoColor=white)
![Mailtrap](https://img.shields.io/badge/Mailtrap-009688?style=for-the-badge&logo=mailtrap&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

📂 **GitHub Repository**: [https://github.com/tanveera2001/authentication-mern-stack](https://github.com/tanveera2001/authentication-mern-stack)

A **full-stack authentication system** built with the **MERN stack**. Includes **secure signup, email verification, login, forgot/reset password, protected dashboard, and logout functionality**.  

---

## 📑 Table of Contents

- [🚀 Features](#-features)
- [📝 Problems & Solutions](#-problems--solutions)
- [🛠 Tech Stack](#-tech-stack)
- [📸 Screenshots](#-screenshots)
- [📡 API Endpoints](#-api-endpoints)
- [📌 Future Improvements](#-future-improvements)
- [👤 Author](#-author)

---

## 🚀 Features  

- 👤 **Sign Up** – Create account with name, email, and secure password validation  
- ✉️ **Email Verification** – 6-digit OTP code sent to user’s email (via Mailtrap for testing)  
- 🔑 **Login** – Access with email & password  
- 🔒 **Protected Dashboard** – Only accessible after login, showing profile & account activity  
- 🔄 **Forgot & Reset Password** – Reset password via email link  
- 🚪 **Logout** – End session securely  
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile  

---

## 📝 Problems & Solutions  

1. **Problem:** When loading the dashboard, it showed a **white screen**.  
   **Solution:** Solved it by **normalizing the user** in both the **frontend (authStore)** and **backend (authController)** so that user data was always consistent and available before rendering.  

2. **Problem:** Password validation wasn’t working consistently.  
   **Solution:** Added **password rules (minLength, uppercase, lowercase, number, special char)** and real-time feedback for the user.  

3. **Problem:** Email verification input was tricky for UX.  
   **Solution:** Used **auto-focus navigation** between 6 OTP fields, plus **paste support** for the code.  

4. **Problem:** Reset password flow sometimes failed with expired tokens.  
   **Solution:** Implemented **token validation and expiry check** in backend, showing user-friendly errors.  
---

## 🛠 Tech Stack  

| Stack | Technologies |
| :-- | :-- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-4433FF?style=for-the-badge&logo=zustand&logoColor=white) |
| **Backend / API** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) |
| **Email / Communication** | ![Mailtrap](https://img.shields.io/badge/Mailtrap-009688?style=for-the-badge&logo=mailtrap&logoColor=white) |
| **Deployment / Hosting** | Local Development (future plan: Vercel/Render) |

---

## 📸 Screenshots  

**Sign Up Page:**  
![Sign Up Page](images-readme/auth-signup.png)  

**Email Verification:**  
![Email Verification](images-readme/auth-verify.png)  

**Login Page:**  
![Login Page](images-readme/auth-login.png)  

**Forgot Password:**  
![Forgot Password](images-readme/auth-forgot.png)  

**Reset Password:**  
![Reset Password](images-readme/auth-reset.png)  

**Dashboard:**  
![Dashboard](images-readme/auth-dashboard.png)  

---

## 📡 API Endpoints  

| Method | Endpoint                  | Description |
| ------ | ------------------------- | ----------- |
| POST   | /api/auth/signup          | Register new user |
| POST   | /api/auth/verify-email    | Verify email with 6-digit code |
| POST   | /api/auth/login           | Login user |
| POST   | /api/auth/forgot-password | Send reset link |
| POST   | /api/auth/reset-password/:token | Reset user password |
| GET    | /api/auth/me              | Get logged-in user details |
| POST   | /api/auth/logout          | Logout user |

---

## 📌 Future Improvements  

- ✅ Add **Google OAuth / Social Login**  
- ✅ Role-based authentication (Admin, User)  
- ✅ Add Refresh Token system  
- ✅ Implement 2FA (Two-Factor Authentication)  

---

## 👤 Author  

**[Tanveer Ahmed]**

- 📧 Email: [tanveera2001@gmail.com](mailto:tanveera2001@gmail.com)  
- 💼 LinkedIn: [https://www.linkedin.com/in/md-tanveer-ahmed-23b06023b/](https://www.linkedin.com/in/md-tanveer-ahmed-23b06023b/)  
- 💻 GitHub: [https://github.com/tanveera2001](https://github.com/tanveera2001)  
