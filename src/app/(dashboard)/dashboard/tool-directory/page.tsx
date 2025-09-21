'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Bot, Sparkles, Brain, MessageSquare, PenSquare, Briefcase, Handshake, BarChart, FileText, Search, Library, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

// Data for approved tools with icons and colors
const toolData = [
    // General Purpose LLMs
    {
      name: 'ChatGPT',
      category: 'General Purpose LLMs',
      risk: 'Medium',
      description: 'Powerful for drafting text, brainstorming, summarizing, and coding assistance.',
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png",
      logoBg: 'bg-emerald-200',
      url: 'https://chat.openai.com/',
      color: 'purple'
    },
    {
      name: 'Gemini (Google)',
      category: 'General Purpose LLMs',
      risk: 'Medium',
      description: 'Multi-modal AI for creative text generation, data analysis, and complex reasoning.',
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThr7qrIazsvZwJuw-uZCtLzIjaAyVW_ZrlEQ&s",
      logoBg: 'bg-blue-100',
      url: 'https://gemini.google.com/',
      color: 'blue'
    },
    {
      name: 'Claude (Anthropic)',
      category: 'General Purpose LLMs',
      risk: 'Medium',
      description: 'Strong focus on safety and constitutional AI, excellent for detailed conversations.',
      icon: <Handshake className="h-6 w-6 text-orange-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUnGYPe67wuzVDjTujZ21UV38Y6KQ290fow&s",
      logoBg: 'bg-orange-100',
      url: 'https://claude.ai/',
      color: 'orange'
    },
    {
      name: 'Perplexity AI',
      category: 'General Purpose LLMs',
      risk: 'Low',
      description: 'A conversational search engine that provides cited, accurate answers from the web.',
      icon: <Search className="h-6 w-6 text-green-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUe1maR_3OkMtDx_HDz12ceQl0KRqz_V0blw&s",
      logoBg: 'bg-green-100',
      url: 'https://www.perplexity.ai/',
      color: 'green'
    },
    // Marketing
    {
      name: 'Jasper AI',
      category: 'Marketing',
      risk: 'Low',
      description: 'AI-powered copywriter for generating marketing copy, blog posts, and social media content.',
      icon: <PenSquare className="h-6 w-6 text-pink-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtIEAy3SIODOrIC19eImxidbJWt04IH5jTRg&s",
      logoBg: 'bg-pink-100',
      url: 'https://www.jasper.ai/',
      color: 'pink'
    },
    {
      name: 'Copy.ai',
      category: 'Marketing',
      risk: 'Low',
      description: 'AI copywriter for generating high-quality marketing copy and content ideas.',
      icon: <PenSquare className="h-6 w-6 text-pink-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPv9c8aiPZFldR27UoUGJ1e365Lran0iBrhA&s",
      logoBg: 'bg-indigo-100',
      url: 'https://www.copy.ai/',
      color: 'pink'
    },
    {
      name: 'Canva Magic Write',
      category: 'Marketing',
      risk: 'Low',
      description: 'AI text generator integrated within the Canva design suite for social media graphics.',
      icon: <PenSquare className="h-6 w-6 text-pink-500" />,
      logo: "https://www.vhv.rs/dpng/d/275-2756337_canva-logo-logo-canva-hd-png-download.png",
      logoBg: 'bg-violet-100',
      url: 'https://www.canva.com/magic-write/',
      color: 'pink'
    },
    // Sales
    {
      name: 'Salesforce Einstein',
      category: 'Sales',
      risk: 'Low',
      description: 'AI for CRM to uncover insights, predict outcomes, and suggest next steps.',
      icon: <BarChart className="h-6 w-6 text-red-500" />,
      logo: "https://www.sparkplug.ai/wp-content/uploads/2023/10/salesforce-logo.png",
      logoBg: 'bg-sky-100',
      url: 'https://www.salesforce.com/products/einstein/',
      color: 'red'
    },
    {
      name: 'Gong',
      category: 'Sales',
      risk: 'Medium',
      description: 'Conversation intelligence platform that records and analyzes sales calls for insights.',
      icon: <BarChart className="h-6 w-6 text-red-500" />,
      logo: "https://cdn.prod.website-files.com/61d72a2cda50bcf02928767c/689fc172b2191b278b74450e_Gong_idnaeh32xQ_1.png",
      logoBg: 'bg-teal-100',
      url: 'https://www.gong.io/',
      color: 'red'
    },
    {
      name: 'Zoom AI Companion',
      category: 'Sales',
      risk: 'Low',
      description: 'Summarizes meetings, identifies action items, and helps draft follow-up emails.',
      icon: <BarChart className="h-6 w-6 text-red-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuB79MjNSFlE0-cyrc_pjYnXv7PcnM4EGXSw&s",
      logoBg: 'bg-blue-200',
      url: 'https://zoom.us/ai-companion',
      color: 'red'
    },
    // Admin & Operations
    {
      name: 'Microsoft 365 Copilot',
      category: 'Admin',
      risk: 'Low',
      description: 'AI assistant integrated into Microsoft Office apps to draft documents, summarize emails, and more.',
      icon: <Briefcase className="h-6 w-6 text-indigo-500" />,
      logo: "https://amblik.ee/wp-content/uploads/2024/09/Copilot-Logo.png",
      logoBg: 'bg-blue-100',
      url: 'https://www.microsoft.com/en-us/microsoft-365/copilot-for-work',
      color: 'indigo'
    },
    {
      name: 'Notion AI',
      category: 'Admin',
      risk: 'Low',
      description: 'Helps organize notes, summarize documents, and draft content directly within Notion.',
      icon: <Briefcase className="h-6 w-6 text-indigo-500" />,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png",
      logoBg: 'bg-gray-200',
      url: 'https://www.notion.so/product/ai',
      color: 'indigo'
    },
    {
      name: 'Grammarly',
      category: 'Admin',
      risk: 'Low',
      description: 'AI-powered writing assistant for checking grammar, spelling, and tone.',
      icon: <Briefcase className="h-6 w-6 text-indigo-500" />,
      logo: "https://cdn.worldvectorlogo.com/logos/grammarly-1.svg",
      logoBg: 'bg-emerald-100',
      url: 'https://www.grammarly.com/',
      color: 'indigo'
    },
    // Customer Support
    {
      name: 'Zendesk AI',
      category: 'Customer Support',
      risk: 'Low',
      description: 'Provides automated responses, summarizes tickets, and assists support agents.',
      icon: <MessageSquare className="h-6 w-6 text-cyan-500" />,
      logo: "https://logos-world.net/wp-content/uploads/2021/06/Zendesk-Logo.png",
      logoBg: 'bg-green-100',
      url: 'https://www.zendesk.com/service/ai/',
      color: 'cyan'
    },
    {
      name: 'Intercom\'s Fin',
      category: 'Customer Support',
      risk: 'Medium',
      description: 'An AI chatbot built to resolve complex customer issues and integrate with your knowledge base.',
      icon: <MessageSquare className="h-6 w-6 text-cyan-500" />,
      logo: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/174_Intercom_logo_logos-512.png",
      logoBg: 'bg-blue-100',
      url: 'https://www.intercom.com/fin',
      color: 'cyan'
    },
    {
      name: 'Ada',
      category: 'Customer Support',
      risk: 'Medium',
      description: 'An AI-powered platform for building automated customer service chatbots.',
      icon: <MessageSquare className="h-6 w-6 text-cyan-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAV4PJ056CCYQfWMMdR8_i-QCGCw997UCgQ&s",
      logoBg: 'bg-teal-100',
      url: 'https://www.ada.cx/',
      color: 'cyan'
    },
    // Research
    {
      name: 'Elicit',
      category: 'Research',
      risk: 'Low',
      description: 'AI research assistant that can find papers, extract data, and synthesize findings.',
      icon: <Library className="h-6 w-6 text-lime-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMc-NJRAgWYAys9JWMjVPAGn-py_z3LOzaEw&s",
      logoBg: 'bg-orange-100',
      url: 'https://elicit.com/',
      color: 'lime'
    },
    {
      name: 'Scite',
      category: 'Research',
      risk: 'Low',
      description: 'Helps discover and evaluate scientific articles through "smart citations".',
      icon: <Library className="h-6 w-6 text-lime-500" />,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrrKSABNsRNpsB5wu_ge863j8ixTCcAVlxZA&s",
      logoBg: 'bg-blue-100',
      url: 'https://scite.ai/',
      color: 'lime'
    },
    {
      name: 'Consensus',
      category: 'Research',
      risk: 'Low',
      description: 'An AI-powered search engine that extracts findings directly from scientific research.',
      icon: <Library className="h-6 w-6 text-lime-500" />,
      logo: "https://logosandtypes.com/wp-content/uploads/2025/04/Consensus-scaled.png",
      logoBg: 'bg-indigo-100',
      url: 'https://consensus.app/',
      color: 'lime'
    },
    // Business Reports
    {
      name: 'Tableau',
      category: 'Business Reports',
      risk: 'Low',
      description: 'AI-powered analytics to create interactive data visualizations and dashboards.',
      icon: <FileText className="h-6 w-6 text-gray-500" />,
      logo: "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png",
      logoBg: 'bg-blue-100',
      url: 'https://www.tableau.com/',
      color: 'gray'
    },
    {
      name: 'Microsoft Power BI',
      category: 'Business Reports',
      risk: 'Low',
      description: 'Business analytics service for creating reports and dashboards with AI features.',
      icon: <FileText className="h-6 w-6 text-gray-500" />,
      logo: "https://1000logos.net/wp-content/uploads/2022/12/Power-BI-Logo-2013-2048x1152.png",
      logoBg: 'bg-yellow-100',
      url: 'https://powerbi.microsoft.com/',
      color: 'gray'
    },
    {
      name: 'Polymer',
      category: 'Business Reports',
      risk: 'Medium',
      description: 'Turns spreadsheets into a powerful, searchable, and interactive database with AI.',
      icon: <FileText className="h-6 w-6 text-gray-500" />,
      logo: "https://cdn.freebiesupply.com/logos/large/2x/polymer-logo-png-transparent.png",
      logoBg: 'bg-violet-100',
      url: 'https://www.polymersearch.com/',
      color: 'gray'
    },
];


// Group tools by category
const groupedTools = toolData.reduce((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) {
        acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
}, {} as Record<string, typeof toolData>);


// Simple SVG Logo Components
const OpenAILogo = () => (
    <svg width="40" height="40" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 1024C229.229 1024 0 794.771 0 512C0 229.229 229.229 0 512 0C794.771 0 1024 229.229 1024 512C1024 794.771 794.771 1024 512 1024ZM512 83.221C276.324 83.221 83.221 276.324 83.221 512C83.221 747.676 276.324 940.779 512 940.779C747.676 940.779 940.779 747.676 940.779 512C940.779 276.324 747.676 83.221 512 83.221Z" fill="white"/>
        <path d="M682.667 341.333C682.667 341.333 682.667 424.555 682.667 507.778C682.667 591 682.667 674.222 682.667 757.444C682.667 757.444 641.056 757.444 600.333 757.444C558.722 757.444 517.111 757.444 476.222 757.444C476.222 757.444 476.222 674.222 476.222 591C476.222 507.778 476.222 424.555 476.222 341.333C476.222 341.333 559.444 341.333 642.667 341.333C656 341.333 669.333 341.333 682.667 341.333C682.667 341.333 682.667 424.555 682.667 507.778C682.667 591 682.667 674.222 682.667 757.444C682.667 757.444 641.056 757.444 600.333 757.444C558.722 757.444 517.111 757.444 476.222 757.444C476.222 757.444 476.222 674.222 476.222 591C476.222 507.778 476.222 424.555 476.222 341.333C476.222 341.333 559.444 341.333 642.667 341.333C656 341.333 669.333 341.333 682.667 341.333Z" fill="white"/>
        <path d="M341.333 266.667C341.333 266.667 341.333 349.889 341.333 433.111C341.333 516.333 341.333 599.556 341.333 682.778C341.333 682.778 382.944 682.778 423.667 682.778C465.278 682.778 506.889 682.778 547.778 682.778C547.778 682.778 547.778 599.556 547.778 516.333C547.778 433.111 547.778 349.889 547.778 266.667C547.778 266.667 464.556 266.667 381.333 266.667C368 266.667 354.667 266.667 341.333 266.667Z" fill="white"/>
    </svg>
);
const GeminiLogo = () => (
     <Sparkles className="h-10 w-10 text-white" />
);

export default function ToolDirectoryPage() {
  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">Approved AI Tool Directory</h1>
        <p className="mt-4 text-lg text-muted-foreground">
            A curated list of AI tools vetted for safety, security, and effectiveness.
        </p>
      </header>
      
      {/* Custom GPTs Section */}
      <section className="mb-16">
        <header className="text-center mb-10">
          <h2 className="text-3xl font-semibold">Custom Assistants</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Build powerful, personalized AI agents tailored to your specific tasks and workflows.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ChatGPT Card */}
            <Card className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex flex-col">
                 <CardHeader className="flex flex-row items-start gap-4">
                    <OpenAILogo />
                    <CardTitle className="text-2xl">Custom GPTs (ChatGPT)</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>Build your own custom versions of ChatGPT, trained on your specific documents and data. Create powerful, personalized assistants for any task without writing a single line of code.</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <a href="/dashboard/tool-directory/custom-gpts/chatgpt">
                        <Button variant="secondary" className="w-full">
                            See Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </CardFooter>
            </Card>

            {/* Gemini Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white flex flex-col">
                <CardHeader className="flex flex-row items-start gap-4">
                    <GeminiLogo />
                    <CardTitle className="text-2xl">Custom Gems (Gemini)</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>Develop custom 'Gems' with Google Gemini. These specialized AI agents can perform complex, multi-step tasks and can be tailored to your team's unique workflows and knowledge bases.</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                     <a href="/dashboard/tool-directory/custom-gpts/gemini">
                        <Button variant="secondary" className="w-full">
                            See Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </CardFooter>
            </Card>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Vetted Tools Section */}
      <section>
        <header className="text-center mb-10">
          <h2 className="text-3xl font-semibold">Vetted AI Tools</h2>
          <p className="text-muted-foreground mt-2">The following tools have been reviewed and approved for company use.</p>
        </header>
        <div className="space-y-12">
          {Object.entries(groupedTools).map(([category, tools]) => (
            <div key={category}>
              <h3 className="text-3xl font-bold tracking-tight text-primary pb-4 mb-8 border-b-2 border-primary/10">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.map(tool => (
                  <Card key={tool.name} className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border-gray-300">
                    <CardHeader className={cn("flex flex-row items-center gap-4 p-4", tool.logoBg)}>
                        <div className="bg-white rounded-full p-1 h-12 w-12 flex items-center justify-center shadow-sm shrink-0">
                            <Image 
                                src={tool.logo} 
                                alt={`${tool.name} Logo`} 
                                width={36} 
                                height={36} 
                                className="object-contain" 
                            />
                        </div>
                        <CardTitle className="text-xl font-bold text-black">{tool.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-6 bg-white flex-grow">
                        <p className="text-gray-600 text-base">{tool.description}</p>
                    </CardContent>
                    
                    <CardFooter className="bg-white p-4 flex justify-between items-center border-t">
                         <Badge 
                            variant={tool.risk === 'Low' ? 'default' : tool.risk === 'Medium' ? 'outline' : 'destructive'}
                            className={
                                tool.risk === 'Low' 
                                ? 'bg-green-100 text-green-800 font-semibold border-green-200'
                                : tool.risk === 'Medium' 
                                ? 'bg-yellow-100 text-yellow-800 font-semibold border-yellow-200'
                                : 'bg-red-100 text-red-800 font-semibold border-red-200'
                            }
                        >
                            {tool.risk.toUpperCase()} RISK
                        </Badge>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="font-semibold">
                                GO TO PAGE
                            </Button>
                        </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
