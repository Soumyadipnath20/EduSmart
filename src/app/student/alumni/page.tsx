import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const alumniData = [
  { name: 'Dr. Evelyn Reed', graduationYear: 2005, field: 'Computer Science', occupation: 'AI Researcher at Google', avatar: 'https://i.pravatar.cc/150?u=a' },
  { name: 'Marcus Chen', graduationYear: 2012, field: 'Business Administration', occupation: 'Founder & CEO of Innovate Inc.', avatar: 'https://i.pravatar.cc/150?u=b' },
  { name: 'Sofia Rodriguez', graduationYear: 2018, field: 'Bio-Engineering', occupation: 'Lead Scientist at Genentech', avatar: 'https://i.pravatar.cc/150?u=c' },
  { name: 'David Lee', graduationYear: 2010, field: 'Fine Arts', occupation: 'Art Director at Pixar', avatar: 'https://i.pravatar.cc/150?u=d' },
];

const forumPosts = [
    { author: 'Marcus Chen', content: 'Excited to announce our Series B funding round! Looking for talented software engineers to join our team.', time: '2h ago' },
    { author: 'Sofia Rodriguez', content: 'Anyone attending the annual Bio-Engineering conference next month in San Diego?', time: '1d ago' },
];

export default function StudentAlumniPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Alumni Network</h1>
        <p className="text-muted-foreground">Connect with graduates, discover opportunities, and stay in touch.</p>
      </div>
      
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search alumni by name, field, or company..." className="pl-10 h-12 text-base" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {alumniData.map(alumnus => (
            <Card key={alumnus.name} className="text-center">
                <CardContent className="pt-6 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={alumnus.avatar} />
                        <AvatarFallback>{alumnus.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{alumnus.name}</h3>
                    <p className="text-sm text-muted-foreground">{alumnus.occupation}</p>
                    <p className="text-xs text-muted-foreground mt-2">{alumnus.field} '{alumnus.graduationYear % 100}</p>
                    <Button variant="outline" className="mt-4 w-full">Connect</Button>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Forum</CardTitle>
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
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
                <Image data-ai-hint="conference meeting" src="https://picsum.photos/400/250" alt="Alumni Mixer" width={400} height={250} className="rounded-lg object-cover mb-4" />
                <h3 className="font-semibold">Annual Alumni Mixer</h3>
                <p className="text-sm text-muted-foreground">June 15, 2024</p>
                <Button variant="outline" className="mt-2 w-full">RSVP</Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
