import { useEffect } from 'react'

export default function LoginPage({ onNavigate }) {
  useEffect(() => {
    // Mark active link in sidebar if present
    const links = document.querySelectorAll('.sidebar .nav-link')
    links.forEach((l) => {
      const href = (l.getAttribute('href') || '').split('?')[0].toLowerCase()
      if (href.includes('login') || href === '') {
        l.classList.add('active')
      } else {
        l.classList.remove('active')
      }
    })
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    onNavigate('dashboard')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
      <div className="card login-card">
        <div className="card-body">
          <h5 className="card-title mb-3">Admin Login</h5>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" required />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
