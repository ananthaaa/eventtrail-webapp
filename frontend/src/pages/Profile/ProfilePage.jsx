import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { User, Mail, Building, Tag, LogOut, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || 'MCA');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      await updateProfile({ name, department });
      setIsEditing(false);
      setSuccessMsg('Profile updated successfully in AWS RDS MySQL.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tags = ['Cloud Computing', 'Artificial Intelligence', 'Hackathons', 'Web Development', 'KTU Sports'];

  return (
    <div className="container" style={{ padding: '32px 20px', paddingBottom: '96px', maxWidth: '800px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <User className="w-6 h-6 text-[#06B6D4]" />
        <span style={{ color: '#06B6D4', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
          Identity & Personalization
        </span>
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '28px' }}>
        User Profile
      </h1>

      {successMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#34D399',
          padding: '12px 16px',
          borderRadius: '12px',
          marginBottom: '20px',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Identity Card */}
      <div className="glass-card" style={{ padding: '32px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#fff',
            boxShadow: '0 0 30px rgba(99,102,241,0.4)'
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>

          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F8FAFC' }}>
                {user.name}
              </h2>
              <span style={{
                background: 'rgba(99,102,241,0.2)',
                color: '#818CF8',
                padding: '4px 12px',
                borderRadius: '99px',
                border: '1px solid rgba(99,102,241,0.4)',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {user.role}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '0.9rem' }}>
              <Mail className="w-4 h-4 text-[#06B6D4]" />
              <span>{user.email}</span>
            </div>
          </div>

          {!isEditing && (
            <Button variant="secondary" size="md" onClick={() => setIsEditing(true)}>
              <span>Edit Details</span>
            </Button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave}>
            <Input
              label="Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Department / Course"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <Button type="submit" variant="primary" size="md" isLoading={loading}>
                <span>Save Changes</span>
              </Button>
              <Button type="button" variant="ghost" size="md" onClick={() => setIsEditing(false)}>
                <span>Cancel</span>
              </Button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                DEPARTMENT
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building className="w-4 h-4 text-[#6366F1]" />
                {user.department || 'Campus Student'}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                COGNITO STATUS
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck className="w-4 h-4" />
                Verified Active
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Interest Tags (Section 3.7) */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag className="w-5 h-5 text-[#06B6D4]" />
          <span>Interest Tags</span>
        </h3>
        <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '16px' }}>
          Selected tags drive personalized event recommendations on your CampusPulse dashboard.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {tags.map((tg, idx) => (
            <span key={idx} style={{
              background: idx <= 2 ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.06)',
              color: idx <= 2 ? '#06B6D4' : '#94A3B8',
              border: `1px solid ${idx <= 2 ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.1)'}`,
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {tg} {idx <= 2 && '✓'}
            </span>
          ))}
        </div>
      </div>

      {/* Logout Action */}
      <Button variant="danger" size="lg" onClick={logout} style={{ width: '100%' }}>
        <LogOut className="w-5 h-5" />
        <span>Log Out of EventTrail</span>
      </Button>

    </div>
  );
};
