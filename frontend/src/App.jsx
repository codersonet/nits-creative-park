/**
 * App.jsx
 * What:  The top of the component tree. The outer crash catcher covers even the layout itself.
 * Used by: main.jsx
 * Talks to: ErrorBoundary, routes/AppRoutes.jsx
 */
import ErrorBoundary from '@/components/layout/ErrorBoundary.jsx';
import AppRoutes from '@/routes/AppRoutes.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
