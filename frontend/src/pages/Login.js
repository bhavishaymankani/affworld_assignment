import React, { useState } from 'react';
import { loginUser, registerUser, resetPassword } from '../api/apiService';

const Login = ({ onLogin }) => {
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setIsResetting(false);
    setFormData({ name: '', email: '', password: '' });
  };

  const toggleReset = () => {
    setIsResetting(!isResetting);
    setIsRegistering(false);
    setFormData({ email: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('')
    setLoading(true);

    try {
      if (isResetting) {
        setMessage((await resetPassword({ email: formData.email })).msg);
        toggleReset();
      } else if (isRegistering) {
        setMessage((await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password})).msg);
        toggleForm();
      } else {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.token);
        onLogin();
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.msg || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">
              {isResetting ? 'Forgot Password' : isRegistering ? 'Register' : 'Login'}
            </h2>
            {message && <p className="alert alert-info">{message}</p>}
            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isResetting && (
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Processing...
                  </>
                ) : isResetting ? 'Reset Password' : isRegistering ? 'Register' : 'Login'}
              </button>
            </form>
            {!isResetting && (
              <>
              <p className="text-center mt-3">
                {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
                <button type="button" className="btn btn-link" onClick={toggleForm}>
                  {isRegistering ? 'Login here' : 'Register here'}
                </button>
              </p>
              {!isRegistering && (<p className="text-center">
                <button type="button" className="btn btn-link" onClick={toggleReset}>
                  Forgot Password?
                </button>
              </p>)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
