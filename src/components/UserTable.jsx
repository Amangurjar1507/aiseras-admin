import { useEffect } from 'react'

export default function UserTable() {
  useEffect(() => {
    // Init datatable
    setTimeout(() => {
      try {
        if (typeof simpleDatatables !== 'undefined' && simpleDatatables.DataTable) {
          const tables = document.querySelectorAll('table.datatable')
          tables.forEach(t => {
            if (t.dataset.dtInit) return
            new simpleDatatables.DataTable(t, {
              searchable: true,
              fixedHeight: false,
              perPage: 10,
              sortable: false,
              labels: { placeholder: 'Search...', perPage: '{select} entries per page' },
              noRowsLabel: 'No records found'
            })
            t.dataset.dtInit = '1'
          })
        }
      } catch (e) {
        console.error('[v0] DataTable init error:', e)
      }
    }, 100)
  }, [])

  const users = [
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', videos: 12, audios: 10, status: 'Active' },
    { id: 2, name: 'John Smith', email: 'john@example.com', videos: 8, audios: 12, status: 'Active' },
    { id: 3, name: 'Priya Kumar', email: 'priya@example.com', videos: 15, audios: 7, status: 'Active' },
    { id: 4, name: 'Aarav Patel', email: 'aarav@example.com', videos: 10, audios: 9, status: 'Active' },
    { id: 5, name: 'Sofia Lee', email: 'sofia@example.com', videos: 20, audios: 8, status: 'Active' },
    { id: 6, name: 'Mohit Singh', email: 'mohit@example.com', videos: 5, audios: 4, status: 'Inactive' }
  ]

  return (
    <div className="table-responsive">
      <table className="table datatable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Videos</th>
            <th>Audios</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.videos}</td>
              <td>{user.audios}</td>
              <td>
                <span className={`status-${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <a href="#" className="btn btn-sm btn-success">
                  <i className="bi bi-pencil"></i>
                </a>
                {' '}
                <a href="#" className="btn btn-sm btn-danger">
                  <i className="bi bi-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
