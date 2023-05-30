import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [registerCode, setRegisterCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user/register', {
        username,
        password1: password,
        password2,
        registerCode, // Updated key to "registerCode"
      });

      if (response.data.code === 200 && response.data.message === 'success') {
        setSuccess(true);
        setError(null);
        history.push('/login');
      } else {
        setError('Registration failed');
        setSuccess(false);
      }
    } catch (err) {
      setError('Registration failed');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Register Code</label>
          <input
            type="text"
            className="form-control"
            value={registerCode}
            onChange={(e) => setRegisterCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {success && <p>Registration successful</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;