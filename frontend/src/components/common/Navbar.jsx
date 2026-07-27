import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, MapPin, Bookmark, Bell, User, LogOut, Compass } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { label: 'Dashboard', path: '/home', icon: Compass },
    { label: 'Events', path: '/home', icon: Calendar }, // Maps to catalog
    { label: 'Event Map', path: '/map', icon: MapPin },
    { label: 'My Events', path: '/my-events', icon: Bookmark },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  if (user.role === 'ClubOrganizer' || user.role === 'Faculty' || user.role === 'Administrator') {
    navItems.splice(2, 0, { label: 'Manage Events', path: '/manage', icon: Calendar });
  }

  return (
    <>
      {/* Top Desktop Navigation Bar — Neobrutalist Vercel Style */}
      <header className="glass-navbar" style={{
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        borderBottom: '3px solid #000000',
        boxShadow: '0 4px 0px 0px #000000',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        {/* Logo */}
        <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: '#FFEB3B',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1.2rem',
            color: '#000000',
            fontFamily: 'var(--font-heading)'
          }}>
            ET
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#000000', textTransform: 'uppercase' }}>
            Event Trail
          </span>
          <span style={{
            fontSize: '0.75rem',
            background: '#E3F2FD',
            color: '#000000',
            padding: '2px 10px',
            borderRadius: '99px',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginLeft: '6px'
          }}>
            {user.role}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path && (index === 0 ? location.pathname === '/home' : true);
            return (
              <Link
                key={`${item.path}-${index}`}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: isActive ? '#E8F5E9' : 'transparent',
                  border: isActive ? '2px solid #000000' : '2px solid transparent',
                  boxShadow: isActive ? '2px 2px 0px 0px #000000' : 'none',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.border = '2px solid #000000';
                    e.currentTarget.style.background = '#FFEB3B';
                    e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.border = '2px solid transparent';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <Icon className="w-4 h-4" style={{ color: '#000000', strokeWidth: 2.5 }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout Button (Pastel Peach) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase' }}>{user.name}</span>
            <span style={{ fontSize: '0.75rem', color: '#4B5563', fontWeight: 600 }}>{user.department || 'Campus Student'}</span>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            style={{
              background: '#FFE0B2',
              border: '2px solid #000000',
              boxShadow: '2px 2px 0px 0px #000000',
              color: '#000000',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 800,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
            }}
          >
            <LogOut className="w-4 h-4" style={{ strokeWidth: 2.5 }} />
            <span>Logout</span>
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
          background: '#FFFFFF',
          borderTop: '3px solid #000000',
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 -4px 0px 0px #000000'
        }}
        className="mobile-bottom-nav"
      >
        {navItems.slice(0, 5).map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={`mobile-${item.path}-${index}`}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                color: '#000000',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.7rem',
                padding: '6px 10px',
                borderRadius: '6px',
                background: isActive ? '#FFEB3B' : 'transparent',
                border: isActive ? '2px solid #000000' : 'none',
                boxShadow: isActive ? '2px 2px 0px 0px #000000' : 'none',
                textDecoration: 'none',
                textTransform: 'uppercase'
              }}
            >
              <Icon className="w-5 h-5" style={{ color: '#000000', strokeWidth: isActive ? 2.5 : 2 }} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <style>{`
        @media (max-width: 768px) {
          header.glass-navbar nav, header.glass-navbar > div {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
