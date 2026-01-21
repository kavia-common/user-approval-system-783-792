# Lightweight React Template for KAVIA

This project provides a minimal React template extended into a social media analytics dashboard UI.

## Features

- Routes: Login, Signup, Dashboard, Profile, Admin
- Sidebar + Topbar layout (Light theme, #3B82F6 and #F59E0B accents)
- Env-configured API client for backend REST (JWT auth)
- Responsive, modern UI with minimal dependencies

## Getting Started

1. Copy `.env.example` to `.env` and set:
   - `REACT_APP_API_BASE_URL` (e.g., `http://localhost:3001`)
   - `REACT_APP_AUTH_TOKEN_KEY` (optional, defaults to `auth_token`)

2. Install dependencies:
   - `npm install`

3. Run:
   - `npm start` (http://localhost:3000)

## Backend Compatibility

This frontend expects a FastAPI backend running at `REACT_APP_API_BASE_URL` (default: `http://localhost:3001`) with endpoints:
- POST `/auth/login` -> `{ access_token }`
- POST `/auth/register`
- GET `/users/me`
- PUT `/users/me/profile`
- GET `/analytics/me`
- Admin:
  - GET `/users`
  - GET `/analytics/platform`

## End-to-End Flow Verification

- User signup/login:
  1) Signup at /signup (creates account via POST /auth/register)
  2) Login at /login (stores JWT, fetches /users/me)

- View dashboard analytics:
  - After login, /dashboard loads analytics via GET `/analytics/me`

- Profile edit:
  - /profile loads user and allows saving with PUT `/users/me/profile`

- Admin:
  - /admin lists users via GET `/users` and platform analytics via GET `/analytics/platform` (requires admin JWT)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
