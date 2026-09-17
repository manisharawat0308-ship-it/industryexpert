import { useEffect, useRef } from 'react'

interface TickerItem {
  label: string
  value: string
  change: string
  direction: 'up' | 'down' | 'flat'
}

export default function LiveTicker({ items }: { items: TickerItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let animId: number
    let pos = 0
    const speed = 0.5

    const animate = () => {
      pos -= speed
      if (pos <= -el.scrollWidth / 2) pos = 0
      el.style.transform = `translateX(${pos}px)`
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  const dirColor = (d: string) => d === 'up' ? 'text-green-400' : d === 'down' ? 'text-red-400' : 'text-gray-400'
  const dirArrow = (d: string) => d === 'up' ? '▲' : d === 'down' ? '▼' : '●'

  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="bg-[#0f172a] overflow-hidden py-1.5 border-b border-gray-800">
      <div ref={scrollRef} className="flex items-center gap-8 whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 font-medium">{item.label}</span>
            <span className="text-[11px] text-white font-bold">{item.value}</span>
            <span className={`text-[9px] font-bold ${dirColor(item.direction)}`}>{dirArrow(item.direction)} {item.change}</span>
            <span className="text-gray-700 mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  )
}
