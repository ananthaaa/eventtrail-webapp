import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { MapPin, Navigation, Compass, Layers, Building, Info } from 'lucide-react';

export const CampusMap = () => {
  const [mapMode, setMapMode] = useState('outdoor'); // 'outdoor' | 'indoor'
  const [selectedVenue, setSelectedVenue] = useState('Auditorium');

  const venues = [
    { id: 'v1', name: 'Main Auditorium', building: 'Block A, Floor 1', type: 'Event Hall', color: '#FFEB3B' },
    { id: 'v2', name: 'Seminar Hall 1', building: 'MCA Block, Floor 2', type: 'Conference Room', color: '#E8F5E9' },
    { id: 'v3', name: 'CS Dept Lab 3', building: 'Block B, Floor 3', type: 'Laboratory', color: '#E3F2FD' },
    { id: 'v4', name: 'Open Air Theatre', building: 'Central Campus Ground', type: 'Outdoor Stage', color: '#FFE0B2' },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px', paddingBottom: '96px', background: '#FAF9F6', minHeight: 'calc(100vh - 65px)' }}>
      
      {/* Header Bar */}
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
            <Compass className="w-3.5 h-3.5" style={{ strokeWidth: 2.5 }} /> Interactive Wayfinding
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', marginTop: '6px' }}>
            ASIET CAMPUS & VENUE MAPS
          </h1>
          <p style={{ color: '#374151', fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>
            Toggle between outdoor GPS wayfinding across campus buildings and room-level indoor floor plans.
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            variant={mapMode === 'outdoor' ? 'primary' : 'ghost'}
            onClick={() => setMapMode('outdoor')}
            style={{ border: '2px solid #000' }}
          >
            <MapPin className="w-4 h-4" /> Outdoor Routes
          </Button>
          <Button
            variant={mapMode === 'indoor' ? 'mint' : 'ghost'}
            onClick={() => setMapMode('indoor')}
            style={{ border: '2px solid #000' }}
          >
            <Layers className="w-4 h-4" /> Indoor Floor Plans
          </Button>
        </div>
      </div>

      {/* Map Content Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Venue Selector & Routing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px 0px #000000',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building className="w-5 h-5" style={{ color: '#000', strokeWidth: 2.5 }} /> Select Destination Venue
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {venues.map((v) => {
                const isSelected = selectedVenue === v.name;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVenue(v.name)}
                    style={{
                      padding: '16px',
                      background: isSelected ? '#FFFDE7' : '#FFFFFF',
                      border: '2px solid #000000',
                      boxShadow: isSelected ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#000000', textTransform: 'uppercase' }}>{v.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>{v.building}</div>
                    </div>
                    <span className="neo-badge" style={{ background: v.color }}>{v.type}</span>
                  </div>
                );
              })}
            </div>

            <Button variant="primary" style={{ width: '100%', marginTop: '20px', padding: '14px' }}>
              <Navigation className="w-4 h-4" /> Compute Shortest Route
            </Button>
          </div>

          {/* Info Card */}
          <div style={{
            background: '#E3F2FD',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px 0px #000000',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <Info className="w-6 h-6" style={{ color: '#000', strokeWidth: 2.5, flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#000', textTransform: 'uppercase', marginBottom: '4px' }}>
                Module 3 Ready
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 600, lineHeight: 1.5 }}>
                Leaflet.js mapping canvas with custom SVG waypoint overlays. Ready for GPS routing and indoor floor graph integration.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Map Preview Box */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '6px 6px 0px 0px #000000',
          borderRadius: '12px',
          overflow: 'hidden',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ background: '#FFEB3B', borderBottom: '3px solid #000000', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 900, fontSize: '1rem', color: '#000', textTransform: 'uppercase' }}>
              Live Map View • {mapMode === 'outdoor' ? 'ASIET Campus GPS' : 'Indoor Floor Graph'}
            </span>
            <span className="neo-badge" style={{ background: '#FFF', padding: '2px 10px', fontSize: '0.7rem' }}>
              Target: {selectedVenue}
            </span>
          </div>

          <div style={{
            flex: 1,
            background: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80") center/cover',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '420px'
          }}>
            <div style={{
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '6px 6px 0px 0px #000000',
              padding: '24px',
              borderRadius: '12px',
              textAlign: 'center',
              maxWidth: '340px'
            }}>
              <MapPin className="w-12 h-12" style={{ color: '#EF4444', margin: '0 auto 12px', strokeWidth: 2.5 }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000', textTransform: 'uppercase', marginBottom: '8px' }}>
                {selectedVenue}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: 600, marginBottom: '16px' }}>
                Leaflet canvas initialized. Click below to simulate step-by-step navigation instructions.
              </p>
              <Button variant="mint" size="sm" style={{ width: '100%' }}>
                Start Guided Navigation
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
