import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Compass, ShieldCheck, Zap, ArrowRight, CheckCircle2, Sparkles, MapPin, Clock } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#FAF9F6', color: '#000000', fontFamily: 'var(--font-body)' }}>
      
      {/* Top Public Navbar — Neobrutalist */}
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
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#000000', textTransform: 'uppercase' }}>
            Event Trail
          </span>
          <span style={{
            fontSize: '0.75rem',
            background: '#E8F5E9',
            color: '#000000',
            padding: '2px 10px',
            borderRadius: '99px',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginLeft: '4px'
          }}>
            Live v1.0
          </span>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <Link to="/login" style={{
            padding: '8px 18px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.9rem',
            color: '#000000',
            textTransform: 'uppercase',
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
            Get Started Free <ArrowRight className="w-4 h-4" style={{ strokeWidth: 2.5 }} />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
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
          <Sparkles className="w-4 h-4" style={{ strokeWidth: 2.5 }} />
          Welcome To Event Trail
        </div>

        {/* Heavy Typography Display Title */}
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
          YOUR CAMPUS LIFE, <span style={{ 
            background: '#E8F5E9', 
            padding: '0 12px', 
            border: '3px solid #000000', 
            boxShadow: '4px 4px 0px 0px #000000',
            display: 'inline-block',
            transform: 'rotate(-1deg)'
          }}>AMPLIFIED</span>
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#374151',
          maxWidth: '700px',
          fontWeight: 600,
          lineHeight: 1.6
        }}>
          The all-in-one real-time event discovery, interactive indoor/outdoor Leaflet wayfinding, and instant RSVP portal built for ASIET campus students and faculty.
        </p>

        {/* Hero CTAs */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap', justify: 'center' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/login')} style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
            Create Free Account <Zap className="w-5 h-5" style={{ fill: '#000', strokeWidth: 2.5 }} />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/login')} style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
            Sign In to Dashboard
          </Button>
        </div>

        {/* Feature Check-pills */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px', color: '#000000', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981', strokeWidth: 2.5 }} /> One-Click Instant RSVPs
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: '#2196F3', strokeWidth: 2.5 }} /> 100% Indoor & Outdoor Guided
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: '#FF9800', strokeWidth: 2.5 }} /> Zero-Cost AWS Serverless
          </span>
        </div>
      </section>

      {/* Stats Ribbon — Neobrutalist Grid Box */}
      <section style={{
        background: '#FFFFFF',
        borderTop: '3px solid #000000',
        borderBottom: '3px solid #000000',
        padding: '36px 0',
        boxShadow: '0 6px 0px 0px #000000',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            
            <div style={{
              background: '#FFEB3B',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px 0px #000000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>150+</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase', marginTop: '4px' }}>Campus Events</div>
            </div>

            <div style={{
              background: '#E8F5E9',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px 0px #000000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>4,200+</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase', marginTop: '4px' }}>Active Students</div>
            </div>

            <div style={{
              background: '#E3F2FD',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px 0px #000000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>15+</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase', marginTop: '4px' }}>ASIET Faculties</div>
            </div>

            <div style={{
              background: '#FFE0B2',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0px 0px #000000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>100%</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase', marginTop: '4px' }}>AWS Free Tier</div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            background: '#EDE7F6',
            color: '#000000',
            padding: '6px 14px',
            borderRadius: '99px',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0px 0px #000000',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase'
          }}>
            How It Works
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '16px', color: '#000000', textTransform: 'uppercase' }}>
            ENGINEERED FOR CAMPUS PULSE
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
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
              <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#000', textTransform: 'uppercase' }}>01. Instant RSVPs</span>
              <Calendar className="w-8 h-8" style={{ color: '#000', strokeWidth: 2.5 }} />
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>One-Click Seat Registration</h3>
              <p style={{ color: '#4B5563', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.6 }}>
                Discover upcoming KTU technical symposia, hackathons, and cultural fests. Reserve seats with instant DynamoDB concurrency validation and automated ticket ID generation.
              </p>
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <span className="neo-badge" style={{ background: '#E8F5E9' }}>Live Counters</span>
                <span className="neo-badge" style={{ background: '#FFE0B2' }}>Waitlist Auto-Promote</span>
              </div>
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
            <div style={{ background: '#E3F2FD', borderBottom: '3px solid #000000', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#000', textTransform: 'uppercase' }}>02. Smart Wayfinding</span>
              <Compass className="w-8 h-8" style={{ color: '#000', strokeWidth: 2.5 }} />
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>Indoor Floor Plans & Maps</h3>
              <p style={{ color: '#4B5563', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.6 }}>
                Never get lost on campus again. Toggle between outdoor GPS routing across ASIET buildings and detailed room-level indoor floor plans for laboratories and seminar halls.
              </p>
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <span className="neo-badge" style={{ background: '#FFEB3B' }}>Leaflet GPS</span>
                <span className="neo-badge" style={{ background: '#EDE7F6' }}>Room Waypoints</span>
              </div>
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
            <div style={{ background: '#E8F5E9', borderBottom: '3px solid #000000', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#000', textTransform: 'uppercase' }}>03. Role Portals</span>
              <ShieldCheck className="w-8 h-8" style={{ color: '#000', strokeWidth: 2.5 }} />
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>AWS Serverless Security</h3>
              <p style={{ color: '#4B5563', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.6 }}>
                Powered by Amazon Cognito RBAC. Dedicated workflows for students, faculty coordinators, club presidents, and system administrators with zero AWS infrastructure cost.
              </p>
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <span className="neo-badge" style={{ background: '#FFE0B2' }}>Cognito RBAC</span>
                <span className="neo-badge" style={{ background: '#E3F2FD' }}>RDS MySQL</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trending Events Preview Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
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
              Live Catalog
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '12px', color: '#000000', textTransform: 'uppercase' }}>
              TRENDING CAMPUS EVENTS
            </h2>
          </div>
          <Button variant="secondary" onClick={() => navigate('/login')}>
            Explore All Events <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          
          {/* Sample Event Card 1 */}
          <div style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px 0px #000000',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              height: '180px',
              background: 'linear-gradient(45deg, #111827 0%, #374151 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '3px solid #000000'
            }}>
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#FFEB3B', color: '#000', padding: '4px 12px', borderRadius: '99px', border: '2px solid #000', boxShadow: '2px 2px 0px 0px #000', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Technical
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#FFF', fontWeight: 900, textAlign: 'center', padding: '0 16px', textTransform: 'uppercase', textShadow: '2px 2px 0 #000' }}>
                KTU TechFest 2026
              </h3>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>Annual Inter-College Symposium</h4>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: 600 }}>
                Join over 500+ developers for 24 hours of coding, AI workshops, and robotics competitions.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#000', fontWeight: 700, marginTop: 'auto', paddingTop: '12px', borderTop: '2px solid #E5E7EB' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#EF4444', strokeWidth: 2.5 }} /> Main Auditorium, ASIET
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock className="w-4 h-4" style={{ color: '#2196F3', strokeWidth: 2.5 }} /> Aug 15, 2026 • 09:00 AM
                </span>
              </div>
              <Button variant="primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => navigate('/login')}>
                RSVP Now (45 Seats Left)
              </Button>
            </div>
          </div>

          {/* Sample Event Card 2 */}
          <div style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px 0px #000000',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              height: '180px',
              background: 'linear-gradient(45deg, #4F46E5 0%, #06B6D4 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '3px solid #000000'
            }}>
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#E8F5E9', color: '#000', padding: '4px 12px', borderRadius: '99px', border: '2px solid #000', boxShadow: '2px 2px 0px 0px #000', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Hackathon
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#FFF', fontWeight: 900, textAlign: 'center', padding: '0 16px', textTransform: 'uppercase', textShadow: '2px 2px 0 #000' }}>
                Campus Hackathon 2026
              </h3>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>24-Hour Solution Sprint</h4>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: 600 }}>
                Build cloud-native serverless apps on AWS Free Tier. Win prizes worth ₹50,000 and internship offers.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#000', fontWeight: 700, marginTop: 'auto', paddingTop: '12px', borderTop: '2px solid #E5E7EB' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#EF4444', strokeWidth: 2.5 }} /> CS Lab 3, Department of CSE
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock className="w-4 h-4" style={{ color: '#2196F3', strokeWidth: 2.5 }} /> Aug 20, 2026 • 10:00 AM
                </span>
              </div>
              <Button variant="primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => navigate('/login')}>
                RSVP Now (12 Seats Left)
              </Button>
            </div>
          </div>

          {/* Sample Event Card 3 */}
          <div style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px 0px #000000',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              height: '180px',
              background: 'linear-gradient(45deg, #EC4899 0%, #F59E0B 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '3px solid #000000'
            }}>
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#FFE0B2', color: '#000', padding: '4px 12px', borderRadius: '99px', border: '2px solid #000', boxShadow: '2px 2px 0px 0px #000', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Cultural
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#FFF', fontWeight: 900, textAlign: 'center', padding: '0 16px', textTransform: 'uppercase', textShadow: '2px 2px 0 #000' }}>
                Sanskriti 2026
              </h3>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>Annual Cultural Extravaganza</h4>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: 600 }}>
                Experience music, dance, theater, and arts competitions from teams across all departments.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#000', fontWeight: 700, marginTop: 'auto', paddingTop: '12px', borderTop: '2px solid #E5E7EB' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#EF4444', strokeWidth: 2.5 }} /> Open Air Theater, ASIET
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock className="w-4 h-4" style={{ color: '#2196F3', strokeWidth: 2.5 }} /> Sep 05, 2026 • 05:00 PM
                </span>
              </div>
              <Button variant="mint" style={{ width: '100%', marginTop: '8px' }} onClick={() => navigate('/login')}>
                Open Registration
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
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
          <div style={{ width: '28px', height: '28px', background: '#FFEB3B', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem' }}>ET</div>
          <span style={{ fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase' }}>Event Trail • ASIET Campus</span>
        </div>
        <p style={{ color: '#4B5563', fontWeight: 600 }}>
          Built with zero-cost AWS Free Tier (Lambda, RDS MySQL, DynamoDB, Cognito). Engineered for Didasko & Vercel Excellence.
        </p>
      </footer>

    </div>
  );
};
