/**
 * ui.test.jsx
 * What:  Checks the basic UI pieces: Button, FilterBar, ErrorState and Modal.
 * Used by: npm test
 * Talks to: components/ui/*
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Button from '@/components/ui/Button.jsx';
import ErrorState from '@/components/ui/ErrorState.jsx';
import FilterBar from '@/components/ui/FilterBar.jsx';
import Modal from '@/components/ui/Modal.jsx';
import { ApiError } from '@/utils/api-error.js';

describe('Button', () => {
  it('links to a page inside the site', () => {
    render(<MemoryRouter><Button to="/clubs">Go</Button></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', '/clubs');
  });

  it('opens other sites in a new tab without sharing window.opener', () => {
    render(<Button href="https://example.org">Out</Button>);
    const link = screen.getByRole('link', { name: 'Out' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('is a disabled button, not a link, when disabled', () => {
    render(<Button href="https://example.org" disabled>Off</Button>);
    expect(screen.getByRole('button', { name: 'Off' })).toBeDisabled();
  });
});

describe('FilterBar', () => {
  it('marks the chosen option and reports clicks', () => {
    const onChange = vi.fn();
    const options = [{ value: 'all', label: 'ALL' }, { value: 'tech', label: 'TECH' }];
    render(<FilterBar options={options} value="all" onChange={onChange} label="Filter" />);
    expect(screen.getByRole('button', { name: 'ALL' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'TECH' }));
    expect(onChange).toHaveBeenCalledWith('tech');
  });
});

describe('ErrorState', () => {
  it('shows a safe API message with its reference and a retry button', () => {
    const onRetry = vi.fn();
    const error = new ApiError({ code: 'X', message: 'Please try later', requestId: 'req-1' });
    render(<ErrorState error={error} onRetry={onRetry} />);
    expect(screen.getByText('Please try later')).toBeInTheDocument();
    expect(screen.getByText('REF: req-1')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'TRY_AGAIN' }));
    expect(onRetry).toHaveBeenCalled();
  });

  it('hides the text of unexpected errors', () => {
    render(<ErrorState error={new Error('database password is hunter2')} />);
    expect(screen.queryByText(/hunter2/)).not.toBeInTheDocument();
    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });
});

describe('Modal', () => {
  it('is named by its title and closes with Escape or a click on the backdrop', () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Specs"><button type="button">Inner</button></Modal>);
    const dialog = screen.getByRole('dialog', { name: 'Specs' });
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.mouseDown(dialog);
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.mouseDown(dialog.parentElement);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('renders nothing while closed', () => {
    render(<Modal open={false} onClose={() => {}} title="Hidden" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
