import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from '../layouts/PublicLayout'
import UserLayout from '../layouts/UserLayout'
import OrganizerLayout from '../layouts/OrganizerLayout'
import AdminLayout from '../layouts/AdminLayout'

// Public Pages
import Home from '../pages/public/Home'
import Events from '../pages/public/Events'
import EventDetail from '../pages/public/EventDetail'
import Login from '../pages/public/Login'
import Register from '../pages/public/Register'
import AttendeeList from '../pages/events/[id]/attendees'
import MatchmakingResults from '../pages/user/MatchmakingResults'
import Chat from '../pages/user/Chat'
import FaceVerification from '../pages/user/FaceVerification'
import Profile from '../pages/user/Profile'

// User Pages
import UserDashboard from '../pages/user/UserDashboard'
import MyTickets from '../pages/user/MyTickets'
import TicketDetail from '../pages/user/TicketDetail'
import Wallet from '../pages/user/Wallet'

// Organizer Pages
import OrganizerDashboard from '../pages/organizer/OrganizerDashboard'
import ManageEvents from '../pages/organizer/ManageEvents'
import CreateEvent from '../pages/organizer/CreateEvent'
import CheckIn from '../pages/organizer/CheckIn'

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageOrganizers from '../pages/admin/ManageOrganizers'
import Reports from '../pages/admin/Reports'
import PenarikanDana from '../pages/admin/PenarikanDana'
import AdminManageEvents from '../pages/admin/AdminManageEvents'
import AdminLogin from '../pages/admin/AdminLogin'
import Settings from '../pages/admin/Settings'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone Routes */}
      <Route path="/events/:id/attendees" element={<AttendeeList />} />
      <Route path="/user/matchmaking" element={<MatchmakingResults />} />
      <Route path="/user/chat" element={<Chat />} />
      <Route path="/user/face-verification" element={<FaceVerification />} />
      <Route path="/user/profile" element={<Profile />} />

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/tickets" element={<MyTickets />} />
        <Route path="/user/tickets/:id" element={<TicketDetail />} />
        <Route path="/user/wallet" element={<Wallet />} />
      </Route>

      {/* Organizer Routes */}
      <Route element={<OrganizerLayout />}>
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/events" element={<ManageEvents />} />
        <Route path="/organizer/events/create" element={<CreateEvent />} />
        <Route path="/organizer/check-in" element={<CheckIn />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminManageEvents />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/organizers" element={<ManageOrganizers />} />
        <Route path="/admin/withdrawals" element={<PenarikanDana />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
