import { useState, useEffect, useRef } from 'react'

export default function UserTable() {
  const [users] = useState([
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', videos: 12, audios: 10, status: 'Active' },
    { id: 2, name: 'John Smith', email: 'john@example.com', videos: 8, audios: 12, status: 'Active' },
    { id: 3, name: 'Priya Kumar', email: 'priya@example.com', videos: 15, audios: 7, status: 'Active' },
    { id: 4, name: 'Aarav Patel', email: 'aarav@example.com', videos: 10, audios: 9, status: 'Active' },
    { id: 5, name: 'Sofia Lee', email: 'sofia@example.com', videos: 20, audios: 8, status: 'Active' },
    { id: 6, name: 'Mohit Singh', email: 'mohit@example.com', videos: 5, audios: 4, status: 'Inactive' }
  ])
  const tableRef = useRef(null)

  useEffect(() => {
    const initDataTable = () => {
      const table = tableRef.current
      if (!table || !window.simpleDatatables || !window.simpleDatatables.DataTable) return
      
      try {
        if (!table.dataset.dtInit) {
          new window.simpleDatatables.DataTable(table, {
            searchable: true,
            fixedHeight: false,
            perPage: 10,
            sortable: false,
            labels: { placeholder: 'Search...', perPage: '{select} entries per page' },
            noRowsLabel: 'No records found'
          })
          table.dataset.dtInit = '1'
        }
      } catch (e) {
        console.log('DataTable init error:', e)
      }
    }

    const timer = setTimeout(initDataTable, 300)
    return () => clearTimeout(timer)
  }, [users])

  const handleEdit = (id) => {
    console.log('Edit user:', id)
  }

  const handleDelete = (id) => {
    console.log('Delete user:', id)
  }

  return (
    <div className="table-responsive">
      <table className="table datatable" ref={tableRef}>
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
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleEdit(user.id)}
                  title="Edit"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user.id)}
                  title="Delete"
                  style={{ marginLeft: '0.5rem' }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
