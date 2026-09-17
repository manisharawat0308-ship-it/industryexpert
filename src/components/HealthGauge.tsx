interface HealthGaugeProps {
  score: number // 0-100
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function HealthGauge({ score, label = 'Industry Health', size = 'md' }: HealthGaugeProps) {
  const dimensions = { sm: { w: 120, r: 45, sw: 8 }, md: { w: 160, r: 60, sw: 10 }, lg: { w: 200, r: 75, sw: 12 } }
  const { w, r, sw } = dimensions[size]
  const cx = w / 2
  const cy = w / 2 + 10

  // Semi-circle path
  const circumference = Math.PI * r
  const progress = (score / 100) * circumference

  // Color based on score
  const getColor = () => {
    if (score >= 75) return '#22c55e'
    if (score >= 50) return '#f59e0b'
    if (score >= 30) return '#f97316'
    return '#dc2626'
  }

  const getStatus = () => {
    if (score >= 75) return 'Healthy'
    if (score >= 50) return 'Moderate'
    if (score >= 30) return 'Stressed'
    return 'Critical'
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={w} height={w / 2 + 30} viewBox={`0 0 ${w} ${w / 2 + 30}`}>
        {/* Background arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={sw}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={getColor()}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference - progress}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out, stroke 0.5s ease' }}
        />
        {/* Zone markers */}
        <text x={cx - r - 5} y={cy + 15} fontSize="8" fill="#94a3b8" textAnchor="middle">0</text>
        <text x={cx} y={cy - r - 5} fontSize="8" fill="#94a3b8" textAnchor="middle">50</text>
        <text x={cx + r + 5} y={cy + 15} fontSize="8" fill="#94a3b8" textAnchor="middle">100</text>
        {/* Score */}
        <text x={cx} y={cy - 8} fontSize={size === 'lg' ? '28' : size === 'md' ? '24' : '18'} fontWeight="900" fill="#1f2937" textAnchor="middle">{score}</text>
        <text x={cx} y={cy + 10} fontSize="10" fill={getColor()} fontWeight="700" textAnchor="middle">{getStatus()}</text>
      </svg>
      <span className="text-[10px] font-semibold text-gray-500 -mt-2">{label}</span>
    </div>
  )
}
