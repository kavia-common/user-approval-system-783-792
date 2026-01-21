import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// PUBLIC_INTERFACE
export function ProtectedRoute() {
  /** Requires authenticated user; redirects to /login if not present. */
  const { isAuthenticated, initializing } = useContext(AuthContext);
  if (initializing) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// PUBLIC_INTERFACE
export function PublicOnlyRoute() {
  /** Blocks authed users from visiting auth pages; redirects to /dashboard. */
  const { isAuthenticated, initializing } = useContext(AuthContext);
  if (initializing) return null;
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
