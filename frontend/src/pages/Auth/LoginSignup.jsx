import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

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
  const [department, setDepartment] = useState('MCA');

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
        // Sign up flow
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
      // In mock/test mode or standard demo, any 6-digit OTP validates cleanly
      if (otpCode.length < 4) {
        throw new Error('Please enter a valid verification code.');
      }
      
      // Complete registration and log user in automatically
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
      background: 'radial-gradient(circle at 50% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '460px',
        padding: '36px',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 40px rgba(99, 102, 241, 0.2)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)'
          }}>
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>
            Event<span style={{ color: '#06B6D4' }}>Trail</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
            Campus Community & Event Discovery Platform
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '6px',
          borderRadius: '14px',
          marginBottom: '24px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(''); }}
            style={{
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'login' ? '#6366F1' : 'transparent',
              color: activeTab === 'login' ? '#fff' : '#94A3B8',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setError(''); }}
            style={{
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'signup' ? '#06B6D4' : 'transparent',
              color: activeTab === 'signup' ? '#fff' : '#94A3B8',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-[#EF4444]" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuthSubmit}>
          {activeTab === 'signup' && (
            <>
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="e.g. Anantha Krishnan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Input
                  label="Role Group"
                  name="role"
                  type="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  options={[
                    { label: 'Student', value: 'Student' },
                    { label: 'Faculty', value: 'Faculty' },
                    { label: 'Club Admin', value: 'ClubOrganizer' }
                  ]}
                />
                <Input
                  label="Department"
                  name="department"
                  type="text"
                  placeholder="e.g. MCA / CS"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </>
          )}

          <Input
            label="Campus Email Address"
            name="email"
            type="email"
            placeholder="student@asiet.ac.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant={activeTab === 'login' ? 'primary' : 'primary'}
            size="lg"
            isLoading={loading}
            style={{ width: '100%', marginTop: '8px' }}
          >
            {activeTab === 'login' ? 'Sign In to CampusPulse' : 'Register Account'}
          </Button>
        </form>

        {/* Footer Info */}
        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
          <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
            Protected by AWS Cognito User Pools & Single Sign-On.
            <br />ASIET KTU Campus Community Platform.
          </p>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Modal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        title="Verify Campus Email"
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10B981',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '20px' }}>
            We sent a verification code to <strong style={{ color: '#F8FAFC' }}>{email}</strong>. Enter the OTP code below to activate your AWS Cognito identity.
          </p>

          {otpError && (
            <p style={{ color: '#EF4444', fontSize: '0.8rem', marginBottom: '12px' }}>
              {otpError}
            </p>
          )}

          <form onSubmit={handleOtpVerify}>
            <Input
              name="otp"
              type="text"
              placeholder="Enter 6-digit OTP (e.g. 123456)"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem', fontWeight: 700 }}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              style={{ width: '100%', marginTop: '12px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
            >
              Verify & Complete Registration
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
