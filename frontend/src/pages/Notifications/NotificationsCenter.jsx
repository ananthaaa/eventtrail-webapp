import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Bell, CheckCircle2, AlertTriangle, Clock, Settings } from 'lucide-react';

export const NotificationsCenter = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-101',
      type: 'confirmed',
      title: 'RSVP Confirmed: KTU TechFest 2026',
      message: 'Your seat in Main Auditorium, Block A has been reserved. Ticket ID: TKT-8849.',
      time: '10 mins ago',
      read: false
    },
    {
      id: 'notif-102',
      type: 'waitlist',
      title: 'Waitlist Promotion Alert',
      message: 'A seat opened up for Campus Hackathon 3.0! You are now #3 in line.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'notif-103',
      type: 'reminder',
      title: 'Upcoming Workshop Tomorrow',
      message: 'Intro to AWS Serverless begins tomorrow at 02:00 PM in Lab 4, Block C.',
      time: '1 day ago',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="container" style={{ padding: '32px 20px', paddingBottom: '96px' }}>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Bell className="w-5 h-5 text-[#06B6D4]" />
            <span style={{ color: '#06B6D4', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Didasko Alerts
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Notifications Center
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" size="md" onClick={() => setShowPreferences(!showPreferences)}>
            <Settings className="w-4 h-4" />
            <span>{showPreferences ? 'Close Preferences' : 'Alert Preferences'}</span>
          </Button>
          <Button variant="ghost" size="md" onClick={markAllRead}>
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Mark All Read</span>
          </Button>
        </div>
      </div>

      {/* Preferences Panel (Section 3.6) */}
      {showPreferences && (
        <div className="glass-card animate-pulse" style={{
          padding: '28px',
          marginBottom: '28px',
          background: 'rgba(30, 41, 59, 0.85)',
          border: '1px solid rgba(6,182,212,0.3)',
          animation: 'none'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#F8FAFC' }}>
            Notification Channels & Preferences
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '20px' }}>
            Configure real-time delivery via AWS SES (Email) and SNS (SMS) for campus alerts.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { title: 'RSVP Confirmations', desc: 'Instant pass delivery on registration', email: true, sms: true },
              { title: 'Waitlist Promotions', desc: 'Alerts when seat becomes available', email: true, sms: true },
              { title: 'Same-Day Reminders', desc: 'Wayfinding & schedule reminders', email: true, sms: false },
              { title: 'Club Announcements', desc: 'Direct broadcasts from organizers', email: true, sms: false }
            ].map((pref, idx) => (
              <div key={idx} style={{ padding: '16px', background: 'rgba(15,23,42,0.7)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '4px' }}>{pref.title}</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '12px' }}>{pref.desc}</p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span style={{ color: pref.email ? '#10B981' : '#64748B' }}>✓ Email Active</span>
                  <span style={{ color: pref.sms ? '#10B981' : '#64748B' }}>{pref.sms ? '✓ SMS Active' : '○ SMS Off'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {notifications.map((notif) => (
          <div key={notif.id} className="glass-card" style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            background: notif.read ? 'rgba(30, 41, 59, 0.4)' : 'rgba(30, 41, 59, 0.75)',
            borderLeft: notif.read ? '4px solid transparent' : '4px solid #06B6D4'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: notif.type === 'confirmed' ? 'rgba(16,185,129,0.15)' : notif.type === 'waitlist' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)',
              color: notif.type === 'confirmed' ? '#10B981' : notif.type === 'waitlist' ? '#F59E0B' : '#818CF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {notif.type === 'confirmed' ? <CheckCircle2 className="w-5 h-5" /> : notif.type === 'waitlist' ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
            </div>

            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: notif.read ? '#CBD5E1' : '#F8FAFC' }}>
                  {notif.title}
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  {notif.time}
                </span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
