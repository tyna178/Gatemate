import api from './api';

/**
 * organizerApi.js
 * Kumpulan fungsi pemanggilan endpoint Laravel khusus untuk section Organizer.
 * Sesuaikan path endpoint dengan route yang sudah dibuat di routes/api.php.
 */

// ================= DASHBOARD OVERVIEW =================
export const getDashboardOverview = () => api.get('/organizer/dashboard');

// ================= MY EVENTS / BUAT EVENT BARU =================
export const getMyEvents = (params) => api.get('/organizer/events', { params });
export const getEventDetail = (eventId) => api.get(`/organizer/events/${eventId}`);
export const createEvent = (data) => api.post('/organizer/events', data);
export const updateEvent = (eventId, data) => api.put(`/organizer/events/${eventId}`, data);
export const deleteEvent = (eventId) => api.delete(`/organizer/events/${eventId}`);

export const updateEventSchedule = (eventId, data) =>
  api.put(`/organizer/events/${eventId}/schedule`, data);
export const updateEventCapacity = (eventId, data) =>
  api.put(`/organizer/events/${eventId}/capacity`, data);
export const updateEventTickets = (eventId, data) =>
  api.put(`/organizer/events/${eventId}/tickets`, data);
export const updateEventAdvancedSettings = (eventId, data) =>
  api.put(`/organizer/events/${eventId}/advanced-settings`, data);

// ================= EVENT DETAILS: TICKETS =================
export const getEventTickets = (eventId) => api.get(`/organizer/events/${eventId}/tickets`);

// ================= EVENT DETAILS: ATTENDEES & REFUND =================
export const getEventAttendees = (eventId, params) =>
  api.get(`/organizer/events/${eventId}/attendees`, { params });
export const refundAttendeeTicket = (eventId, ticketId, data) =>
  api.post(`/organizer/events/${eventId}/attendees/${ticketId}/refund`, data);

// ================= EVENT DETAILS: TENANT MANAGEMENT =================
export const getEventTenants = (eventId) => api.get(`/organizer/events/${eventId}/tenants`);
export const addEventTenant = (eventId, data) =>
  api.post(`/organizer/events/${eventId}/tenants`, data);
export const removeEventTenant = (eventId, tenantId) =>
  api.delete(`/organizer/events/${eventId}/tenants/${tenantId}`);

// ================= EVENT DETAILS: FINANCIALS & WITHDRAWAL =================
export const getEventFinancials = (eventId) =>
  api.get(`/organizer/events/${eventId}/financials`);
export const requestWithdrawal = (eventId, data) =>
  api.post(`/organizer/events/${eventId}/withdrawals`, data);

// ================= KEUANGAN: SALDO & TRANSAKSI =================
export const getBalance = () => api.get('/organizer/finance/balance');
export const getTransactions = (params) => api.get('/organizer/finance/transactions', { params });

// ================= TICKET SCANNER (desktop & mobile) =================
export const scanTicket = (eventId, ticketCode) =>
  api.post(`/organizer/events/${eventId}/scan`, { ticket_code: ticketCode });

// ================= ORGANIZER SETTINGS =================
export const getOrganizationDetails = () => api.get('/organizer/settings/organization');
export const updateOrganizationDetails = (data) =>
  api.put('/organizer/settings/organization', data);

export const getOrganizerProfile = () => api.get('/organizer/settings/profile');
export const updateOrganizerProfile = (data) => api.put('/organizer/settings/profile', data);

export const getSecuritySettings = () => api.get('/organizer/settings/security');
export const updatePassword = (data) => api.put('/organizer/settings/security/password', data);

export const getNotificationSettings = () => api.get('/organizer/settings/notifications');
export const updateNotificationSettings = (data) =>
  api.put('/organizer/settings/notifications', data);

// ================= AUTH ORGANIZER =================
export const organizerSignUp = (data) => api.post('/organizer/register', data);
export const organizerLogin = (data) => api.post('/organizer/login', data);
export const organizerLogout = () => api.post('/organizer/logout');