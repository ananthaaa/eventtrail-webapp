import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#FAF9F6', color: '#000000', fontFamily: 'var(--font-body)' }}>
      
      {/* Top Header — Exact Vercel Reference */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '3px solid #000000',
        boxShadow: '0 4px 0px 0px #000000',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            background: '#FFEB3B',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1.25rem',
            color: '#000000',
            fontFamily: 'var(--font-heading)'
          }}>
            ET
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#000000' }}>
            Event Trail
          </span>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <Link to="/login" style={{
            padding: '8px 18px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.9rem',
            color: '#000000',
            textDecoration: 'none',
            border: '2px solid transparent',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '2px solid #000000';
            e.currentTarget.style.background = '#FFE0B2';
            e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '2px solid transparent';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            Log In
          </Link>
          <Button variant="primary" onClick={() => navigate('/login')} style={{ fontSize: '0.9rem' }}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '80px 24px 60px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Welcome Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: '#FFEB3B',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px 0px #000000',
          borderRadius: '99px',
          fontWeight: 900,
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Welcome to Event Trail
        </div>

        {/* Heavy Typography Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-1.5px',
          color: '#000000',
          maxWidth: '900px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-heading)'
        }}>
          Your Campus Life, Amplified
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#374151',
          maxWidth: '750px',
          fontWeight: 600,
          lineHeight: 1.6
        }}>
          Discover live campus happenings, book your tickets instantly, and get guided right to your seat with dual-phase indoor wayfinding.
        </p>

        {/* Hero CTAs */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap', justify: 'center' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/login')} style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
            Create Free Account
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/login')} style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
            Sign In to Dashboard
          </Button>
        </div>
      </section>

      {/* Stats Ribbon — Exact Vercel Reference */}
      <section style={{
        background: '#FFFFFF',
        borderTop: '3px solid #000000',
        borderBottom: '3px solid #000000',
        padding: '36px 0',
        boxShadow: '0 6px 0px 0px #000000',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            
            <div style={{
              background: '#FFEB3B',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px 0px #000000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>15+</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase', marginTop: '4px' }}>Faculties</div>
            </div>

            <div style={{
              background: '#E8F5E9',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px 0px #000000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>50+</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase', marginTop: '4px' }}>Active Clubs</div>
            </div>

            <div style={{
              background: '#E3F2FD',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px 0px #000000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>100%</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase', marginTop: '4px' }}>Indoor Guided</div>
            </div>

            <div style={{
              background: '#FFE0B2',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px 0px #000000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>15k+</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase', marginTop: '4px' }}>Seat RSVPs</div>
            </div>

          </div>
        </div>
      </section>

      {/* "How It Works" Section — End-To-End Student Flow */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            background: '#FFEB3B',
            color: '#000000',
            padding: '6px 14px',
            borderRadius: '99px',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase'
          }}>
            How it works
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '16px', color: '#000000', textTransform: 'uppercase' }}>
            End-To-End Student Flow
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          
          {/* Card 1 */}
          <div style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px 0px #000000',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ background: '#FFEB3B', borderBottom: '3px solid #000000', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 900, fontSize: '1.35rem', color: '#000', textTransform: 'uppercase' }}>01 / Discover</span>
              <Calendar className="w-8 h-8" style={{ color: '#000', strokeWidth: 2.5 }} />
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <p style={{ color: '#374151', fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>
                Find events across all faculties. Filter by category, date, or faculty council easily.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px 0px #000000',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ background: '#E8F5E9', borderBottom: '3px solid #000000', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 900, fontSize: '1.35rem', color: '#000', textTransform: 'uppercase' }}>02 / RSVP Securely</span>
              <CheckCircle2 className="w-8 h-8" style={{ color: '#000', strokeWidth: 2.5 }} />
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <p style={{ color: '#374151', fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>
                Lock in your seat instantly. Dynamic capacity meters let you know if you are on the list or waitlist.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px 0px #000000',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ background: '#E3F2FD', borderBottom: '3px solid #000000', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 900, fontSize: '1.35rem', color: '#000', textTransform: 'uppercase' }}>03 / Navigate Indoor</span>
              <Compass className="w-8 h-8" style={{ color: '#000', strokeWidth: 2.5 }} />
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <p style={{ color: '#374151', fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>
                Arrive stress-free. Transition from outdoor GPS walking directions to inline SVG waypoint floor plans.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer — Exact Vercel Reference */}
      <footer style={{
        background: '#FFFFFF',
        borderTop: '3px solid #000000',
        padding: '36px 32px',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '0.9rem',
        color: '#000000'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: '#FFEB3B', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem' }}>ET</div>
          <span style={{ fontWeight: 900, fontSize: '1.15rem' }}>Event Trail</span>
        </div>
        <p style={{ color: '#6B7280', fontWeight: 600 }}>
          © 2026 Event Trail. All rights reserved.
        </p>
      </footer>

    </div>
  );
};
