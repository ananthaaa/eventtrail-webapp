import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const LoginSignup = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');
  const [department, setDepartment] = useState('Computer Science');

  // OTP Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await login(email, password);
        navigate('/home');
      } else {
        await signup({ email, password, name, role, department });
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
      background: '#FAF9F6'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        padding: '36px',
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '8px 8px 0px 0px #000000',
        borderRadius: '16px'
      }}>
        {/* Back Link */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.85rem', color: '#000', textTransform: 'uppercase', marginBottom: '20px' }}>
          <ArrowLeft className="w-4 h-4" style={{ strokeWidth: 2.5 }} /> Back to Home
        </Link>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: '#FFEB3B',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0px 0px #000000',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            fontWeight: 900,
            fontSize: '1.75rem',
            color: '#000000',
            fontFamily: 'var(--font-heading)'
          }}>
            ET
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            Event Trail Portal
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
            {activeTab === 'login' ? 'Sign in to access your campus dashboard' : 'Create an ASIET campus account'}
          </p>
        </div>

        {/* Tab Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '28px'
        }}>
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(''); }}
            style={{
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              border: '2px solid #000000',
              background: activeTab === 'login' ? '#FFEB3B' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'login' ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setError(''); }}
            style={{
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              border: '2px solid #000000',
              background: activeTab === 'signup' ? '#E8F5E9' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'signup' ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            padding: '14px',
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

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {activeTab === 'signup' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Anantha Krishnan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="input-field"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Student">Student</option>
                    <option value="ClubOrganizer">Organizer</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Administrator">Admin</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="input-field"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Computer Science">CSE / MCA</option>
                    <option value="Electronics">ECE</option>
                    <option value="Electrical">EEE</option>
                    <option value="Mechanical">ME</option>
                    <option value="Civil">CE</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>Campus Email</label>
            <input
              type="email"
              required
              placeholder="student@asiet.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            style={{ width: '100%', marginTop: '12px', padding: '16px', fontSize: '1rem' }}
          >
            {activeTab === 'login' ? 'Sign In to Portal' : 'Create Free Account'}
          </Button>

        </form>

        {/* Demo Credentials Hint */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#FFFDE7',
          border: '2px solid #000000',
          boxShadow: '2px 2px 0px 0px #000000',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: '#374151',
          fontWeight: 700,
          textAlign: 'center'
        }}>
          💡 <span style={{ color: '#000', fontWeight: 800, textTransform: 'uppercase' }}>Demo Access:</span> You can sign in with any valid email format or register a new mock account instantly.
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
              className="input-field"
              style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '6px', fontWeight: 900 }}
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
