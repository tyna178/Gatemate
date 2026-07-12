import axios from 'axios';

// Base URL diambil dari environment variable agar mudah beda antara
// development (localhost) dan production (server hosting).
// Buat file .env di root project dan isi:
// VITE_API_BASE_URL=http://127.0.0.1:8000/api
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 15000, // 15 detik, hindari request menggantung terlalu lama
});

// Interceptor Request: Sisipkan token dari localStorage ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor Response: Tangani error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // 401 -> token invalid/expired, auto logout
      if (status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('organizer_profile');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      // 403 -> organizer tidak punya izin untuk aksi ini
      if (status === 403) {
        console.warn('Akses ditolak: organizer tidak memiliki izin untuk aksi ini.');
      }

      // 422 -> validasi Laravel gagal, biarkan komponen yang menangani
      // pesannya (error.response.data.errors), jadi tidak di-handle di sini.

      // 500+ -> error server
      if (status >= 500) {
        console.error('Terjadi kesalahan pada server. Coba lagi nanti.');
      }
    } else if (error.request) {
      // Request terkirim tapi tidak ada response (server mati / no internet)
      console.error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
    }

    return Promise.reject(error);
  }
);

export default api;