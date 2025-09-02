import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const alumniData = [
  { name: 'Dr. Evelyn Reed', graduationYear: 2005, field: 'Computer Science', occupation: 'AI Researcher at Google' },
  { name: 'Marcus Chen', graduationYear: 2012, field: 'Business Administration', occupation: 'Founder & CEO of Innovate Inc.' },
  { name: 'Sofia Rodriguez', graduationYear: 2018, field: 'Bio-Engineering', occupation: 'Lead Scientist at Genentech' },
  { name: 'David Lee', graduationYear: 2010, field: 'Fine Arts', occupation: 'Art Director at Pixar' },
  { name: 'Hannah Kim', graduationYear: 2020, field: 'Journalism', occupation: 'Investigative Reporter at NYT' },
];

const forumPosts = [
    { author: 'Marcus Chen', content: 'Excited to announce our Series B funding round! Looking for talented software engineers to join our team.', time: '2h ago' },
    { author: 'Sofia Rodriguez', content: 'Anyone attending the annual Bio-Engineering conference next month in San Diego?', time: '1d ago' },
];

export default function AdminAlumniPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Alumni Directory</CardTitle>
                <CardDescription>Search and manage the alumni network.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Alumni
                </Button>
              </div>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search alumni..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Graduation Year</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Occupation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alumniData.map((alumnus) => (
                  <TableRow key={alumnus.name}>
                    <TableCell className="font-medium">{alumnus.name}</TableCell>
                    <TableCell>{alumnus.graduationYear}</TableCell>
                    <TableCell>{alumnus.field}</TableCell>
                    <TableCell>{alumnus.occupation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4">
                <Image data-ai-hint="conference meeting" src="https://picsum.photos/400/250" alt="Alumni Mixer" width={150} height={94} className="rounded-lg object-cover" />
                <div>
                    <h3 className="font-semibold">Annual Alumni Mixer</h3>
                    <p className="text-sm text-muted-foreground">June 15, 2024</p>
                    <Button variant="link" className="p-0 h-auto">View Details</Button>
                </div>
            </div>
            <Button className="w-full" variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Create Event</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forum Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {forumPosts.map((post, i) => (
              <div key={i}>
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/40?u=${post.author}`} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <p className="font-semibold">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                        <p className="text-sm">{post.content}</p>
                    </div>
                </div>
                {i < forumPosts.length - 1 && <Separator className="my-4"/>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
