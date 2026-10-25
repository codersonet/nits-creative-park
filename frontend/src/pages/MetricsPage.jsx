/**
 * MetricsPage.jsx
 * What:  Campus engineering numbers: counters, department participation and server uptime.
 * Used by: routes/AppRoutes.jsx (path "/metrics")
 * Talks to: SeoHead, PageHeader, MetricsDashboard, hooks/usePageClass.js, legacy metrics.css
 */
import '@legacy/stylesheets/metrics.css';
import MetricsDashboard from '@/components/features/metrics/MetricsDashboard.jsx';
import SeoHead from '@/components/layout/SeoHead.jsx';
import PageHeader from '@/components/ui/PageHeader.jsx';
import { ROUTES } from '@/constants/routes.js';
import { usePageClass } from '@/hooks/usePageClass.js';

export default function MetricsPage() {
  usePageClass('page-metrics');
  return (
    <>
      <SeoHead
        title="METRICS // NIT SIKKIM NEXUS"
        description="Explore campus engineering indicators, academic project output, open-source activity, and system metrics at NIT Sikkim."
        path={ROUTES.METRICS}
      />
      {/* The old text said "Real-time", but the numbers are entered by hand, so the word is removed. */}
      <PageHeader
        eyebrow="SYSTEM_ANALYTICS"
        title="Campus Engineering Metrics"
        description="Performance indicators, academic project output, open-source commits, and system status across NIT Sikkim departments."
      />
      <MetricsDashboard />
    </>
  );
}
