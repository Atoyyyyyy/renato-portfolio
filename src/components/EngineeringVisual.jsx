export default function EngineeringVisual() {
  return (
    <div className="engineering-visual" aria-hidden="true">
      <div className="visual-topline"><span>HARDWARE × SOFTWARE</span><span>FIG. 01</span></div>
      <svg className="board-illustration" viewBox="0 0 500 440" fill="none">
        <defs>
          <pattern id="board-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#33485f" /></pattern>
          <linearGradient id="chip-fill" x1="160" y1="120" x2="330" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#21394d" /><stop offset="1" stopColor="#101c2e" /></linearGradient>
          <radialGradient id="board-glow"><stop stopColor="#22d3ee" stopOpacity=".12" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="500" height="440" fill="url(#board-grid)" />
        <circle cx="250" cy="220" r="215" fill="url(#board-glow)" />
        <g stroke="#31536a" strokeWidth="1.5">
          <path d="M180 150H122L88 116H35M180 178H104L68 214H20M180 206H126L84 248H46M180 234H110L75 269v76H32M180 262H142v92l-30 30H62" />
          <path d="M320 150h60l30-30h55M320 178h88l36 36h36M320 206h40l34 34h68M320 234h64l36 36v56h48M320 262h30v80l34 34h68" />
          <path d="M208 130V90l-36-36H92M236 130V54l-20-20M264 130V80l32-32h66M292 130V98l46-46h94" />
          <path d="M208 290v42l-32 32v48M236 290v90l-16 16v24M264 290v46l32 32v48M292 290v28l46 46h42" />
        </g>
        <g stroke="#22d3ee" strokeOpacity=".7" strokeWidth="1.5"><path d="M180 178H104L68 214H32M264 130V80l32-32h66M320 234h64l36 36v56h36M236 290v90l-16 16v24" /></g>
        <g fill="#0e1929" stroke="#507084" strokeWidth="1.5">
          {[[35,116],[32,214],[46,248],[32,345],[62,384],[92,54],[216,34],[362,48],[432,52],[465,120],[480,214],[462,240],[456,326],[452,376],[176,412],[220,420],[296,416],[380,364]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />)}
        </g>
        <rect x="163" y="113" width="174" height="194" rx="14" stroke="#22d3ee" strokeOpacity=".13" />
        <g stroke="#6a91a5" strokeWidth="5">
          {[150,178,206,234,262].map(y => <path key={y} d={`M171 ${y}h14M315 ${y}h14`} />)}
          {[208,236,264,292].map(x => <path key={x} d={`M${x} 121v14M${x} 285v14`} />)}
        </g>
        <rect x="180" y="130" width="140" height="160" rx="9" fill="url(#chip-fill)" stroke="#4a768b" />
        <rect x="191" y="141" width="118" height="138" rx="5" stroke="#36566b" />
        <circle cx="202" cy="152" r="3" fill="#22d3ee" />
        <path d="m232 182-12 12 12 12m36-24 12 12-12 12m-13-28-10 32" stroke="#22d3ee" strokeWidth="2" />
        <text x="250" y="240" fill="#f8fafc" textAnchor="middle" fontFamily="monospace" fontSize="21" letterSpacing="4">RB.</text>
        <text x="250" y="259" fill="#94a3b8" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="2">EMBEDDED SYSTEMS</text>
        <g fill="#152c3c" stroke="#395467"><rect x="66" y="88" width="28" height="12" rx="2" /><rect x="375" y="288" width="12" height="28" rx="2" /><rect x="130" y="306" width="12" height="28" rx="2" /></g>
        <g fill="#22d3ee"><circle cx="362" cy="48" r="2" /><circle cx="32" cy="214" r="2" /><circle cx="456" cy="326" r="2" /></g>
      </svg>
      <div className="visual-tag tag-firmware"><span className="visual-tag-icon">&lt;/&gt;</span><div><strong>Firmware</strong><span>Logic into action</span></div></div>
      <div className="visual-tag tag-hardware"><span className="visual-tag-icon">⌁</span><div><strong>Connected hardware</strong><span>Ideas into systems</span></div></div>
      <div className="visual-bottomline"><span>DESIGN · INTEGRATE · BUILD</span><span>CONCEPT ILLUSTRATION</span></div>
    </div>
  )
}
