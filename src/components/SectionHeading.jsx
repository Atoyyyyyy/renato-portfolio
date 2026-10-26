export default function SectionHeading({ number, eyebrow, title, description, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow"><span>{number} /</span> {eyebrow}</p>
        <h2>{title}<span className="accent">.</span></h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  )
}
