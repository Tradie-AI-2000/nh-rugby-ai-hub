'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Video, Calendar, BookOpen, ExternalLink, Lightbulb } from 'lucide-react';

// Data for on-demand courses
const onDemandCourses = [
  {
    title: 'AI Fundamentals for Business',
    description: 'Understand the basics of AI, machine learning, and how they apply to the wholesale industry. No technical background required.',
    level: 'Beginner',
    duration: '45 mins',
    icon: <Lightbulb className="h-8 w-8 text-blue-500" />,
  },
  {
    title: 'Mastering Basic Prompting',
    description: 'Learn the art and science of writing effective prompts to get the results you want from tools like ChatGPT.',
    level: 'Beginner',
    duration: '1 hour',
    icon: <Video className="h-8 w-8 text-green-500" />,
  },
  {
    title: 'Advanced Prompting Techniques',
    description: 'Dive deeper into context engineering, chain-of-thought prompting, and creating personas for the AI.',
    level: 'Intermediate',
    duration: '1.5 hours',
    icon: <Video className="h-8 w-8 text-yellow-500" />,
  },
];

// Data for upcoming workshops
const upcomingWorkshops = [
  {
    title: 'AI for Sales Reps: Automating Your Week',
    date: 'October 15, 2025 - 10:00 AM NZST',
    description: 'A hands-on session for our field sales team on using AI for route planning, email automation, and meeting prep.',
    platform: 'Microsoft Teams',
    detailsUrl: '/dashboard/training/sales-workshop', 
  },
  {
    title: 'Management Masterclass: AI Strategy & Governance',
    date: 'October 22, 2025 - 2:00 PM NZST',
    description: 'A workshop for GMs and Managers on interpreting AI reports, identifying automation opportunities, and managing risk.',
    platform: 'In-Person (Auckland Office)',
    detailsUrl: '/dashboard/training/management-masterclass', 
  },
];

export default function TrainingPage() {
  return (
    <div className="py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gradient">Training & Workshops</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Upskill yourself with our curated courses and live sessions.
        </p>
      </header>

      {/* On-Demand Courses Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-2">On-Demand Courses</h2>
        <p className="text-muted-foreground mb-8">Learn at your own pace with these essential training modules.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {onDemandCourses.map((course) => (
            <Card key={course.title} className="flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4">
                {course.icon}
                <div>
                  <CardTitle>{course.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{course.level}</Badge>
                    <Badge variant="secondary">{course.duration}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{course.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Video className="mr-2 h-4 w-4" /> Start Course
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Upcoming Live Workshops Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-2">Upcoming Live Workshops</h2>
        <p className="text-muted-foreground mb-8">Join our live, interactive sessions to learn from experts and ask questions.</p>
        <div className="space-y-6">
          {upcomingWorkshops.map((workshop) => (
            <Card key={workshop.title} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{workshop.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{workshop.date}</span>
                    <span className="text-gray-400">•</span>
                    <span>{workshop.platform}</span>
                  </div>
                  <p className="mt-2 max-w-2xl">{workshop.description}</p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 mt-4 md:mt-0 md:ml-4">
                  <a href={workshop.detailsUrl}>
                    <Button variant="outline" className="w-full">See Details</Button>
                  </a>
                  <Button className="w-full">
                    Register Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Additional Resources Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-2">Additional Resources</h2>
        <p className="text-muted-foreground mb-8">Continue your learning journey with these external links.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-4 flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Our AI Guidelines</h3>
              <p className="text-sm text-muted-foreground">Revisit the company guidelines on AI usage.</p>
            </div>
            <a href="/dashboard/ai-playbook" className="ml-auto">
              <Button variant="outline" size="sm">
                View <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Prompt Library</h3>
              <p className="text-sm text-muted-foreground">Get inspired with pre-built prompts.</p>
            </div>
            <a href="/dashboard/prompt-library" className="ml-auto">
              <Button variant="outline" size="sm">
                View <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </Card>
        </div>
      </section>
    </div>
  );
}