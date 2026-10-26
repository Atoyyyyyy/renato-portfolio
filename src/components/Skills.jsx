import { skills } from '../data/portfolio'
import Badges from './Badges'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="section section-tinted" tabIndex={-1} aria-label="Technical Expertise">
      <div className="container">
        <SectionHeading number="02" eyebrow="My engineering toolkit" title="Technical Expertise" description="Languages, hardware, and tools I use to bring ideas to life." />
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <article className="skill-card" key={skill.id}>
              <div className="skill-card-heading">
                <Icon name={skill.icon} /><span className="card-index">0{index + 1}</span>
              </div>
              <h3>{skill.title}</h3>
              <Badges items={skill.items} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
