'use client';

import React, { useState } from 'react';
import { Clipboard, Check, Bot, Mail, BarChart3, Users, Search, Package, Plane, Mic, HelpCircle, Map, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';


// Define a type for a single prompt
interface Prompt {
  title: string;
  prompt: string;
  roles: string[];
  icon: React.ReactNode;
}

interface PromptsByLevel {
  Basic: Prompt[];
  Intermediate: Prompt[];
  Advanced: Prompt[];
}

// Mock data for prompts, tailored to Wilson Consumer Products and structured by level
const promptLibrary: Record<string, PromptsByLevel> = {
  'Sales & Outreach': {
    Basic: [
      {
        title: 'New Supermarket Lead Email',
        prompt: 'Draft a professional and concise introductory email to a category manager at a New Zealand supermarket we don\'t currently supply. Introduce Wilson Consumer Products, highlight our key product categories (health, beauty, and grocery), and suggest a brief 15-minute call next week to discuss how our range could benefit their stores.',
        roles: ['Field Sales Reps', 'Sales Manager'],
        icon: <Mail className="h-8 w-8 text-blue-500" />,
      },
    ],
    Intermediate: [
      {
        title: 'Analyze Sales Performance',
        prompt: 'I have attached a CSV file with my sales data for the last quarter. Act as a sales analyst. Identify my top 3 best-selling products, the region with the highest growth, and one product that is underperforming. Provide three bullet points on potential reasons for the underperformance.',
        roles: ['Field Sales Reps', 'Sales Manager', 'GMs'],
        icon: <BarChart3 className="h-8 w-8 text-green-500" />,
      },
    ],
    Advanced: [
        {
        title: 'Generate Dynamic Sales Script',
        prompt: 'You are a sales coach for Wilson Consumer Products. Below is our latest product sheet and a summary of our brand voice. [PASTE PRODUCT INFO & BRAND VOICE]. Now, create a flexible sales conversation script for our Field Sales Reps to introduce this new product. The script should include an engaging opener, 3 key benefit-driven talking points, and 3 different ways to handle potential objections (e.g., "It\\\'s too expensive," "We already have a similar product").',
        roles: ['Sales Manager', 'GMs'],
        icon: <Mic className="h-8 w-8 text-orange-500" />,
      },
    ]
  },
  'Strategic Analysis': {
    Basic: [
      {
        title: 'Competitor Analysis',
        prompt: 'Conduct a high-level competitor analysis of [Competitor Name] in the New Zealand health and beauty wholesale market. Summarize their perceived strengths, weaknesses, key product lines, and marketing strategy.',
        roles: ['GMs', 'Owner', 'Sales Manager'],
        icon: <Search className="h-8 w-8 text-red-500" />,
      },
    ],
    Intermediate: [
      {
        title: 'Supplier Risk Assessment',
        prompt: 'Analyze our dependency on our primary supplier for [Product Category]. Based on their location, market conditions, and our order volume, what are the top 3 potential supply chain risks we face? For each risk, suggest one mitigation strategy.',
        roles: ['GMs', 'Owner'],
        icon: <Package className="h-8 w-8 text-orange-500" />,
      },
    ],
    Advanced: [
      {
        title: 'Simulate Business Decision Outcome',
        prompt: 'Act as a business strategy consultant. We are considering launching our own direct-to-consumer e-commerce site in New Zealand. Based on the following data points [PASTE market size data, competitor online presence, internal logistics capabilities, marketing budget], simulate a best-case, worst-case, and most-likely scenario for the first year of operation. Include projected revenue, key challenges, and critical success factors for each scenario.',
        roles: ['Owner', 'GMs'],
        icon: <Plane className="h-8 w-8 text-teal-500" />,
      },
    ]
  },
   'Marketing & Content': {
    Basic: [
      {
        title: 'Write LinkedIn Post',
        prompt: 'Write a professional LinkedIn post for our General Manager to announce our new partnership with a sustainable packaging supplier. The tone should be forward-thinking, proud, and committed to sustainability. Include relevant hashtags like #Sustainability #NZBusiness #Distribution.',
        roles: ['Marketing Manager', 'GMs'],
        icon: <Bot className="h-8 w-8 text-sky-500" />,
      },
    ],
    Intermediate: [
      {
        title: 'Blog Post Outline',
        prompt: 'Create a detailed outline for a blog post with the title: "5 Health Food Trends to Watch in New Zealand this Year". Include an introduction, a section for each trend with 2-3 talking points, and a conclusion that subtly promotes relevant Wilson Consumer Products.',
        roles: ['Marketing Manager'],
        icon: <Bot className="h-8 w-8 text-indigo-500" />,
      },
    ],
    Advanced: [
       {
        title: 'Generate Multi-Channel Campaign',
        prompt: 'Using the provided brand guidelines and product one-pager [PASTE CONTEXT HERE], act as our marketing agency. Develop a comprehensive launch campaign for our new "Kiwi Berry Bliss" snack bars. The campaign is called "Your Daily Dose of Delicious". Provide the following: 1. A 3-week content calendar for Instagram. 2. Copy for two targeted Facebook ads (one for parents, one for fitness enthusiasts). 3. The script for a 30-second radio ad.',
        roles: ['Marketing Manager'],
        icon: <Bot className="h-8 w-8 text-pink-500" />,
      },
    ]
  },
};


// A simple hook to manage the "copied" state for each button
const useCopy = () => {
    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

    const handleCopy = async (text: string, id: string) => {
        try {
            // Use the modern clipboard API
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy with navigator.clipboard:', err);
            // Fallback for non-secure contexts or when permissions are denied
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "absolute";
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (fallbackErr) {
                console.error('Fallback: Oops, unable to copy', fallbackErr);
            }
            document.body.removeChild(textArea);
        }

        setCopiedStates(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [id]: false }));
        }, 2000);
    };

    return { copiedStates, handleCopy };
};

export default function PromptLibraryPage() {
  const { copiedStates, handleCopy } = useCopy();

  return (
    <div className="py-8">
      <section className="mb-12">
        <Image
          src="https://stellarlibrary.com/wp-content/uploads/Success-Story-FMCG-Wilsons-1024x341.jpg"
          alt="Wilson Consumer Products promotional banner"
          width={1024}
          height={341}
          className="w-full h-auto rounded-lg object-cover"
        />
      </section>
      
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">Prompt Library</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Copy and paste these tailored prompts to get better results from your AI tools.
        </p>
      </header>

      {/* Prompt Engineering Tutorial Section */}
      <section className="mb-16">
        <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Prompt Engineering Tutorials</h2>
            <p className="mt-4 text-lg text-muted-foreground">Learn how to write effective prompts to maximize your results.</p>
        </header>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>1. Basic Prompting</CardTitle>
              <CardDescription>The essentials for giving clear instructions to an AI.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">Learn the three key ingredients of any great prompt: Task, Context, and Persona. Master these to get reliable results every time.</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/prompt-library/basic-prompting" className="w-full">
                <Button className="w-full">
                  Go to Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>2. Intermediate Prompting</CardTitle>
              <CardDescription>Refining your requests for more nuanced outputs.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">Explore techniques like "Few-Shot" and "Chain-of-Thought" prompting to guide the AI toward more accurate and structured answers.</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/prompt-library/intermediate-prompting" className="w-full">
                <Button className="w-full">
                  Go to Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
           <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>3. Advanced Prompting</CardTitle>
              <CardDescription>Context engineering and grounding the AI.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <p className="text-muted-foreground">Understand how to provide large amounts of custom data to the AI so it can act as a true expert on your business and processes.</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/prompt-library/advanced-prompting" className="w-full">
                <Button className="w-full">
                  Go to Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

       <header className="mb-12 text-center">
        <h2 className="text-3xl font-semibold">Prompt Library</h2>
      </header>

      <div className="space-y-16">
        {Object.entries(promptLibrary).map(([category, levels]) => (
          <section key={category}>
            <h2 className="text-3xl font-semibold mb-2">{category}</h2>
            <Separator className="mb-8" />
            <div className="space-y-8">
              {Object.entries(levels).map(([level, prompts]) => (
                <div key={level}>
                  <h3 className="text-xl font-medium mb-4 text-muted-foreground">{level}</h3>
                  <div className="space-y-6">
                    {prompts.map((prompt: Prompt, index: number) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            {prompt.icon}
                            <div>
                              <CardTitle>{prompt.title}</CardTitle>
                              <div className="flex gap-2 mt-2 flex-wrap">
                                  {prompt.roles.map((role: string) => (
                                      <Badge key={role} variant="secondary">{role}</Badge>
                                  ))}
                              </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                          <pre className="bg-muted p-4 rounded-lg whitespace-pre-wrap font-sans text-sm">{prompt.prompt}</pre>
                        </CardContent>
                        <CardFooter>
                          <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleCopy(prompt.prompt, `${category}-${level}-${index}`)}
                          >
                              {copiedStates[`${category}-${level}-${index}`] ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Clipboard className="h-4 w-4 mr-2" />}
                              {copiedStates[`${category}-${level}-${index}`] ? 'Copied!' : 'Copy Prompt'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
