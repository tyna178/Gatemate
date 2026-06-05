# Struktur Implementasi React.js di Laravel - SecureGate

## Penempatan File & Struktur Direktori

```
resources/
├── views/
│   └── app.blade.php              # Template utama Laravel yang load React
├── css/
│   └── app.css                    # Style untuk Tailwind CSS
├── js/
│   ├── bootstrap.js               # Setup axios dan konfigurasi Laravel
│   ├── app.jsx                    # Entry point React
│   ├── main.jsx                   # (opsional) Untuk development
│   ├── pages/
│   │   └── Home.jsx               # Halaman Home utama
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── TopNavBar.jsx      # Navigation bar atas
│   │   │   ├── Footer.jsx         # Footer section
│   │   │   └── BottomNavBar.jsx   # Bottom navigation (mobile)
│   │   ├── Sections/
│   │   │   ├── HeroSection.jsx    # Hero/banner utama
│   │   │   ├── FeaturesSection.jsx # Section fitur
│   │   │   ├── CategorySection.jsx # Kategori event
│   │   │   ├── TrendingSection.jsx # Trending event
│   │   │   └── CTASection.jsx      # Call-to-action
│   │   ├── Cards/
│   │   │   ├── EventCard.jsx      # Event card component
│   │   │   └── FeatureCard.jsx    # Feature card component
│   │   └── Common/
│   │       └── MaterialIcon.jsx   # Material icons wrapper
│
tailwind.config.js                  # Tailwind configuration dengan custom theme
```

## Instalasi & Setup

### 1. Install Dependencies

```bash
npm install react react-dom
npm install -D @vitejs/plugin-react
npm install @tailwindcss/forms @tailwindcss/container-queries
npm install axios
```

### 2. Update `vite.config.js`

Pastikan sudah ada plugin React:

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
```

### 3. Update `resources/css/app.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles untuk Material Icons */
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    vertical-align: middle;
}

.coral-pill {
    border-radius: 22px;
}

.card-shadow {
    border: 0.5px solid #EBEBEB;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
}
```

### 4. Update `package.json`

```json
{
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "react": "^18.x",
        "react-dom": "^18.x",
        "axios": "^1.x"
    },
    "devDependencies": {
        "@vitejs/plugin-react": "^4.x",
        "@tailwindcss/forms": "latest",
        "@tailwindcss/container-queries": "latest",
        "tailwindcss": "^4.x",
        "postcss": "latest",
        "autoprefixer": "latest"
    }
}
```

## File Utama

### `app.blade.php`
Entry point Laravel yang render React app di `<div id="app"></div>`

### `app.jsx`
Import React app, setup bootstrap (axios), dan render ke DOM

### `pages/Home.jsx`
Container utama yang meng-import semua sections dan layouts

## Perbaikan & Best Practices yang Diterapkan

### ✅ 1. **Component-Based Architecture**
- Memecah HTML menjadi reusable components
- Setiap bagian (navbar, footer, cards, sections) adalah component terpisah

### ✅ 2. **Props & Dynamic Data**
- Event cards menerima data via props (bukan hardcoded)
- Mudah untuk di-render dari API Laravel

### ✅ 3. **Responsive Design**
- Mobile-first approach dengan Tailwind
- BottomNavBar hanya tampil di mobile (`md:hidden`)

### ✅ 4. **Material Icons Integration**
- Custom `MaterialIcon` component
- Wrapper untuk `font-variation-settings`
- Reusable di mana saja

### ✅ 5. **Smooth Scroll & Animations**
- Intersection Observer di `Home.jsx`
- Reveal sections saat scroll
- Smooth transitions dengan Tailwind

### ✅ 6. **Tailwind Configuration**
- Custom color theme dari Material Design
- Custom font sizes & spacing
- Plugins: forms & container-queries

### ✅ 7. **SEO Ready**
- Semantic HTML structure
- Proper heading hierarchy
- Meta tags di template Blade

## Menggunakan API Laravel

### Contoh: Fetch Events dari API

```jsx
// Di dalam TrendingSection.jsx
import { useState, useEffect } from 'react';

export default function TrendingSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/events/trending')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="py-16 overflow-hidden">
      {/* ... */}
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
        />
      ))}
      {/* ... */}
    </section>
  );
}
```

### Contoh: Create API Controller

```bash
php artisan make:controller Api/EventController
```

```php
// app/Http/Controllers/Api/EventController.php
namespace App\Http\Controllers\Api;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function trending()
    {
        return Event::where('trending', true)->get();
    }

    public function categories()
    {
        return Event::selectRaw('category, COUNT(*) as total')
                    ->groupBy('category')
                    ->get();
    }
}
```

## Development & Build

### Development Mode
```bash
npm run dev
php artisan serve
```

### Production Build
```bash
npm run build
```

## Notes Penting

1. **Tailwind Classes**: Semua custom colors sudah di-define di `tailwind.config.js`
2. **Material Icons**: Sudah include CDN di `app.blade.php`
3. **Axios Setup**: Sudah auto-configure CSRF token di `bootstrap.js`
4. **Database**: Siap untuk integasi dengan Model & API Laravel

---

**Status**: ✅ Ready to use dengan React 18 + Laravel 11 + Tailwind CSS 4
