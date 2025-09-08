'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}{' '}
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          // Default toast
          style: {
            fontSize: '14px',
            borderRadius: '0.5rem',
            padding: '12px 16px',
            backgroundColor: 'oklch(0.985 0 0)',
            color: 'oklch(0.21 0.006 285.885)',
            border: '1px solid oklch(0.92 0.004 286.32)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          },
          success: {
            duration: 3000,
            style: {
              backgroundColor: 'oklch(0.64 0.21 150)',
              color: 'oklch(0.98 0.016 73.684)',
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: 'oklch(0.6 0.23 25)',
              color: 'oklch(0.985 0 0)',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
