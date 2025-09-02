import type { ReactNode } from 'react';
import { AppLayout } from '@/components/app-layout';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AppLayout userType="admin">{children}</AppLayout>;
}
