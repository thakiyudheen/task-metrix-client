# Writing the README content to a file
readme_content = """
# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### 1. **Authentication**
- Implemented Google authentication using **Google OAuth** for seamless login.
- Included **email and password-based authentication** for users who prefer traditional login methods.
- Designed secure backend APIs to handle authentication, using JWT for session management.

### 2. **Axios Configuration**
- Configured Axios for API requests with a custom instance to handle:
  - Base URL configuration.
  - Global headers (e.g., authorization tokens).
  - Error handling and response interceptors.
- Centralized the API logic for consistent and reusable network requests.

### 3. **Styling**
- Utilized **Tailwind CSS** for rapid and responsive UI development.
- Ensured the design is clean, modern, and customizable with utility-first CSS classes.
- Incorporated **dark mode** support for improved user experience.

### 4. **Reusable Components**
- Created reusable components for scalability and consistency, including:
  - **InputField**: A customizable and reusable input field with validation support.
  - **Button**: A consistent button component for actions across the app.
  - **Modal**: A modal component for pop-ups and alerts.
- Leveraged **React Icons** for consistent and lightweight icons across the app.

### 5. **Responsive Design**
- Optimized the layout for all devices, ensuring the app works flawlessly on desktops, tablets, and mobile devices.

### 6. **Other Libraries**
- Used `Formik` and `Yup` for form validation and handling complex forms efficiently.
- Implemented state management using `React Context` for lightweight and centralized state handling.

---

## Screenshots

Here are some screenshots from the application:

### 1. **Login Page**
![Login Page](./public/tasks-signup.png)

### 2. **Dashboard**
![Dashboard](./public/tasks-home.png)



---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
