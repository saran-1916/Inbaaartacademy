import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  BookOpen,
  Upload,
  Settings,
  LogOut,
  Search,
  Eye,
  Edit,
  Download,
  GripVertical,
  ToggleLeft,
  ToggleRight,
  ArrowUpDown,
  Trash2,
  Play,
} from 'lucide-react'

// ── Placeholder data ──────────────────────────────────────────────────────────
const STUDENTS = [
  { id: 1, name: 'Ananya R.', email: 'ananya@example.com', courses: 2, enrolledOn: '01 Apr 2025', status: 'Active' },
  { id: 2, name: 'Deepa M.', email: 'deepa@example.com', courses: 1, enrolledOn: '05 Apr 2025', status: 'Active' },
  { id: 3, name: 'Kavitha S.', email: 'kavitha@example.com', courses: 3, enrolledOn: '10 Apr 2025', status: 'Active' },
  { id: 4, name: 'Lakshmi V.', email: 'lakshmi@example.com', courses: 1, enrolledOn: '12 Apr 2025', status: 'Inactive' },
  { id: 5, name: 'Meena P.', email: 'meena@example.com', courses: 2, enrolledOn: '18 Apr 2025', status: 'Active' },
  { id: 6, name: 'Nithya K.', email: 'nithya@example.com', courses: 1, enrolledOn: '22 Apr 2025', status: 'Active' },
  { id: 7, name: 'Priya T.', email: 'priya@example.com', courses: 2, enrolledOn: '01 May 2025', status: 'Active' },
  { id: 8, name: 'Rekha B.', email: 'rekha@example.com', courses: 1, enrolledOn: '10 May 2025', status: 'Inactive' },
]

const COURSES_DATA = [
  { id: 1, title: 'Watercolour Foundations', medium: 'Watercolour', level: 'Beginner', enrolled: 18, published: true },
  { id: 2, title: 'Acrylics for Beginners', medium: 'Acrylics', level: 'Beginner', enrolled: 14, published: true },
  { id: 3, title: 'Sketching Essentials', medium: 'Sketching', level: 'Beginner', enrolled: 12, published: true },
  { id: 4, title: 'Advanced Watercolour', medium: 'Watercolour', level: 'Advanced', enrolled: 7, published: true },
  { id: 5, title: 'Botanical Illustration', medium: 'Mixed', level: 'Intermediate', enrolled: 9, published: true },
  { id: 6, title: 'Landscape in Acrylics', medium: 'Acrylics', level: 'Intermediate', enrolled: 6, published: false },
  { id: 7, title: 'Portrait Sketching', medium: 'Sketching', level: 'Intermediate', enrolled: 4, published: false },
  { id: 8, title: 'Colour Theory Deep Dive', medium: 'Theory', level: 'All Levels', enrolled: 11, published: true },
  { id: 9, title: 'Wet-on-Wet Mastery', medium: 'Watercolour', level: 'Intermediate', enrolled: 5, published: true },
  { id: 10, title: 'Impasto Techniques', medium: 'Acrylics', level: 'Advanced', enrolled: 3, published: false },
  { id: 11, title: 'Urban Sketching', medium: 'Sketching', level: 'Intermediate', enrolled: 8, published: true },
  { id: 12, title: 'Miniature Watercolour', medium: 'Watercolour', level: 'Advanced', enrolled: 2, published: true },
]

const ACTIVITY = [
  { id: 1, text: 'Priya T. enrolled in Watercolour Foundations', time: '2 hours ago' },
  { id: 2, text: 'Meena P. completed Acrylics for Beginners', time: '5 hours ago' },
  { id: 3, text: 'Nithya K. enrolled in Sketching Essentials', time: '1 day ago' },
  { id: 4, text: 'Ananya R. downloaded her certificate', time: '1 day ago' },
  { id: 5, text: 'Kavitha S. enrolled in Advanced Watercolour', time: '2 days ago' },
]

const LESSONS_SAMPLE = [
  { id: 1, title: 'Introduction & Materials', order: 1 },
  { id: 2, title: 'Colour Theory Basics', order: 2 },
  { id: 3, title: 'Brush Handling', order: 3 },
  { id: 4, title: 'Wet-on-Dry Technique', order: 4 },
  { id: 5, title: 'Wet-on-Wet Technique', order: 5 },
]

type AdminTab = 'overview' | 'students' | 'courses' | 'upload'

const NAV_LINKS: { id: AdminTab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview', icon: <Play size={18} />, label: 'Overview' },
  { id: 'students', icon: <Users size={18} />, label: 'Students' },
  { id: 'courses', icon: <BookOpen size={18} />, label: 'Courses' },
  { id: 'upload', icon: <Upload size={18} />, label: 'Upload Content' },
  { id: 'settings' as AdminTab, icon: <Settings size={18} />, label: 'Settings' },
]

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        padding: '1.5rem',
        border: '1px solid var(--color-brand-secondary)',
        flex: '1 1 140px',
      }}
    >
      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.75rem',
          color: 'var(--color-brand-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '2.4rem',
          fontWeight: 600,
          color: 'var(--color-brand-dark)',
          lineHeight: 1,
          marginBottom: '0.25rem',
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: 'var(--color-brand-muted)' }}>
          {sub}
        </p>
      )}
    </div>
  )
}

// ── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <StatCard label="Total Students" value={50} sub="+8 this month" />
        <StatCard label="Courses Published" value={12} sub="3 drafts pending" />
        <StatCard label="Active Enrollments" value={73} sub="across all courses" />
        <StatCard label="New This Month" value={8} sub="students joined" />
      </div>

      <h3
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.3rem',
          fontWeight: 600,
          color: 'var(--color-brand-dark)',
          marginBottom: '1rem',
        }}
      >
        Recent Activity
      </h3>
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--color-brand-secondary)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {ACTIVITY.map((item, i) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.25rem',
              borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--color-brand-secondary)' : 'none',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--color-brand-primary)',
                  flexShrink: 0,
                }}
              />
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: 'var(--color-brand-ink)' }}>
                {item.text}
              </p>
            </div>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: 'var(--color-brand-muted)', flexShrink: 0 }}>
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Students tab ──────────────────────────────────────────────────────────────
function StudentsTab() {
  const [search, setSearch] = useState('')
  const filtered = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Table header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 360 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-brand-muted)' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students…"
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem 0.6rem 2.25rem',
              border: '1px solid var(--color-brand-secondary)',
              borderRadius: 6,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.875rem',
              color: 'var(--color-brand-ink)',
              background: '#fff',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 1.1rem',
            border: '1px solid var(--color-brand-primary)',
            borderRadius: 4,
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: '0.85rem',
            color: 'var(--color-brand-dark)',
            transition: 'background 0.18s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-secondary)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--color-brand-secondary)',
          borderRadius: 8,
          overflow: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-brand-secondary)' }}>
              {['Name', 'Email', 'Courses', 'Enrolled On', 'Status', 'Actions'].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'var(--color-brand-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'var(--color-brand-secondary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    {col}
                    {['Name', 'Enrolled On'].includes(col) && <ArrowUpDown size={12} style={{ opacity: 0.5 }} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, i) => (
              <tr
                key={student.id}
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--color-brand-secondary)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-light)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'var(--color-brand-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        color: 'var(--color-brand-dark)',
                        flexShrink: 0,
                      }}
                    >
                      {student.name[0]}
                    </div>
                    <span style={cellText}>{student.name}</span>
                  </div>
                </td>
                <td style={tdStyle}><span style={{ ...cellText, color: 'var(--color-brand-muted)' }}>{student.email}</span></td>
                <td style={tdStyle}><span style={cellText}>{student.courses}</span></td>
                <td style={tdStyle}><span style={{ ...cellText, color: 'var(--color-brand-muted)' }}>{student.enrolledOn}</span></td>
                <td style={tdStyle}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 10px',
                      borderRadius: 20,
                      fontSize: '0.72rem',
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      background: student.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                      color: student.status === 'Active' ? '#065F46' : '#991B1B',
                    }}
                  >
                    {student.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button style={actionBtnStyle('#fff', 'var(--color-brand-dark)', 'var(--color-brand-secondary)')}>
                      <Eye size={13} /> View
                    </button>
                    <button style={actionBtnStyle('#FEF2F2', '#991B1B', '#FEE2E2')}>
                      <Trash2 size={13} /> Revoke
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Courses tab ───────────────────────────────────────────────────────────────
function CoursesTab() {
  const [courses, setCourses] = useState(COURSES_DATA)

  const togglePublished = (id: number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, published: !c.published } : c))
    )
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid var(--color-brand-secondary)',
        borderRadius: 8,
        overflow: 'auto',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-brand-secondary)' }}>
            {['Course', 'Medium', 'Level', 'Enrolled', 'Status', 'Actions'].map((col) => (
              <th
                key={col}
                style={{
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-brand-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'var(--color-brand-secondary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((course, i) => (
            <tr
              key={course.id}
              style={{ borderBottom: i < courses.length - 1 ? '1px solid var(--color-brand-secondary)' : 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              <td style={tdStyle}><span style={{ ...cellText, fontWeight: 500 }}>{course.title}</span></td>
              <td style={tdStyle}><span style={{ ...cellText, color: 'var(--color-brand-muted)' }}>{course.medium}</span></td>
              <td style={tdStyle}><span style={{ ...cellText, color: 'var(--color-brand-muted)' }}>{course.level}</span></td>
              <td style={tdStyle}><span style={cellText}>{course.enrolled}</span></td>
              <td style={tdStyle}>
                <button
                  onClick={() => togglePublished(course.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {course.published
                    ? <ToggleRight size={22} color="#10B981" />
                    : <ToggleLeft size={22} color="var(--color-brand-muted)" />}
                  <span
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.78rem',
                      color: course.published ? '#10B981' : 'var(--color-brand-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {course.published ? 'Published' : 'Draft'}
                  </span>
                </button>
              </td>
              <td style={tdStyle}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button style={actionBtnStyle('#fff', 'var(--color-brand-dark)', 'var(--color-brand-secondary)')}>
                    <Edit size={13} /> Edit
                  </button>
                  <button style={actionBtnStyle('#FEF2F2', '#991B1B', '#FEE2E2')}>
                    <Trash2 size={13} /> Archive
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Upload Content tab ────────────────────────────────────────────────────────
function UploadTab() {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [dragging, setDragging] = useState(false)
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonDesc, setLessonDesc] = useState('')
  const [lessonOrder, setLessonOrder] = useState('')

  return (
    <div style={{ maxWidth: 720 }}>
      {/* Course select */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Select Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          style={selectStyle}
        >
          <option value="">— Choose a course —</option>
          {COURSES_DATA.filter((c) => c.published).map((c) => (
            <option key={c.id} value={c.title}>{c.title}</option>
          ))}
        </select>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false) }}
        style={{
          border: `2px dashed ${dragging ? 'var(--color-brand-accent)' : 'var(--color-brand-primary)'}`,
          borderRadius: 8,
          padding: '3rem 2rem',
          textAlign: 'center',
          background: dragging ? 'var(--color-brand-secondary)' : '#fff',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          marginBottom: '1.75rem',
        }}
      >
        <Upload size={32} color="var(--color-brand-muted)" style={{ margin: '0 auto 0.75rem' }} />
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', color: 'var(--color-brand-dark)', fontWeight: 500, marginBottom: '0.35rem' }}>
          Drag video here or click to browse
        </p>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: 'var(--color-brand-muted)' }}>
          MP4, MOV — max 2GB
        </p>
      </div>

      {/* Lesson fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={labelStyle}>Lesson Title</label>
          <input
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            placeholder="e.g. Wet-on-Wet Technique"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Lesson Number / Order</label>
          <input
            type="number"
            value={lessonOrder}
            onChange={(e) => setLessonOrder(e.target.value)}
            placeholder="e.g. 6"
            style={inputStyle}
          />
        </div>
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Lesson Description</label>
        <textarea
          value={lessonDesc}
          onChange={(e) => setLessonDesc(e.target.value)}
          placeholder="Brief description of what students will learn…"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
        />
      </div>

      <button
        style={{
          padding: '0.75rem 2rem',
          background: 'var(--color-brand-primary)',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '0.9rem',
          color: 'var(--color-brand-dark)',
          marginBottom: '2.5rem',
          transition: 'background 0.18s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-accent)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-primary)'; e.currentTarget.style.color = 'var(--color-brand-dark)' }}
      >
        Save Lesson
      </button>

      {/* Existing lessons */}
      {selectedCourse && (
        <div>
          <h4
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              marginBottom: '0.75rem',
            }}
          >
            Lessons in "{selectedCourse}"
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {LESSONS_SAMPLE.map((lesson) => (
              <div
                key={lesson.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: '#fff',
                  border: '1px solid var(--color-brand-secondary)',
                  borderRadius: 6,
                  cursor: 'grab',
                }}
              >
                <GripVertical size={16} color="var(--color-brand-muted)" style={{ flexShrink: 0 }} />
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--color-brand-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    color: 'var(--color-brand-dark)',
                    flexShrink: 0,
                  }}
                >
                  {lesson.order}
                </span>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: 'var(--color-brand-ink)', flex: 1 }}>
                  {lesson.title}
                </span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-muted)', padding: 4 }}>
                  <Edit size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const tdStyle: React.CSSProperties = {
  padding: '0.8rem 1rem',
  verticalAlign: 'middle',
}
const cellText: React.CSSProperties = {
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '0.875rem',
  color: 'var(--color-brand-ink)',
}
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '0.78rem',
  color: 'var(--color-brand-muted)',
  marginBottom: '0.4rem',
  letterSpacing: '0.04em',
}
const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  border: '1px solid var(--color-brand-secondary)',
  borderRadius: 6,
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '0.875rem',
  color: 'var(--color-brand-ink)',
  background: '#fff',
  outline: 'none',
  cursor: 'pointer',
  boxSizing: 'border-box',
}
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  border: '1px solid var(--color-brand-secondary)',
  borderRadius: 6,
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '0.875rem',
  color: 'var(--color-brand-ink)',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
}
function actionBtnStyle(bg: string, color: string, hoverBg: string): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.3rem 0.65rem',
    background: bg,
    border: `1px solid ${hoverBg}`,
    borderRadius: 4,
    cursor: 'pointer',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '0.75rem',
    color,
    whiteSpace: 'nowrap',
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  const tabTitles: Record<AdminTab, string> = {
    overview: 'Overview',
    students: 'Students',
    courses: 'Courses',
    upload: 'Upload Content',
    settings: 'Settings',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-brand-light)' }}>

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: 'var(--color-brand-dark)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.75rem 0',
          position: 'sticky',
          top: 68,
          height: 'calc(100vh - 68px)',
          overflowY: 'auto',
        }}
      >
        {/* Sidebar header */}
        <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '1px solid rgba(196,168,130,0.15)' }}>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--color-brand-primary)',
              letterSpacing: '0.04em',
            }}
          >
            Admin Panel
          </p>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(168, 144, 128, 0.7)',
            }}
          >
            Inbaa Academy
          </p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.75rem 0' }}>
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.7rem 1.25rem',
                background: activeTab === item.id ? 'rgba(196, 168, 130, 0.12)' : 'none',
                border: 'none',
                borderLeft: `3px solid ${activeTab === item.id ? 'var(--color-brand-primary)' : 'transparent'}`,
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: activeTab === item.id ? 500 : 400,
                fontSize: '0.875rem',
                color: activeTab === item.id ? 'var(--color-brand-primary)' : 'rgba(168, 144, 128, 0.75)',
                textAlign: 'left',
                transition: 'all 0.18s ease',
              }}
            >
              <span style={{ opacity: activeTab === item.id ? 1 : 0.65 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Log out */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(196,168,130,0.15)' }}>
          <Link
            to="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(168, 144, 128, 0.65)',
              textDecoration: 'none',
              transition: 'color 0.18s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(168, 144, 128, 0.65)' }}
          >
            <LogOut size={14} />
            Log Out
          </Link>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <div
          style={{
            position: 'sticky',
            top: 68,
            zIndex: 50,
            background: '#fff',
            borderBottom: '1px solid var(--color-brand-secondary)',
            padding: '0 2rem',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--color-brand-dark)',
              }}
            >
              {tabTitles[activeTab]}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: 'var(--color-brand-muted)' }}>
              Kamali — Admin
            </span>
            <Link
              to="/login"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.82rem',
                color: 'var(--color-brand-accent)',
                textDecoration: 'none',
                border: '1px solid var(--color-brand-accent)',
                padding: '0.3rem 0.85rem',
                borderRadius: 4,
              }}
            >
              Log Out
            </Link>
          </div>
        </div>

        {/* Content area */}
        <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto' }}>

          {/* Demo banner */}
          <div
            style={{
              background: '#EDE9FE',
              border: '1px solid #7C3AED',
              borderRadius: 6,
              padding: '0.65rem 1rem',
              marginBottom: '2rem',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.82rem',
              color: '#4C1D95',
            }}
          >
            🛡️ <strong>Admin Panel is in Demo Mode.</strong> Changes will not be saved.
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'courses' && <CoursesTab />}
          {activeTab === 'upload' && <UploadTab />}
          {activeTab === 'settings' && (
            <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.5rem', color: 'var(--color-brand-muted)', fontStyle: 'italic' }}>
              Settings panel coming soon.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
