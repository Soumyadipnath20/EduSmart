import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, PlusCircle, Trash2, UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';

const notesData = [
  { fileName: 'CS101_Lecture1_Intro.pdf', course: 'CS101', uploader: 'Prof. Alan Turing', size: '2.3MB', date: '2024-05-10' },
  { fileName: 'MATH203_Calculus_Notes.docx', course: 'MATH203', uploader: 'Prof. Ada Lovelace', size: '850KB', date: '2024-05-12' },
  { fileName: 'PHYS301_Relativity_Slides.pptx', course: 'PHYS301', uploader: 'Prof. Albert Einstein', size: '5.1MB', date: '2024-05-15' },
  { fileName: 'HIST101_WWII_Summary.pdf', course: 'HIST101', uploader: 'Prof. Winston Churchill', size: '1.2MB', date: '2024-05-18' },
];

export default function AdminNotesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Notes</CardTitle>
          <CardDescription>Upload course materials for students.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Drag & drop files here, or click to select files</p>
            <Input type="file" className="sr-only" />
            <Button variant="outline" className="mt-4">
                <PlusCircle className="h-4 w-4 mr-2"/>
                Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Materials</CardTitle>
          <CardDescription>Manage all uploaded notes and academic materials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Uploader</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notesData.map((note) => (
                <TableRow key={note.fileName}>
                  <TableCell className="font-medium">{note.fileName}</TableCell>
                  <TableCell>{note.course}</TableCell>
                  <TableCell>{note.uploader}</TableCell>
                  <TableCell>{note.size}</TableCell>
                  <TableCell>{note.date}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
