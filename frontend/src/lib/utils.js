// src/lib/utils.js
import api from './axios.js';

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const { method = 'GET', body, headers } = options;

    const response = await api({
      url: endpoint,
      method,
      data: body ? JSON.parse(body) : undefined,
      headers,
    });

    return response;
  } catch (error) {
    if (error.response?.status === 429) {
      window.dispatchEvent(new Event('rate-limited'));
    }
    throw error;
  }
};

// Regular student registration
export const registerStudent = async (studentData) => {
  try {
    const response = await apiRequest('/students/register', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Guest registration with auto time-in
export const registerGuestAndTimeIn = async (guestData) => {
  try {
    const response = await apiRequest('/guests/register-and-timein', {
      method: 'POST',
      body: JSON.stringify({
        ...guestData,
        timestamp: new Date().toISOString(),
        status: 'active'
      }),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkStudent = async (studentId) => {
  try {
    const response = await apiRequest(`/students/${studentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodayStats = async () => {
  try {
    const response = await apiRequest('/attendance/stats/today');
    return response.data;
  } catch (error) {
    console.log('Stats fetch error:', error);
    return { total: 0, timeIn: 0, timeOut: 0, registered: 0 };
  }
};

export const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const formatPHDate = (date) => {
  if (!date) return "";
  
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
};