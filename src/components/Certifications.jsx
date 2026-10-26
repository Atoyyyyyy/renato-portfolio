import { certifications, handsOn } from '../data/portfolio'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

function CertificationCard({ item }) {
  return (
    <article className="certification-card">
      <div className="certification-top">
        <span className="icon-box"><Icon name={item.icon} /></span>
        <span className="certification-kind">{item.kind}</span>
      </div>
      <p className="certification-date">{item.date}</p>
      <h3>{item.title}</h3>
      <p className="certification-issuer">{item.issuer}</p>
      {item.certificateUrl && (
        <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer"
          className="text-link" aria-label={`View certificate: ${item.title} (opens in a new tab)`}>
          View Certificate<Icon name="external" size={15} />
        </a>
      )}
    </article>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="section" tabIndex={-1} aria-label="Certifications and Training">
      <div className="container">
        <SectionHeading number="05" eyebrow="Learning beyond the classroom" title="Certifications & Training" description="Training, workshops, and hands-on experiences that shape my practice." />
        <div className="certifications-grid">
          {certifications.map(item => <CertificationCard key={item.id} item={item} />)}
        </div>
        <aside className="hands-on">
          <span className="icon-box"><Icon name="network" /></span>
          <div>
            <p className="eyebrow">Hands-on activity · {handsOn.date}</p>
            <h3>{handsOn.title}</h3><p>{handsOn.description}</p>
          </div>
          <span className="hands-on-decoration" aria-hidden="true">LEARN → APPLY</span>
        </aside>
      </div>
    </section>
  )
}
