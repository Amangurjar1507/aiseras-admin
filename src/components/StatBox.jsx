export default function StatBox({ title, value, change, icon, background }) {
  return (
    <div className="stat-box" style={{ background }}>
      <div>
        <h6>{title}</h6>
        <h3>{value}</h3>
        <p className="small muted mt-2 mb-0">{change}</p>
      </div>
      <div className="icon-box">
        <i className={`bi ${icon}`}></i>
      </div>
    </div>
  )
}
