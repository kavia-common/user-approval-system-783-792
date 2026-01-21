/**
 * AuthContext: provides auth state (token presence), user profile, and actions.
 */
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth state and helpers to the app. */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const loadMe = useCallback(async () => {
    try {
      const data = await api.me();
      setUser(data);
    } catch {
      // Not logged in or token invalid
      setUser(null);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    // On mount, try to load current user if token exists
    const token = api.getToken();
    if (token) {
      loadMe();
    } else {
      setInitializing(false);
    }
  }, [loadMe]);

  const login = useCallback(async (email, password) => {
    const res = await api.login({ email, password });
    await loadMe();
    return res;
  }, [loadMe]);

  const logout = useCallback(() => {
    api.clearToken();
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    initializing,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser: loadMe,
    setUser,
  }), [user, initializing, login, logout, loadMe]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
