import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { login as loginApi } from '../services/apiService'; // Import the login function from apiService

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting login form..."); // Log when the form is submitted

    try {
      // Use the login API function
      const response = await loginApi(email, password);
      const { token, user } = response; // Assuming the response contains token and user info

      console.log("Login successful:", user); // Log the successful login and user info

      // Store the token and user info in context
      login(token, user);

      // Conditional redirection based on user role
      if (user.role === 'admin') {
        console.log("Redirecting to admin dashboard...");
        navigate('/admin-dashboard'); // Redirect to Admin Dashboard
      } else {
        console.log("Redirecting to user dashboard...");
        navigate('/user-dashboard'); // Redirect to User Dashboard
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error if login fails
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
