/**
 * ProjectsBoard.jsx
 * What:  The clubs page content: category filter, the project cards and the details pop-up.
 * Used by: pages/ClubsPage
 * Talks to: hooks/useProjects.js, FilterBar, QueryBoundary, ProjectCard, ProjectModal
 */
import { useState } from 'react';
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import FilterBar from '@/components/ui/FilterBar.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import { ALL_CATEGORY, PROJECT_CATEGORIES } from '@/constants/categories.js';
import { useProjects } from '@/hooks/useProjects.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';

export default function ProjectsBoard() {
  const [category, setCategory] = useState(ALL_CATEGORY);
  const [selected, setSelected] = useState(null);
  const query = useProjects(category);

  return (
    <section className="clubs-section">
      <div className="section-header">
        <span className="label-mono">// FILTER_NODES</span>
        <FilterBar
          options={PROJECT_CATEGORIES}
          value={category}
          onChange={setCategory}
          label="Filter projects by category"
        />
      </div>

      <QueryBoundary
        query={query}
        skeleton={<CardGridSkeleton className="projects-grid" />}
        isEmpty={(data) => data.items.length === 0}
        empty={<EmptyState title="No projects here yet" message="Try another category." />}
      >
        {(data) => (
          <div className="grid-container projects-grid">
            {data.items.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </div>
        )}
      </QueryBoundary>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
