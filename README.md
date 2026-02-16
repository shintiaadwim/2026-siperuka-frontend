# 2026 PraPDBL Siperuka - Frontend

Frontend application for the **Campus Room Booking System (Siperuka)** built using React, TypeScript, and Vite.

## Description

This application is designed to manage campus room bookings online. Users can reserve rooms, view booking history, manage booking statuses, administer room and user.

## Main Features

* **Room Booking:** Users can reserve available rooms based on the schedule.
* **Booking History:** View previously made room reservations.
* **Room Management:** Admins can add, edit, and delete room data.
* **Booking Status Management:** Admins can manage booking statuses (e.g., pending, approved, rejected, completed, etc.).
* **User Management:** Admins can manage system users.
* **Pagination & Filter:** Booking and history data can be paginated and filtered.

## Tech Stack

* React + TypeScript v19.2.4
* Vite (build tool)
* MUI (Material UI)
* React Router (navigation)

---

## Environment Variables

This project requires environment variables to connect to the backend API.

Create a `.env` file in the root directory and add the following:

```env
VITE_API_URL=http://localhost:5000/api
```

Make sure the backend server is running before starting the frontend application.

If needed, you can create a `.env.example` file:

```env
VITE_API_URL=your_backend_url_here
```

---

## Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The application will run on:

```
http://localhost:5173
```

---

## Important Folder Structure

* `src/pages/` — Main pages (Booking, History, Rooms, etc.)
* `src/components/` — UI components
* `src/hooks/` — Custom hooks for data fetching
* `src/services/` — Backend/API integration

---

© 2026 Siperuka
---