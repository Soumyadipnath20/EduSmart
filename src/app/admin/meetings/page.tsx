import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, PlusCircle, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const meetingsData = [
  { title: 'CS Dept. Curriculum Review', date: '2024-05-22', time: '10:00 AM', platform: 'Zoom', status: 'Upcoming' },
  { title: 'Alumni Committee Sync', date: '2024-05-24', time: '02:00 PM', platform: 'Google Meet', status: 'Upcoming' },
  { title: 'Faculty All-Hands', date: '2024-05-18', time: '09:00 AM', platform: 'Zoom', status: 'Completed' },
  { title: 'Admissions Strategy Session', date: '2024-05-15', time: '11:00 AM', platform: 'Google Meet', status: 'Completed' },
];

export default function AdminMeetingsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Meeting Scheduler</CardTitle>
            <CardDescription>Arrange and manage online meetings.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule a New Meeting</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" placeholder="e.g., Weekly Sync" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">Time</Label>
                  <Input id="time" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">Platform</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="google-meet">Google Meet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Meeting</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              <TableHead>Action</TableHead>
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
                <TableCell>
                  <Button variant="outline" size="sm" disabled={meeting.status !== 'Upcoming'}>
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
