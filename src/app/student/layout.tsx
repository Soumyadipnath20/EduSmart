import {
  LayoutDashboard,
  CheckCircle,
  BookOpen,
  Users,
  CalendarDays,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { AppLayout } from '@/components/app-layout';

const studentNavItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/attendance', label: 'Attendance', icon: CheckCircle },
  { href: '/student/notes', label: 'My Notes', icon: BookOpen },
  { href: '/student/alumni', label: 'Alumni Network', icon: Users },
  { href: '/student/meetings', label: 'My Meetings', icon: CalendarDays },
];

export default function StudentLayout({ children }: { children: ReactNode }) {
  return <AppLayout navItems={studentNavItems}>{children}</AppLayout>;
}
