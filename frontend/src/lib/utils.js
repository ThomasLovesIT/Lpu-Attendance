// src/lib/utils.js
// frontend/utils/api.js
import api from './axios.js';

export const apiRequest = async (endpoint, options = {}) => {
  try {
    // Determine method and data
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

// Standard date (Oct 24, 2023)
export const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

// Philippine Time (Oct 24, 2023, 10:30 AM)
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