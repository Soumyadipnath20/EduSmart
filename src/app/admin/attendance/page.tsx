// @ts-nocheck
'use client';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileDown, Search, Calendar as CalendarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const initialAttendanceData = [
  { id: 'S001', name: 'Alice Johnson', course: 'CS101', date: '2024-05-22', status: 'Present' },
  { id: 'S002', name: 'Bob Williams', course: 'CS101', date: '2024-05-22', status: 'Present' },
  { id: 'S003', name: 'Charlie Brown', course: 'CS101', date: '2024-05-22', status: 'Absent' },
  { id: 'S004', name: 'Diana Miller', course: 'MATH203', date: '2024-05-22', status: 'Present' },
  { id: 'S001', name: 'Alice Johnson', course: 'MATH203', date: '2024-05-22', status: 'Present' },
  
  { id: 'S005', name: 'Ethan Davis', course: 'CS101', date: '2024-05-21', status: 'Present' },
  { id: 'S002', name: 'Bob Williams', course: 'CS101', date: '2024-05-21', status: 'Excused' },
  { id: 'S006', name: 'Fiona Garcia', course: 'PHYS301', date: '2024-05-21', status: 'Present' },

  { id: 'S001', name: 'Alice Johnson', course: 'CS101', date: '2024-05-20', status: 'Present' },
  { id: 'S002', name: 'Bob Williams', course: 'CS101', date: '2024-05-20', status: 'Present' },
  { id: 'S003', name: 'Charlie Brown', course: 'CS101', date: '2024-05-20', status: 'Absent' },
  { id: 'S004', name: 'Diana Miller', course: 'MATH203', date: '2024-05-20', status: 'Present' },
];

export default function AdminAttendancePage() {
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [filters, setFilters] = useState({
    search: '',
    course: 'all',
    date: null,
  });

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...attendanceData];
    updatedData[index].status = newStatus;
    setAttendanceData(updatedData);
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return attendanceData.filter(record => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = record.name.toLowerCase().includes(searchLower) || record.course.toLowerCase().includes(searchLower);
      const matchesCourse = filters.course === 'all' || record.course === filters.course;
      const matchesDate = !filters.date || record.date === format(filters.date, 'yyyy-MM-dd');
      return matchesSearch && matchesCourse && matchesDate;
    });
  }, [attendanceData, filters]);

  const uniqueCourses = ['all', ...Array.from(new Set(initialAttendanceData.map(r => r.course)))];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>View, manage, and export student attendance.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export as CSV
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or ID..." 
              className="pl-8" 
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <Select value={filters.course} onValueChange={(value) => handleFilterChange('course', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCourses.map(course => (
                <SelectItem key={course} value={course}>{course === 'all' ? 'All Courses' : course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !filters.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date ? format(filters.date, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.date}
                onSelect={(date) => handleFilterChange('date', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
            {filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <TableRow key={`${record.id}-${record.course}-${record.date}`}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell className="font-medium">{record.name}</TableCell>
                  <TableCell>{record.course}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <Select
                      value={record.status}
                      onValueChange={(newStatus) => {
                        const originalIndex = attendanceData.findIndex(
                          r => r.id === record.id && r.course === record.course && r.date === record.date
                        );
                        handleStatusChange(originalIndex, newStatus);
                      }}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue>
                           <Badge variant={
                            record.status === 'Present' ? 'default' : record.status === 'Absent' ? 'destructive' : 'secondary'
                           } className={cn('font-semibold', {
                             'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700': record.status === 'Present',
                             'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700': record.status === 'Absent',
                             'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700': record.status === 'Excused',
                           })}>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
