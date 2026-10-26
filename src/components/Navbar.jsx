import { useEffect, useRef, useState } from 'react'
import { navigation, profile } from '../data/portfolio'
import Icon from './Icon'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const toggleRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const updateSection = () => {
      const marker = window.scrollY + 170
      let current = 'home'
      navigation.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= marker) current = id
      })
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = 'contact'
      setActive(current)
    }
    const onResize = () => {
      if (window.innerWidth >= 1000) setOpen(false)
      updateSection()
    }
    const onKey = event => {
      if (event.key === 'Escape' && open) { setOpen(false); toggleRef.current?.focus() }
    }
    const onOutside = event => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setOpen(false)
    }
    updateSection()
    window.addEventListener('scroll', updateSection, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    return () => {
      window.removeEventListener('scroll', updateSection)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
    }
  }, [open])

  const goTo = id => {
    setOpen(false)
    setActive(id)
    // Preserve keyboard navigation when the selected mobile link becomes hidden.
    document.getElementById(id)?.focus({ preventScroll: true })
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container nav-inner">
        <a href="#home" className="brand" aria-label={`${profile.name}, home`} onClick={() => goTo('home')}>{profile.initials}<span>.</span></a>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
        <nav id="primary-navigation" className={`primary-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation" onBlur={event => {
          if (event.relatedTarget && !headerRef.current?.contains(event.relatedTarget)) setOpen(false)
        }}>
          {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} className={`${active === id ? 'active' : ''} ${id === 'contact' ? 'nav-contact' : ''}`} aria-current={active === id ? 'location' : undefined} onClick={() => goTo(id)}>{label}{id === 'contact' && <Icon name="arrow" size={15} />}</a>)}
        </nav>
      </div>
    </header>
  )
}
