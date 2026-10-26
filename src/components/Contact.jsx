import { contact } from '../data/portfolio'
import Icon from './Icon'

export default function Contact() {
  return (
    <section id="contact" className="section contact-section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-copy">
            <p className="eyebrow"><span>06 /</span> The next connection</p>
            <h2 id="contact-title">{contact.title}<span className="accent">.</span></h2>
            <p>{contact.description}</p>
            <a href={`mailto:${contact.email}`} className="button button-primary">
              Send an Email<Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="contact-details">
            <span className="contact-orbit" aria-hidden="true"><Icon name="mail" size={36} /></span>
            <a className="contact-email" href={`mailto:${contact.email}`}>
              {contact.email}<Icon name="external" size={16} />
            </a>
            <p><Icon name="pin" size={16} />{contact.location}</p>
            <span className="contact-detail-label">HAVE A PROJECT OR OPPORTUNITY? SAY HELLO.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
