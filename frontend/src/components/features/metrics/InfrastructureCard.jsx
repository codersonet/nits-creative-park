/**
 * InfrastructureCard.jsx
 * What:  The "Campus Server Uptime" panel: description, grid power uptime and node latency.
 * Used by: MetricsDashboard
 * Talks to: GlassCard
 */
import GlassCard from '@/components/ui/GlassCard.jsx';

// "data" is { title, description, gridPowerUptimePercent, nodeLatencyMs }.
export default function InfrastructureCard({ data }) {
  return (
    <GlassCard>
      <span className="label-mono">// HARDWARE_SPECS</span>
      <h3 className="headline-lg panel-title">{data.title}</h3>
      <p className="body-md">{data.description}</p>
      <div className="hud-footer panel-footer">
        <div className="hud-stat">
          <span className="label-mono">GRID POWER UPTIME</span>
          <span className="hud-val">{data.gridPowerUptimePercent}%</span>
        </div>
        <div className="hud-stat">
          <span className="label-mono">NODE LATENCY</span>
          <span className="hud-val">{data.nodeLatencyMs} MS</span>
        </div>
      </div>
    </GlassCard>
  );
}
