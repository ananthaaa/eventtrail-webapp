import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { MapPin, Sparkles, Flame, Clock, ArrowRight, Search, Filter } from 'lucide-react';

export const StudentHome = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!user) return null;

  const categories = ['All', 'Technical', 'Hackathon', 'Cultural', 'Workshops', 'Sports'];

  const upcomingEvents = [
    {
      id: 'evt-101',
      title: 'KTU TechFest 2026 — Cloud & AI Summit',
      club: 'ASIET Computer Society',
      date: 'Oct 20, 2026 • 10:00 AM',
      location: 'Main Auditorium, Block A',
      seats: '42 / 150 seats left',
      category: 'Technical',
      badgeBg: '#FFEB3B',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'evt-102',
      title: 'Campus Hackathon 3.0 — 24 Hour Build',
      club: 'Innovation & Entrepreneurship Cell',
      date: 'Oct 22, 2026 • 05:00 PM',
      location: 'Seminar Hall, MCA Block',
      seats: '8 / 50 seats left',
      category: 'Hackathon',
      badgeBg: '#E8F5E9',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'evt-103',
      title: 'Inter-Departmental Cultural Night',
      club: 'ASIET Arts & Sports Club',
      date: 'Oct 25, 2026 • 06:30 PM',
      location: 'Open Air Amphitheatre',
      seats: 'Open Admission',
      category: 'Cultural',
      badgeBg: '#FFE0B2',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 'evt-104',
      title: 'Pixel Craft: UI/UX Workshop',
      club: 'DevX Guild',
      date: 'Oct 28, 2026 • 02:00 PM',
      location: 'Design Studio 2, Block B',
      seats: '15 / 40 seats left',
      category: 'Workshops',
      badgeBg: '#E3F2FD',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 'evt-105',
      title: 'Inter-Faculty Football Finals',
      club: 'ASIET Sports Association',
      date: 'Nov 02, 2026 • 04:30 PM',
      location: 'Main College Ground',
      seats: 'Open Stadium',
      category: 'Sports',
      badgeBg: '#EDE7F6',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      featured: false
    }
  ];

  const filteredEvents = upcomingEvents.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || evt.club.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container" style={{ padding: '36px 20px', paddingBottom: '96px', background: '#FAF9F6', minHeight: 'calc(100vh - 65px)' }}>
      
      {/* Neobrutalist Welcome Box */}
      <div style={{
        padding: '32px',
        marginBottom: '36px',
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0px 0px #000000',
        borderRadius: '12px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="neo-badge" style={{ background: '#FFEB3B' }}>
              <Sparkles className="w-3.5 h-3.5" style={{ strokeWidth: 2.5 }} /> Student Dashboard
            </span>
            <span className="neo-badge" style={{ background: '#E8F5E9' }}>
              AWS Serverless Active
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px', color: '#000000', textTransform: 'uppercase' }}>
            WELCOME BACK, <span style={{ background: '#FFEB3B', padding: '0 8px', border: '2px solid #000' }}>{user.name}</span>! 👋
          </h1>
          <p style={{ color: '#374151', maxWidth: '650px', fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 }}>
            Explore live KTU campus events, RSVP with instant seat reservation, and navigate indoor/outdoor waypoints across ASIET campus.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="md">
            <Flame className="w-4 h-4" style={{ fill: '#000' }} /> Explore Map
          </Button>
          <Button variant="secondary" size="md">
            My RSVPs ({upcomingEvents.length})
          </Button>
        </div>
      </div>

      {/* Neobrutalist Search & Filter Controls (Section 3.B) */}
      <div style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '4px 4px 0px 0px #000000',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Full-width Search Input */}
        <div style={{ position: 'relative' }}>
          <Search className="w-5 h-5" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#000000', strokeWidth: 2.5 }} />
          <input
            type="text"
            placeholder="Search by event title, technical club, or faculty coordinator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              background: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: '8px',
              color: '#000000',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '2px 2px 0px 0px #000000',
              transition: 'all 0.15s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = '#FFFDE7';
              e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000000';
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.85rem', color: '#000', textTransform: 'uppercase', marginRight: '8px' }}>
            <Filter className="w-4 h-4" style={{ strokeWidth: 2.5 }} /> Categories:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  border: '2px solid #000000',
                  background: isActive ? '#000000' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#000000',
                  boxShadow: isActive ? '4px 4px 0px 0px #FFEB3B' : '2px 2px 0px 0px #000000',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#FFEB3B';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000000';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase' }}>
          UPCOMING CAMPUS EVENTS ({filteredEvents.length})
        </h2>
        <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase' }}>
          Real-time DynamoDB Concurrency
        </span>
      </div>

      {/* Events Grid — Neobrutalist Cards */}
      {filteredEvents.length === 0 ? (
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '6px 6px 0px 0px #000000',
          borderRadius: '12px',
          padding: '48px 24px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#000', textTransform: 'uppercase', marginBottom: '8px' }}>
            No Events Match Your Search
          </h3>
          <p style={{ color: '#4B5563', fontWeight: 600, marginBottom: '20px' }}>
            Try selecting another category or searching for general keywords like "KTU" or "Summit".
          </p>
          <Button variant="primary" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '6px 6px 0px 0px #000000',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '8px 8px 0px 0px #000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '6px 6px 0px 0px #000000';
              }}
            >
              {/* Card Image Header */}
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden', borderBottom: '3px solid #000000' }}>
                <img
                  src={evt.image}
                  alt={evt.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  <span className="neo-badge" style={{ background: evt.badgeBg }}>
                    {evt.category}
                  </span>
                  {evt.featured && (
                    <span className="neo-badge" style={{ background: '#FFE0B2' }}>
                      🔥 Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase' }}>
                  {evt.club}
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', lineHeight: 1.25 }}>
                  {evt.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#374151', fontWeight: 700, marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock className="w-4 h-4" style={{ color: '#2196F3', strokeWidth: 2.5 }} />
                    <span>{evt.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin className="w-4 h-4" style={{ color: '#EF4444', strokeWidth: 2.5 }} />
                    <span>{evt.location}</span>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '2px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10B981', background: '#E8F5E9', padding: '4px 10px', borderRadius: '6px', border: '1.5px solid #000' }}>
                    {evt.seats}
                  </span>
                  <Button variant="primary" size="sm" style={{ padding: '8px 16px' }}>
                    RSVP Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
