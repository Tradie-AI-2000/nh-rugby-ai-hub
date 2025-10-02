'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Wrench, Lightbulb, User, CheckCircle, Star, BrainCircuit, GraduationCap, BotIcon, ChartBarIcon } from 'lucide-react';

// Mock user data - in a real app, this would come from an authentication context
const userName = "Adrian"; // Placeholder for the logged-in user's name

const toolkitCards = [
    {
        icon: <User className="h-8 w-8 text-purple-500" />,
        title: "My AI",
        description: "Your personal space to track your progress, save your favorite prompts, log wins, and get direct support.",
        href: "/dashboard/your-ai-report",
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-cyan-500" />,
        title: "AI Audit",
        description: "The starting point of our journey. This questionnaire helps us identify key automation opportunities in your daily workflows.",
        href: "/dashboard/process-analyser",
    },
    {
        icon: <BotIcon className="h-8 w-8 text-cyan-500" />,
        title: "My Agents",
        description: "Your personal library of custom AI agents, ready to automate your tasks.",
        href: "/dashboard/my-agents",
    },
    {
        icon: <ChartBarIcon className="h-8 w-8 text-indigo-500" />,
        title: "Chatbot",
        description: "Your personal AI companion for quick answers and assistance.",
        href: "/dashboard/chatbot",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-blue-500" />,
        title: "AI Guidelines",
        description: "Your guide to using AI safely and effectively. Understand our core principles and role-specific guidelines.",
        href: "/dashboard/ai-playbook",
    },
    {
        icon: <Wrench className="h-8 w-8 text-green-500" />,
        title: "Tool Directory",
        description: "Discover company-vetted AI tools for every task, from writing emails to analyzing data. See what's approved and ready to use.",
        href: "/dashboard/tool-directory",
    },
     {
        icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
        title: "Prompt Library",
        description: "Learn how to talk to AI. Our library has tutorials and copy-paste examples to make you a pro in no time.",
        href: "/dashboard/prompt-library",
    },
    {
        icon: <GraduationCap className="h-8 w-8 text-orange-500" />,
        title: "Training",
        description: "Access on-demand courses and sign up for live workshops to continuously improve your AI skills.",
        href: "/dashboard/training",
    },
    {
        icon: <Star className="h-8 w-8 text-pink-500" />,
        title: "Use Cases",
        description: "See how your colleagues are succeeding with AI. Get inspired by real success stories from within the company.",
        href: "/dashboard/use-cases",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
        title: "AI Strategy",
        description: "The high-level management view of our AI roadmap, budget, and key performance indicators (for authorized users).",
        href: "/dashboard/ai-strategy",
    },
    
];


export default function DashboardWelcomePage() {
  return (
    <div className="py-8">
        {/* Welcome Header */}
        <header className="relative mb-16 text-center bg-black text-white py-12 rounded-lg overflow-hidden">
            <div 
              className="absolute inset-0 z-0" 
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Welcome to <span className="text-blue-500">NH Rugby's</span> AI Hub, {userName}!
                </h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    This is your central portal for everything AI at NH Rugby. Let's get started on transforming the way you work.
                </p>
            </div>
        </header>

        {/* Getting Started Section */}
        <section>
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold tracking-tight text-gradient">Your AI Toolkit</h1>
                <p className="mt-2 text-gray-600">An overview of the resources available to you.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {toolkitCards.map((card) => (
                    <Link href={card.href} key={card.title}>
                        <Card className="bg-white border shadow-sm flex flex-col text-center h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
                            <CardHeader className="items-center">
                                {card.icon}
                                <CardTitle className="mt-4 text-xl text-gray-800">{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-gray-600">{card.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>

        {/* Quick Check-in Section */}
        <section className="mt-20 text-center">
             <Card className="max-w-3xl mx-auto p-8 bg-white border shadow-sm">
                <CardHeader>
                    <CheckCircle className="h-10 w-10 mx-auto text-green-500" />
                    <CardTitle className="mt-4 text-2xl text-gray-800">Ready to Track Your Progress?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">
                       Once you start using AI in your daily tasks, head over to your 'My AI' Hub to log your wins, report challenges, and see the real-time impact you're making.
                    </p>
                </CardContent>
                <div className="p-6 pt-0">
                     <a href="/dashboard/your-ai-report">
                        <Button>Go to My AI Hub</Button>
                    </a>
                </div>
            </Card>
        </section>
    </div>
  );
}