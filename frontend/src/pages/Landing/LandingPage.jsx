import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Compass, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Award,
  Layers
} from 'lucide-react';

export const LandingPage = () => {
  const stats = [
    { label: 'Campus Events / Sem', value: '150+', icon: Calendar, color: '#6366F1' },
    { label: 'Active KTU Students', value: '4,200+', icon: Users, color: '#06B6D4' },
    { label: 'Student Clubs & Cells', value: '32+', icon: Award, color: '#10B981' },
    { label: 'AWS Free Tier Uptime', value: '100%', icon: ShieldCheck, color: '#F59E0B' },
  ];

  const features = [
    {
      title: 'One-Click Instant RSVP',
      description: 'Never miss out on high-demand workshops. Reserve your seat instantly with real-time capacity tracking and automated waitlists.',
      icon: Zap,
      badge: 'Zero Friction',
      color: '#6366F1'
    },
    {
      title: 'Interactive Campus Wayfinding',
      description: 'Integrated Leaflet maps with indoor floor plans and outdoor turn-by-turn navigation across all ASIET KTU blocks.',
      icon: MapPin,
      badge: 'First-Class Map',
      color: '#06B6D4'
    },
    {
      title: 'Role-Aware Portals',
      description: 'Tailored dashboards for Students, Faculty, Club Organizers, and Administrators under one cohesive design system.',
      icon: Layers,
      badge: 'RBAC Secured',
      color: '#10B981'
    }
  ];

  const previewEvents = [
    {
      id: 'preview-1',
      title: 'KTU TechFest 2026 — Cloud & AI Summit',
      club: 'ASIET Computer Society',
      date: 'Oct 20, 2026 • 10:00 AM',
      location: 'Main Auditorium, Block A',
      seats: '42 / 150 seats left',
      category: 'Technical',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'preview-2',
      title: 'Campus Hackathon 3.0 — 24 Hour Build',
      club: 'Innovation & Entrepreneurship Cell',
      date: 'Oct 22, 2026 • 05:00 PM',
      location: 'Seminar Hall, MCA Block',
      seats: '8 / 50 seats left',
      category: 'Hackathon',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'preview-3',
      title: 'Inter-Departmental Cultural Night',
      club: 'ASIET Arts & Sports Club',
      date: 'Oct 25, 2026 • 06:30 PM',
      location: 'Open Air Amphitheatre',
      seats: 'Open Admission',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Top Public Header */}
      <header className="glass-navbar" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.3rem',
            color: '#fff',
            boxShadow: '0 0 20px rgba(99,102,241,0.5)'
          }}>
            E
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Event<span style={{ color: '#06B6D4' }}>Trail</span>
          </span>
          <span style={{
            fontSize: '0.7rem',
            background: 'rgba(6,182,212,0.15)',
            color: '#06B6D4',
            padding: '4px 10px',
            borderRadius: '99px',
            border: '1px solid rgba(6,182,212,0.3)',
            fontWeight: 700,
            marginLeft: '6px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            CampusPulse
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/auth">
            <Button variant="ghost" size="md" style={{ color: '#E2E8F0' }}>
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="primary" size="md">
              <Sparkles className="w-4 h-4" />
              <span>Get Started Free</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '80px 20px 100px',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.22) 0%, rgba(6, 182, 212, 0.12) 45%, transparent 75%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            padding: '6px 16px',
            borderRadius: '99px',
            marginBottom: '28px',
            boxShadow: '0 0 20px rgba(99,102,241,0.2)'
          }}>
            <Sparkles className="w-4 h-4 text-[#818CF8]" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#C7D2FE' }}>
              Official KTU Campus Event & Wayfinding Platform
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '24px',
            letterSpacing: '-1.5px',
            color: '#F8FAFC'
          }}>
            The Pulse of Campus Life, <br />
            <span style={{
              background: 'linear-gradient(135deg, #818CF8 0%, #06B6D4 50%, #34D399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              At Your Fingertips.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94A3B8',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Discover technical symposiums, cultural fests, and hackathons. Reserve seats with one click and navigate ASIET campus venues seamlessly.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <Link to="/auth">
              <Button variant="primary" size="lg" style={{ padding: '16px 32px', fontSize: '1.05rem', boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}>
                <span>Explore Campus Events</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="lg" style={{ padding: '16px 28px', fontSize: '1.05rem' }}>
                <Compass className="w-5 h-5 text-[#06B6D4]" />
                <span>See How It Works</span>
              </Button>
            </a>
          </div>

          {/* Stats Ribbon */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginTop: '70px',
            padding: '28px',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            backdropFilter: 'blur(16px)'
          }}>
            {stats.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} style={{ textAlign: 'center', padding: '10px' }}>
                  <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '12px', background: `${st.color}15`, color: st.color, marginBottom: '12px' }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-heading)' }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" style={{ padding: '100px 20px', background: 'rgba(11, 15, 25, 0.95)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#06B6D4', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Didasko Architecture
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>
              Built for High-Velocity Student Life
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              No clunky registration forms or outdated bulletin boards. EventTrail brings modern design tokens and serverless cloud speed to your campus.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="glass-card" style={{
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, ${feat.color}20 0%, rgba(15,23,42,0.8) 100%)`,
                        border: `1px solid ${feat.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: feat.color,
                        boxShadow: `0 0 20px ${feat.color}20`
                      }}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: `${feat.color}15`,
                        color: feat.color,
                        padding: '4px 12px',
                        borderRadius: '99px',
                        border: `1px solid ${feat.color}30`
                      }}>
                        {feat.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '12px', color: '#F8FAFC' }}>
                      {feat.title}
                    </h3>
                    <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {feat.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '8px', color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 600 }}>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Included in 100% Free Tier</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Trending Events Preview Grid */}
      <section style={{ padding: '80px 20px 100px', background: 'radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Flame className="w-5 h-5 text-[#06B6D4]" />
                <span style={{ color: '#06B6D4', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  Live On Campus
                </span>
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
                Trending This Week
              </h2>
            </div>

            <Link to="/auth">
              <Button variant="secondary" size="md">
                <span>View All 150+ Events</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px'
          }}>
            {previewEvents.map((evt) => (
              <div key={evt.id} className="glass-card" style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(30, 41, 59, 0.6)'
              }}>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={evt.image}
                    alt={evt.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    background: 'rgba(11, 15, 25, 0.85)',
                    backdropFilter: 'blur(10px)',
                    color: '#06B6D4',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    padding: '6px 12px',
                    borderRadius: '99px',
                    border: '1px solid rgba(6,182,212,0.4)'
                  }}>
                    {evt.category}
                  </span>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#818CF8', marginBottom: '6px' }}>
                    {evt.club}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '14px', color: '#F8FAFC', lineHeight: '1.3' }}>
                    {evt.title}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', color: '#94A3B8', fontSize: '0.85rem' }}>
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

                  <Link to="/auth" style={{ width: '100%' }}>
                    <Button variant="primary" size="md" style={{ width: '100%' }}>
                      <span>Instant RSVP</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom Call to Action Banner */}
      <section style={{ padding: '60px 20px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Experience EventTrail?
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 32px' }}>
            Sign in with your campus email address or register a new account to unlock instant RSVPs, interactive maps, and real-time updates.
          </p>
          <Link to="/auth">
            <Button variant="primary" size="lg" style={{ padding: '16px 36px', fontSize: '1.1rem', boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}>
              <span>Launch CampusPulse</span>
              <Sparkles className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 20px', background: '#0B0F19', color: '#64748B', fontSize: '0.85rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, color: '#94A3B8' }}>EventTrail</span>
            <span>•</span>
            <span>ASIET KTU Campus Community Platform</span>
          </div>
          <div>
            <span>Powered by AWS Cognito & Serverless SAM ($0.00 Free Tier)</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
