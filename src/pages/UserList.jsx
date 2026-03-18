import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import UserTable from '../components/UserTable'

export default function UserList({ onNavigate }) {
  useEffect(() => {
    // Init datatable on mount
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
    }, 300)
  }, [])

  return (
    <div className="admin-app">
      <Sidebar onNavigate={onNavigate} currentPage="user-list" />
      <div className="content">
        <Header title="User List" onNavigate={onNavigate} />
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">User List</h5>
                </div>
                <UserTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
