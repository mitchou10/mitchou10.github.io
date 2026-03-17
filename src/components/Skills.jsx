import './Skills.css';

const SKILLS = [
  { name: 'HTML / CSS', level: 90, color: '#f97316' },
  { name: 'JavaScript', level: 85, color: '#eab308' },
  { name: 'React', level: 80, color: '#38bdf8' },
  { name: 'Node.js', level: 70, color: '#4ade80' },
  { name: 'Git', level: 85, color: '#f43f5e' },
  { name: 'Python', level: 65, color: '#a78bfa' },
];

const TAGS = [
  'React', 'Vite', 'JavaScript', 'TypeScript', 'Node.js',
  'HTML', 'CSS', 'Git', 'GitHub', 'REST APIs', 'Python',
];

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section__title">Skills</h2>
        <p className="section__subtitle">Technologies I work with</p>

        <div className="skills__bars">
          {SKILLS.map(({ name, level, color }) => (
            <div key={name} className="skill">
              <div className="skill__header">
                <span className="skill__name">{name}</span>
                <span className="skill__percent">{level}%</span>
              </div>
              <div className="skill__bar">
                <div
                  className="skill__fill"
                  style={{ width: `${level}%`, background: color }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="skills__tags">
          {TAGS.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
