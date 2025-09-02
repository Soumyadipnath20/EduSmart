import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, QrCode } from 'lucide-react';

const attendanceHistory = [
  { course: 'CS101', date: '2024-05-20', status: 'Present' },
  { course: 'MATH203', date: '2024-05-20', status: 'Present' },
  { course: 'CS101', date: '2024-05-18', status: 'Present' },
  { course: 'ENGL101', date: '2024-05-17', status: 'Absent' },
];

export default function StudentAttendancePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Attendance Check-in</CardTitle>
            <CardDescription>Scan the QR code to mark your attendance for the current class.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center gap-4">
            <div className="p-4 bg-white rounded-lg border">
                <Image data-ai-hint="qr code" src="https://picsum.photos/256/256" alt="QR Code" width={256} height={256} />
            </div>
            <Button size="lg" className="w-full">
              <QrCode className="mr-2 h-5 w-5" />
              Scan QR Code
            </Button>
             <p className="text-sm text-green-600 font-medium flex items-center gap-2"><Check className="h-4 w-4" /> Checked in for CS101 at 10:02 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceHistory.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-semibold">{item.course}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <Badge variant={item.status === 'Present' ? 'default' : 'destructive'} className={item.status === 'Present' ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
