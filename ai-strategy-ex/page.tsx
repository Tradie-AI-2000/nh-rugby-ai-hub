'use client';

import React, { useState, useMemo } from 'react';
import { Target, Zap, Users, BarChart, Milestone, Flag, CheckCircle, MessageSquareQuote, PiggyBank, DollarSign, BrainCircuit, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from 'next/image';


// Mock Data for Roadmap
const roadmapPhases = [
  {
    phase: 'Phase 1: Foundation & Upskilling (Q4 2025)',
    icon: <Flag className="h-6 w-6 text-blue-500" />,
    initiatives: [
      { title: 'Portal Launch', description: 'Deploy the AI Transformation Portal with initial resources (Playbook, Tool Directory).', status: 'Completed' },
      { title: 'Baseline Training', description: 'All employees to complete "Basic Prompting" and "AI Fundamentals" training modules.', status: 'In Progress' },
      { title: 'Initial Process Audit', description: 'Complete the AI Audit questionnaire with Sales and Marketing departments.', status: 'Not Started' },
    ],
  },
  {
    phase: 'Phase 2: Automation & Integration (Q1 2026)',
    icon: <Milestone className="h-6 w-6 text-purple-500" />,
    initiatives: [
      { title: 'Pilot Automation Project', description: 'Develop the first AI agent to automate sales report summaries.', status: 'Not Started' },
      { title: 'Implement User Reporting', description: 'Launch the monthly AI activity reporting feature for all users.', status: 'Not Started' },
      { title: 'Advanced Training Rollout', description: 'Launch "Advanced Prompting" and role-specific training workshops.', status: 'Not Started' },
    ],
  },
    {
    phase: 'Phase 3: Innovation & Expansion (Q2 2026)',
    icon: <Target className="h-6 w-6 text-green-500" />,
    initiatives: [
      { title: 'Predictive Analytics', description: 'Implement a pilot for predictive inventory management using AI forecasting.', status: 'Not Started' },
      { title: 'Customer Support Bot', description: 'Scope and develop an internal AI bot to handle common supplier and customer queries.', status: 'Not Started' },
      { title: 'Review & Strategize 2.0', description: 'Assess ROI from Phase 1 & 2 to plan the next wave of AI initiatives.', status: 'Not Started' },
    ],
  },
];

const kpis = [
  { title: 'Employee Adoption Rate', value: '25%', target: '90% by end of Q1 2026', icon: <Users className="h-8 w-8 text-green-500" /> },
  { title: 'Reported Efficiency Gains', value: '5%', target: '15% reduction in manual reporting hours', icon: <Zap className="h-8 w-8 text-yellow-500" /> },
  { title: 'Training Completion', value: '40%', target: '100% on Basic modules', icon: <CheckCircle className="h-8 w-8 text-blue-500" /> },
];

// ROI Calculator Component - REFACTORED
const RoiCalculator = () => {
    // Part 1 Inputs
    const [timePerTask, setTimePerTask] = useState(5);
    const [numEmployees, setNumEmployees] = useState(10);
    const [percentTimeSaved, setPercentTimeSaved] = useState(50);
    const [avgSalary, setAvgSalary] = useState(75000);
    const [implementationCost, setImplementationCost] = useState(10000);

    // Part 2 Inputs
    const [reallocatedPercent, setReallocatedPercent] = useState(50);
    const [valuePerHour, setValuePerHour] = useState(250);

    const calculations = useMemo(() => {
        // Part 1 Calculations
        const totalHoursSpentPerWeek = timePerTask * numEmployees;
        const totalHoursSavedPerWeek = totalHoursSpentPerWeek * (percentTimeSaved / 100);
        const averageHourlyRate = avgSalary / 2080;
        const weeklyCostSavings = totalHoursSavedPerWeek * averageHourlyRate;
        const annualCostSavings = weeklyCostSavings * 52;
        const roiPercent = implementationCost > 0 ? (annualCostSavings / implementationCost) * 100 : 0;

        // Part 2 Calculations
        const revenueGeneratingHoursUnlockedPerWeek = totalHoursSavedPerWeek * (reallocatedPercent / 100);
        const additionalWeeklyRevenue = revenueGeneratingHoursUnlockedPerWeek * valuePerHour;
        const potentialAdditionalAnnualRevenue = additionalWeeklyRevenue * 52;
        
        return {
            totalHoursSavedPerWeek,
            averageHourlyRate,
            weeklyCostSavings,
            annualCostSavings,
            roiPercent,
            revenueGeneratingHoursUnlockedPerWeek,
            potentialAdditionalAnnualRevenue,
        };
    }, [timePerTask, numEmployees, percentTimeSaved, avgSalary, implementationCost, reallocatedPercent, valuePerHour]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(value);

    return (
        <Card className="bg-muted">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart className="h-6 w-6" /> AI Initiative ROI Calculator</CardTitle>
                <CardDescription>Estimate the financial impact of an AI tool or agent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* --- Part 1: Cost Savings --- */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><DollarSign className="h-5 w-5 text-green-500"/>Direct Cost Savings</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                            <Label htmlFor="timePerTask">Time on Task (Hrs/Week)</Label>
                            <Input id="timePerTask" type="number" value={timePerTask} onChange={e => setTimePerTask(Number(e.target.value))} />
                        </div>
                        <div>
                            <Label htmlFor="numEmployees">No. of Employees</Label>
                            <Input id="numEmployees" type="number" value={numEmployees} onChange={e => setNumEmployees(Number(e.target.value))} />
                        </div>
                        <div>
                            <Label htmlFor="percentTimeSaved">% Time Saved by AI</Label>
                            <Input id="percentTimeSaved" type="number" value={percentTimeSaved} onChange={e => setPercentTimeSaved(Number(e.target.value))} />
                        </div>
                        <div>
                            <Label htmlFor="avgSalary">Avg. Annual Salary (NZD)</Label>
                            <Input id="avgSalary" type="number" value={avgSalary} onChange={e => setAvgSalary(Number(e.target.value))} />
                        </div>
                        <div>
                            <Label htmlFor="implementationCost">Annual Implementation Cost (NZD)</Label>
                            <Input id="implementationCost" type="number" value={implementationCost} onChange={e => setImplementationCost(Number(e.target.value))} />
                        </div>
                    </div>
                    <div className="space-y-2 rounded-lg bg-background p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Annual Cost Savings</span>
                            <span className="font-bold text-lg text-green-500">{formatCurrency(calculations.annualCostSavings)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Simple ROI</span>
                            <span className={`font-bold text-lg ${calculations.roiPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>{calculations.roiPercent.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                
                <Separator />

                {/* --- Part 2: Revenue Uplift --- */}
                <div>
                     <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-500"/>Revenue Uplift Opportunity</h3>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                            <Label>% of Saved Time Reallocated</Label>
                            <Input type="number" value={reallocatedPercent} onChange={e => setReallocatedPercent(Number(e.target.value))} />
                        </div>
                        <div>
                            <Label>Value of Revenue Activity ($/Hr)</Label>
                            <Input type="number" value={valuePerHour} onChange={e => setValuePerHour(Number(e.target.value))} />
                        </div>
                     </div>
                     <div className="space-y-2 rounded-lg bg-background p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Potential Additional Annual Revenue</span>
                            <span className="font-bold text-lg text-blue-500">{formatCurrency(calculations.potentialAdditionalAnnualRevenue)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Show Workings & Explainer</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground space-y-4">
                            <div>
                                <h4 className="font-semibold text-primary mb-2">Part 1: Direct Cost Savings</h4>
                                <p className="mb-2"><strong className="text-foreground">Annual Cost Savings:</strong> ([Time on Task] x [No. of Employees] x [% Time Saved]) x ([Avg. Salary] / 2080) x 52</p>
                                <p className="text-xs bg-background p-2 rounded">
                                    Calculation: ({timePerTask}h x {numEmployees} x {percentTimeSaved}%) x ({formatCurrency(avgSalary)} / 2080) x 52 = <span className="font-bold text-green-500">{formatCurrency(calculations.annualCostSavings)}</span>
                                </p>
                                <p className="mt-2 mb-2"><strong className="text-foreground">Simple ROI:</strong> ([Annual Cost Savings] / [Implementation Cost]) * 100</p>
                                <p className="text-xs bg-background p-2 rounded">
                                    Calculation: ({formatCurrency(calculations.annualCostSavings)} / {formatCurrency(implementationCost)}) * 100 = <span className="font-bold text-green-500">{calculations.roiPercent.toFixed(1)}%</span>
                                </p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-primary mb-2">Part 2: Revenue Uplift</h4>
                                <p className="mb-2"><strong className="text-foreground">Potential Revenue:</strong> ([Total Hours Saved/Week] x [% Reallocated]) x [Value per Hour] x 52</p>
                                <p className="text-xs bg-background p-2 rounded">
                                    Calculation: ({calculations.totalHoursSavedPerWeek.toFixed(1)}h x {reallocatedPercent}%) x {formatCurrency(valuePerHour)} x 52 = <span className="font-bold text-blue-500">{formatCurrency(calculations.potentialAdditionalAnnualRevenue)}</span>
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardFooter>
        </Card>
    );
};


export default function StrategyPage() {
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
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">AI Strategy & Roadmap</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our vision and plan for integrating Artificial Intelligence to drive growth and efficiency.
        </p>
      </header>
      
      <section className="mb-16 text-center">
        <Card className="inline-block p-8 bg-muted border-2 border-primary/20">
          <Target className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our AI Mission</h2>
          <p className="max-w-3xl mx-auto text-lg">
            To empower every Wilson Consumer Products employee with AI tools and skills to enhance productivity, foster innovation, and deliver exceptional value to our partners and customers across New Zealand.
          </p>
        </Card>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Strategic Pillars</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardHeader><Zap className="h-10 w-10 mx-auto text-yellow-500 mb-2" /><CardTitle>Operational Efficiency</CardTitle></CardHeader>
            <CardContent><p>Automate repetitive tasks and use AI to analyze data for faster, smarter business decisions.</p></CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader><Users className="h-10 w-10 mx-auto text-green-500 mb-2" /><CardTitle>Workforce Upskilling</CardTitle></CardHeader>
            <CardContent><p>Provide comprehensive training to ensure our team is confident and capable in using AI tools.</p></CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader><BarChart className="h-10 w-10 mx-auto text-blue-500 mb-2" /><CardTitle>Data-Driven Growth</CardTitle></CardHeader>
            <CardContent><p>Leverage AI to uncover market trends, analyze competitor strategies, and identify new growth opportunities.</p></CardContent>
          </Card>
           <Card className="text-center">
            <CardHeader><MessageSquareQuote className="h-10 w-10 mx-auto text-purple-500 mb-2" /><CardTitle>User Reporting & Feedback</CardTitle></CardHeader>
            <CardContent><p>Create a feedback loop for management to monitor AI usage, track wins, and measure real-world impact.</p></CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* REORDERED: KPIs now follow Pillars */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Measuring Our Success (KPIs)</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {kpis.map((kpi) => (
            <Card key={kpi.title} className="text-center p-6">
                {kpi.icon}
                <p className="text-4xl font-bold mt-2">{kpi.value}</p>
                <p className="text-lg font-medium">{kpi.title}</p>
                <p className="text-sm text-muted-foreground mt-1">Target: {kpi.target}</p>
            </Card>
          ))}
        </div>
      </section>
      
      <Separator className="my-12" />
      
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Implementation Roadmap</h2>
        <div className="space-y-12">
          {roadmapPhases.map((phase) => (
            <div key={phase.phase}>
              <div className="flex items-center gap-4 mb-6">{phase.icon}<h3 className="text-2xl font-medium">{phase.phase}</h3></div>
              <div className="grid md:grid-cols-3 gap-6">
                {phase.initiatives.map((item) => (
                  <Card key={item.title} className="flex flex-col">
                    <CardHeader><CardTitle>{item.title}</CardTitle></CardHeader>
                    <CardContent className="flex-grow"><p className="text-muted-foreground">{item.description}</p></CardContent>
                    <div className="p-6 pt-0"><Badge variant={item.status === 'Completed' ? 'default' : item.status === 'In Progress' ? 'outline' : 'secondary'}>{item.status}</Badge></div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-16">
        <header className="text-center mb-10">
            <h2 className="text-3xl font-semibold">Resource Allocation & Budget</h2>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">A strategic overview of potential investments and how to measure their financial impact.</p>
        </header>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <PiggyBank className="h-8 w-8 text-green-500" />
                        <CardTitle>What Are The Costs?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>Successful AI integration requires targeted investment. Key areas include:</p>
                        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                            <li><strong>Third-Party Tools:</strong> Monthly or annual subscriptions for approved SaaS products (e.g., Salesforce Einstein, Gong).</li>
                            <li><strong>Usage & Token Costs:</strong> Pay-as-you-go fees for using large language models via APIs (e.g., OpenAI, Google Gemini).</li>
                            <li><strong>Custom AI Agents:</strong> Development costs (internal or external) for building bespoke automation solutions identified in the AI Audit.</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Zap className="h-8 w-8 text-yellow-500" />
                        <CardTitle>Rollout Strategy & Measuring ROI</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>We recommend a phased rollout to manage costs and prove value:</p>
                        <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                           <li><strong>Start with Pilots:</strong> Select a small, high-impact project for a single team. Measure the "before" and "after" metrics rigorously.</li>
                           <li><strong>Buy - Try - Build Strategy:</strong> First, you try a product already in the market without committing to a long-term contract. If it has potential, you buy and use it, testing its efficacy in real-world scenarios. Eventually, you may find that an off-the-shelf product has limitations or can’t be configured to match your workflow. Thats when you can look at building a custom solution.</li>
                           <li><strong>Track Key Metrics:</strong> Focus on tangible outcomes like hours saved, reduction in errors, or increase in sales leads generated.</li>
                           <li><strong>Expand on Success:</strong> Use the positive ROI from successful pilots to justify wider investment and rollout across other departments.</li>
                        </ol>
                    </CardContent>
                </Card>
            </div>
            <RoiCalculator />
        </div>
      </section>
      
      <Separator className="my-12" />
      
       <section>
        <h2 className="text-3xl font-semibold text-center mb-8">Monthly AI Activity Report</h2>
        <Card className="max-w-3xl mx-auto p-8">
            <CardHeader className="text-center p-0 mb-6"><CardTitle>Submit Your Monthly Feedback</CardTitle><p className="text-muted-foreground">Help us track our progress. Your feedback is vital for our AI strategy.</p></CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="space-y-2"><Label htmlFor="ai-win">What was your biggest AI win this month?</Label><Textarea id="ai-win" placeholder="e.g., 'Used ChatGPT to write a sales proposal, saving me 2 hours of work.'" /></div>
                    <div className="space-y-2"><Label htmlFor="ai-challenge">What was your biggest challenge or frustration with AI?</Label><Textarea id="ai-challenge" placeholder="e.g., 'The AI tool gave me incorrect information about a competitor.'" /></div>
                    <div className="space-y-2"><Label htmlFor="hours-saved">Approximately how many hours did you save this month using AI?</Label><Input id="hours-saved" type="number" placeholder="e.g., 8" /></div>
                    <Button type="submit" className="w-full">Submit Report to Paul Doyle</Button>
                </form>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
