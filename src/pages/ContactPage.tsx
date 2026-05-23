import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Icons ────────────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MailIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

// ─── Animated brush underline SVG ─────────────────────────────────────────────

function BrushUnderlineHeading() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(38px, 6vw, 56px)',
          fontWeight: 300,
          color: 'var(--color-brand-dark)',
          letterSpacing: '0.03em',
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        Let's Talk Art
      </motion.h1>
      {/* Animated brush underline */}
      <svg
        viewBox="0 0 420 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '105%',
          height: 18,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        {/* Brush body sweep */}
        <motion.path
          d="M8 12 Q60 5 120 11 Q180 17 240 10 Q300 3 360 11 Q392 14 412 9"
          stroke="var(--color-brand-primary)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: 'easeInOut' }}
        />
        {/* Finer secondary stroke for paint texture */}
        <motion.path
          d="M20 14 Q90 9 180 13 Q270 17 370 10"
          stroke="var(--color-brand-primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity={0.35}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 0.9, delay: 0.7, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

// ─── Animated underline input ─────────────────────────────────────────────────

function ArtInput({
  label,
  type = 'text',
  value,
  onChange,
  required,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ position: 'relative', paddingBottom: 24 }}>
      <label
        style={{
          display: 'block',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: focused ? 'var(--color-brand-accent)' : 'var(--color-brand-muted)',
          marginBottom: 6,
          transition: 'color 0.2s',
          fontWeight: 500,
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--color-brand-accent)', marginLeft: 2 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid rgba(196,168,130,0.35)',
          outline: 'none',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 15,
          color: 'var(--color-brand-dark)',
          padding: '6px 0 10px',
          boxSizing: 'border-box',
        }}
      />
      {/* Animated underline */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 0,
          right: 0,
          height: 1.5,
          background: 'var(--color-brand-accent)',
          transform: focused ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 0.28s ease',
          borderRadius: 2,
        }}
      />
    </div>
  )
}

function ArtSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ position: 'relative', paddingBottom: 24 }}>
      <label
        style={{
          display: 'block',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: focused ? 'var(--color-brand-accent)' : 'var(--color-brand-muted)',
          marginBottom: 6,
          transition: 'color 0.2s',
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid rgba(196,168,130,0.35)',
          outline: 'none',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 15,
          color: value ? 'var(--color-brand-dark)' : 'var(--color-brand-muted)',
          padding: '6px 0 10px',
          cursor: 'pointer',
          appearance: 'none',
          WebkitAppearance: 'none',
          boxSizing: 'border-box',
        }}
      >
        <option value="" disabled>Select one…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {/* Chevron */}
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-muted)" strokeWidth="2" strokeLinecap="round"
        style={{ position: 'absolute', right: 0, bottom: 34, pointerEvents: 'none' }}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 0,
          right: 0,
          height: 1.5,
          background: 'var(--color-brand-accent)',
          transform: focused ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 0.28s ease',
          borderRadius: 2,
        }}
      />
    </div>
  )
}

function ArtTextarea({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ position: 'relative', paddingBottom: 8 }}>
      <label
        style={{
          display: 'block',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: focused ? 'var(--color-brand-accent)' : 'var(--color-brand-muted)',
          marginBottom: 6,
          transition: 'color 0.2s',
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: 'rgba(250,246,241,0.6)',
          border: '0.5px solid rgba(196,168,130,0.3)',
          borderRadius: 12,
          outline: 'none',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 15,
          color: 'var(--color-brand-dark)',
          padding: '12px 14px',
          resize: 'vertical',
          lineHeight: 1.65,
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
          borderColor: focused ? 'var(--color-brand-primary)' : 'rgba(196,168,130,0.3)',
        }}
        placeholder="Tell Kamali what you'd like to learn, any questions you have, or just say hello…"
      />
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'fixed',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9990,
            background: 'var(--color-brand-dark)',
            color: 'var(--color-brand-light)',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 14,
            padding: '14px 28px',
            borderRadius: 50,
            boxShadow: '0 8px 32px rgba(61,43,31,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: '#6ec97a' }}>✓</span>
          Message sent! Kamali will be in touch soon.
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

const INTEREST_OPTIONS = [
  'Watercolour',
  'Acrylics',
  'Sketching',
  'Live Workshops',
  'Just exploring',
]

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    setSubmitted(true)
    setToast(true)
    setTimeout(() => setToast(false), 4000)
    // reset after a pause
    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setEmail('')
      setInterest('')
      setMessage('')
    }, 5500)
  }

  return (
    <>
      <Toast visible={toast} />
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          padding: 'clamp(28px, 4vw, 40px)',
          border: '0.5px solid rgba(196,168,130,0.2)',
          boxShadow: '0 4px 24px rgba(61,43,31,0.07)',
        }}
      >
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 28,
            fontWeight: 300,
            color: 'var(--color-brand-dark)',
            marginBottom: '2rem',
            letterSpacing: '0.02em',
          }}
        >
          Send a Message
        </h2>

        <form onSubmit={handleSubmit}>
          <ArtInput label="Your Name" value={name} onChange={setName} required />
          <ArtInput label="Email Address" type="email" value={email} onChange={setEmail} required />
          <ArtSelect
            label="I'm interested in"
            value={interest}
            onChange={setInterest}
            options={INTEREST_OPTIONS}
          />
          <ArtTextarea label="Message" value={message} onChange={setMessage} />

          <div style={{ marginTop: '2rem' }}>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                height: 52,
                borderRadius: 50,
                background: submitted ? '#4caf70' : 'var(--color-brand-primary)',
                color: 'var(--color-brand-dark)',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                fontWeight: 500,
                border: 'none',
                cursor: submitted ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'background 0.3s',
                letterSpacing: '0.02em',
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white' }}
                  >
                    <CheckIcon />
                    Sent!
                  </motion.span>
                ) : (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </form>
      </div>
    </>
  )
}

// ─── Info Cards ───────────────────────────────────────────────────────────────

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        border: '0.5px solid rgba(196,168,130,0.2)',
        padding: '1.5rem',
        boxShadow: '0 2px 12px rgba(61,43,31,0.05)',
      }}
    >
      {children}
    </div>
  )
}

function ContactInfo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* WhatsApp card */}
      <InfoCard>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(37,211,102,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#25d366',
              flexShrink: 0,
              animation: 'whatsapp-pulse 2.4s ease-in-out infinite',
            }}
          >
            <WhatsAppIcon size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 20,
                fontWeight: 400,
                color: 'var(--color-brand-dark)',
                marginBottom: '0.3rem',
                letterSpacing: '0.01em',
              }}
            >
              Message on WhatsApp
            </h3>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                color: 'var(--color-brand-muted)',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              Fastest response — usually within a few hours.
            </p>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                fontWeight: 500,
                color: '#1da851',
                textDecoration: 'none',
                padding: '6px 16px',
                borderRadius: 20,
                background: 'rgba(37,211,102,0.1)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)' }}
            >
              <WhatsAppIcon size={14} />
              Chat Now →
            </a>
          </div>
        </div>
      </InfoCard>

      {/* Email card */}
      <InfoCard>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(139,94,60,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-brand-accent)',
              flexShrink: 0,
            }}
          >
            <MailIcon size={20} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 20,
                fontWeight: 400,
                color: 'var(--color-brand-dark)',
                marginBottom: '0.3rem',
                letterSpacing: '0.01em',
              }}
            >
              Send an Email
            </h3>
            <a
              href="mailto:hello@inbaaacademy.com"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 14,
                color: 'var(--color-brand-accent)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              hello@inbaaacademy.com
            </a>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                color: 'var(--color-brand-muted)',
                lineHeight: 1.6,
              }}
            >
              We reply within 24 hours.
            </p>
          </div>
        </div>
      </InfoCard>

      {/* Social / Follow card */}
      <InfoCard>
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 20,
            fontWeight: 400,
            color: 'var(--color-brand-dark)',
            marginBottom: '1rem',
            letterSpacing: '0.01em',
          }}
        >
          Follow the Journey
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <a
            href="https://instagram.com/inbaaacademy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: 'var(--color-brand-dark)',
              padding: '8px 12px',
              borderRadius: 10,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-secondary)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ color: '#e1306c' }}><InstagramIcon /></span>
            @inbaaacademy
          </a>
          <a
            href="https://youtube.com/@inbaaacademy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              color: 'var(--color-brand-dark)',
              padding: '8px 12px',
              borderRadius: 10,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-secondary)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ color: '#ff0000' }}><YoutubeIcon /></span>
            Inbaa Academy
          </a>
        </div>
        {/* Tiny art preview thumbnails */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['insta-art1', 'insta-art2', 'insta-art3'].map((seed, i) => (
            <div
              key={i}
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                overflow: 'hidden',
                border: '0.5px solid rgba(196,168,130,0.3)',
              }}
            >
              <img
                src={`https://picsum.photos/seed/${seed}/112/112`}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
          ))}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: 'var(--color-brand-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 11,
              color: 'var(--color-brand-muted)',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            +more
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

// ─── Quick Connect Strip ──────────────────────────────────────────────────────

function QuickConnect() {
  return (
    <section
      style={{
        background: 'var(--color-brand-secondary)',
        padding: 'clamp(48px, 6vw, 72px) 24px',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
      >
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(22px, 3.5vw, 30px)',
            fontWeight: 300,
            color: 'var(--color-brand-dark)',
            marginBottom: '2rem',
            letterSpacing: '0.02em',
          }}
        >
          Prefer to talk?
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="tel:+91XXXXXXXXXX"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: 180,
              height: 52,
              borderRadius: 14,
              border: '1px solid rgba(196,168,130,0.5)',
              background: 'white',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--color-brand-dark)',
              textDecoration: 'none',
              transition: 'box-shadow 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(61,43,31,0.12)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <PhoneIcon size={18} />
            Call Us
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: 180,
              height: 52,
              borderRadius: 14,
              background: '#25d366',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 15,
              fontWeight: 500,
              color: 'white',
              textDecoration: 'none',
              border: 'none',
              transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1ebe5e'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#25d366'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <WhatsAppIcon size={18} />
            WhatsApp Now
          </a>
        </div>
      </motion.div>
    </section>
  )
}

// ─── ContactPage ──────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 860)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 860px)')
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return (
    <>
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(56px, 9vw, 100px) 24px clamp(48px, 7vw, 80px)',
          textAlign: 'center',
          background: 'var(--color-brand-light)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <BrushUnderlineHeading />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--color-brand-muted)',
            maxWidth: 500,
            margin: '2.5rem auto 0',
            lineHeight: 1.72,
          }}
        >
          Questions about a course? Want to know if you're ready? Just say hello.
        </motion.p>
      </section>

      {/* ── Two-column main ──────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 72px) 24px',
          display: 'grid',
          gridTemplateColumns: isDesktop ? '2fr 3fr' : '1fr',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'start',
        }}
      >
        {/* Left — info cards */}
        <motion.div
          initial={{ opacity: 0, x: isDesktop ? -20 : 0, y: isDesktop ? 0 : 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <ContactInfo />
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: isDesktop ? 20 : 0, y: isDesktop ? 0 : 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          <ContactForm />
        </motion.div>
      </section>

      {/* ── Quick connect strip ──────────────────────────────────────────── */}
      <QuickConnect />
    </>
  )
}
