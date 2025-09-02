import Link from 'next/link';
import { ArrowRight, GraduationCap, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Icons.logo className="h-7 w-7 text-primary" />
            <span>EduSmart Hub</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            The Future of Academic Management
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            An integrated platform for smart curriculum, attendance, alumni networking, and more. All in one place.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#portals">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="portals" className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Portal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/student" className="block h-full">
              <Card className="hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Student Portal</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Access your courses, track attendance, manage notes, and connect with peers and alumni. Your academic journey, simplified.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin" className="block h-full">
              <Card className="hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <UserCog className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Admin Portal</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Manage attendance, analyze curriculum data with AI, engage the alumni network, and oversee all academic activities.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} EduSmart Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
