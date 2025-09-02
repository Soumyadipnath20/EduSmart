// @ts-nocheck
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileDown, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialAttendanceData = [
  { id: 'S001', name: 'Alice Johnson', course: 'CS101', date: '2024-05-20', status: 'Present' },
  { id: 'S002', name: 'Bob Williams', course: 'CS101', date: '2024-05-20', status: 'Present' },
  { id: 'S003', name: 'Charlie Brown', course: 'CS101', date: '2024-05-20', status: 'Absent' },
  { id: 'S004', name: 'Diana Miller', course: 'MATH203', date: '2024-05-20', status: 'Present' },
  { id: 'S001', name: 'Alice Johnson', course: 'MATH203', date: '2024-05-20', status: 'Present' },
  { id: 'S005', name: 'Ethan Davis', course: 'CS101', date: '2024-05-19', status: 'Present' },
  { id: 'S002', name: 'Bob Williams', course: 'CS101', date: '2024-05-19', status: 'Excused' },
];

export default function AdminAttendancePage() {
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...attendanceData];
    updatedData[index].status = newStatus;
    setAttendanceData(updatedData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>View and manage student attendance.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or course..." className="pl-8" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.id}</TableCell>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.course}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Select
                    value={record.status}
                    onValueChange={(newStatus) => handleStatusChange(index, newStatus)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue>
                         <Badge variant={
                          record.status === 'Present' ? 'default' : record.status === 'Absent' ? 'destructive' : 'secondary'
                         } className={record.status === 'Present' ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}>
                          {record.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Present">Present</SelectItem>
                      <SelectItem value="Absent">Absent</SelectItem>
                      <SelectItem value="Excused">Excused</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}