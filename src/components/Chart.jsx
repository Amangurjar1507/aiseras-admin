import { useEffect } from 'react'

export default function Chart({ type, id }) {
  useEffect(() => {
    const initChart = () => {
      const canvas = document.getElementById(id)
      if (!canvas || !window.Chart) return

      const ctx = canvas.getContext('2d')

      if (type === 'bar') {
        new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Videos',
                data: [420, 560, 380, 200, 300, 280],
                backgroundColor: '#3945eb',
                borderColor: '#3945eb',
                borderWidth: 1,
                borderRadius: 8,
                barPercentage: 0.7
              },
              {
                label: 'Audios',
                data: [42, 38, 35, 80, 90, 100],
                backgroundColor: '#00305c',
                borderColor: '#00305c',
                borderWidth: 1,
                borderRadius: 8,
                barPercentage: 0.7
              }
            ]
          },
          options: {
            indexAxis: 'x',
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' },
              tooltip: { padding: 12, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.8)' }
            },
            scales: {
              x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
              y: { grid: { display: false } }
            }
          }
        })
      } else if (type === 'donut') {
        new window.Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Active Users', 'Inactive', 'Pending'],
            datasets: [
              {
                data: [65, 25, 10],
                backgroundColor: ['#39ab71', '#00305c', '#d4a5b4'],
                borderColor: '#ffffff',
                borderWidth: 3
              }
            ]
          },
          options: {
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', padding: 20 },
              tooltip: { padding: 12, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.8)' }
            }
          }
        })
      }
    }

    // Wait a bit for Chart.js to load
    const timer = setTimeout(() => {
      initChart()
    }, 250)

    return () => clearTimeout(timer)
  }, [type, id])

  return <canvas id={id}></canvas>
}
