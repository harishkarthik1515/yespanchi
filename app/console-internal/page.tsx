import type { Metadata } from 'next';
import { AdminApp } from '@/components/admin/AdminApp';

// Reached only through the secret ADMIN_PATH rewrite in middleware.ts.
export const metadata: Metadata = {
  title: { absolute: 'YesPanchi Console' },
  robots: { index: false, follow: false, nocache: true }
};
export const dynamic = 'force-dynamic';

export default function ConsolePage() {
  return <AdminApp />;
}
