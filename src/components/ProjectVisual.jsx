import { useState } from 'react'
import Icon from './Icon'

export default function ProjectVisual({ project, index = 0 }) {
  const [failed, setFailed] = useState(false)
  if (project.image && !failed) return <div className={`project-image ${project.featured ? 'featured-image' : ''}`}><img src={project.image} alt={project.imageAlt || project.title} loading="lazy" width="720" height="440" onError={() => setFailed(true)} /></div>
  if (project.featured) return (
    <div className="geo-visual" aria-label="Concept illustration of a monitored landscape, not a project screenshot" role="img">
      <div className="geo-top"><span>GEOSENTRY</span><span>RESEARCH / IoT</span></div>
      <svg viewBox="0 0 560 340" fill="none" aria-hidden="true">
        <defs><linearGradient id="terrain-fill" x1="280" y1="100" x2="280" y2="320" gradientUnits="userSpaceOnUse"><stop stopColor="#22d3ee" stopOpacity=".14" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></linearGradient></defs>
        <g stroke="#3e7b83" strokeWidth="1" opacity=".42">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <path key={i} d={`M-30 ${275+i*10}Q60 ${270+i*11} 125 ${200+i*10}T235 ${140+i*12}T335 ${175+i*12}T450 ${170+i*10}T590 ${235+i*10}`} />)}
          <path d="M30 300 210 120 390 300M100 300 240 155 430 300M190 300 280 195 475 300M300 300 390 160 550 300" />
        </g>
        <path d="m20 290 80-45 115-124 104 104 72-62 145 127Z" fill="url(#terrain-fill)" />
        <path d="m20 290 80-45 115-124 104 104 72-62 145 127" stroke="#5db9bf" strokeWidth="1.3" />
        <g stroke="#22d3ee"><circle cx="215" cy="121" r="7" fill="#122638" /><circle cx="215" cy="121" r="17" opacity=".3" /><path d="M215 104V69h96" strokeDasharray="3 5" /><circle cx="391" cy="163" r="5" fill="#122638" /><path d="M391 158v-47h63" strokeDasharray="3 5" /><circle cx="100" cy="245" r="5" fill="#122638" /><path d="M100 240v-54H52" strokeDasharray="3 5" /></g>
        <g fill="#b2cbd0" fontFamily="monospace" fontSize="9" letterSpacing="1"><text x="250" y="58">ENVIRONMENTAL SENSORS</text><text x="403" y="99">IoT</text><text x="26" y="174">TERRAIN</text></g>
      </svg>
      <span className="concept-caption">LANDSCAPE CONCEPT · THESIS IN PROGRESS</span>
    </div>
  )
  return (
    <div className={`project-visual visual-${project.icon}`} aria-hidden="true">
      <span className="project-visual-index">PROJECT / {String(index + 1).padStart(2, '0')}</span>
      <div className="project-glyph"><span className="glyph-corner corner-top" /><Icon name={project.icon} size={50} /><span className="glyph-corner corner-bottom" /></div>
      <span className="concept-caption">CONCEPT ILLUSTRATION</span><span className="visual-cross">+</span>
    </div>
  )
}
