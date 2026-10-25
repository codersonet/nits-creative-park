/**
 * Hero.jsx
 * What:  The home page's opening section: headline, two buttons and the terrain panel.
 * Used by: pages/HomePage
 * Talks to: Button, GlassCard, constants/routes.js
 */
import Button from '@/components/ui/Button.jsx';
import GlassCard from '@/components/ui/GlassCard.jsx';
import { ROUTES } from '@/constants/routes.js';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hud-badge">
          <span className="label-mono">PROGRESS // OUTPOST</span>
        </div>
        <h1 className="headline-xl">
          NIT_SIKKIM
          <br />
          <span className="text-glow">CREATIVE_PARK</span>
        </h1>
        <p className="body-md hero-description">
          The ON_SIGHT hub for NIT Sikkim engineering student groups, technical innovation labs,
          active project teams, and alumni networks.
        </p>
        <div className="hero-actions">
          <Button to={ROUTES.CLUBS}>EXPLORE_CLUBS</Button>
          <Button variant="ghost" to={ROUTES.COMPANIES}>
            RECRUITER_LOGS
          </Button>
        </div>
      </div>

      <GlassCard className="terrain-hud">
        <div className="hud-header">
          <span className="label-mono">TERRAIN_PROFILE</span>
          <span className="label-mono">27.3012° N, 88.3615° E</span>
        </div>
        <div className="topography-graphic" aria-hidden="true">
          <div className="topo-line line-1" />
          <div className="topo-line line-2" />
          <div className="topo-line line-3" />
        </div>
        <div className="hud-footer">
          <div className="hud-stat">
            <span className="label-mono">STATION</span>
            <span className="hud-val">SOUTH SIKKIM</span>
          </div>
          <div className="hud-stat">
            <span className="label-mono">CLIMATE</span>
            <span className="hud-val">RAIN DANCE</span>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
