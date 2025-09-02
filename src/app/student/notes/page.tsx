import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const notesData = [
  { fileName: 'CS101_Lecture1_Intro.pdf', course: 'CS101', uploader: 'Prof. Alan Turing', size: '2.3MB', date: '2024-05-10' },
  { fileName: 'MATH203_Calculus_Notes.docx', course: 'MATH203', uploader: 'Prof. Ada Lovelace', size: '850KB', date: '2024-05-12' },
  { fileName: 'PHYS301_Relativity_Slides.pptx', course: 'PHYS301', uploader: 'Prof. Albert Einstein', size: '5.1MB', date: '2024-05-15' },
  { fileName: 'HIST101_WWII_Summary.pdf', course: 'HIST101', uploader: 'Prof. Winston Churchill', size: '1.2MB', date: '2024-05-18' },
];

export default function StudentNotesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>My Notes & Materials</CardTitle>
            <CardDescription>Access all your course materials in one place.</CardDescription>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by file or course name..." className="pl-8" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notesData.map((note) => (
              <TableRow key={note.fileName}>
                <TableCell className="font-medium">{note.fileName}</TableCell>
                <TableCell>{note.course}</TableCell>
                <TableCell>{note.date}</TableCell>
                <TableCell>{note.size}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
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
