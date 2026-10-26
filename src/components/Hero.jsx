import { profile } from '../data/portfolio'
import Icon from './Icon'

export default function Hero() {
  const nameSplit = profile.name.lastIndexOf(' ')
  return (
    <section id="home" className="hero-section" tabIndex={-1} aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow hero-intro"><span className="small-line" />{profile.introduction}</p>
            <h1 id="hero-title"><span className="name-first">{profile.name.slice(0, nameSplit)}</span>{' '}<span className="name-last">{profile.name.slice(nameSplit + 1)}<span className="accent">.</span></span></h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-statement">{profile.headline}</p>
            <p className="hero-description">{profile.heroDescription}</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">Explore My Projects<Icon name="arrow" size={18} /></a>
              <a href="#contact" className="button button-secondary">Get in Touch<Icon name="external" size={16} /></a>
            </div>
            <p className="hero-location"><Icon name="pin" size={15} />{profile.location}<span className="location-divider" />BS Computer Applications</p>
          </div>
          <figure className="hero-portrait">
            <img src={profile.image} alt={profile.imageAlt} width="1200" height="1800"
              fetchPriority="high" />
          </figure>
        </div>
        <div className="hero-base">
          <div className="hero-disciplines">{profile.heroLabels.map((label, index) => <span key={label}><span className="discipline-number">0{index + 1}</span>{label}</span>)}</div>
          <a href="#about" className="scroll-link">Scroll to explore<span>↓</span></a>
        </div>
      </div>
    </section>
  )
}
