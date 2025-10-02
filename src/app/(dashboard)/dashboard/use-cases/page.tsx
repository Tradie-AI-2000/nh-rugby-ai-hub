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
import { PenSquare, BarChart, MessageSquare, Users, Briefcase, UserCog, FileText, Loader2, Zap, Clock, Wrench, GraduationCap, HeartPulse, DollarSign } from "lucide-react";
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
  "Pro Teams": <Users className="h-8 w-8 text-red-500" />, // Reusing Users icon
  "Performance": <BarChart className="h-8 w-8 text-green-500" />, // Reusing BarChart
  "Academies": <GraduationCap className="h-8 w-8 text-orange-500" />, // New icon
  "Player Welfare": <HeartPulse className="h-8 w-8 text-pink-500" />, // New icon
  "Comms": <MessageSquare className="h-8 w-8 text-cyan-500" />, // Reusing MessageSquare
  "Commercial": <DollarSign className="h-8 w-8 text-green-500" />, // New icon
  "Community Rugby": <Users className="h-8 w-8 text-blue-500" />, // Reusing Users
  "All Staff & Volunteers": <Users className="h-8 w-8 text-purple-500" />, // Reusing Users
  "default": <Briefcase className="h-8 w-8 text-gray-500" />,
};

const getDepartmentIcon = (department: string) => {
  return departmentIcons[department] || departmentIcons.default;
};

const mockUseCases = [
  {
    id: 'nhr-1',
    title: "AI-Powered Match Performance Analysis",
    department: "Pro Teams",
    summary: "Automate the analysis of match footage to track key performance indicators (KPIs) for individual players and the team, identifying tactical patterns and areas for improvement.",
    toolUsed: "AI Agent",
    hoursSaved: 12,
    setupComplexity: "Hard",
    details: {
      task: "Manually review hours of match footage to extract player and team performance data.",
      problem: "Time-consuming, prone to human error, difficult to identify subtle patterns across many games.",
      solution: "An AI agent processes match video, automatically tags events (tackles, passes, rucks), tracks player movements, and generates detailed reports and visualizations of KPIs. LLM provides natural language summaries and actionable insights for coaches.",
    },
  },
  {
    id: 'nhr-2',
    title: "Personalized Player Development & Injury Prevention",
    department: "Academies",
    summary: "Develop AI models to analyze player training data, biomechanics, and historical injury records to create personalized training plans and predict injury risk, optimizing player load and recovery.",
    toolUsed: "AI Agent",
    hoursSaved: 7,
    setupComplexity: "Hard",
    details: {
      task: "Manually track player load, recovery, and create generic training plans. React to injuries rather than proactively prevent them.",
      problem: "Difficulty in tailoring training to individual player needs and proactively identifying injury risks.",
      solution: "An AI agent ingests data from GPS trackers, heart rate monitors, and medical databases. It identifies individual player strengths/weaknesses, predicts injury likelihood based on current load, and suggests personalized training adjustments and recovery protocols.",
    },
  },
  {
    id: 'nhr-3',
    title: "Automated Social Media Content Generation",
    department: "Marketing",
    summary: "Use an AI agent to generate engaging social media posts, match previews, and post-match summaries, tailored to NHR's brand voice and target audience.",
    toolUsed: "AI Agent",
    hoursSaved: 8,
    setupComplexity: "Medium",
    details: {
      task: "Manually write social media content, often under tight deadlines, leading to repetitive messaging.",
      problem: "Time-consuming content creation, difficulty maintaining consistent brand voice, and generating fresh ideas.",
      solution: "An AI agent, fed with NHR's brand guidelines and match data, generates multiple options for social media posts, tweets, and short articles. It can also suggest relevant hashtags and imagery.",
    },
  },
  {
    id: 'nhr-4',
    title: "Fan Engagement Chatbot",
    department: "Comms",
    summary: "Deploy a chatbot on the NHR website or social media to answer common fan questions about match schedules, ticket information, player stats, and club history.",
    toolUsed: "3rd party tool",
    hoursSaved: 6,
    setupComplexity: "Medium",
    details: {
      task: "Manually answer repetitive questions from fans via email, phone, or social media.",
      problem: "High volume of routine inquiries, leading to slow response times and staff overload.",
      solution: "An AI-powered chatbot provides instant answers to FAQs, freeing up staff to handle more complex interactions. It can be integrated with club databases for real-time information.",
    },
  },
  {
    id: 'nhr-5',
    title: "Automated Player Registration & Database Management",
    department: "Operations",
    summary: "Streamline the player registration process for community clubs and academies using AI to extract data from forms, verify information, and update central databases.",
    toolUsed: "AI Agent",
    hoursSaved: 18,
    setupComplexity: "Hard",
    details: {
      task: "Manually process player registration forms, often paper-based or inconsistent digital formats, and enter data into multiple systems.",
      problem: "Tedious, error-prone data entry, leading to delays and inaccuracies in player databases.",
      solution: "An AI agent uses OCR to read registration forms, extracts key player information, validates it against existing records, and automatically updates the club's database. It flags discrepancies for human review.",
    },
  },
  {
    id: 'nhr-6',
    title: "Sponsorship Proposal Generation",
    department: "Commercial",
    summary: "Use an AI agent to draft personalized sponsorship proposals for potential partners, incorporating NHR's value proposition, audience demographics, and specific partnership opportunities.",
    toolUsed: "AI Agent",
    hoursSaved: 10,
    setupComplexity: "Medium",
    details: {
      task: "Manually create tailored sponsorship proposals, which is time-consuming and requires significant research for each potential partner.",
      problem: "Inefficient proposal generation process, limiting the number of potential sponsors that can be approached.",
      solution: "An AI agent, fed with NHR's sponsorship assets, audience data, and information about a potential sponsor, generates a customized draft proposal, highlighting relevant benefits and opportunities.",
    },
  },
  {
    id: 'nhr-7',
    title: "TensorFlow-Powered Skill Analysis & Feedback",
    department: "Performance",
    summary: "Utilize a custom TensorFlow model to analyze video footage of specific rugby skills (e.g., passing technique, kicking form, tackle execution). Provide objective, data-driven feedback to players and coaches for targeted improvement.",
    toolUsed: "Custom ML Model (TensorFlow)",
    hoursSaved: 9,
    setupComplexity: "Hard",
    details: {
      task: "Manually review countless hours of training and match footage to identify subtle flaws or inconsistencies in player technique for specific skills. Provide subjective feedback.",
      problem: "Manual analysis is time-consuming, subjective, and difficult to scale across many players or track granular progress over time.",
      solution: "A TensorFlow model is trained on a large dataset of correctly and incorrectly executed rugby skills. Players' video footage is fed into the model, which then identifies deviations from optimal technique, quantifies performance metrics (e.g., body angle, ball release point), and generates visual overlays or textual feedback for coaches and players. This allows for highly targeted and objective skill development.",
    },
  },
  {
    id: 'nhr-8',
    title: "AI-Enhanced Internal Communications & Knowledge Base (Staff & Volunteers)",
    department: "All Staff & Volunteers",
    summary: "Integrate AI tools into an internal communications platform to automate message summarization, facilitate quick Q&A from a knowledge base, and draft internal announcements, specifically tailored to improve communication with both staff and the volunteer network.",
    toolUsed: "AI Agent",
    hoursSaved: 7,
    setupComplexity: "Medium",
    details: {
      task: "Manually sift through long communication threads, answer repetitive questions from staff and volunteers, and draft internal announcements from scratch. Information is often siloed, especially for the volunteer network.",
      problem: "Information overload for staff and volunteers, difficulty finding specific information quickly, inconsistent messaging, and time spent on routine communication tasks. Volunteers often miss critical updates due to disparate communication channels.",
      solution: "An AI agent monitors internal communication channels, automatically summarizes long discussions, and can answer common staff and volunteer questions by querying an internal knowledge base. It can also assist in drafting internal announcements, ensuring consistent tone and clarity, and can be configured to disseminate information effectively to different groups (staff vs. volunteers) within the platform. This improves efficiency and ensures all staff and volunteers have quick access to accurate information.",
    },
  },
  {
    id: 'nhr-9',
    title: "AI-Driven Player Pathway Analysis & Retention",
    department: "Academies",
    summary: "Implement an AI system to analyze player data across school, club, and academy levels to identify factors influencing player progression, drop-out rates, and success. Provide insights to optimize player support, talent identification, and retention strategies within the province.",
    toolUsed: "AI Agent",
    hoursSaved: 12,
    setupComplexity: "Hard",
    details: {
      task: "Manually track player progression, often relying on subjective assessments and limited data points. Struggle to understand why players drop out or succeed, making retention and talent identification difficult.",
      problem: "Lack of comprehensive, data-driven insights into player pathways, leading to inefficient talent identification, high drop-out rates, and missed opportunities to support players effectively.",
      solution: "An AI agent integrates data from various sources (school performance, club statistics, academy assessments, fitness metrics, demographic data, survey results). It uses predictive analytics to identify patterns associated with success and drop-out, flags players at risk, and suggests personalized intervention strategies (e.g., mentorship, specialized training, academic support). LLMs can generate reports summarizing key findings and recommendations for player development staff and coaches, aiming to retain talent within North Harbour Rugby.",
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