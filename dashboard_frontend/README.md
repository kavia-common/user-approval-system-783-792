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

## Notes

- Authentication expects backend JWT endpoints:
  - POST `/auth/login` -> `{ access_token }`
  - POST `/auth/signup`
  - GET `/users/me`
- Analytics endpoints expected:
  - GET `/analytics/overview`
  - GET `/admin/users`
  - GET `/admin/analytics`

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
