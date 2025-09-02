import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, BookOpen, Bot } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Students',
      value: '1,250',
      icon: Users,
      change: '+12 since last month',
    },
    {
      title: 'Attendance Rate',
      value: '92.5%',
      icon: CheckCircle,
      change: '-0.5% vs last week',
      color: 'text-red-500'
    },
    {
      title: 'Courses Active',
      value: '48',
      icon: BookOpen,
      change: '+2 new courses',
    },
    {
      title: 'AI Analyses Ran',
      value: '15',
      icon: Bot,
      change: '+5 this week',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Recent activity feed coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
