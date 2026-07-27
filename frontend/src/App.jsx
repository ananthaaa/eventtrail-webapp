import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { LoginSignup } from './pages/Auth/LoginSignup';
import { StudentHome } from './pages/Home/StudentHome';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0F19',
        color: '#6366F1',
        fontSize: '1.2rem',
        fontWeight: 700
      }}>
        Loading EventTrail...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginSignup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <StudentHome />
            </ProtectedRoute>
          }
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/auth"} replace />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
