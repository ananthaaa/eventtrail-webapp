import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { User, ShieldCheck, Mail, Building, BookOpen, Tag, Award, Edit3 } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [department, setDepartment] = useState(user?.department || 'Computer Science & Engineering');
  const [semester, setSemester] = useState('S7 B.Tech CSE');
  const [interests, setInterests] = useState(['Cloud Computing', 'Artificial Intelligence', 'Hackathons', 'UI/UX Design', 'Robotics']);
  const [newInterest, setNewInterest] = useState('');

  if (!user) return null;

  const addInterest = (e) => {
    e.preventDefault();
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  const removeInterest = (tag) => {
    setInterests(interests.filter(i => i !== tag));
  };

  return (
    <div className="container" style={{ padding: '36px 20px', paddingBottom: '96px', background: '#FAF9F6', minHeight: 'calc(100vh - 65px)' }}>
      
      {/* Header */}
      <div style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0px 0px #000000',
        borderRadius: '12px',
        padding: '24px 32px',
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '12px',
            background: '#FFEB3B',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '2rem',
            color: '#000000',
            fontFamily: 'var(--font-heading)'
          }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="neo-badge" style={{ background: '#E8F5E9' }}>
                <ShieldCheck className="w-3.5 h-3.5" style={{ strokeWidth: 2.5 }} /> Verified Identity
              </span>
              <span className="neo-badge" style={{ background: '#E3F2FD' }}>
                {user.role}
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase' }}>
              {user.name}
            </h1>
            <p style={{ color: '#4B5563', fontWeight: 700, fontSize: '0.95rem' }}>
              {department} • {semester}
            </p>
          </div>
        </div>

        <Button variant={isEditing ? 'mint' : 'primary'} onClick={() => setIsEditing(!isEditing)}>
          <Edit3 className="w-4 h-4" /> {isEditing ? 'Save Profile' : 'Edit Profile'}
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Identity & AWS Cognito Details */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '6px 6px 0px 0px #000000',
          borderRadius: '12px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User className="w-5 h-5" style={{ strokeWidth: 2.5 }} /> Campus Identity & RBAC
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>Full Legal Name</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#000' }}>{user.name}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>Campus Email (Cognito Verified)</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail className="w-4 h-4" style={{ color: '#2196F3', strokeWidth: 2.5 }} /> {user.email || 'student@asiet.ac.in'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>Department & Faculty</div>
              {isEditing ? (
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="input-field"
                  style={{ marginTop: '4px' }}
                />
              ) : (
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building className="w-4 h-4" style={{ color: '#FF9800', strokeWidth: 2.5 }} /> {department}
                </div>
              )}
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>Academic Batch</div>
              {isEditing ? (
                <input
                  type="text"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="input-field"
                  style={{ marginTop: '4px' }}
                />
              ) : (
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen className="w-4 h-4" style={{ color: '#10B981', strokeWidth: 2.5 }} /> {semester}
                </div>
              )}
            </div>
          </div>

          <div style={{
            background: '#E8F5E9',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            padding: '16px',
            borderRadius: '8px',
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Award className="w-8 h-8" style={{ color: '#10B981', flexShrink: 0, strokeWidth: 2.5 }} />
            <div>
              <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#000', textTransform: 'uppercase' }}>ASIET Early Adopter</div>
              <div style={{ fontSize: '0.75rem', color: '#374151', fontWeight: 700 }}>Joined EventTrail v1.0 Launch</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interest Tags & Preferences */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '6px 6px 0px 0px #000000',
          borderRadius: '12px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag className="w-5 h-5" style={{ strokeWidth: 2.5 }} /> Event Recommendation Tags
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 600 }}>
            We use these tags to filter and prioritize technical workshops, cultural symposia, and sports tournaments on your student dashboard.
          </p>

          {/* Interest Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {interests.map((tag) => (
              <span
                key={tag}
                style={{
                  background: '#FFEB3B',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0px 0px #000000',
                  padding: '8px 14px',
                  borderRadius: '99px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: '#000000',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textTransform: 'uppercase'
                }}
              >
                {tag}
                {isEditing && (
                  <button
                    onClick={() => removeInterest(tag)}
                    style={{ background: '#000', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer', border: 'none' }}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>

          {/* Add Tag Form */}
          {isEditing && (
            <form onSubmit={addInterest} style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <input
                type="text"
                placeholder="Add interest (e.g. Robotics, Music)..."
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                className="input-field"
                style={{ flex: 1 }}
              />
              <Button type="submit" variant="primary" size="md">
                Add Tag
              </Button>
            </form>
          )}

          <div style={{
            background: '#FFE0B2',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            padding: '16px',
            borderRadius: '8px',
            marginTop: '12px'
          }}>
            <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#000', textTransform: 'uppercase' }}>💡 Tip for Faculty & Admins</div>
            <p style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 700, marginTop: '4px', lineHeight: 1.5 }}>
              If your IAM Cognito role changes to Organizer or Faculty, your navigation bar will automatically unlock the "Manage Events" portal.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
