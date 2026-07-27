import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ShieldCheck, ArrowLeft, Eye, EyeOff, Mail, Lock, User, IdCard } from 'lucide-react';

export const LoginSignup = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Navigation / View state
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loginTab, setLoginTab] = useState('Student'); // 'Student' | 'Admin'
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // OTP Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        await login(email, password);
        navigate('/home');
      } else {
        // Sign up flow
        await signup({ 
          email, 
          password, 
          name, 
          role: 'Student', 
          department: 'Computer Science',
          studentId 
        });
        setIsOtpModalOpen(true);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setOtpError('');
    setLoading(true);

    try {
      if (otpCode.length < 4) {
        throw new Error('Please enter a valid verification code.');
      }
      await login(email, password);
      setIsOtpModalOpen(false);
      navigate('/home');
    } catch (err) {
      setOtpError(err.message || 'Verification failed. Please check the OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#FAF9F6',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        padding: '36px',
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '8px 8px 0px 0px #000000',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Logo Block — Exact Vercel Reference */}
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '10px',
          background: '#FFEB3B',
          border: '2px solid #000000',
          boxShadow: '2px 2px 0px 0px #000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          fontWeight: 900,
          fontSize: '1.6rem',
          color: '#000000',
          fontFamily: 'var(--font-heading)'
        }}>
          ET
        </div>

        {/* Dynamic Header & Subtitle */}
        <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', marginBottom: '4px', textAlign: 'center', letterSpacing: '-0.5px' }}>
          {authMode === 'login' ? 'Welcome back' : 'Create Account'}
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.9rem', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>
          {authMode === 'login' ? 'Sign in to your account' : 'Join thousands of students'}
        </p>

        {/* Student / Admin Tabs (Only shown in Login Mode) */}
        {authMode === 'login' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            width: '100%',
            marginBottom: '24px'
          }}>
            <button
              type="button"
              onClick={() => { setLoginTab('Student'); setError(''); }}
              style={{
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                border: loginTab === 'Student' ? '2px solid #000000' : '2px solid transparent',
                background: loginTab === 'Student' ? '#E8F5E9' : 'transparent',
                color: '#000000',
                boxShadow: loginTab === 'Student' ? '2px 2px 0px 0px #000000' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => { setLoginTab('Admin'); setError(''); }}
              style={{
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                border: loginTab === 'Admin' ? '2px solid #000000' : '2px solid transparent',
                background: loginTab === 'Admin' ? '#E8F5E9' : 'transparent',
                color: '#000000',
                boxShadow: loginTab === 'Admin' ? '2px 2px 0px 0px #000000' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Admin
            </button>
          </div>
        )}

        {/* Error Alert Box */}
        {error && (
          <div style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            background: '#FFCDD2',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            color: '#991B1B',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuthSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Signup Specific Fields */}
          {authMode === 'signup' && (
            <>
              <div>
                <label htmlFor="signup-name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User className="w-4 h-4" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563', strokeWidth: 2.5 }} />
                  <input
                    id="signup-name"
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: '#FFFFFF',
                      border: '2px solid #000000',
                      borderRadius: '8px',
                      color: '#000000',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      boxShadow: '2px 2px 0px 0px #000000',
                      outline: 'none',
                      transition: 'all 0.15s ease'
                    }}
                    onFocus={(e) => e.currentTarget.style.background = '#FFFDE7'}
                    onBlur={(e) => e.currentTarget.style.background = '#FFFFFF'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Campus Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail className="w-4 h-4" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563', strokeWidth: 2.5 }} />
                  <input
                    id="signup-email"
                    type="email"
                    required
                    placeholder="alex@campus.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: '#FFFFFF',
                      border: '2px solid #000000',
                      borderRadius: '8px',
                      color: '#000000',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      boxShadow: '2px 2px 0px 0px #000000',
                      outline: 'none',
                      transition: 'all 0.15s ease'
                    }}
                    onFocus={(e) => e.currentTarget.style.background = '#FFFDE7'}
                    onBlur={(e) => e.currentTarget.style.background = '#FFFFFF'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-studentId" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Student ID
                </label>
                <div style={{ position: 'relative' }}>
                  <IdCard className="w-4 h-4" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563', strokeWidth: 2.5 }} />
                  <input
                    id="signup-studentId"
                    type="text"
                    required
                    placeholder="STU-2024-0001"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: '#FFFFFF',
                      border: '2px solid #000000',
                      borderRadius: '8px',
                      color: '#000000',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      boxShadow: '2px 2px 0px 0px #000000',
                      outline: 'none',
                      transition: 'all 0.15s ease'
                    }}
                    onFocus={(e) => e.currentTarget.style.background = '#FFFDE7'}
                    onBlur={(e) => e.currentTarget.style.background = '#FFFFFF'}
                  />
                </div>
              </div>
            </>
          )}

          {/* Login Specific Email Field */}
          {authMode === 'login' && (
            <div>
              <label htmlFor="login-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail className="w-4 h-4" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563', strokeWidth: 2.5 }} />
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder={loginTab === 'Admin' ? 'admin@campus.edu' : 'student@campus.edu'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: '#FFFFFF',
                    border: '2px solid #000000',
                    borderRadius: '8px',
                    color: '#000000',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: '2px 2px 0px 0px #000000',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.background = '#FFFDE7'}
                  onBlur={(e) => e.currentTarget.style.background = '#FFFFFF'}
                />
              </div>
            </div>
          )}

          {/* Password Field (Common to Both) */}
          <div>
            <label htmlFor={authMode === 'login' ? 'login-password' : 'signup-password'} style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock className="w-4 h-4" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563', strokeWidth: 2.5 }} />
              <input
                id={authMode === 'login' ? 'login-password' : 'signup-password'}
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={authMode === 'login' ? '••••••••' : 'Min. 6 characters'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  background: '#FFFFFF',
                  border: '2px solid #000000',
                  borderRadius: '8px',
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  boxShadow: '2px 2px 0px 0px #000000',
                  outline: 'none',
                  transition: 'all 0.15s ease'
                }}
                onFocus={(e) => e.currentTarget.style.background = '#FFFDE7'}
                onBlur={(e) => e.currentTarget.style.background = '#FFFFFF'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" style={{ color: '#4B5563', strokeWidth: 2.5 }} />
                ) : (
                  <Eye className="w-4 h-4" style={{ color: '#4B5563', strokeWidth: 2.5 }} />
                )}
              </button>
            </div>
          </div>

          {/* Submit CTA Button */}
          <Button
            type="submit"
            variant={authMode === 'login' ? 'primary' : 'mint'}
            size="lg"
            isLoading={loading}
            style={{ width: '100%', marginTop: '8px', padding: '14px', fontSize: '0.95rem' }}
          >
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

        </form>

        {/* Footer Links Section */}
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
          
          {/* Sign Up Link (Only visible in Student tab during login, or switch back during signup) */}
          {authMode === 'login' && loginTab === 'Student' && (
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setError(''); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#000000',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                textTransform: 'uppercase'
              }}
            >
              Don't have an account? Sign Up Free
            </button>
          )}

          {authMode === 'signup' && (
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setError(''); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#000000',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                textTransform: 'uppercase'
              }}
            >
              Already have an account? Sign In
            </button>
          )}

          {/* Back to Home Link */}
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#4B5563',
              fontWeight: 800,
              fontSize: '0.85rem',
              textDecoration: 'none',
              marginTop: '4px'
            }}
          >
            <ArrowLeft className="w-4 h-4" style={{ strokeWidth: 2.5 }} /> Back to home
          </Link>

        </div>

      </div>

      {/* OTP Verification Modal */}
      <Modal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        title="Cognito Email Verification"
      >
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: '#E8F5E9',
            border: '2px solid #000',
            boxShadow: '2px 2px 0px 0px #000',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <ShieldCheck className="w-8 h-8" style={{ color: '#10B981', strokeWidth: 2.5 }} />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000', textTransform: 'uppercase', marginBottom: '8px' }}>
            Enter 6-Digit OTP Code
          </h3>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', fontWeight: 600, marginBottom: '20px' }}>
            We sent a verification code to <strong style={{ color: '#000' }}>{email}</strong>. Enter it below to activate your account.
          </p>

          {otpError && (
            <div style={{ padding: '10px', background: '#FFCDD2', border: '2px solid #000', color: '#991B1B', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px' }}>
              {otpError}
            </div>
          )}

          <form onSubmit={handleOtpVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="1 2 3 4 5 6"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#FFFFFF',
                border: '2px solid #000000',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '1.4rem',
                letterSpacing: '6px',
                fontWeight: 900,
                boxShadow: '2px 2px 0px 0px #000000',
                outline: 'none'
              }}
            />

            <Button type="submit" variant="mint" size="lg" isLoading={loading} style={{ width: '100%', padding: '14px' }}>
              Verify & Complete Signup
            </Button>
          </form>

          <p style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 700, marginTop: '16px' }}>
            In test/demo mode, enter any 6 digits (e.g. 123456) to proceed.
          </p>
        </div>
      </Modal>
    </div>
  );
};
