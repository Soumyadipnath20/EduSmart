import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  Bot,
  CalendarDays,
  Upload,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { AppLayout } from '@/components/app-layout';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/attendance', label: 'Attendance', icon: ClipboardCheck },
  { href: '/admin/curriculum', label: 'Curriculum AI', icon: Bot },
  { href: '/admin/alumni', label: 'Alumni Network', icon: Users },
  { href: '/admin/meetings', label: 'Meetings', icon: CalendarDays },
  { href: '/admin/notes', label: 'Notes Manager', icon: Upload },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AppLayout navItems={adminNavItems}>{children}</AppLayout>;
}
