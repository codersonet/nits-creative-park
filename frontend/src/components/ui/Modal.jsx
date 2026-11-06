/**
 * Modal.jsx
 * What:  An accessible pop-up dialog in the old .modal-overlay look. Closes with the X button,
 *        the Escape key or a click outside. Keeps keyboard focus inside while open.
 * Used by: ProjectModal
 * Talks to: react-dom (portal), utils/class-names.js
 */
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/utils/class-names.js';

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

// "open" shows the dialog. "onClose" is called for every way of closing it.
export default function Modal({ open, onClose, eyebrow, title, children }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Adds the "active" class one frame after mounting, so the fade-in transition has a start state.
  useEffect(() => {
    if (!open) {
      setVisible(false);
      return undefined;
    }
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // While open: lock page scrolling, move focus into the dialog, and give focus back on close.
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector(FOCUSABLE)?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  // Escape closes. Tab and Shift+Tab loop inside the dialog instead of leaving it.
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // Only a click on the dark backdrop itself closes the dialog, not a click inside it.
  function handleBackdropMouseDown(event) {
    if (event.target === event.currentTarget) onClose();
  }

  return createPortal(
    <div
      className={cx('modal-overlay', visible && 'active')}
      role="presentation"
      onMouseDown={handleBackdropMouseDown}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={dialogRef}
        className="glass-card modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
          &times;
        </button>
        {eyebrow && <span className="label-mono">{eyebrow}</span>}
        <h2 className="headline-lg" id={titleId}>
          {title}
        </h2>
        {children}
      </div>
    </div>,
    document.body,
  );
}
