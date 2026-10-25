/**
 * PartnersMarquee.jsx
 * What:  The endlessly scrolling strip of recruitment partners. The list is shown twice
 *        so the loop has no gap (the old initInfiniteMarquee did this by copying HTML).
 * Used by: pages/CompaniesPage
 * Talks to: hooks/useCompanies.js, QueryBoundary, CompanyBadge, Skeleton
 */
import Skeleton from '@/components/skeletons/Skeleton.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import { useCompanies } from '@/hooks/useCompanies.js';
import CompanyBadge from './CompanyBadge.jsx';

export default function PartnersMarquee() {
  const query = useCompanies();
  return (
    <section aria-label="Recruitment partners">
      <QueryBoundary
        query={query}
        skeleton={
          <div className="marquee-wrapper">
            <Skeleton height="64px" />
          </div>
        }
        isEmpty={(data) => data.items.length === 0}
        empty={null}
      >
        {(data) => (
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {data.items.map((company) => (
                <CompanyBadge key={company.id} company={company} />
              ))}
              {data.items.map((company) => (
                <CompanyBadge key={`${company.id}-copy`} company={company} hidden />
              ))}
            </div>
          </div>
        )}
      </QueryBoundary>
    </section>
  );
}
