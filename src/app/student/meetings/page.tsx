import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Video } from 'lucide-react';

const meetingsData = [
  { title: 'Project Group Sync (CS101)', date: '2024-05-22', time: '02:00 PM', platform: 'Zoom', status: 'Upcoming' },
  { title: 'Career Advising Session', date: '2024-05-23', time: '11:00 AM', platform: 'Google Meet', status: 'Upcoming' },
  { title: 'Study Group - MATH203', date: '2024-05-19', time: '04:00 PM', platform: 'Google Meet', status: 'Completed' },
  { title: 'Lab Partner Meeting (PHYS301)', date: '2024-05-16', time: '01:00 PM', platform: 'Zoom', status: 'Completed' },
];

export default function StudentMeetingsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>My Meetings</CardTitle>
            <CardDescription>Keep track of your scheduled meetings and study groups.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetingsData.map((meeting) => (
              <TableRow key={meeting.title}>
                <TableCell className="font-medium">{meeting.title}</TableCell>
                <TableCell>{meeting.date} at {meeting.time}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {meeting.platform === 'Zoom' ? <Video className="h-4 w-4 text-blue-500" /> : <Calendar className="h-4 w-4 text-green-500" />}
                        {meeting.platform}
                    </div>
                </TableCell>
                <TableCell>
                  <Badge variant={meeting.status === 'Upcoming' ? 'secondary' : 'outline'}>
                    {meeting.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="default" size="sm" disabled={meeting.status !== 'Upcoming'}>
                    Join
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
