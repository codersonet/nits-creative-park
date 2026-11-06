/**
 * ProjectCard.jsx
 * What:  One student project: club, status, title, description, progress and a "view specs" button.
 * Used by: ProjectsBoard
 * Talks to: GlassCard, ProgressBar, Button
 */
import Button from '@/components/ui/Button.jsx';
import GlassCard from '@/components/ui/GlassCard.jsx';
import ProgressBar from '@/components/ui/ProgressBar.jsx';

// "onOpen" is called with the project when the visitor presses VIEW_SPECS.
export default function ProjectCard({ project, onOpen }) {
  return (
    <GlassCard as="article" className="project-card">
      <div>
        <div className="card-header">
          <span className="label-mono text-muted">// {project.club}</span>
          <span className="label-mono accent-cyan">[{project.status}]</span>
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="body-md">{project.description}</p>
      </div>
      <div>
        <div className="progress-container">
          <div className="card-header">
            <span className="label-mono">OPTIMIZATION_INDEX</span>
            <span className="label-mono text-primary">{project.progress}%</span>
          </div>
          <ProgressBar percent={project.progress} label={`${project.title} progress`} />
        </div>
        <div className="card-footer">
          <span className="label-mono text-muted">{project.stack[0]}</span>
          <Button variant="ghost" onClick={() => onOpen(project)}>
            VIEW_SPECS ↗
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
