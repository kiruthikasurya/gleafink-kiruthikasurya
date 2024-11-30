// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-base-url.com", // Replace with your API's base URL
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to include the access token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post("http://your-api-base-url.com/auth/refresh", {
          refreshToken,
        });

        // Save the new token
        localStorage.setItem("accessToken", data.accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        // Logout or redirect to login page
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
