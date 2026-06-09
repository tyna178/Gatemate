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

// User Pages
import UserDashboard from '../pages/user/UserDashboard'
import MyTickets from '../pages/user/MyTickets'
import TicketDetail from '../pages/user/TicketDetail'

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

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/tickets" element={<MyTickets />} />
        <Route path="/user/tickets/:id" element={<TicketDetail />} />
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
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/organizers" element={<ManageOrganizers />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
