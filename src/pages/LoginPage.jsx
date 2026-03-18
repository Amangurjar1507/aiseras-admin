import { useEffect } from 'react'

export default function LoginPage({ onNavigate }) {
  useEffect(() => {
    // Apply login page styles to body
    document.body.style.background = 'linear-gradient(135deg, #032646, #07477e)'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
    document.body.style.display = 'flex'
    document.body.style.alignItems = 'center'
    document.body.style.justifyContent = 'center'
    document.body.style.minHeight = '100vh'
    document.body.style.margin = '0'

    return () => {
      // Reset body styles on unmount
      document.body.style.background = ''
      document.body.style.backgroundSize = ''
      document.body.style.backgroundPosition = ''
      document.body.style.display = ''
      document.body.style.alignItems = ''
      document.body.style.justifyContent = ''
      document.body.style.minHeight = ''
      document.body.style.margin = ''
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onNavigate('admin-dashboard')
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="login-card card shadow-sm">
        <div className="card-body">
          <div className="text-center mb-3">
            <img src="/assets/images/logo.png" alt="logo" style={{ width: '180px', maxWidth: '80%' }} />
          </div>
          <h5 className="card-title text-center">Admin Login</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="admin@example.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="••••••" required />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <input type="checkbox" /> Remember Me
              </label>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary w-100 p-2">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
