# Image Inventory & Usage Guide

**Last Updated:** May 26, 2026  
**Purpose:** Track all images in the project and their locations for easy replacement and management.

---

## 📂 Image Files Summary

| # | Image File | Type | Size/Format | Current Usage | Status |
|---|---|---|---|---|---|
| 1 | `Aari Embroidery.png` | PNG | Course Card | Active in CoursesPage & HomePage | ✅ Active |
| 2 | `Fabric Painting.png` | PNG | Course Card | Active in CoursesPage & HomePage | ✅ Active |
| 3 | `Silk Thread Jewellery.png` | PNG | Course Card | Active in CoursesPage & HomePage | ✅ Active |
| 4 | `Mehndi.png` | PNG | Course Card | Active in CoursesPage & HomePage | ✅ Active |
| 5 | `Artificial Flowers Making.png` | PNG | Course Card | Active in CoursesPage | ✅ Active |
| 6 | `image3.jpg` | JPG | Content | Not actively used in codebase | ✗ Unused |
| 7 | `image5.jpg` | JPG | Content | Not actively used in codebase | ✗ Unused |
| 8 | `image6.jpg` | JPG | Content | Not actively used in codebase | ✗ Unused |
| 9 | `image7.jpg` | JPG | Content | Not actively used in codebase | ✗ Unused |
| 10 | `image8.jpg` | JPG | Content | Not actively used in codebase | ✗ Unused |
| 11 | `Inbaaacademy logo.png` | PNG | Logo | Used for branding | ✅ Logo |
| 12 | `name only logo.png` | PNG | Logo | Used for branding | ✅ Logo |

---

## 📍 Image Usage Locations

### **Currently Active Image Sources (Local - Updated)**

The project now uses **local course images** from `/images/` directory. Here's where they're used:

#### 1. **Course Cards in CoursesPage** 
- **File:** [src/pages/CoursesPage.tsx](src/pages/CoursesPage.tsx#L286)
- **Location:** All course listings
- **Image Source:** Local image paths
- **Images Used:**
  - `/images/Aari Embroidery.png` - Course 1
  - `/images/Fabric Painting.png` - Course 2
  - `/images/Silk Thread Jewellery.png` - Course 3
  - `/images/Mehndi.png` - Course 4
  - `/images/Artificial Flowers Making.png` - Course 5
- **Size:** 560x400px (displayed as 560x400)
- **Usage:** Grid of all available courses

#### 2. **Featured Course Cards in HomePage**
- **File:** [src/pages/HomePage.tsx](src/pages/HomePage.tsx#L825)
- **Location:** Featured courses section
- **Image Source:** Local image paths
- **Images Used:**
  - `/images/Aari Embroidery.png` - Featured course 1
  - `/images/Fabric Painting.png` - Featured course 2
  - `/images/Silk Thread Jewellery.png` - Featured course 3
  - `/images/Mehndi.png` - Featured course 4
- **Size:** 560x320px (displayed as 280x160)
- **Usage:** Hero featured course cards with hover effects

#### 3. **Logo Files**
- **File:** [src/components/Logo.tsx](src/components/Logo.tsx)
- **Location:** Header, Footer, Navigation
- **Image Source:** SVG-based (not imported as files currently)
- **Files Available:** 
  - `/images/Inbaaacademy logo.png`
  - `/images/name only logo.png`
- **Usage:** Branding elements

---

## 🎯 How to Replace Images

### **Option 1: Replace External Placeholder Images**

If you want to use local images instead of `picsum.photos`:

```tsx
// OLD (Current):
src={`https://picsum.photos/seed/${course.seed}/560/400`}

// NEW (Using local images):
src={`/images/image${courseId}.jpg`}
```

**Files to Update:**
- [src/pages/HomePage.tsx](src/pages/HomePage.tsx) - Lines 825-852 (Featured courses)
- [src/pages/HomePage.tsx](src/pages/HomePage.tsx) - Lines 60-70 (Art thumbnails)
- [src/pages/CoursesPage.tsx](src/pages/CoursesPage.tsx) - Lines 286-300 (Course cards)

---

### **Option 2: Use Local Images from `/images/` Folder**

To use your local images, import them directly in components:

```tsx
import image1 from '../images/image1.jpg'
import { Inbaaacademy logo } from '../images/Inbaaacademy logo.png'

// Then use in JSX:
<img src={image1} alt="Course Preview" />
<img src={logo} alt="Academy Logo" />
```

**Important:** When using imports, image files with spaces in names need special handling:

```tsx
// For files with spaces, use dynamic require:
const logo = require('../images/Inbaaacademy logo.png').default
```

---

### **Option 3: Update via HTML src Attribute**

For images referenced directly in img tags (if you transition to local files):

```tsx
<img 
  src="/images/image1.jpg" 
  alt="Course Featured Image"
  loading="lazy"
/>
```

---

## 🔄 Image Replacement Checklist

### **For Updating Course Card Images:**

1. **Replace 560x400px Course Images** (for [CoursesPage.tsx](src/pages/CoursesPage.tsx)):
   - ❌ Remove external `picsum.photos` references
   - ✅ Add local images: `image1.jpg`, `image2.jpg`, `image3.jpg`, etc.
   - ✅ Update course data mapping to use new image files

2. **Replace 560x320px Featured Images** (for [HomePage.tsx](src/pages/HomePage.tsx#L825)):
   - ❌ Remove external `picsum.photos` references
   - ✅ Add local images for featured courses
   - ✅ Update featured course data

3. **Replace 360x270px Art Thumbnails** (for [HomePage.tsx](src/pages/HomePage.tsx#L352)):
   - ❌ Remove external `picsum.photos` references
   - ✅ Add local art thumbnail images
   - ✅ Update art thumbnail data array

---

## 📋 Local Images Ready to Use

### **Logo Files:**
- `Inbaaacademy logo.png` - Full academy logo with text
  - **Recommended Usage:** Header, footer, about page
  - **Path:** `/images/Inbaaacademy logo.png`
  
- `name only logo.png` - Name-only logo variant
  - **Recommended Usage:** Favicon, compact header
  - **Path:** `/images/name only logo.png`

### **Content Images:**
- `image1.jpg` through `image11.jpg` - Content/course images
  - **Recommended Size for Web:** 560x400px (compressed, ~50-100KB each)
  - **Path:** `/images/image{N}.jpg`
  - **Suggested Usage:** Course cards, gallery, portfolio items

---

## 💡 Implementation Guide

### **Step 1: Prepare Image Files**
```bash
# Ensure all images are optimized for web:
# - Max dimensions: 560x400 (courses), 360x270 (thumbnails)
# - Format: JPG (lossy, smaller) or PNG (lossless)
# - File size: <100KB each recommended
```

### **Step 2: Create Image Mapping**
Add this to your course/workshop data files:

```tsx
const COURSES = [
  {
    id: 1,
    title: 'Aari Embroidery Classes',
    image: '/images/image1.jpg',  // ← ADD THIS
    // ... other properties
  },
  {
    id: 2,
    title: 'Fabric Painting Classes',
    image: '/images/image2.jpg',  // ← ADD THIS
    // ... other properties
  },
]
```

### **Step 3: Update Component References**
```tsx
// OLD:
src={`https://picsum.photos/seed/${course.seed}/560/400`}

// NEW:
src={course.image || '/images/image-placeholder.jpg'}
```

### **Step 4: Update Image Tags**
```tsx
<img
  src={course.image}
  alt={course.title}
  loading="lazy"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  }}
/>
```

---

## 🚀 Quick Replace Commands

### **Find All Image References:**
```bash
# Search for picsum references:
grep -r "picsum.photos" src/

# Search for image imports:
grep -r "from.*images" src/
```

### **Replace Globally (if using same image structure):**

**Using Find & Replace in VS Code:**
1. Press `Ctrl+H` (or `Cmd+H` on Mac)
2. Find: `https://picsum.photos/seed/\$\{[^}]+\}/560/400`
3. Replace with: `/images/image.jpg`

---

## 📊 Image Categories & Recommendations

| Category | Current Source | Recommended Size | Format | Usage |
|---|---|---|---|---|
| Course Cards | External | 560x400px | JPG | Course listings |
| Featured Courses | External | 560x320px | JPG | Homepage hero |
| Art Thumbnails | External | 360x270px | JPG | Floating gallery |
| Logos | Local | Variable | PNG | Branding |
| Gallery Items | SVG Gradients | - | - | About page |

---

## 🎨 Brand Assets

### **Logo Files Location:**
- [Inbaaacademy logo.png](/images/Inbaaacademy%20logo.png)
- [name only logo.png](/images/name%20only%20logo.png)

**Usage in Code:**
- Logo Component: [src/components/Logo.tsx](src/components/Logo.tsx) - Uses SVG-based monogram
- Footer: [src/components/Footer.tsx](src/components/Footer.tsx) - Uses Logo component
- Navbar: [src/components/Navbar.tsx](src/components/Navbar.tsx) - Uses Logo component

---

## ⚠️ Important Notes

1. **File Name Spaces:** Images with spaces in names (e.g., `Inbaaacademy logo.png`) need special handling in imports. Use dynamic requires or URL paths without imports.

2. **Image Optimization:** Before replacing, optimize images:
   - Compress JPGs (quality 75-85%)
   - Remove unnecessary metadata
   - Use appropriate dimensions for responsive design

3. **Lazy Loading:** All course card images use `loading="lazy"` - this will still work with local files.

4. **Responsive Sizes:** Consider creating responsive image versions:
   - Desktop: 560x400px
   - Tablet: 420x300px
   - Mobile: 280x200px

5. **CDN Option:** For best performance with many images, consider:
   - Uploading to Vercel Storage
   - Using Cloudinary or similar CDN
   - Setting up caching headers

---

## 📝 Next Steps

1. **Audit Current Images:** Verify which images from `/images/` should be used
2. **Optimize Images:** Compress and resize for web
3. **Update Data Files:** Add image paths to course/workshop data
4. **Update Components:** Replace `picsum.photos` references
5. **Test:** Verify all images load correctly
6. **Deploy:** Push changes to production

---

**Generated:** May 26, 2026  
**Project:** Inbaa Academy  
**Status:** Ready for image replacement
