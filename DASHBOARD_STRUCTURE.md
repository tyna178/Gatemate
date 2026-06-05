# 📐 Dashboard Structure & Architecture

## Component Hierarchy

```
App Router (app.jsx)
│
├── Home Page (pages/Home.jsx)
│   ├── TopNavBar
│   ├── HeroSection
│   ├── FeaturesSection
│   ├── CategorySection
│   ├── TrendingSection
│   ├── CTASection
│   ├── Footer
│   └── BottomNavBar
│
└── Dashboard Page (pages/Dashboard.jsx) ✨ NEW
    ├── TopNavBar (updated with React Router)
    ├── DashboardHeader
    │   ├── User Avatar + Info
    │   └── Quick Stats (3 cards)
    ├── Main Content Grid
    │   ├── Left Column (1 col)
    │   │   ├── WalletCard
    │   │   │   ├── Balance Display
    │   │   │   ├── Card Details
    │   │   │   ├── Action Buttons (Topup, Transfer, History)
    │   │   │   └── Topup Modal (with presets)
    │   │   └── QuickActions
    │   │       ├── Search Events
    │   │       ├── Invite Friends
    │   │       ├── Help
    │   │       └── Settings
    │   └── Right Column (2 cols)
    │       ├── MyTickets
    │       │   ├── Filter Tabs
    │       │   └── Ticket List
    │       │       ├── Ticket Image
    │       │       ├── Event Info
    │       │       ├── Status Badge
    │       │       └── Actions (Detail, QR)
    │       └── RecentActivity
    │           └── Activity Timeline
    │               ├── Activity Icon
    │               ├── Activity Info
    │               ├── Timestamp
    │               └── Status
    ├── Footer
    └── BottomNavBar (updated with React Router)
```

## File Structure

```
resources/js/
├── app.jsx                          # ✅ Router setup with React Router
├── bootstrap.js                     # Axios setup
├── pages/
│   ├── Home.jsx                     # Landing page
│   └── Dashboard.jsx                # ✨ User dashboard
├── components/
│   ├── Layout/
│   │   ├── TopNavBar.jsx            # ✅ Updated with React Router
│   │   ├── BottomNavBar.jsx         # ✅ Updated with React Router
│   │   └── Footer.jsx               # Footer
│   ├── Sections/
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── CategorySection.jsx
│   │   ├── TrendingSection.jsx
│   │   └── CTASection.jsx
│   ├── Cards/
│   │   ├── EventCard.jsx
│   │   └── FeatureCard.jsx
│   ├── Dashboard/                   # ✨ New folder
│   │   ├── DashboardHeader.jsx
│   │   ├── WalletCard.jsx
│   │   ├── MyTickets.jsx
│   │   ├── QuickActions.jsx
│   │   └── RecentActivity.jsx
│   └── Common/
│       └── MaterialIcon.jsx
├── services/
│   └── api.js                       # API services
├── hooks/
│   └── useEvents.js                 # Custom hooks
└── styles/
    └── (Tailwind CSS in app.css)
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Dashboard Page                         │
│  (Main container, state management, loading/error states)   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├─── User Data (Mock/API)
                       │    └─ name, email, avatar, wallet_balance, etc
                       │
                       ├─── Tickets Data (Mock/API)
                       │    └─ event_name, location, date, status, etc
                       │
                       └─── Activity Data (Mock/API)
                            └─ type, title, description, timestamp, etc

                       ↓

┌──────────────────────────────────────────────────────────────┐
│              Components receive data as props               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ DashboardHeader (user)                                │ │
│  │  Displays: Avatar, Name, Email, Stats                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ WalletCard (user)                                     │ │
│  │  Displays: Balance, Cards, Actions                    │ │
│  │  Modals: Topup                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ MyTickets (tickets)                                   │ │
│  │  Displays: List, Filters, Status                      │ │
│  │  State: currentFilter                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ RecentActivity (activities)                           │ │
│  │  Displays: Timeline, Types, Timestamps                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ QuickActions                                          │ │
│  │  Links: Search, Invite, Help, Settings               │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## State Management Flow

```
Dashboard.jsx (Main State)
│
├── user (useState)
│   ├── id, name, email, phone
│   ├── avatar, wallet_balance
│   └── total_events, upcoming_events
│
├── tickets (useState)
│   └── Array of ticket objects
│
├── activities (useState)
│   └── Array of activity objects
│
├── loading (useState)
│   └── Boolean for loading state
│
└── error (useState)
    └── Error message string

          ↓
    
Component State (Local)
│
├── WalletCard.jsx
│   └── showTopupModal, topupAmount
│
├── MyTickets.jsx
│   ├── tickets (from parent)
│   ├── loading, error (from parent)
│   └── filter (local)
│
└── RecentActivity.jsx
    ├── activities (from parent)
    └── loading, error (from parent)
```

## API Endpoints Architecture

```
Dashboard
│
├── GET /api/user/profile
│   └── Returns: { id, name, email, phone, avatar, wallet_balance, total_events, upcoming_events }
│
├── GET /api/tickets
│   └── Returns: [{ id, event_name, location, date, time, image, ticket_number, quantity, status, price }]
│
├── GET /api/activities
│   └── Returns: [{ id, type, title, description, amount, timestamp, icon, status }]
│
├── POST /api/wallet/topup
│   ├── Body: { amount }
│   └── Returns: { success, new_balance, transaction_id }
│
└── Additional Routes
    ├── GET /api/events/search
    ├── POST /api/referral/invite
    ├── GET /api/settings
    └── etc
```

## Responsive Breakpoints

```
Mobile Layout (<768px)
│
├── DashboardHeader (Full width)
├── WalletCard (Full width)
├── MyTickets (Full width)
├── RecentActivity (Full width)
├── QuickActions (Full width)
└── BottomNavBar (Bottom navigation)

        ↓

Tablet Layout (768px - 1024px)
│
├── DashboardHeader (Full width)
├── Main Grid (2 columns)
│   ├── Left: Wallet + QuickActions
│   └── Right: MyTickets + RecentActivity
└── BottomNavBar (Hidden)

        ↓

Desktop Layout (>1024px)
│
├── DashboardHeader (Full width)
├── Main Grid (3 columns)
│   ├── Left (1 col): Wallet + QuickActions
│   └── Right (2 cols): MyTickets + RecentActivity
└── Desktop TopNavBar (Visible)
```

## Color & Styling System

```
Components use Tailwind + Custom Theme:

Primary Colors:
- bg-primary (#b22110) - Main actions
- bg-primary-container (#d63b27) - Secondary actions
- text-primary - Primary text
- text-on-primary - Text on primary bg

Secondary Colors:
- bg-secondary (#5f5e5e) - Secondary elements
- bg-secondary-fixed (#e5e2e1) - Light secondary
- text-secondary - Secondary text

Surfaces:
- bg-surface (#fff8f6) - Main background
- bg-surface-container-low (#fff0ee) - Card backgrounds
- bg-surface-container (#ffe9e5) - Elevated surfaces

Status Colors:
- tertiary (#006579) - Active/Success
- error (#ba1a1a) - Errors/Warnings

Spacing:
- gap-default (1.25rem) - Standard gaps
- gap-tight (1rem) - Compact gaps
- container-padding (1.5rem) - Page padding
- card-padding (0.75rem) - Card padding

Typography:
- headline-lg (32px, 700) - Main headings
- headline-md (20px, 600) - Section headings
- headline-sm (16px, 600) - Card headings
- body-md (14px, 400) - Body text
- body-lg (15px, 400) - Large body text
- label-md (12px, 500) - Labels
- caption (11px, 400) - Captions
```

## Component Communication

```
App Router
    │
    └─→ Dashboard.jsx
            │
            ├─→ fetchUserData() → setUser()
            ├─→ fetchTickets() → setTickets()
            ├─→ fetchActivities() → setActivities()
            │
            └─→ Render Components with Props:
                    │
                    ├─→ <DashboardHeader user={user} />
                    │    └─ Displays user info (props only, no state)
                    │
                    ├─→ <WalletCard user={user} />
                    │    └─ Local state: showTopupModal, topupAmount
                    │       Handles topup independently
                    │
                    ├─→ <MyTickets />
                    │    └─ Local state: filter
                    │       Fetches tickets independently
                    │
                    ├─→ <RecentActivity />
                    │    └─ Fetches activities independently
                    │
                    └─→ <QuickActions />
                         └─ Navigation links only
```

## Performance Optimization Opportunities

```
Current Implementation:
├─ Each component fetches its own data ✓ Decoupled
├─ Mock data in development ✓ No delay
├─ Smooth scroll animations ✓ Performant
└─ Responsive CSS Grid ✓ Mobile-optimized

Future Optimizations:
├─ Lazy loading components (React.lazy)
├─ Image optimization (webp, srcset)
├─ Code splitting by route
├─ React.memo for expensive components
├─ useCallback for expensive functions
├─ Intersection Observer for images
└─ Service Worker caching
```

---

**Last Updated**: June 5, 2026
**Version**: 1.0.0

