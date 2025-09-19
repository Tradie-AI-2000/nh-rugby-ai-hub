'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, ArrowRight, FileText, BarChart, Calendar, PenSquare } from 'lucide-react';
import Image from 'next/image';

// Mock data for user's custom agents
const agents = [
  {
    id: 'report-summarizer',
    title: 'Weekly Sales Report Summarizer',
    description: 'Upload your weekly sales CSV and this agent will generate a concise, bullet-pointed summary highlighting key trends, top performers, and areas for concern.',
    icon: <BarChart className="h-10 w-10 text-blue-500" />,
  },
  {
    id: 'meeting-preparer',
    title: 'Client Meeting Prep Agent',
    description: 'Provide a client\'s name and this agent will scour internal documents and the web to create a one-page briefing document for your next meeting.',
    icon: <FileText className="h-10 w-10 text-green-500" />,
  },
  {
    id: 'calendar-optimizer',
    title: 'Calendar Scheduling Assistant',
    description: 'This agent helps you find the optimal time for a meeting with multiple internal and external stakeholders, avoiding endless email chains.',
    icon: <Calendar className="h-10 w-10 text-purple-500" />,
  },
   {
    id: 'marketing-agent',
    title: 'Marketing Agent',
    description: 'This agent helps generate marketing copy, social media posts, and brainstorms campaign ideas based on your objectives.',
    icon: <PenSquare className="h-10 w-10 text-pink-500" />,
  },
  {
    id: 'vertex-ai-agent',
    title: 'Vertex AI Agent',
    description: 'Interact directly with a custom agent built and hosted on Google Cloud\'s Vertex AI Agent Builder.',
    icon: <Bot className="h-10 w-10 text-teal-500" />,
  },
];

export default function MyAgentsPage() {
  return (
    <div className="py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">My Automations</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your personal library of custom AI Automations for your business, the background stuff!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <Card key={agent.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
                {agent.icon}
              <CardTitle>{agent.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{agent.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/my-agents/${agent.id}`} className="w-full">
                <Button className="w-full">
                  Use Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
         {/* Placeholder card for adding a new agent */}
        <Card className="flex flex-col items-center justify-center border-2 border-dashed bg-muted hover:border-primary transition-colors">
            <CardHeader className="text-center">
                 <Bot className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <CardTitle>Request a New Agent</CardTitle>
            </CardHeader>
             <CardContent>
                <p className="text-center text-muted-foreground">Have an idea for a new automation? Contact us to get it built.</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline">Contact Development</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
