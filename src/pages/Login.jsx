import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple validation
    if (email && password) {
      onLogin()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #032646, #07477e)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="login-card card shadow-sm">
        <div className="card-body">
          <div className="text-center mb-3">
            <img src="assets/images/logo.png" alt="logo" style={{ width: '180px', maxWidth: '80%' }} />
          </div>
          <h5 className="card-title text-center">Admin Login</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                {' '}Remember Me
              </label>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary w-100 p-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
