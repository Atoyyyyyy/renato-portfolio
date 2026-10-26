import { education } from '../data/portfolio'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section id="education" className="section section-tinted" tabIndex={-1} aria-label="Education">
      <div className="container education-layout">
        <div>
          <SectionHeading number="04" eyebrow="The foundation" title="Education" description="Building the knowledge behind the work." />
          <div className="education-motif" aria-hidden="true">
            <Icon name="cap" size={80} /><span>ALWAYS LEARNING.<br />ALWAYS BUILDING.</span>
          </div>
        </div>
        <ol className="education-timeline">
          {education.map(item => (
            <li key={item.id}>
              <div className="timeline-marker"><Icon name="cap" size={19} /></div>
              <div className="education-entry">
                <div className="education-meta">
                  <span>{item.period}</span>
                  {item.status && <span className="status-badge">{item.status}</span>}
                </div>
                <h3>{item.degree}</h3>
                <p className="education-specialization">{item.specialization}</p>
                <p className="institution">{item.institution}</p>
                <p className="education-location"><Icon name="pin" size={14} />{item.location}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
