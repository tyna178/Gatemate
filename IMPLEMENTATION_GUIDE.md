# 📋 Panduan Implementasi React.js di Laravel - SecureGate

## 📁 Struktur File yang Sudah Dibuat

```
resources/js/
├── app.jsx                          # Entry point React aplikasi
├── bootstrap.js                     # Setup axios dan konfigurasi
│
├── pages/
│   └── Home.jsx                     # Halaman utama
│
├── components/
│   ├── Layout/
│   │   ├── TopNavBar.jsx            # Navigation bar atas
│   │   ├── Footer.jsx               # Footer
│   │   └── BottomNavBar.jsx         # Bottom nav (mobile)
│   │
│   ├── Sections/
│   │   ├── HeroSection.jsx          # Hero/banner
│   │   ├── FeaturesSection.jsx      # Fitur
│   │   ├── CategorySection.jsx      # Kategori
│   │   ├── TrendingSection.jsx      # Trending (integrated dengan API)
│   │   └── CTASection.jsx           # Call to action
│   │
│   ├── Cards/
│   │   ├── EventCard.jsx            # Event card
│   │   └── FeatureCard.jsx          # Feature card
│   │
│   └── Common/
│       └── MaterialIcon.jsx         # Material icon wrapper
│
├── services/
│   └── api.js                       # API client dengan services
│
└── hooks/
    └── useEvents.js                 # Custom hooks untuk fetch events

resources/views/
└── app.blade.php                    # Template Blade (sudah diupdate)

tailwind.config.js                   # Tailwind config (sudah dibuat)
```

## 🚀 Langkah-Langkah Setup

### 1. Install Dependencies (WAJIB)

```bash
npm install react react-dom axios
npm install -D @vitejs/plugin-react
npm install @tailwindcss/forms @tailwindcss/container-queries
```

### 2. Verifikasi `vite.config.js` (PENTING)

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',  // ✅ PASTIKAN app.jsx bukan app.js
            refresh: true,
        }),
        react(),
    ],
});
```

### 3. Update `postcss.config.js` (jika ada)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4. Update `tailwind.config.js`

File sudah tersedia di root project dengan semua custom colors.

### 5. Update `resources/css/app.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Jalankan Development Server

```bash
# Terminal 1: Vite dev server
npm run dev

# Terminal 2: Laravel development server
php artisan serve
```

Buka: http://localhost:8000

## 📝 File Penting yang Sudah Diupdate

### ✅ `resources/views/app.blade.php`
- Entry point template Laravel
- Load React app di `<div id="app"></div>`
- Include Material Icons CDN
- Include Tailwind CSS

### ✅ `resources/js/app.jsx`
- Import React dan Home page
- Setup ReactDOM render
- Load bootstrap

### ✅ `resources/js/bootstrap.js`
- Setup axios
- Auto CSRF token configuration
- Ready untuk interceptors

### ✅ `tailwind.config.js`
- Semua custom colors Material Design
- Custom fonts: headline-lg, body-md, dll
- Custom spacing: card-padding, gap-default, dll
- Plugins: forms, container-queries

## 🔌 Integrasi dengan API Laravel

### Service Layer Sudah Tersedia

File: `resources/js/services/api.js`

Berisi services untuk:
- **Event**: getAllEvents, getTrendingEvents, getEvent, searchEvents, createEvent
- **Category**: getAll, getWithEvents
- **Ticket**: purchase, getUserTickets, verify
- **Auth**: login, register, logout, getCurrentUser
- **User**: getProfile, updateProfile, getWallet, topupWallet

### Penggunaan di Components

```jsx
import { eventService } from '../../services/api';

// Di dalam component
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await eventService.getTrendingEvents(10);
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  fetchEvents();
}, []);
```

### TrendingSection Sudah Terintegrasi

File: `resources/js/components/Sections/TrendingSection.jsx`

Sudah mengimplementasikan:
- ✅ Fetch dari API `/api/events/trending`
- ✅ Loading state
- ✅ Error handling
- ✅ Fallback ke data statis jika API error

## 📚 Dokumentasi Lengkap

### 1. **REACT_STRUCTURE.md**
   - Penjelasan struktur file
   - Setup instructions
   - Integration dengan API

### 2. **ROUTES_API_EXAMPLE.md**
   - Contoh API routes Laravel
   - Contoh controllers
   - Response format
   - Testing dengan Postman

## 🎨 Component Examples

### Membuat Component Baru

```jsx
// resources/js/components/MyComponent.jsx
import React from 'react';

export default function MyComponent() {
  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="font-headline-md text-headline-md">
        My Component
      </h2>
    </div>
  );
}
```

### Menggunakan Material Icon

```jsx
import MaterialIcon from '../Common/MaterialIcon';

<MaterialIcon icon="home" fill={true} className="text-2xl" />
```

### Fetch Data dari API

```jsx
import { eventService } from '../../services/api';
import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getAllEvents()
      .then(res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>{data.length} events</p>}
    </div>
  );
}
```

## ⚙️ Configuration

### Custom Colors

Semua warna sudah tersedia di `tailwind.config.js`:
- `text-primary` = `#b22110`
- `bg-surface` = `#fff8f6`
- `text-on-surface` = `#271815`
- Dan puluhan warna lainnya...

### Custom Font Sizes

- `text-headline-lg` = 32px
- `text-headline-md` = 20px
- `text-headline-sm` = 16px
- `text-body-lg` = 15px
- `text-body-md` = 14px

### Custom Spacing

- `gap-default` = 1.25rem
- `gap-tight` = 1rem
- `container-padding` = 1.5rem
- `card-padding` = 0.75rem

## 🐛 Troubleshooting

### Problem: "Cannot find module 'react'"
**Solution**: Run `npm install react react-dom`

### Problem: "Vite can't find .jsx files"
**Solution**: 
- Check `vite.config.js` has `@vitejs/plugin-react`
- Restart Vite dev server: `npm run dev`

### Problem: "Tailwind classes tidak berpengaruh"
**Solution**:
- Check `resources/css/app.css` ada `@tailwind` directives
- Verify `vite.config.js` mencakup `resources/css/app.css`
- Run `npm run dev` untuk rebuild

### Problem: "Material Icons tidak tampil"
**Solution**:
- Check CDN link sudah ada di `app.blade.php`
- Verify class `material-symbols-outlined` di HTML
- Buka DevTools, check network tab

### Problem: "API call tidak bekerja"
**Solution**:
- Check Laravel API route sudah create (`routes/api.php`)
- Verify CSRF token configuration di `bootstrap.js`
- Check Network tab di DevTools untuk response

## 📦 Build untuk Production

```bash
npm run build
php artisan optimize
```

Artifacts akan di-generate ke `public/build/`

## 🎯 Next Steps

1. **Create Laravel API Controllers** - Ikuti contoh di `ROUTES_API_EXAMPLE.md`
2. **Create Database Models & Migrations** - Untuk Event, Ticket, dll
3. **Implement Authentication** - Gunakan Sanctum atau Passport
4. **Add More Pages** - Create additional React pages
5. **State Management** - Consider using Context API atau Zustand untuk state global

## ✨ Key Features Sudah Diimplementasikan

- ✅ Component-based architecture
- ✅ Responsive design (mobile-first)
- ✅ Tailwind CSS dengan custom theme
- ✅ Material Design 3 colors
- ✅ Smooth scroll animations
- ✅ API integration ready
- ✅ Error handling
- ✅ Loading states
- ✅ CSRF token auto-configuration
- ✅ Intersection Observer untuk scroll reveals

## 📞 Support

Jika ada issues atau pertanyaan:
1. Check dokumentasi di REACT_STRUCTURE.md
2. Review ROUTES_API_EXAMPLE.md untuk API setup
3. Buka DevTools (F12) untuk debugging
4. Check browser console untuk error messages

---

**Status**: ✅ Ready Production
**Last Updated**: June 5, 2025
