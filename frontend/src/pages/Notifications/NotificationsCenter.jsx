import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Bell, CheckCircle2, Settings } from 'lucide-react';

export const NotificationsCenter = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'RSVP Confirmed: KTU TechFest 2026',
      message: 'Your seat in the Main Auditorium has been reserved. Ticket TKT-9942-AWS is ready.',
      time: '10 minutes ago',
      type: 'success',
      color: '#E8F5E9',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Waitlist Promoted: Pixel Craft UI/UX',
      message: 'A seat just opened up! You have been moved from position #4 to #3.',
      time: '2 hours ago',
      type: 'alert',
      color: '#FFE0B2',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Venue Change Notice: Campus Hackathon',
      message: 'The hackathon sprint venue has shifted to CS Lab 3, Department of CSE.',
      time: '1 day ago',
      type: 'info',
      color: '#E3F2FD',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
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
        <div>
          <span className="neo-badge" style={{ background: '#FFEB3B', marginBottom: '8px' }}>
            <Bell className="w-3.5 h-3.5" style={{ strokeWidth: 2.5 }} /> Campus Alerts Feed
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', marginTop: '6px' }}>
            NOTIFICATIONS & PREFERENCES
          </h1>
          <p style={{ color: '#374151', fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>
            Reverse-chronological campus alerts, RSVP confirmations, and AWS SES/SNS preference toggles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="ghost" onClick={markAllRead} style={{ border: '2px solid #000' }}>
            <CheckCircle2 className="w-4 h-4" /> Mark All Read
          </Button>
          <Button variant={showSettings ? 'primary' : 'secondary'} onClick={() => setShowSettings(!showSettings)}>
            <Settings className="w-4 h-4" /> {showSettings ? 'Hide Settings' : 'Alert Settings'}
          </Button>
        </div>
      </div>

      {/* Settings Panel (Collapsible) */}
      {showSettings && (
        <div style={{
          background: '#FFFDE7',
          border: '3px solid #000000',
          boxShadow: '6px 6px 0px 0px #000000',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings className="w-5 h-5" style={{ strokeWidth: 2.5 }} /> AWS SES & SNS Delivery Channels
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 600 }}>
            Configure how you receive ticket QR codes, venue shift warnings, and waitlist promotion alerts.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '8px' }}>
            
            <div style={{ background: '#FFFFFF', border: '2px solid #000', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '2px 2px 0px 0px #000' }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#000', textTransform: 'uppercase' }}>Email Notifications (SES)</div>
                <div style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 600 }}>Instant ticket QR delivery</div>
              </div>
              <span className="neo-badge" style={{ background: '#E8F5E9' }}>ENABLED</span>
            </div>

            <div style={{ background: '#FFFFFF', border: '2px solid #000', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '2px 2px 0px 0px #000' }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#000', textTransform: 'uppercase' }}>SMS Alerts (SNS)</div>
                <div style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 600 }}>Last-minute venue shift warnings</div>
              </div>
              <span className="neo-badge" style={{ background: '#E8F5E9' }}>ENABLED</span>
            </div>

          </div>
        </div>
      )}

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: n.read ? '2px 2px 0px 0px #000000' : '6px 6px 0px 0px #000000',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              opacity: n.read ? 0.75 : 1,
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: n.color,
              border: '2px solid #000000',
              boxShadow: '2px 2px 0px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bell className="w-5 h-5" style={{ color: '#000', strokeWidth: 2.5 }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>{n.title}</h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4B5563', background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', border: '1px solid #000' }}>
                  {n.time}
                </span>
              </div>
              <p style={{ color: '#374151', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5 }}>
                {n.message}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
