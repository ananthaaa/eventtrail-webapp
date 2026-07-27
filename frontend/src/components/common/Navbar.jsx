import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, MapPin, Bookmark, Bell, User, LogOut, Compass } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { label: 'Home', path: '/home', icon: Compass },
    { label: 'Map', path: '/map', icon: MapPin },
    { label: 'My Events', path: '/my-events', icon: Bookmark },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  if (user.role === 'ClubOrganizer' || user.role === 'Faculty' || user.role === 'Administrator') {
    navItems.splice(1, 0, { label: 'Manage Events', path: '/manage', icon: Calendar });
  }

  return (
    <>
      {/* Top Desktop Navigation Bar */}
      <header className="glass-navbar" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.2rem',
            color: '#fff',
            boxShadow: '0 0 15px rgba(99,102,241,0.5)'
          }}>
            E
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px', color: '#F8FAFC' }}>
            Event<span style={{ color: '#06B6D4' }}>Trail</span>
          </span>
          <span style={{
            fontSize: '0.7rem',
            background: 'rgba(99,102,241,0.2)',
            color: '#818CF8',
            padding: '2px 8px',
            borderRadius: '99px',
            border: '1px solid rgba(99,102,241,0.3)',
            fontWeight: 600,
            marginLeft: '4px'
          }}>
            {user.role}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isActive ? '#fff' : '#94A3B8',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? '#06B6D4' : '#94A3B8' }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F8FAFC' }}>{user.name}</span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{user.department || 'Campus Student'}</span>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#EF4444',
              padding: '8px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Bottom Mobile Tab Bar (<480px / responsive) */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(11, 15, 25, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 -10px 20px rgba(0,0,0,0.5)'
        }}
        className="mobile-bottom-nav"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: isActive ? '#06B6D4' : '#64748B',
                fontSize: '0.7rem',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                minWidth: '44px',
                minHeight: '44px',
                justifyContent: 'center'
              }}
            >
              <Icon style={{ width: '20px', height: '20px', color: isActive ? '#06B6D4' : '#64748B' }} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
