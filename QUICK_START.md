# ⚡ Quick Start Guide - React.js SecureGate

Panduan cepat untuk langsung mulai development dalam 5 menit!

## 🚀 Install & Run (5 menit)

### 1. Install Dependencies (1 menit)
```bash
npm install react react-dom axios
npm install -D @vitejs/plugin-react
npm install @tailwindcss/forms @tailwindcss/container-queries
```

### 2. Verify Config (1 menit)
Pastikan `vite.config.js` punya:
```javascript
import react from '@vitejs/plugin-react';

plugins: [
    laravel({ input: 'resources/js/app.jsx', refresh: true }),
    react(),
]
```

### 3. Start Development (1 menit)
**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
php artisan serve
```

### 4. Open Browser (1 menit)
Visit: http://localhost:8000

✅ You should see the SecureGate homepage!

---

## 📝 Edit Your First Component (2 menit)

### Edit HeroSection
File: `resources/js/components/Sections/HeroSection.jsx`

Change this:
```jsx
<h1 className="...">Temukan event terbaikmu</h1>
```

To this:
```jsx
<h1 className="...">Jelajahi Event Terbaik Sekarang!</h1>
```

Save file → Browser auto-reloads ✨

---

## 🎨 Customize Colors (2 menit)

File: `tailwind.config.js`

Current: `text-primary` = `#b22110` (merah)

Change to:
```javascript
'primary': '#007AFF', // Apple blue
```

Save → Colors update automatically!

### Available Colors to Change
- `primary` - Main color
- `on-primary` - Text on primary
- `secondary` - Secondary color
- `surface` - Background
- `on-surface` - Text color
- ... 50+ more in config

---

## 🔌 Connect to API (5 menit)

### 1. Create API Route
File: `routes/api.php`

```php
Route::get('/events/trending', function () {
    return [
        ['id' => 1, 'title' => 'Event 1', 'price' => '100.000', ...],
        ['id' => 2, 'title' => 'Event 2', 'price' => '200.000', ...],
    ];
});
```

### 2. Test API
Open: http://localhost:8000/api/events/trending

Should see JSON data ✅

### 3. Component Already Integrated!
File: `resources/js/components/Sections/TrendingSection.jsx`

Already fetches from `/api/events/trending` automatically! 

Just create the route and it works 🎉

---

## 📦 Add New Component (3 menit)

### 1. Create File
Create: `resources/js/components/MyComponent.jsx`

```jsx
import React from 'react';

export default function MyComponent() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="font-headline-md text-primary">
        Hello World!
      </h2>
    </div>
  );
}
```

### 2. Import in Home
File: `resources/js/pages/Home.jsx`

```jsx
import MyComponent from '../components/MyComponent';

// Inside Home component:
return (
  <div>
    <TopNavBar />
    <MyComponent />  {/* ← Add here */}
    <Footer />
  </div>
);
```

### 3. Save
Browser auto-reloads with your new component! ✨

---

## 🌐 Available Utilities

### Colors (Tailwind)
```jsx
<div className="text-primary">Primary</div>
<div className="bg-surface">Surface</div>
<div className="text-secondary">Secondary</div>
```

### Typography
```jsx
<h1 className="font-headline-lg text-headline-lg">Large Heading</h1>
<p className="font-body-lg text-body-lg">Body text</p>
<span className="font-label-md text-label-md">Label</span>
```

### Spacing
```jsx
<div className="px-container-padding">Padded container</div>
<div className="gap-gap-default flex">With gap</div>
```

### Icons
```jsx
import MaterialIcon from './components/Common/MaterialIcon';

<MaterialIcon icon="home" fill={true} />
<MaterialIcon icon="settings" className="text-2xl" />
```

### Components
```jsx
import EventCard from './components/Cards/EventCard';
import FeatureCard from './components/Cards/FeatureCard';
import TopNavBar from './components/Layout/TopNavBar';
```

---

## 🔥 API Services Ready to Use

File: `resources/js/services/api.js`

### Events
```jsx
import { eventService } from '../services/api';

// Get all events
await eventService.getAllEvents({ page: 1 })

// Get trending
await eventService.getTrendingEvents(10)

// Search
await eventService.searchEvents('jazz')

// Get single
await eventService.getEvent(1)
```

### Tickets
```jsx
import { ticketService } from '../services/api';

// Purchase
await ticketService.purchase(eventId, { quantity: 2 })

// Get my tickets
await ticketService.getUserTickets()

// Verify
await ticketService.verify(qrCode)
```

### Auth
```jsx
import { authService } from '../services/api';

// Login
await authService.login(email, password)

// Register
await authService.register(data)

// Logout
await authService.logout()
```

### Users
```jsx
import { userService } from '../services/api';

// Get profile
await userService.getProfile()

// Update profile
await userService.updateProfile(data)
```

---

## 🐛 Debug Tips

### Check Console Errors
Press `F12` → Console tab

### Check Network Requests
Press `F12` → Network tab → make request

### Check Styles Applied
Press `F12` → Elements → Inspect element → Styles

### Check Component Tree
React DevTools Chrome Extension

### Clear Cache & Rebuild
```bash
# Terminal 1: Stop Vite
Ctrl+C

# Clear and reinstall
rm -r node_modules package-lock.json
npm install

# Restart
npm run dev
```

---

## ✨ Common Tasks

### Change Text
Find `.jsx` file → Edit text → Save

### Change Color
Add class name: `text-primary`, `bg-surface`, etc.
Or edit `tailwind.config.js`

### Add Button
```jsx
<button className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90">
  Click me
</button>
```

### Add Image
```jsx
<img 
  src="https://example.com/image.jpg" 
  alt="Description"
  className="w-full h-auto rounded-lg"
/>
```

### Fetch Data
```jsx
import { eventService } from '../services/api';
import { useState, useEffect } from 'react';

const [data, setData] = useState([]);

useEffect(() => {
  eventService.getAllEvents()
    .then(res => setData(res.data.data))
    .catch(err => console.error(err));
}, []);
```

### Show Loading
```jsx
const [loading, setLoading] = useState(true);

{loading ? <p>Loading...</p> : <p>{data.length} items</p>}
```

### Show Error
```jsx
const [error, setError] = useState(null);

{error && <div className="text-error p-4">{error}</div>}
```

---

## 📚 Full Documentation

- **SETUP_CHECKLIST.md** - Step-by-step setup
- **IMPLEMENTATION_GUIDE.md** - Comprehensive guide
- **REACT_STRUCTURE.md** - Detailed structure
- **ROUTES_API_EXAMPLE.md** - API examples

---

## 🎯 Your Development Workflow

1. **Edit component** → Save
2. **Browser auto-reloads** ✨
3. **See changes live**
4. **Repeat**

That's it! No manual refresh needed.

---

## 🚀 Build for Production

When ready to deploy:

```bash
npm run build
php artisan optimize
```

Deploy `public/build/` folder to server.

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Vite configured
- [ ] Servers running (npm + php artisan)
- [ ] http://localhost:8000 opens homepage
- [ ] No console errors
- [ ] Changed one component (test it)
- [ ] Ready to code!

---

## 💡 Pro Tips

1. **Keep terminal visible** - See hot-reload messages
2. **Use DevTools** - F12 is your friend
3. **Read error messages** - They're usually helpful
4. **Check documentation** - Linked above
5. **Have fun!** - It's React in Laravel 🎉

---

## 🆘 Stuck?

### Issue: Nothing loads
- Check both servers running (npm + php artisan)
- Open http://localhost:8000 (not 5173)
- Check terminal for errors

### Issue: Styles not working
- Hard refresh: Ctrl+Shift+R
- Check `resources/css/app.css` has `@tailwind`

### Issue: API not working
- Check route in `routes/api.php`
- Test in browser: `/api/events/trending`
- Check Network tab in DevTools

### Issue: Component not appearing
- Check console for errors (F12)
- Verify import path is correct
- Check component returned JSX

---

**Happy Coding! 🚀**

Next: Read one of the full documentation files for more advanced usage.
