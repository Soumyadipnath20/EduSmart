import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, QrCode } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const attendanceByCourse = [
    { course: 'CS101: Intro to Programming', percentage: 95 },
    { course: 'MATH203: Advanced Calculus', percentage: 100 },
    { course: 'ENGL101: English Composition', percentage: 75 },
    { course: 'PHYS301: Modern Physics', percentage: 88 },
];

export default function StudentAttendancePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Attendance Check-in</CardTitle>
            <CardDescription>Scan the QR code to mark your attendance for the current class.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center gap-4">
            <div className="p-4 bg-white rounded-lg border shadow-sm">
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
            <CardTitle>My Attendance Summary</CardTitle>
            <CardDescription>Your attendance percentage for each course this semester.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {attendanceByCourse.map((item) => (
                <div key={item.course}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-base">{item.course}</p>
                    <p className="text-sm font-bold text-foreground">{item.percentage}%</p>
                  </div>
                  <Progress value={item.percentage} className="h-3" />
                  <p className='text-xs text-muted-foreground mt-1'>
                    {item.percentage > 90 ? 'Excellent!' : item.percentage > 80 ? 'Good, keep it up.' : 'Needs improvement.'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
