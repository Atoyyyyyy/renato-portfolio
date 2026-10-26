import { useState } from 'react'
import { projectFilters, projects } from '../data/portfolio'
import Badges from './Badges'
import Icon from './Icon'
import ProjectVisual from './ProjectVisual'
import SectionHeading from './SectionHeading'

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card ${project.featured ? 'featured-project' : ''}`}>
      <ProjectVisual project={project} index={index} />
      <div className="project-content">
        {project.featured && <div className="featured-label"><span className="status-dot" />{project.status}</div>}
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
        <p className="project-description">{project.description}</p>
        <Badges items={project.technologies} />
        {project.note && <p className="project-note">{project.note}</p>}
        {project.url && (
          <a href={project.url} className="project-link" target="_blank" rel="noopener noreferrer"
            aria-label={`${project.linkLabel}: ${project.title}${project.subtitle ? ` — ${project.subtitle}` : ''} (opens in a new tab)`}>
            {project.linkLabel}<Icon name="external" size={16} />
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const visibleProjects = projects.filter(project => filter === 'All' || project.filters.includes(filter))
  const featured = visibleProjects.find(project => project.featured)
  return (
    <section id="projects" className="section projects-section" tabIndex={-1} aria-label="Featured Projects">
      <div className="container">
        <SectionHeading number="03" eyebrow="From concept to creation" title="Featured Projects"
          description="An exploration of connected devices, intelligent control, and practical software.">
          <span className="section-count">{String(projects.length).padStart(2, '0')} projects / a growing body of work</span>
        </SectionHeading>
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {projectFilters.map(item => (
            <button key={item} type="button" className={filter === item ? 'selected' : ''}
              aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
        <p className="sr-only" role="status">{visibleProjects.length} projects shown{filter !== 'All' ? ` in ${filter}` : ''}.</p>
        {featured && <ProjectCard project={featured} index={0} />}
        <div className="projects-grid">
          {visibleProjects.filter(project => !project.featured).map(project => (
            <ProjectCard key={project.id} project={project} index={projects.findIndex(item => item.id === project.id)} />
          ))}
        </div>
      </div>
    </section>
  )
}
