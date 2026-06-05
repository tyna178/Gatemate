# 📊 User Dashboard - Setup & Implementation Guide

## ✅ Apa yang Sudah Dibuat

Dashboard user SecureGate sudah sepenuhnya diimplementasikan dengan komponen-komponen React yang modular dan responsif.

### 📁 Struktur File

```
resources/js/
├── pages/
│   ├── Home.jsx                 # Landing page (yang sudah ada)
│   └── Dashboard.jsx            # ✨ User dashboard baru
│
├── components/
│   ├── Layout/
│   │   ├── TopNavBar.jsx        # ✅ Updated dengan React Router
│   │   ├── BottomNavBar.jsx     # ✅ Updated dengan React Router
│   │   └── Footer.jsx           # (tidak berubah)
│   │
│   └── Dashboard/               # ✨ Folder baru untuk dashboard
│       ├── DashboardHeader.jsx      # Header dengan user info & stats
│       ├── WalletCard.jsx           # Wallet card dengan topup modal
│       ├── MyTickets.jsx            # Daftar tiket user
│       ├── QuickActions.jsx         # Aksi cepat
│       └── RecentActivity.jsx       # Aktivitas terbaru
│
├── app.jsx                      # ✅ Updated dengan React Router
└── bootstrap.js                 # (tidak berubah)
```

### 🎯 Fitur Dashboard yang Tersedia

#### 1. **Dashboard Header**
- Welcome greeting dengan nama user
- Avatar user
- Quick stats (Saldo dompet, Total event, Event mendatang)
- Edit Profil & Settings buttons

#### 2. **Wallet Card**
- Saldo dompet digital
- Status wallet (Aktif)
- Quick actions: Topup, Transfer, History
- Modal topup dengan preset amounts (100K, 250K, 500K)
- Gradient background untuk visual appeal

#### 3. **My Tickets**
- Daftar tiket user
- Filter tabs (Mendatang, Aktif, Terpakai, Kadaluarsa)
- Ticket details: Event name, Location, Date, Time
- Status badge
- Quick actions: Detail, Tunjukkan QR
- Loading state
- Empty state handling

#### 4. **Recent Activity**
- Timeline aktivitas terbaru
- Tipe aktivitas: Pembelian tiket, Topup, Tiket digunakan, Bonus referral
- Relative time display (2 hari lalu, 5 hari lalu, dll)
- Status indicators
- Loading state

#### 5. **Quick Actions**
- Cari Event
- Undang Teman
- Bantuan
- Pengaturan
- Dengan icon dan color coding

## 🚀 Cara Menjalankan

### 1. Install Dependencies
Sudah terinstall otomatis, namun jika perlu ulang:

```bash
npm install react react-dom react-router-dom axios @vitejs/plugin-react
```

### 2. Update Vite Config
✅ Sudah diupdate `vite.config.js` dengan:
- Plugin React (@vitejs/plugin-react)
- Input file dari `resources/js/app.jsx` (bukan app.js)

### 3. Jalankan Development Server

**Terminal 1 - Vite Dev Server:**
```bash
npm run dev
```

**Terminal 2 - Laravel Server:**
```bash
php artisan serve
```

### 4. Akses Dashboard

- Home: http://localhost:8000/
- Dashboard: http://localhost:8000/dashboard

## 📱 Responsive Design

Dashboard responsive untuk semua ukuran layar:
- **Mobile** (< 768px): Single column layout, bottom navigation
- **Tablet** (768px - 1024px): 2 column layout
- **Desktop** (> 1024px): Full 3 column grid layout

## 🔗 React Router Setup

Sudah dikonfigurasi di `app.jsx`:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
  {/* Routes lainnya */}
</Routes>
```

### Navigasi dari TopNavBar & BottomNavBar

- TopNavBar: Link ke Home & Dashboard (desktop)
- BottomNavBar: Mobile navigation dengan 5 menu utama
- Automatic active state highlighting

## 🔌 API Integration

Semua komponen sudah siap untuk API integration:

### DashboardHeader
```javascript
// Fetch user profile
GET /api/user/profile
Response: { id, name, email, phone, avatar, wallet_balance, total_events, upcoming_events }
```

### MyTickets
```javascript
// Fetch user tickets
GET /api/tickets
Response: [{ id, event_name, location, date, time, image, ticket_number, quantity, status, price }]
```

### RecentActivity
```javascript
// Fetch user activities
GET /api/activities
Response: [{ id, type, title, description, amount, timestamp, icon, status }]
```

### WalletCard
```javascript
// Topup wallet
POST /api/wallet/topup
Body: { amount }
Response: { success, new_balance }
```

## 📝 Mock Data

Saat ini menggunakan mock data untuk demonstration. Untuk menggunakan API real:

1. Uncomment API calls di masing-masing komponen
2. Uncomment try/catch block yang fetch dari API
3. Comment mock data

Contoh di `DashboardHeader.jsx`:
```jsx
// Ganti:
// setUser(mockData);

// Dengan:
const response = await fetch('/api/user/profile');
const data = await response.json();
setUser(data);
```

## 🎨 Styling Notes

- Menggunakan Tailwind CSS dengan custom theme
- Material Design 3 color system
- Consistent spacing dengan `gap-gap-default` dan `container-padding`
- Smooth transitions dan hover effects
- Custom fonts: headline-lg, headline-md, body-md, label-md, dll

## ✨ Features yang Bisa Ditambah

1. **Edit Profile Modal** - Form untuk edit nama, email, phone, etc
2. **Settings Page** - Dark mode toggle, language, notifications
3. **Explore/Search Page** - Browse events dengan filter & search
4. **Event Detail Page** - Detail event + purchase flow
5. **Referral Page** - Share referral link dan lihat bonus
6. **Help/Support Page** - FAQ dan customer support
7. **Wallet History** - Detail history topup dan spending
8. **QR Code Modal** - Show ticket QR code untuk verification

## 🐛 Troubleshooting

### Issue: "Cannot find module 'react-router-dom'"
**Solution**: Run `npm install react-router-dom`

### Issue: "Vite can't find .jsx files"
**Solution**: Restart dev server, Vite sometimes needs refresh for new plugins

### Issue: Dashboard styling tidak muncul
**Solution**: 
- Ensure `npm run dev` is running
- Hard refresh browser (Ctrl+Shift+R)
- Check browser console for errors (F12)

### Issue: Navigation not working
**Solution**: 
- Check React Router setup di `app.jsx`
- Verify Link imports di TopNavBar & BottomNavBar
- Check browser console for routing errors

## 📚 File Locations Quick Reference

| File | Purpose |
|------|---------|
| `resources/js/app.jsx` | React Router setup + main entry |
| `resources/js/pages/Dashboard.jsx` | Dashboard main component |
| `resources/js/components/Dashboard/*.jsx` | Dashboard sub-components |
| `resources/js/components/Layout/TopNavBar.jsx` | Top navigation |
| `resources/js/components/Layout/BottomNavBar.jsx` | Bottom mobile nav |
| `vite.config.js` | Vite + React configuration |
| `package.json` | Dependencies |

## 🎯 Next Steps

1. **Setup Backend API** - Create Laravel endpoints for user data
2. **Integrate Authentication** - Add auth checks to dashboard
3. **Add More Pages** - Explore, Settings, Profile Edit, etc
4. **Testing** - Unit & integration tests
5. **Optimization** - Code splitting, lazy loading
6. **Deployment** - Build & deploy to production

## 📞 Support

Jika ada issues atau pertanyaan:
1. Check ini documentation
2. Review komponen-komponen di `components/Dashboard/`
3. Check browser DevTools (F12) untuk errors
4. Verify API endpoint responses di Network tab

---

**Status**: ✅ Ready untuk development
**Last Updated**: June 5, 2026

