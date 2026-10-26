const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: <><path d="M14 3h7v7M21 3 10 14" /><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5" /><rect x="9" y="9" width="6" height="6" rx="1" /></>,
  signal: <><path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0" /><circle cx="12" cy="20" r="1" /></>,
  circuit: <><path d="M3 5h7v7h11M3 19h12v-7M17 3v4h4" /><circle cx="3" cy="5" r="2" /><circle cx="3" cy="19" r="2" /><circle cx="21" cy="12" r="2" /><circle cx="21" cy="7" r="2" /></>,
  sliders: <><path d="M5 3v4m0 4v10M12 3v10m0 4v4M19 3v3m0 4v11" /><rect x="2" y="7" width="6" height="4" rx="1" /><rect x="9" y="13" width="6" height="4" rx="1" /><rect x="16" y="6" width="6" height="4" rx="1" /></>,
  code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16" />,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  terminal: <><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m6 8 4 4-4 4m7 0h5" /></>,
  layers: <path d="m12 2 10 5-10 5L2 7Zm-10 10 10 5 10-5M2 17l10 5 10-5" />,
  mountain: <path d="m2 20 8-15 5 8 3-5 4 12ZM7 11l3 2 3-3" />,
  droplet: <><path d="M12 2C9 7 4 11 4 15a8 8 0 0 0 16 0c0-4-5-8-8-13Z" /><path d="M8 15a4 4 0 0 0 4 4" /></>,
  robot: <><rect x="4" y="6" width="16" height="14" rx="3" /><path d="M12 2v4M1 10v6m22-6v6M8 16h8" /><circle cx="8" cy="11" r="1" /><circle cx="16" cy="11" r="1" /></>,
  board: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18m6-18v18M3 9h18M3 15h18" /><circle cx="12" cy="12" r="1.5" /></>,
  activity: <path d="M2 12h5l3-9 4 18 3-9h5" />,
  music: <><path d="M9 18V5l12-3v13M9 8l12-3" /><ellipse cx="5.5" cy="18" rx="3.5" ry="3" /><ellipse cx="17.5" cy="15" rx="3.5" ry="3" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m3 6 9 7 9-7" /></>,
  cap: <path d="m2 9 10-6 10 6-10 6Zm4 3v6c4 3 8 3 12 0v-6m4-3v8" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 15v5h16v-5" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  spark: <path d="m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3Zm8-2v4m-2-2h4" />,
  atom: <><ellipse cx="12" cy="12" rx="11" ry="4" /><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="1" /></>,
  network: <><rect x="9" y="2" width="6" height="5" rx="1" /><path d="M12 7v5M4 17v-5h16v5m-8-5v5" /><rect x="1" y="17" width="6" height="5" rx="1" /><rect x="9" y="17" width="6" height="5" rx="1" /><rect x="17" y="17" width="6" height="5" rx="1" /></>,
  tools: <path d="m14 6 4 4m-6 2-9 9-2-2 9-9M14 6a5 5 0 0 1 7-4l-3 3 1 3 3-3a5 5 0 0 1-7 7Z" />,
}

export default function Icon({ name, size = 24, className = '' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name] || paths.chip}</svg>
}
