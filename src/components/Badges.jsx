export default function Badges({ items }) {
  if (!items.length) return null
  return <ul className="badges">{items.map(item => <li key={item}>{item}</li>)}</ul>
}
