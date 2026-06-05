# ✅ Setup Checklist - React.js Integration

Ikuti checklist ini untuk setup React.js di project Laravel Anda.

## 📦 Step 1: Install Dependencies

- [ ] Buka terminal di folder project
- [ ] Jalankan: `npm install react react-dom axios`
- [ ] Jalankan: `npm install -D @vitejs/plugin-react`
- [ ] Jalankan: `npm install @tailwindcss/forms @tailwindcss/container-queries`

**Verifikasi**: Cek `node_modules` folder ada 4 dependencies baru

## ⚙️ Step 2: Verifikasi Konfigurasi

### vite.config.js
- [ ] Pastikan ada line: `import react from '@vitejs/plugin-react';`
- [ ] Pastikan ada di plugins array: `react()`
- [ ] Pastikan `input` pointing ke `'resources/js/app.jsx'`

```javascript
// ✅ Harus ada:
import react from '@vitejs/plugin-react';

// Di plugins:
plugins: [
    laravel({
        input: 'resources/js/app.jsx',  // ← Pastikan .jsx bukan .js
        refresh: true,
    }),
    react(),  // ← Pastikan ada react()
],
```

### postcss.config.js
- [ ] Ada file `postcss.config.js` di root
- [ ] Ada konfigurasi untuk tailwindcss dan autoprefixer

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tailwind.config.js
- [ ] Ada file `tailwind.config.js` di root (sudah dibuat)
- [ ] Contains custom colors dan font sizes

### resources/css/app.css
- [ ] Berisi: `@tailwind base;`
- [ ] Berisi: `@tailwind components;`
- [ ] Berisi: `@tailwind utilities;`

## 📁 Step 3: Verifikasi File Structure

- [ ] `resources/js/app.jsx` exists
- [ ] `resources/js/bootstrap.js` exists
- [ ] `resources/views/app.blade.php` exists
- [ ] `resources/js/pages/Home.jsx` exists
- [ ] `resources/js/components/` folder structure exists
- [ ] `tailwind.config.js` exists di root

**Command untuk cek**:
```bash
# Windows
dir resources\js\
dir resources\js\components\
dir resources\js\components\Layout\
```

## 🎨 Step 4: Verifikasi Blade Template

Edit: `resources/views/app.blade.php`

- [ ] Ganti `@vite(['resources/css/app.css', 'resources/js/app.js'])`
  dengan `@vite(['resources/css/app.css', 'resources/js/app.jsx'])`
- [ ] Ada `<div id="app"></div>` di body
- [ ] Ada Material Symbols Outlined link:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
  ```

## 📝 Step 5: Verifikasi package.json

- [ ] Ada scripts:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```
- [ ] Dependencies include React, ReactDOM, Axios
- [ ] DevDependencies include @vitejs/plugin-react

## 🚀 Step 6: Test Development Server

### Terminal 1: Vite Dev Server
```bash
npm run dev
```
- [ ] Vite server started (biasanya port 5173)
- [ ] No build errors di console

### Terminal 2: Laravel Server
```bash
php artisan serve
```
- [ ] Laravel server running (port 8000)
- [ ] No PHP errors

### Browser
- [ ] Buka http://localhost:8000
- [ ] Lihat home page dengan:
  - [ ] SecureGate logo di top
  - [ ] "Temukan event terbaikmu" hero text
  - [ ] Event cards showing
  - [ ] Footer di bawah
  - [ ] No console errors (F12 → Console tab)

## 🔧 Step 7: API Integration Setup

### Create API Routes
- [ ] Create `routes/api.php` (atau update existing)
- [ ] Add event routes (lihat ROUTES_API_EXAMPLE.md)

```php
Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index']);
    Route::get('/trending', [EventController::class, 'trending']);
});
```

### Create Controllers
- [ ] Run: `php artisan make:controller Api/EventController`
- [ ] Implement methods (lihat ROUTES_API_EXAMPLE.md)

### Test API Endpoint
- [ ] Use Postman atau curl
- [ ] GET http://localhost:8000/api/events/trending
- [ ] Should return JSON data

## 🎨 Step 8: Verify Styling

- [ ] Tailwind colors applying (check inspector)
- [ ] Material icons showing (check page)
- [ ] Responsive design works (resize browser)
- [ ] No styling warnings in console

**Check**: Open DevTools (F12) → Elements → inspect elements
Should see Tailwind classes like `text-primary`, `bg-surface`, etc.

## ✅ Step 9: Verify Components

- [ ] TopNavBar renders
- [ ] Hero section visible
- [ ] Feature cards showing
- [ ] Category section visible
- [ ] Event cards loading
- [ ] Footer visible
- [ ] Mobile bottom nav showing on small screens

## 🔗 Step 10: Test API Integration

Edit: `resources/js/components/Sections/TrendingSection.jsx`

- [ ] Component fetches from `/api/events/trending`
- [ ] Shows loading state while fetching
- [ ] Shows events when loaded
- [ ] Shows error if API fails
- [ ] Falls back to static data if needed

**Test**: 
1. Open DevTools → Network tab
2. Reload page
3. Should see request to `/api/events/trending`

## 📦 Step 11: Build for Production

```bash
npm run build
```

- [ ] Build completes successfully
- [ ] No build errors
- [ ] `public/build/` folder created with assets

## 🎯 Final Verification

- [ ] All checklist items completed
- [ ] No console errors
- [ ] API integration working
- [ ] Styles rendering correctly
- [ ] Responsive design working
- [ ] Ready for development!

## 🚨 Troubleshooting

If any step fails, check:

### Vite Issues
- [ ] Clear `node_modules`: `rm -r node_modules && npm install`
- [ ] Clear Vite cache: Delete `.vite` folder if exists
- [ ] Restart Vite server

### Styling Issues
- [ ] Verify `resources/css/app.css` has `@tailwind` directives
- [ ] Clear browser cache: Ctrl+Shift+Delete
- [ ] Check `tailwind.config.js` content array includes `.jsx` files

### API Issues
- [ ] Verify API route exists: `php artisan route:list`
- [ ] Check controller exists and has method
- [ ] Verify JSON response format

### Component Issues
- [ ] Check browser console (F12)
- [ ] Look for import errors
- [ ] Verify component file paths

## 📋 Reference Files

All reference documentation:
- `IMPLEMENTATION_GUIDE.md` - Comprehensive setup guide
- `REACT_STRUCTURE.md` - Detailed structure explanation
- `ROUTES_API_EXAMPLE.md` - API routes and controllers examples

---

**Estimated Time**: 30-45 minutes for complete setup
**Level**: Intermediate (requires Node.js, Laravel, React knowledge)

✨ After completing this checklist, your React.js integration should be fully functional!
