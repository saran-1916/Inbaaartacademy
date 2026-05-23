export default function CourseCardSkeleton() {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        border: '0.5px solid rgba(196,168,130,0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 10px rgba(61,43,31,0.05)',
      }}
    >
      {/* Image area */}
      <div className="shimmer" style={{ height: 200, flexShrink: 0 }} />

      {/* Card body */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Title */}
        <div className="shimmer" style={{ height: 22, width: '65%', borderRadius: 6 }} />

        {/* Description lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div className="shimmer" style={{ height: 13, width: '100%', borderRadius: 4 }} />
          <div className="shimmer" style={{ height: 13, width: '78%', borderRadius: 4 }} />
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', gap: 14, marginTop: 4 }}>
          <div className="shimmer" style={{ height: 13, width: 52, borderRadius: 4 }} />
          <div className="shimmer" style={{ height: 13, width: 68, borderRadius: 4 }} />
        </div>

        {/* Price + CTA row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <div className="shimmer" style={{ height: 24, width: 56, borderRadius: 6 }} />
          <div className="shimmer" style={{ height: 34, width: 110, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  )
}
