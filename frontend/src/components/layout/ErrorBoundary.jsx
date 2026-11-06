/**
 * ErrorBoundary.jsx
 * What:  Catches a crash inside a page and shows a friendly message instead of a blank screen.
 * Used by: components/layout/Layout (around every page)
 * Talks to: ErrorState
 */
import { Component } from 'react';
import ErrorState from '@/components/ui/ErrorState.jsx';

// React only supports crash catching in class components, so this is one on purpose.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  // Switches to the error view after a crash.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Logs the crash for developers. Visitors only see the friendly message.
  componentDidCatch(error, info) {
    console.error('A page crashed:', error, info.componentStack);
  }

  // The "try again" button: show the page again.
  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorState title="This page hit a problem" onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
