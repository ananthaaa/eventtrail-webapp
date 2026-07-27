import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Clock, MapPin, Ticket } from 'lucide-react';

export const MyEvents = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'waitlisted' | 'past'

  if (!user) return null;

  const rsvpRecords = {
    upcoming: [
      {
        id: 'rsvp-001',
        title: 'KTU TechFest 2026 — Cloud & AI Summit',
        club: 'ASIET Computer Society',
        date: 'Oct 20, 2026 • 10:00 AM',
        location: 'Main Auditorium, Block A',
        ticketId: 'TKT-9942-AWS',
        status: 'Confirmed',
        statusColor: '#E8F5E9',
        badgeBg: '#FFEB3B',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'rsvp-002',
        title: 'Campus Hackathon 3.0 — 24 Hour Build',
        club: 'Innovation & Entrepreneurship Cell',
        date: 'Oct 22, 2026 • 05:00 PM',
        location: 'Seminar Hall, MCA Block',
        ticketId: 'TKT-8831-HACK',
        status: 'Confirmed',
        statusColor: '#E8F5E9',
        badgeBg: '#E8F5E9',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    waitlisted: [
      {
        id: 'rsvp-003',
        title: 'Pixel Craft: UI/UX Masterclass',
        club: 'DevX Guild',
        date: 'Nov 05, 2026 • 02:00 PM',
        location: 'Design Studio 1, Block B',
        ticketId: 'WTL-1049-UI',
        status: 'Waitlisted #3',
        statusColor: '#FFE0B2',
        badgeBg: '#FFE0B2',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
      }
    ],
    past: [
      {
        id: 'rsvp-004',
        title: 'AWS Serverless Workshop 2025',
        club: 'Cloud Computing Club',
        date: 'Sep 10, 2025 • 10:00 AM',
        location: 'CS Lab 2',
        ticketId: 'TKT-1002-OLD',
        status: 'Attended',
        statusColor: '#E3F2FD',
        badgeBg: '#E3F2FD',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
      }
    ]
  };

  const currentList = rsvpRecords[activeTab] || [];

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
            <Ticket className="w-3.5 h-3.5" style={{ strokeWidth: 2.5 }} /> My Ticket Wallet
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', marginTop: '6px' }}>
            YOUR CAMPUS RSVPS & TICKETS
          </h1>
          <p style={{ color: '#374151', fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>
            Manage upcoming campus event registrations, view QR passes, and track waitlisted seats.
          </p>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('upcoming')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              border: '2px solid #000000',
              background: activeTab === 'upcoming' ? '#E8F5E9' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'upcoming' ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Upcoming ({rsvpRecords.upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab('waitlisted')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              border: '2px solid #000000',
              background: activeTab === 'waitlisted' ? '#FFE0B2' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'waitlisted' ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Waitlisted ({rsvpRecords.waitlisted.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              border: '2px solid #000000',
              background: activeTab === 'past' ? '#E3F2FD' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'past' ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Past ({rsvpRecords.past.length})
          </button>
        </div>
      </div>

      {/* Ticket Cards Grid */}
      {currentList.length === 0 ? (
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '6px 6px 0px 0px #000000',
          borderRadius: '12px',
          padding: '48px 24px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#000', textTransform: 'uppercase', marginBottom: '8px' }}>
            No {activeTab} events found
          </h3>
          <p style={{ color: '#4B5563', fontWeight: 600, marginBottom: '20px' }}>
            You haven't registered for any events in this category yet. Head to the Events Dashboard to explore live campus happenings!
          </p>
          <Button variant="primary">
            Explore Campus Events
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '28px' }}>
          {currentList.map((evt) => (
            <div
              key={evt.id}
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '6px 6px 0px 0px #000000',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Top Banner */}
              <div style={{
                background: evt.badgeBg,
                borderBottom: '3px solid #000000',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#000', textTransform: 'uppercase' }}>
                  {evt.club}
                </span>
                <span className="neo-badge" style={{ background: '#FFF', padding: '4px 10px' }}>
                  {evt.status}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', lineHeight: 1.2 }}>
                  {evt.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#374151', fontWeight: 700 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock className="w-4 h-4" style={{ color: '#2196F3', strokeWidth: 2.5 }} />
                    <span>{evt.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin className="w-4 h-4" style={{ color: '#EF4444', strokeWidth: 2.5 }} />
                    <span>{evt.location}</span>
                  </div>
                </div>

                {/* Ticket Reference Footer */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '2px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase' }}>Ticket Reference</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#000', fontFamily: 'monospace' }}>{evt.ticketId}</div>
                  </div>
                  {activeTab === 'upcoming' ? (
                    <Button variant="primary" size="sm">
                      View Ticket QR
                    </Button>
                  ) : activeTab === 'waitlisted' ? (
                    <Button variant="secondary" size="sm">
                      Check Position
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" style={{ border: '2px solid #000' }}>
                      Feedback
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
