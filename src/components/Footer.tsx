import { Link } from 'react-router-dom'
import Logo from './Logo'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Live Workshops', to: '/workshops' },
  { label: 'About Kamali', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-brand-dark)', color: 'var(--color-brand-light)', position: 'relative' }}>
      {/* Decorative brushstroke divider */}
      <div style={{ lineHeight: 0, overflow: 'hidden' }}>
        <svg
          viewBox="0 0 1440 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', display: 'block' }}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 16 Q120 6 240 18 Q360 28 480 14 Q600 2 720 18 Q840 30 960 16 Q1080 4 1200 18 Q1320 28 1440 14 L1440 0 L0 0 Z"
            fill="var(--color-brand-dark)"
          />
          <path
            d="M0 22 Q180 10 360 22 Q540 32 720 20 Q900 8 1080 22 Q1260 32 1440 18"
            stroke="#C4A882"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '3rem 24px 2rem',
        }}
      >
        {/* Three column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Column 1: Logo + tagline */}
          <div>
            <Logo size="lg" inverted />
            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1rem',
                color: 'var(--color-brand-muted)',
                marginTop: '1rem',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                lineHeight: 1.6,
              }}
            >
              Traditional Arts · Modern Learning
            </p>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.85rem',
                color: 'var(--color-brand-muted)',
                marginTop: '0.75rem',
                lineHeight: 1.6,
                opacity: 0.8,
              }}
            >
              Learn watercolour, acrylics, and sketching with Kamali — bringing the joy of art to every student.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
              {[
                { icon: <InstagramIcon size={18} />, href: 'https://instagram.com', label: 'Instagram' },
                { icon: <YoutubeIcon size={18} />, href: 'https://youtube.com', label: 'YouTube' },
                { icon: <WhatsAppIcon size={18} />, href: 'https://wa.me/91XXXXXXXXXX', label: 'WhatsApp' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(196, 168, 130, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-brand-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-primary)'
                    e.currentTarget.style.color = 'var(--color-brand-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(196, 168, 130, 0.3)'
                    e.currentTarget.style.color = 'var(--color-brand-muted)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--color-brand-primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      textDecoration: 'none',
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.9rem',
                      color: 'var(--color-brand-muted)',
                      transition: 'color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-primary)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-muted)' }}
                  >
                    <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--color-brand-primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Get in Touch
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Phone', value: '+91 XXXXXXXXXX' },
                { label: 'WhatsApp', value: '+91 XXXXXXXXXX' },
                { label: 'Email', value: 'hello@inbaaacademy.com' },
                { label: 'Classes', value: 'Online · Live & Recorded' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.72rem',
                      color: 'var(--color-brand-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '0.1rem',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.88rem',
                      color: 'var(--color-brand-muted)',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '0.5px solid rgba(196, 168, 130, 0.15)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.8rem',
              color: 'var(--color-brand-muted)',
              opacity: 0.7,
              margin: 0,
            }}
          >
            © 2024 Inbaa Academy · All rights reserved
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.78rem',
                  color: 'var(--color-brand-muted)',
                  opacity: 0.7,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
