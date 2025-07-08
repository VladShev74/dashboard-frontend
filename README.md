# Fitness Center Dashboard Frontend

This is the frontend for the Fitness Center Dashboard, built with **Vue 3**, **Vite**, **Pinia**, and **Tailwind CSS**.
It provides a modern, responsive interface for managing fitness classes and membership plans.

---

## Features

- Class schedule management (add, edit, delete, view)
- Membership plan management (add, edit, delete, view)
- Dashboard with real-time stats (classes today, active plans)
- Clean, mobile-friendly UI

---

## Tech Stack

- Vue 3
- Vite
- Pinia (state management)
- Tailwind CSS (styling)
- Axios (API requests)

---

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/VladShev74/dashboard-frontend.git
   cd dashboard-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add your backend API URL (example):
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will run on port `5173` by default.

---

## Usage

- Make sure the [backend API](https://github.com/VladShev74/dashboard-backend) is running and accessible.
- Access the app at [http://localhost:5173](http://localhost:5173).

---

## Folder Structure

- `src/components` — Vue components (HomePage, ClassSchedule, MemberPlans, etc.)
- `src/stores` — Pinia stores for state management
- `src/assets` — Static assets (images, icons, etc.)

---

## Related

- [dashboard-backend](https://github.com/VladShev74/dashboard-backend) — Node.js/Express/MongoDB backend for this app

---

## License

MIT
