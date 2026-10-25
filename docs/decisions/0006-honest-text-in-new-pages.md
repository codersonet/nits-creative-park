# 0006: Text changed so the pages do not claim things that are not true

**Status:** accepted

## Context
Some old text described features that did not exist. The new pages must not repeat them (mandate Section 13: say clearly what is a placeholder).

## Changes
- **Contact form:** the old page claimed "AES-256-GCM encryption", showed a made-up station IP and "listening" status, and displayed a success message without sending anything. The new page shows "OFFLINE / NOT CONNECTED YET" while placeholder mode is on, and the send button is switched off. When `VITE_USE_MOCK_DATA=false` it sends to `POST /contact-messages` and shows the real result.
- **Metrics page:** "Real-time performance indicators" became "Performance indicators", because the numbers are entered by hand.
- **Event buttons:** "RESERVE_SEAT" and similar buttons only showed a fake alert. They now show "COMING_SOON" until an event has a real link.
- **Uptime panel:** "STABLE (99.2%)" became "99.2%" with the label "GRID POWER UPTIME", because "STABLE" was typed text, not a measured status.

## Consequences
- The pages look almost the same but make fewer promises. When the backend exists, the real values replace these without any wording change.
