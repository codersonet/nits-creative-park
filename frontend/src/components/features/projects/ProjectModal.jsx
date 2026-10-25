/**
 * ProjectModal.jsx
 * What:  The pop-up with a project's full details (tech stack, status, collaboration link).
 * Used by: ProjectsBoard
 * Talks to: Modal, Button, constants/routes.js
 */
import Button from '@/components/ui/Button.jsx';
import Modal from '@/components/ui/Modal.jsx';
import { ROUTES } from '@/constants/routes.js';

// "project" is the chosen project, or null when nothing is chosen (dialog closed).
export default function ProjectModal({ project, onClose }) {
  return (
    <Modal
      open={project !== null}
      onClose={onClose}
      eyebrow={project ? `${project.club} // TECH_SPEC` : ''}
      title={project?.title ?? ''}
    >
      {project && (
        <>
          <p className="body-md">{project.description}</p>
          <div className="modal-metrics">
            <div>
              <span className="label-mono">TECH_STACK</span>
              <p className="label-mono text-primary">{project.stack.join(', ')}</p>
            </div>
            <div>
              <span className="label-mono">STATUS</span>
              <p className="label-mono text-primary">{project.status}</p>
            </div>
          </div>
          <div className="modal-actions">
            <Button to={ROUTES.CONTACT}>REQUEST_COLLABORATION</Button>
          </div>
        </>
      )}
    </Modal>
  );
}
