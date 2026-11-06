/**
 * main.jsx
 * What:  The entry point. Loads the styles, then starts React with the data cache,
 *        the page-title manager and the router around the app.
 * Used by: index.html (the <script type="module"> tag)
 * Talks to: global.css, App.jsx, utils/query-client.js, constants/env.js
 */
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ROUTER_BASENAME } from '@/constants/env.js';
import '@/styles/global.css';
import { queryClient } from '@/utils/query-client.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={ROUTER_BASENAME}>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);
