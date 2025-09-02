'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Bot,
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  LayoutDashboard,
  Menu,
  Upload,
  Users,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const adminNavItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/attendance', label: 'Attendance', icon: ClipboardCheck },
  { href: '/admin/curriculum', label: 'Curriculum AI', icon: Bot },
  { href: '/admin/alumni', label: 'Alumni Network', icon: Users },
  { href: '/admin/meetings', label: 'Meetings', icon: CalendarDays },
  { href: '/admin/notes', label: 'Notes Manager', icon: Upload },
];

const studentNavItems: NavItem[] = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/attendance', label: 'Attendance', icon: CheckCircle },
  { href: '/student/notes', label: 'My Notes', icon: BookOpen },
  { href: '/student/alumni', label: 'Alumni Network', icon: Users },
  { href: '/student/meetings', label: 'My Meetings', icon: CalendarDays },
];

interface AppLayoutProps {
  userType: 'admin' | 'student';
  children: React.ReactNode;
}

export function AppLayout({ userType, children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const pathname = usePathname();
  const navItems = userType === 'admin' ? adminNavItems : studentNavItems;

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full flex">
        <aside
          className={cn(
            'hidden md:flex flex-col border-r bg-card transition-all duration-300 ease-in-out',
            isSidebarOpen ? 'w-64' : 'w-20'
          )}
        >
          <div className="flex items-center h-16 border-b px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <Icons.logo
                className={cn('h-6 w-6 text-primary', !isSidebarOpen && 'h-8 w-8')}
              />
              {isSidebarOpen && <span>EduSmart Hub</span>}
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map(item => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full flex items-center gap-3',
                        isSidebarOpen ? 'justify-start' : 'justify-center'
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        {isSidebarOpen && <span>{item.label}</span>}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {!isSidebarOpen && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
          <div className="mt-auto p-4">
            <Button
              variant="outline"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </aside>

        <div className="flex flex-col flex-1">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-card px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <div className="flex items-center h-16 border-b px-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg"
                  >
                    <Icons.logo className="h-6 w-6 text-primary" />
                    <span>EduSmart Hub</span>
                  </Link>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                  {navItems.map(item => (
                    <Button
                      key={item.href}
                      asChild
                      variant={pathname === item.href ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex-1">
              <h1 className="font-semibold text-lg">
                {
                  navItems.find(item => pathname.startsWith(item.href))
                    ?.label
                }
              </h1>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
