import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Video } from 'lucide-react';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here's what's happening today. Let's make it a great one!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Classes & Meetings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                            <p className="font-semibold">CS101: Intro to Programming</p>
                            <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM | Room 404</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                    </div>
                     <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                            <p className="font-semibold">Project Group Sync</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2"><Video className="h-4 w-4 text-blue-500" /> 02:00 PM | Zoom</p>
                        </div>
                        <Button size="sm">Join Now</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5"/>Announcements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <p className="font-medium">Mid-term exam schedule released.</p>
                        <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                    </div>
                    <div>
                        <p className="font-medium">Library hours extended for finals week.</p>
                        <p className="text-xs text-muted-foreground">Posted 1 day ago</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
