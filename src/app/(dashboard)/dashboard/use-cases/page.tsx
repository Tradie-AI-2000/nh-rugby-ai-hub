'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PenSquare, BarChart, MessageSquare, Users, Briefcase, UserCog, FileText, Loader2, Zap, Clock, Wrench } from "lucide-react";
import { getUseCases, firebaseConfig } from '@/lib/firebase';

// Helper to map department names to icons
const departmentIcons: { [key: string]: React.ReactNode } = {
  "Marketing": <PenSquare className="h-8 w-8 text-pink-500" />,
  "Sales": <BarChart className="h-8 w-8 text-red-500" />,
  "Customer Support": <MessageSquare className="h-8 w-8 text-cyan-500" />,
  "Operations": <FileText className="h-8 w-8 text-indigo-500" />,
  "Human Resources": <Users className="h-8 w-8 text-green-500" />,
  "Product Management": <UserCog className="h-8 w-8 text-purple-500" />,
  "Field Operations": <Wrench className="h-8 w-8 text-orange-500" />,
  "Project Management": <Briefcase className="h-8 w-8 text-blue-500" />,
  "default": <Briefcase className="h-8 w-8 text-gray-500" />,
};

const getDepartmentIcon = (department: string) => {
  return departmentIcons[department] || departmentIcons.default;
};

// Mock data to be used as a fallback
const mockUseCases = [
  {
    id: 'mock-1',
    title: "Streamlining Marketing Content Creation",
    department: "Marketing",
    summary: "Reduced content creation time by 30% by using ChatGPT to generate initial drafts for blog posts and social media campaigns.",
    toolUsed: "3rd party tool",
    hoursSaved: 5,
    setupComplexity: "Easy",
    details: {
      task: "Generate a steady stream of engaging content for various channels.",
      problem: "The marketing team spent excessive time on initial drafting, limiting their ability to focus on higher-level strategy and content refinement.",
      solution: "ChatGPT was adopted to produce first drafts of blog posts, social media updates, and email newsletters. The team then edited and refined this output, ensuring it met brand standards.",
    },
  },
  {
    id: 'mock-2',
    title: "Optimizing Sales Outreach",
    department: "Sales",
    summary: "Increased client response rates by 15% using an AI-powered email assistant to personalize outreach emails at scale.",
    toolUsed: "AI Agent",
    hoursSaved: 10,
    setupComplexity: "Medium",
    details: {
      task: "Send personalized emails to a large list of prospective clients.",
      problem: "Manually personalizing hundreds of emails was time-consuming and led to generic messaging, resulting in low engagement.",
      solution: "An AI email assistant was integrated with the CRM to automatically insert personalized details (like company name, role, or recent news) into email templates, allowing for mass-customization.",
    },
  },
  {
    id: 'mock-4',
    title: "Instant Access to Technical Manuals with RAG Agent",
    department: "Field Operations",
    summary: "A custom RAG agent allows field technicians to instantly query thousands of pages of technical manuals via a simple chat interface.",
    toolUsed: "AI Agent",
    hoursSaved: 8,
    setupComplexity: "Hard",
    details: {
      task: "Provide technicians in the field with quick, accurate answers to questions about complex equipment and repair procedures.",
      problem: "Technicians had to manually search through massive PDF manuals on their laptops, which was slow and often impossible without a data connection.",
      solution: "Using the Google ADK agent platform, TradieAI built a custom RAG agent. All technical manuals were ingested into a vector database, allowing technicians to ask natural language questions and get instant, precise answers.",
    },
  },
  {
    id: 'mock-5',
    title: "Automated Social Media Content Calendar",
    department: "Marketing",
    summary: "A custom social media agent now generates a full week's worth of relevant, brand-aligned content and images for review.",
    toolUsed: "AI Agent",
    hoursSaved: 6,
    setupComplexity: "Medium",
    details: {
      task: "Create and schedule a consistent stream of content for LinkedIn, Facebook, and Instagram.",
      problem: "The marketing team struggled to consistently create fresh content, leading to gaps in the content calendar and a reactive, last-minute workflow.",
      solution: "TradieAI built a content generation agent using the Google ADK agent platform. The agent is connected to our blog's RSS feed and industry news sites. Each morning, it generates three new post suggestions (with accompanying images) for review.",
    },
  },
  {
    id: 'mock-6',
    title: "Centralized Project Updates with Custom CMS",
    department: "Project Management",
    summary: "A new internal CMS was developed to track project milestones, replacing a complex system of spreadsheets and email chains.",
    toolUsed: "other",
    hoursSaved: 5,
    setupComplexity: "Hard",
    details: {
      task: "Keep all stakeholders informed about the status of multiple ongoing projects.",
      problem: "Project information was scattered across emails, chat messages, and various spreadsheets. There was no single source of truth, leading to confusion and missed updates.",
      solution: "A custom, lightweight Content Management System (CMS) was built to serve as a central hub for all projects. Project managers now update the status in one place, and an automated daily digest is emailed to all relevant stakeholders.",
    },
  },
  {
    id: 'mock-3',
    title: "Enhancing Customer Support Responses",
    department: "Customer Support",
    summary: "Improved first-response time by 50% by implementing an AI system to categorize tickets and suggest answers for common questions.",
    toolUsed: "3rd party tool",
    hoursSaved: 4,
    setupComplexity: "Easy",
    details: {
      task: "Respond to customer queries quickly and accurately.",
      problem: "Agents were spending too much time on repetitive, simple questions and manually categorizing tickets, delaying responses to more complex issues.",
      solution: "A system was built using Zendesk AI to auto-categorize incoming tickets. For common issues, it provides agents with pre-written, AI-suggested answers that they can quickly verify and send.",
    },
  },
];

interface UseCase {
  id: string;
  title: string;
  department: string;
  summary: string;
  toolUsed: string;
  hoursSaved?: number;
  setupComplexity: string;
  details: {
    task: string;
    problem: string;
    solution: string;
  };
}

export default function UseCasesPage() {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  useEffect(() => {
    async function loadUseCases() {
      setIsLoading(true);
      if (firebaseConfig.apiKey === 'YOUR_API_KEY') {
        console.log("Firebase not configured, using mock data.");
        setUseCases(mockUseCases);
        setIsLoading(false);
        return;
      }

      try {
        const fetchedUseCases = await getUseCases();
        if (fetchedUseCases && fetchedUseCases.length > 0) {
          setUseCases(fetchedUseCases as any as UseCase[]);
        } else {
          setUseCases(mockUseCases);
        }
      } catch (error) {
        console.error("Failed to fetch use cases from Firestore, falling back to mock data.", error);
        setUseCases(mockUseCases);
      }
      setIsLoading(false);
    }
    loadUseCases();
  }, []);

  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-gradient">Use Cases</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover how teams at NH Rugby are leveraging AI for success.
        </p>
      </header>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : useCases.length === 0 ? (
          <p className="text-center text-muted-foreground">No use cases have been submitted yet. Be the first!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <Card 
                key={useCase.id} 
                className="flex flex-col cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                onClick={() => setSelectedUseCase(useCase)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    {getDepartmentIcon(useCase.department)}
                    <Badge variant="outline">{useCase.department}</Badge>
                  </div>
                  <CardTitle className="text-xl pt-4">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{useCase.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedUseCase && (
        <Dialog open={selectedUseCase !== null} onOpenChange={() => setSelectedUseCase(null)}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-3xl">{selectedUseCase.title}</DialogTitle>
              <DialogDescription>{selectedUseCase.department}</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <p className="text-lg font-semibold bg-muted/50 p-4 rounded-lg">{selectedUseCase.summary}</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="border rounded-lg p-2">
                      <h4 className="font-bold text-sm">Tool Type</h4>
                      <p className="text-muted-foreground flex items-center justify-center gap-1"><Zap className="h-4 w-4"/> {selectedUseCase.toolUsed}</p>
                  </div>
                  <div className="border rounded-lg p-2">
                      <h4 className="font-bold text-sm">Hours Saved / Week</h4>
                      <p className="text-muted-foreground flex items-center justify-center gap-1"><Clock className="h-4 w-4"/> {selectedUseCase.hoursSaved || 'N/A'}</p>
                  </div>
                  <div className="border rounded-lg p-2">
                      <h4 className="font-bold text-sm">Setup Complexity</h4>
                      <p className="text-muted-foreground flex items-center justify-center gap-1"><Wrench className="h-4 w-4"/> {selectedUseCase.setupComplexity}</p>
                  </div>
              </div>

              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-bold text-foreground text-lg">The Task</h4>
                  <p>{selectedUseCase.details.task}</p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">The Problem</h4>
                  <p>{selectedUseCase.details.problem}</p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">The Solution</h4>
                  <p>{selectedUseCase.details.solution}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}