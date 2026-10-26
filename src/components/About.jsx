import { about, profile } from '../data/portfolio'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="section about-section" tabIndex={-1} aria-label={about.title}>
      <div className="container">
        <SectionHeading number="01" eyebrow="The person behind the projects" title={about.title} />
        <div className="about-layout">
          <div className="about-copy">
            <h3>{about.lead}</h3>
            {about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <div className="cv-row">
              {profile.publicCvUrl ? (
                <a className="text-link" href={profile.publicCvUrl} download>
                  <Icon name="download" size={17} />Download CV
                </a>
              ) : (
                <>
                  <button className="cv-placeholder" disabled aria-describedby="cv-note">
                    <Icon name="download" size={17} />Download CV
                  </button>
                  <span id="cv-note">Public CV coming soon</span>
                </>
              )}
            </div>
          </div>
          <div className="expertise-grid">
            {about.areas.map(area => (
              <div className="expertise-card" key={area.id}>
                <span className="icon-box"><Icon name={area.icon} /></span>
                <h3>{area.title}</h3><p>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
