import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { signup as signupApi } from '../services/apiService'; // Import the signup function from apiService

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the signup API function
      const response = await signupApi(email, password);
      const { token, user } = response; // Assuming the response contains token and user info

      // Store the token and user info in the context or local storage if necessary
      localStorage.setItem('token', token);

      // Redirect to the user dashboard after successful signup
      navigate('/user-dashboard');
    } catch (error) {
      setError('Error during signup. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
