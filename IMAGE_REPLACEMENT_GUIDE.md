# Image Replacement Quick Reference

## 🎯 External Image Sources to Replace

### File 1: HomePage.tsx - Featured Course Cards
- **File Path:** `src/pages/HomePage.tsx`
- **Lines:** 825-852
- **Current Code:**
  ```tsx
  src={`https://picsum.photos/seed/${course.seed}/560/320`}
  ```
- **Image Source:** Featured courses (currently 2 courses)
- **Seeds Used:** `aari-embroidery`, `silk-jewellery`
- **Recommended Replacement:** 
  ```tsx
  src={course.image || `/images/image${course.id}.jpg`}
  ```

### File 2: HomePage.tsx - Art Thumbnails in Hero
- **File Path:** `src/pages/HomePage.tsx`
- **Lines:** 60-70, 352-365
- **Current Code:**
  ```tsx
  src={`https://picsum.photos/seed/${t.seed}/360/270`}
  ```
- **Image Source:** Floating art thumbnails (3 images)
- **Seeds Used:** `watercolour-art`, `acrylic-paint`, `sketch-portrait`
- **Recommended Replacement:**
  ```tsx
  src={`/images/art-${i + 1}.jpg`}
  ```

### File 3: CoursesPage.tsx - Course Grid Cards
- **File Path:** `src/pages/CoursesPage.tsx`
- **Lines:** 286-300
- **Current Code:**
  ```tsx
  src={`https://picsum.photos/seed/${course.seed}/560/400`}
  ```
- **Image Source:** All course listings (5 courses)
- **Seeds Used:** `aari-embroidery`, `fabric-painting`, `silk-jewellery`, `mehndi-art`, `art-flowers`
- **Recommended Replacement:**
  ```tsx
  src={course.image || `/images/image${course.id}.jpg`}
  ```

---

## 📍 Local Image Files

### Logos (Actively Used)
```
Location: /images/
├── Inbaaacademy logo.png    → Used in Logo component (Header/Footer)
└── name only logo.png       → Used in Logo component (Variant)
```

**Used In:**
- [src/components/Logo.tsx](src/components/Logo.tsx)
- [src/components/Footer.tsx](src/components/Footer.tsx) 
- [src/components/Navbar.tsx](src/components/Navbar.tsx)

**Status:** ✅ These are SVG-based, not imported from files

---

## 🔄 Step-by-Step Replacement Process

### Step 1: Update Course Data Structure

**File:** `src/pages/CoursesPage.tsx` (Lines 5-35)

```tsx
// ADD image property to Course interface:
interface Course {
  id: number
  title: string
  description: string
  medium: Medium
  level: Level
  format: Format
  price: 'Enquire'
  lessons: number
  seed: string
  image?: string  // ← ADD THIS
  featured?: true
}

// ADD image property to COURSES array:
const COURSES: Course[] = [
  {
    id: 1, 
    title: 'Aari Embroidery Classes', 
    image: '/images/image1.jpg',  // ← ADD THIS
    medium: 'Aari Embroidery', 
    level: 'Beginner', 
    format: 'Recorded',
    // ... rest of properties
  },
  // ... repeat for other courses
]
```

### Step 2: Update Featured Courses Data

**File:** `src/pages/HomePage.tsx` (Lines 818-828)

```tsx
// UPDATE featured courses with image property:
const FEATURED_COURSES = [
  { 
    title: 'Aari Embroidery Classes', 
    subtitle: 'Basic to Bridal', 
    level: 'Beginner', 
    price: 'Enquire', 
    seed: 'aari-embroidery',
    image: '/images/image1.jpg'  // ← ADD THIS
  },
  { 
    title: 'Silk Thread Jewellery', 
    subtitle: 'Bangles, Earrings & Sets', 
    level: 'Beginner', 
    price: 'Enquire', 
    seed: 'silk-jewellery',
    image: '/images/image3.jpg'  // ← ADD THIS
  },
]
```

### Step 3: Update Art Thumbnails Data

**File:** `src/pages/HomePage.tsx` (Lines 60-68)

```tsx
// UPDATE art thumbnails with image property:
const artThumbnails = [
  { 
    seed: 'watercolour-art', 
    rotate: '-4deg', 
    arcY: '-20px', 
    delay: '0s', 
    dur: '3.6s',
    image: '/images/art-1.jpg'  // ← ADD THIS
  },
  { 
    seed: 'acrylic-paint', 
    rotate: '1.5deg', 
    arcY: '8px', 
    delay: '0.8s', 
    dur: '4.2s',
    image: '/images/art-2.jpg'  // ← ADD THIS
  },
  { 
    seed: 'sketch-portrait', 
    rotate: '3.5deg', 
    arcY: '-14px', 
    delay: '1.5s', 
    dur: '3.9s',
    image: '/images/art-3.jpg'  // ← ADD THIS
  },
]
```

### Step 4: Update Image Tags

**File:** `src/pages/HomePage.tsx` (Lines 363-368)

```tsx
// CHANGE FROM:
src={`https://picsum.photos/seed/${t.seed}/360/270`}

// CHANGE TO:
src={t.image || `https://picsum.photos/seed/${t.seed}/360/270`}
```

**File:** `src/pages/HomePage.tsx` (Lines 849-851)

```tsx
// CHANGE FROM:
src={`https://picsum.photos/seed/${course.seed}/560/320`}

// CHANGE TO:
src={course.image || `https://picsum.photos/seed/${course.seed}/560/320`}
```

**File:** `src/pages/CoursesPage.tsx` (Lines 292-294)

```tsx
// CHANGE FROM:
src={`https://picsum.photos/seed/${course.seed}/560/400`}

// CHANGE TO:
src={course.image || `https://picsum.photos/seed/${course.seed}/560/400`}
```

---

## 📊 Image Files Needed

### For Course Cards (Required)
- `image1.jpg` - Aari Embroidery (560x400px recommended)
- `image2.jpg` - Fabric Painting (560x400px recommended)
- `image3.jpg` - Silk Thread Jewellery (560x400px recommended)
- `image5.jpg` - Mehndi Classes (560x400px recommended)
- `image6.jpg` - Artificial Flowers (560x400px recommended)

### For Featured Section (Required)
- `image1.jpg` - Featured Aari course (560x320px recommended)
- `image3.jpg` - Featured Silk Jewellery (560x320px recommended)

### For Hero Art Thumbnails (Required)
- `art-1.jpg` - Watercolour art (360x270px recommended)
- `art-2.jpg` - Acrylic painting (360x270px recommended)
- `art-3.jpg` - Sketch portrait (360x270px recommended)

### For Logos (Already Present)
- ✅ `Inbaaacademy logo.png` - Full logo
- ✅ `name only logo.png` - Name variant

---

## ✅ Verification Checklist

After making changes, verify:

- [ ] All `https://picsum.photos` references are updated or have fallbacks
- [ ] Image files exist at `/images/` directory
- [ ] All new image properties are added to data structures
- [ ] Image tags use `course.image || fallback` pattern
- [ ] Images load correctly in development (`npm run dev`)
- [ ] Images load correctly in production build (`npm run build`)
- [ ] No console errors related to missing images
- [ ] Lazy loading still works (`loading="lazy"`)
- [ ] Responsive design works on mobile/tablet

---

## 🚀 Commands for Verification

```bash
# Build project
npm run build

# Check for broken images
npm run dev

# Search for remaining picsum references
grep -r "picsum.photos" src/

# List all images in /images directory
ls -lah images/
```

---

## 💾 File Organization

```
c:\Apps\Inbaaartacademy\
├── images/
│   ├── image1.jpg
│   ├── image2.jpg
│   ├── image3.jpg
│   ├── image5.jpg
│   ├── image6.jpg
│   ├── image7.jpg
│   ├── image8.jpg
│   ├── image9.jpg
│   ├── image10.jpg
│   ├── image11.jpg
│   ├── Inbaaacademy logo.png
│   └── name only logo.png
├── src/
│   ├── pages/
│   │   ├── HomePage.tsx ← UPDATE HERE
│   │   ├── CoursesPage.tsx ← UPDATE HERE
│   │   └── ...
│   ├── components/
│   │   ├── Logo.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── ...
├── IMAGE_INVENTORY.md ← Reference document
└── IMAGE_TRACKING.csv ← Tracking spreadsheet
```

---

**Last Updated:** May 26, 2026  
**Status:** Ready for implementation
