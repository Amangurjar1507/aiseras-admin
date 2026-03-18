export default function ChartContainer({ title, canvasId, height = '320px' }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">{title}</h5>
        <div style={{ height }}>
          <canvas id={canvasId}></canvas>
        </div>
      </div>
    </div>
  )
}
