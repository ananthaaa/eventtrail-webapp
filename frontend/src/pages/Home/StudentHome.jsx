import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { MapPin, Users, Sparkles, Flame, Clock, ArrowRight, Search, Filter } from 'lucide-react';

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
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      featured: false
    }
  ];

  const filteredEvents = upcomingEvents.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || evt.club.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container" style={{ padding: '32px 20px', paddingBottom: '96px' }}>
      
      {/* Welcome Banner */}
      <div className="glass-card" style={{
        padding: '32px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              background: '#06B6D4',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: '99px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Module 1 Verified
            </span>
            <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
              AWS Cognito & RDS MySQL Active
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
            Welcome back, <span style={{ color: '#F8FAFC' }}>{user.name}</span>! 👋
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '600px', fontSize: '0.95rem' }}>
            Discover trending campus workshops, RSVP with instant seat reservation, and navigate venues seamlessly across ASIET KTU campus.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary" size="md">
            <Sparkles className="w-4 h-4" />
            <span>Discover Events</span>
          </Button>
        </div>
      </div>

      {/* Search Bar & Filter Chips (Section 3.2) */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          position: 'relative',
          marginBottom: '16px'
        }}>
          <Search className="w-5 h-5 text-slate-400" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search events by title, club name, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{
              paddingLeft: '48px',
              height: '52px',
              fontSize: '1rem',
              background: 'rgba(30, 41, 59, 0.7)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.12)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.85rem', marginRight: '4px', fontWeight: 600 }}>
            <Filter className="w-4 h-4 text-[#06B6D4]" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 16px',
                borderRadius: '99px',
                border: 'none',
                background: selectedCategory === cat ? '#06B6D4' : 'rgba(255,255,255,0.06)',
                color: selectedCategory === cat ? '#000' : '#94A3B8',
                fontWeight: selectedCategory === cat ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCategory === cat ? '0 0 15px rgba(6,182,212,0.4)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Section Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Flame className="w-6 h-6 text-[#06B6D4]" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            {selectedCategory === 'All' ? 'Trending Campus Events' : `${selectedCategory} Events`}
          </h2>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
          Showing {filteredEvents.length} events
        </span>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: '#94A3B8' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#F8FAFC', marginBottom: '8px' }}>
            No events match your search criteria
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
            Try resetting your filters or searching with a different keyword.
          </p>
          <Button variant="secondary" size="md" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
            <span>Clear Filters</span>
          </Button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="glass-card" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'rgba(30, 41, 59, 0.7)'
            }}>
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={evt.image}
                  alt={evt.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(11, 15, 25, 0.85)',
                  backdropFilter: 'blur(10px)',
                  color: '#06B6D4',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '99px',
                  border: '1px solid rgba(6,182,212,0.3)'
                }}>
                  {evt.category}
                </span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#818CF8', marginBottom: '4px' }}>
                  {evt.club}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px', color: '#F8FAFC', lineHeight: '1.3' }}>
                  {evt.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', color: '#94A3B8', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock className="w-4 h-4 text-[#06B6D4]" />
                    <span>{evt.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin className="w-4 h-4 text-[#06B6D4]" />
                    <span>{evt.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users className="w-4 h-4 text-[#10B981]" />
                    <span style={{ color: '#10B981', fontWeight: 600 }}>{evt.seats}</span>
                  </div>
                </div>

                <Button variant="primary" size="md" style={{ width: '100%' }}>
                  <span>Instant RSVP</span>
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
