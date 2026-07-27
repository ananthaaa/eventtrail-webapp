import React, { useState } from 'react';
import { MapPin, Navigation, Layers, Compass, Building, CheckCircle2 } from 'lucide-react';

export const CampusMap = () => {
  const [mode, setMode] = useState('outdoor'); // 'outdoor' | 'indoor'
  const [selectedVenue, setSelectedVenue] = useState('auditorium');

  const venues = [
    { id: 'auditorium', name: 'Main Auditorium, Block A', type: 'Indoor / Event Hall', floor: 'Ground Floor', status: 'Available' },
    { id: 'mca-seminar', name: 'Seminar Hall, MCA Block', type: 'Lecture Hall', floor: '2nd Floor', status: 'In Use' },
    { id: 'amphitheatre', name: 'Open Air Amphitheatre', type: 'Outdoor Stage', floor: 'Campus Center', status: 'Available' },
    { id: 'library-ai', name: 'Central Library AI Lab', type: 'Computer Lab', floor: '1st Floor', status: 'Available' }
  ];

  return (
    <div className="container" style={{ padding: '32px 20px', paddingBottom: '96px' }}>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Compass className="w-5 h-5 text-[#06B6D4]" />
            <span style={{ color: '#06B6D4', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Didasko Wayfinding
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            ASIET Campus Map
          </h1>
        </div>

        {/* Outdoor / Indoor Toggle */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '6px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button
            onClick={() => setMode('outdoor')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'outdoor' ? '#6366F1' : 'transparent',
              color: mode === 'outdoor' ? '#fff' : '#94A3B8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Navigation className="w-4 h-4" />
            <span>Outdoor Route</span>
          </button>
          <button
            onClick={() => setMode('indoor')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'indoor' ? '#06B6D4' : 'transparent',
              color: mode === 'indoor' ? '#000' : '#94A3B8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Layers className="w-4 h-4" />
            <span>Indoor Floor Plans</span>
          </button>
        </div>
      </div>

      {/* Map Viewport Preview */}
      <div className="glass-card" style={{
        position: 'relative',
        height: '420px',
        borderRadius: '24px',
        overflow: 'hidden',
        marginBottom: '32px',
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'radial-gradient(circle at 50% 50%, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.95) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px'
      }}>
        {/* Placeholder Simulated Leaflet Canvas */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#6366F1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: mode === 'outdoor' ? 'rgba(99,102,241,0.2)' : 'rgba(6,182,212,0.2)',
            border: `2px solid ${mode === 'outdoor' ? '#6366F1' : '#06B6D4'}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: mode === 'outdoor' ? '#818CF8' : '#06B6D4',
            marginBottom: '16px',
            boxShadow: '0 0 30px rgba(99,102,241,0.3)'
          }}>
            <MapPin className="w-8 h-8 animate-pulse" />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: '#F8FAFC' }}>
            {mode === 'outdoor' ? 'Leaflet.js OpenRouteService Canvas' : 'Indoor Floor-Plan Navigation Active'}
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '20px' }}>
            {mode === 'outdoor'
              ? 'Real-time GPS turn-by-turn routing across ASIET campus walkways and entrance gates.'
              : 'Multi-floor room highlighted path from building entrance to seminar halls.'}
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '99px', background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>
            <CheckCircle2 className="w-4 h-4" />
            <span>Module 5 Wayfinding Ready</span>
          </div>
        </div>
      </div>

      {/* Venue List */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
        Campus Venues & Rooms
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {venues.map((vn) => (
          <div
            key={vn.id}
            onClick={() => setSelectedVenue(vn.id)}
            className="glass-card"
            style={{
              padding: '20px',
              cursor: 'pointer',
              border: selectedVenue === vn.id ? '2px solid #06B6D4' : '1px solid rgba(255,255,255,0.08)',
              background: selectedVenue === vn.id ? 'rgba(6,182,212,0.1)' : 'rgba(30,41,59,0.5)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', color: '#E2E8F0', padding: '4px 8px', borderRadius: '6px', fontWeight: 600 }}>
                {vn.type}
              </span>
              <span style={{ fontSize: '0.75rem', color: vn.status === 'Available' ? '#10B981' : '#F59E0B', fontWeight: 700 }}>
                • {vn.status}
              </span>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '6px' }}>
              {vn.name}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.8rem' }}>
              <Building className="w-4 h-4" />
              <span>{vn.floor}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
