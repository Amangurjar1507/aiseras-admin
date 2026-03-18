export function initCharts() {
  // Bar Chart - Video/Audio Overview
  const barCanvas = document.getElementById('barChart')
  if (barCanvas && typeof Chart !== 'undefined') {
    const barCtx = barCanvas.getContext('2d')
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Videos',
          data: [420, 560, 380, 200, 300, 280],
          backgroundColor: '#3945eb',
          borderColor: '#3945eb',
          borderWidth: 1,
          borderRadius: 8,
          barPercentage: 0.7
        }, {
          label: 'Audios',
          data: [42, 38, 35, 80, 90, 100],
          backgroundColor: '#00305c',
          borderColor: '#00305c',
          borderWidth: 1,
          borderRadius: 8,
          barPercentage: 0.7
        }]
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
  }

  // Donut Chart - User Status
  const donutCanvas = document.getElementById('donutChart')
  if (donutCanvas && typeof Chart !== 'undefined') {
    const donutCtx = donutCanvas.getContext('2d')
    new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Active Users', 'Inactive', 'Pending'],
        datasets: [{
          data: [65, 25, 10],
          backgroundColor: ['#39ab71', '#00305c', '#d4a5b4'],
          borderColor: '#ffffff',
          borderWidth: 3
        }]
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
