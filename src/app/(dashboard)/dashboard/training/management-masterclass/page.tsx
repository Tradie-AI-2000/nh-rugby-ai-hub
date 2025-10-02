'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Users, Target, CheckCircle } from 'lucide-react';

const workshopDetails = {
  title: 'Management Masterclass: AI Strategy & Governance',
  date: 'October 22, 2025',
  time: '2:00 PM - 4:00 PM NZST',
  location: 'Auckland Office - Boardroom A',
  instructor: 'Joe Ward (TradieAI)',
  audience: 'General Managers, Sales & Marketing Managers, Team Leads',
  overview: 'This intensive two-hour masterclass is designed specifically for the leadership team at NH Rugby. It moves beyond the hype of AI and focuses on the practical application of AI strategy, risk management, and governance. The session will equip you with the frameworks needed to lead your teams, identify high-impact automation opportunities, and measure the ROI of our AI initiatives.'
};

const agenda = [
  { time: '2:00 PM', topic: 'Welcome & The State of AI in FMCG' },
  { time: '2:15 PM', topic: 'Decoding Our AI Strategy: A Deep Dive into the Roadmap & KPIs' },
  { time: '2:45 PM', topic: 'Identifying High-Value Opportunities: A Practical Framework' },
  { time: '3:15 PM', topic: 'Governance & Risk: Protecting Our Data, Brand, and People' },
  { time: '3:45 PM', topic: 'Leading the Change: Q&A and Action Planning' },
];

const learningObjectives = [
  'Confidently interpret the company\'s AI Strategy and Roadmap.',
  'Apply a structured framework to identify and prioritize AI automation projects within your department.',
  'Understand the key principles of AI governance, including data privacy and ethical usage.',
  'Effectively measure and report on the impact of AI within your team.',
  'Lead discussions on AI adoption and address common concerns from your team members.',
];

export default function WorkshopDetailPage() {
  return (
    <div className="py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{workshopDetails.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mt-4 text-lg">
          <div className="flex items-center gap-2"><Calendar className="h-5 w-5" /> {workshopDetails.date}</div>
          <div className="flex items-center gap-2"><Clock className="h-5 w-5" /> {workshopDetails.time}</div>
          <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /> {workshopDetails.location}</div>
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