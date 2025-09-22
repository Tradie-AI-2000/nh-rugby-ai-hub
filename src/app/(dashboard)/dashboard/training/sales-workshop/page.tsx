'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Laptop, Users, Target, CheckCircle } from 'lucide-react';

const workshopDetails = {
  title: 'AI for Sales Reps: Automating Your Week',
  date: 'October 15, 2025',
  time: '10:00 AM - 12:00 PM NZST',
  location: 'Microsoft Teams (Online)',
  instructor: 'Joe Ward (TradieAI)',
  audience: 'Field Sales Reps, Sales & Marketing Managers',
  overview: 'This is a highly practical, hands-on workshop designed for the d3 sales team. We will move beyond theory and dive directly into using AI tools to automate daily tasks, save significant time, and allow you to focus on what you do best: building relationships and selling. You will leave this session with actionable workflows you can implement immediately.'
};

const agenda = [
  { time: '10:00 AM', topic: 'Introduction: The AI-Powered Sales Rep' },
  { time: '10:15 AM', topic: 'Module 1: Smart Prospecting & Meeting Prep' },
  { time: '10:45 AM', topic: 'Module 2: Automating Email Outreach & Follow-ups' },
  { time: '11:15 AM', topic: 'Module 3: AI for Route Optimization & Reporting' },
  { time: '11:45 AM', topic: 'Q&A and Building Your Personal AI Workflow' },
];

const learningObjectives = [
  'Automate the drafting of at least 5 common types of sales emails.',
  'Reduce client meeting preparation time by up to 30% using AI for research.',
  'Use an AI tool to generate the most efficient travel route for a day of client visits.',
  'Instantly summarize weekly sales data into key bullet points for reporting.',
  'Confidently apply prompts from the company library to solve real-world sales challenges.',
];

export default function SalesWorkshopDetailPage() {
  return (
    <div className="py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{workshopDetails.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mt-4 text-lg">
          <div className="flex items-center gap-2"><Calendar className="h-5 w-5" /> {workshopDetails.date}</div>
          <div className="flex items-center gap-2"><Clock className="h-5 w-5" /> {workshopDetails.time}</div>
          <div className="flex items-center gap-2"><Laptop className="h-5 w-5" /> {workshopDetails.location}</div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Workshop Overview</h2>
                <p className="text-lg leading-relaxed">{workshopDetails.overview}</p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
                <h2 className="text-3xl font-semibold mb-6">Workshop Agenda</h2>
                <div className="space-y-4">
                    {agenda.map(item => (
                        <div key={item.time} className="flex items-center">
                            <div className="font-bold text-primary w-28">{item.time}</div>
                            <div className="border-l-2 border-primary/20 pl-4">
                                <p>{item.topic}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Key Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                        <Target className="h-5 w-5 mt-1 text-primary" />
                        <div><strong>Instructor:</strong><br/>{workshopDetails.instructor}</div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 mt-1 text-primary" />
                        <div><strong>Who Should Attend:</strong><br/>{workshopDetails.audience}</div>
                    </div>
                     <Button className="w-full mt-4">Register Now</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {learningObjectives.map(objective => (
                           <li key={objective} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
                                <span>{objective}</span>
                           </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}