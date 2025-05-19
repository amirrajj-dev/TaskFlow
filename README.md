# 📝 TaskFlow 💚🖤

A modern, full-stack Todo application built with **Next.js**, **Prisma**, and **TypeScript** featuring user authentication, task management, and real-time updates. Manage your tasks efficiently with priority and status tracking!

**🚀 Live Demo:** [https://task-flow-tau-eight.vercel.app/](https://task-flow-tau-eight.vercel.app/)

---

## 🚀 Features

- 🔐 **User Authentication** (Signup, Signin, Logout)  
- 🗂️ **Task Management** (Add, Update, Delete, View Tasks)  
- 🎯 **Task Priorities** (Low, Medium, High) and **Status** (Pending, In Progress, Completed)  
- 🛡️ Secure password handling with bcrypt  
- 📅 Due date for tasks with date validation  
- 🔄 Real-time UI updates with Next.js server actions and cache revalidation  
- 🌗 Dark and Light theme support with `next-themes`  
- ⚡ Optimized performance using TurboPack and Prisma's efficient ORM  
- 💾 Persistent client state management with Zustand + persistence middleware  
- 🛠️ Fully typed with TypeScript for enhanced developer experience  
- 📦 Fully integrated with Tailwind CSS for styling and Radix UI for accessible components

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40" />&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" width="40" height="40" />&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40" />&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="Prisma" width="40" height="40" />&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40" height="40" />&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" width="40" height="40" />&nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zustand/zustand-original.svg" alt="Zustand" width="40" height="40" />
</p>

---

## 📦 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your .env file with the following variables:

  ```bash
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Generate Prisma client and run migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Run the project:
    ```bash
    npm run build
    npm run start
    ```

## Hope You like it my firend 😉
