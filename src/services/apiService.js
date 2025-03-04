import axios from 'axios';

// Set up the base URL for your backend API
const BASE_URL = 'http://127.0.0.1:5001/api/auth'; // Update with your actual backend URL

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // If the token exists, add it to the headers
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle API errors globally with a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle error responses globally, such as showing a message
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., token expired)
      console.log('Unauthorized, redirecting to login...');
      // Optionally clear the token and redirect to the login page
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    } else {
      console.error('API error:', error);
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
const login = async (email, password) => {
  try {
    const response = await api.post('/user/login', { email, password }); // Correct route
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signup = async (email, password) => {
  try {
    const response = await api.post('/user', { email, password }); // Correct route for signup
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Ticket-related API calls
const getTickets = async () => {
  try {
    const response = await api.get('/tickets'); // Correct route to get all tickets
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserTickets = async () => {
  try {
    const response = await api.get('/tickets/my'); // Correct route to get user-specific tickets
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createTicket = async (title, description) => {
  try {
    const response = await api.post('/tickets', { title, description }); // Correct route to create a ticket
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTicketStatus = async (ticketId, status) => {
  try {
    const response = await api.put(`/tickets/${ticketId}`, { status }); // Correct route to update ticket
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Export API methods for use in components
export {
  login,
  signup,
  getTickets,
  getUserTickets,
  createTicket,
  updateTicketStatus,
};
