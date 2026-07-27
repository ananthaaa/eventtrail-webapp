import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Bookmark, Clock, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

export const MyEvents = () => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'waitlisted' | 'past'

  const myRsvps = {
    upcoming: [
      {
        id: 'rsvp-1',
        title: 'KTU TechFest 2026 — Cloud & AI Summit',
        club: 'ASIET Computer Society',
        date: 'Oct 20, 2026 • 10:00 AM',
        location: 'Main Auditorium, Block A',
        status: 'Confirmed',
        ticketId: 'TKT-8849'
      }
    ],
    waitlisted: [
      {
        id: 'rsvp-2',
        title: 'Campus Hackathon 3.0 — 24 Hour Build',
        club: 'Innovation & Entrepreneurship Cell',
        date: 'Oct 22, 2026 • 05:00 PM',
        location: 'Seminar Hall, MCA Block',
        status: 'Waitlisted #3',
        ticketId: 'WL-0104'
      }
    ],
    past: [
      {
        id: 'rsvp-3',
        title: 'Intro to AWS Serverless Architecture',
        club: 'Cloud Computing Cell',
        date: 'Sep 14, 2026 • 02:00 PM',
        location: 'Lab 4, Block C',
        status: 'Attended',
        ticketId: 'TKT-1102'
      }
    ]
  };

  const currentList = myRsvps[activeTab] || [];

  return (
    <div className="container" style={{ padding: '32px 20px', paddingBottom: '96px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <Bookmark className="w-6 h-6 text-[#6366F1]" />
        <span style={{ color: '#818CF8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
          Personal Record
        </span>
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px' }}>
        My Event RSVPs
      </h1>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '16px',
        marginBottom: '28px'
      }}>
        {[
          { key: 'upcoming', label: 'Upcoming (1)', color: '#10B981' },
          { key: 'waitlisted', label: 'Waitlisted (1)', color: '#F59E0B' },
          { key: 'past', label: 'Past Events (1)', color: '#64748B' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              background: activeTab === tab.key ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: activeTab === tab.key ? '#fff' : '#94A3B8',
              fontWeight: activeTab === tab.key ? 700 : 500,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: activeTab === tab.key ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      {currentList.length === 0 ? (
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: '#94A3B8' }}>
          <AlertCircle className="w-10 h-10 mx-auto mb-12 text-slate-500" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#F8FAFC', marginBottom: '8px' }}>
            No RSVPs in this tab yet
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
            Explore campus events and tap "Instant RSVP" to secure your seat.
          </p>
          <Button variant="primary" size="md">
            <span>Discover Events</span>
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {currentList.map((item) => (
            <div key={item.id} className="glass-card" style={{
              padding: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#818CF8', fontWeight: 600 }}>
                    {item.club}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 10px',
                    borderRadius: '99px',
                    fontWeight: 700,
                    background: item.status === 'Confirmed' ? 'rgba(16,185,129,0.15)' : item.status.includes('Waitlisted') ? 'rgba(245,158,11,0.15)' : 'rgba(100,116,139,0.15)',
                    color: item.status === 'Confirmed' ? '#10B981' : item.status.includes('Waitlisted') ? '#F59E0B' : '#94A3B8',
                    border: `1px solid ${item.status === 'Confirmed' ? 'rgba(16,185,129,0.3)' : item.status.includes('Waitlisted') ? 'rgba(245,158,11,0.3)' : 'rgba(100,116,139,0.3)'}`
                  }}>
                    {item.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '10px' }}>
                  {item.title}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#94A3B8', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock className="w-4 h-4 text-[#06B6D4]" />
                    <span>{item.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin className="w-4 h-4 text-[#06B6D4]" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right', marginRight: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Ticket Ref</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#E2E8F0', fontSize: '0.95rem' }}>{item.ticketId}</div>
                </div>
                <Button variant="secondary" size="md">
                  <span>View Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
