import { useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatBox from '../components/StatBox'
import ChartContainer from '../components/ChartContainer'
import UserTable from '../components/UserTable'
import { initCharts } from '../utils/chartInit'

export default function AdminDashboard({ onNavigate }) {
  useEffect(() => {
    // Init charts after component mounts
    setTimeout(() => {
      initCharts()
    }, 250)
  }, [])

  return (
    <div className="admin-app">
      <Sidebar onNavigate={onNavigate} currentPage="admin-dashboard" />
      <div className="content">
        <Header title="Dashboard" onNavigate={onNavigate} />
        <main className="container-fluid">
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6 col-lg-3">
              <StatBox
                title="Total User"
                value="1,248"
                change="↑ 12% from last month"
                gradient="linear-gradient(135deg, #ff3570, #871835)"
                icon="bi-person"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <StatBox
                title="Total Videos"
                value="342"
                change="↑ 8% from last month"
                gradient="linear-gradient(135deg,#00305c,#004a8a)"
                icon="bi-camera-video"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <StatBox
                title="Active Audio"
                value="200"
                change="↑ 24% from last month"
                gradient="linear-gradient(135deg, #39ab71, #21651d)"
                icon="bi-speaker"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <StatBox
                title="Total Revenue"
                value="$567K"
                change="↑ 5% from last month"
                gradient="linear-gradient(135deg, #FF5722, #9f3b00)"
                icon="bi-credit-card"
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Overview video/audio</h5>
                  <div style={{ height: '320px' }}>
                    <canvas id="barChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">User Status</h5>
                  <div style={{ height: '320px' }}>
                    <canvas id="donutChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title mb-0">User List </h5>
                </div>
                <div className="card-body">
                  <UserTable />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
