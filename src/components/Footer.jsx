import { navigation, profile } from '../data/portfolio'
import Icon from './Icon'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-identity">
            <a href="#home" className="brand" aria-label="Back to home">{profile.initials}<span>.</span></a>
            <div><p>{profile.name}</p><span>{profile.role}</span></div>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.filter(item => ['about', 'projects', 'contact'].includes(item.id)).map(item => (
              <a href={`#${item.id}`} key={item.id}>{item.label}</a>
            ))}
            <a href="#home" className="back-top" aria-label="Back to top"><Icon name="arrow" size={17} /></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          <p>Built with React<span className="accent">.</span></p>
        </div>
      </div>
    </footer>
  )
}
