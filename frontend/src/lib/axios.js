import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// 1. REQUEST INTERCEPTOR (Outgoing)
// This runs BEFORE the request leaves your browser
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

 

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    
    } 

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR (Incoming)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle Rate Limiting (429)
    if (error.response && error.response.status === 429) {
      window.dispatchEvent(new Event("rate-limited"));
    }
    
    if (error.response && error.response.status === 401) {
       console.warn("⚠️ 401 Unauthorized received. Token is likely invalid.");
       // localStorage.removeItem('user'); // DISABLE THIS FOR NOW
    }

    return Promise.reject(error);
  }
);

export default api;