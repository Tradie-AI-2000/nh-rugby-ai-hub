'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Clock, Award, MessageSquareWarning, CheckCircle, Star, Bot, Clipboard, Mail, HelpCircle, PlusCircle, ExternalLink, BookOpen, BrainCircuit, Wrench, Lightbulb, Users, FileSignature } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';

import { getOrCreateUserProfile } from '@/lib/firebase';
import { UserProfile, UseCaseSchema, type UseCaseData } from '@/lib/types';
import { allBadges, getBadgeById } from '@/lib/badges';
import { createUseCase } from '@/lib/actions';

// Mock Data - In a real app, this would come from Firestore
const userFavoritePrompts = [
    { id: 1, title: 'New Supermarket Lead Email', prompt: 'Draft a professional and concise introductory email to a category manager at a New Zealand supermarket...' },
    { id: 2, title: 'Analyze Sales Performance', prompt: 'I have attached a CSV file with my sales data for the last quarter. Act as a sales analyst...' },
];

const userFavoriteTools = [
    { id: 1, name: 'ChatGPT', description: 'General purpose brainstorming and text generation.', link: '/dashboard/tool-directory' },
    { id: 2, name: 'Zoom AI Companion', description: 'Summarizing meetings and finding action items.', link: '/dashboard/tool-directory' },
];

function CreateUseCaseForm() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UseCaseData>({
    resolver: zodResolver(UseCaseSchema),
    defaultValues: {
      title: '',
      department: '',
      summary: '',
      task: '',
      problem: '',
      solution: '',
      toolUsed: undefined,
      hoursSaved: undefined,
      setupComplexity: undefined,
    },
  });

  async function onSubmit(data: UseCaseData) {
    setIsSubmitting(true);
    const result = await createUseCase(data);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Use Case Submitted!",
        description: "Thank you for sharing how you're using AI.",
      });
      form.reset();
      setIsOpen(false);
    } else {
      toast({
        title: "Submission Failed",
        description: result.error || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button><FileSignature className="h-4 w-4 mr-2"/>Create New Use Case</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create a New Use Case</DialogTitle>
          <DialogDescription>
            Share a story of how you've successfully used AI. This will be shared with the rest of the organization.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g., Automating Weekly Reports" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="department" render={({ field }) => (
              <FormItem><FormLabel>Department</FormLabel><FormControl><Input placeholder="e.g., Operations" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="summary" render={({ field }) => (
              <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea placeholder="A brief, one-sentence summary of the achievement." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="toolUsed" render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tool Used</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="AI Agent" /></FormControl><FormLabel className="font-normal">AI Agent</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Background automation" /></FormControl><FormLabel className="font-normal">Background automation</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="3rd party tool" /></FormControl><FormLabel className="font-normal">3rd party tool</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="other" /></FormControl><FormLabel className="font-normal">Other</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="setupComplexity" render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Set Up Complexity</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Easy" /></FormControl><FormLabel className="font-normal">Easy</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Medium" /></FormControl><FormLabel className="font-normal">Medium</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Hard" /></FormControl><FormLabel className="font-normal">Hard</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="hoursSaved" render={({ field }) => (
              <FormItem><FormLabel>Approx. Hours Saved Per Week</FormLabel><FormControl><Input type="number" placeholder="e.g., 4" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <Separator />

            <FormField control={form.control} name="task" render={({ field }) => (
              <FormItem><FormLabel>The Task</FormLabel><FormControl><Textarea placeholder="What was the original task you needed to accomplish?" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="problem" render={({ field }) => (
              <FormItem><FormLabel>The Problem</FormLabel><FormControl><Textarea placeholder="What made this task difficult, repetitive, or time-consuming?" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="solution" render={({ field }) => (
              <FormItem><FormLabel>The Solution</FormLabel><FormControl><Textarea placeholder="How did you use AI to solve the problem? Which tool did you use?" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <DialogFooter className="pt-4">
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Use Case'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function MyAiPage() {
  // State for the reporting form
  const [win, setWin] = useState('');
  const [challenge, setChallenge] = useState('');
  const [hoursSaved, setHoursSaved] = useState<number | ''>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // State for support form
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  // User Profile State
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Placeholder user ID - in a real app, this would come from auth
      const userId = "test-user-123"; 
      const profile = await getOrCreateUserProfile(userId);
      setCurrentUserProfile(profile);
    };
    fetchUserProfile();
  }, []);

  // Mock stats - in a real app, this would be fetched from Firestore
  const userStats = {
    reportsSubmitted: currentUserProfile?.reportsSubmitted || 0,
    totalHoursSaved: currentUserProfile?.totalHoursSaved || 0,
    mostRecentWin: 'Automated a weekly sales summary', // This would also come from user data
    openChallenges: 1, // This would also come from user data
  };
  
  const handleReportSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Mock submission
    setTimeout(() => {
        setIsLoading(false);
        setSubmissionSuccess(true);
        setTimeout(() => setSubmissionSuccess(false), 4000);
    }, 1000);
  };
  
  const handleSupportSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // This would trigger an email or create a support ticket in a real app
      window.location.href = `mailto:joe@tradieai.com?subject=${encodeURIComponent(supportSubject)}&body=${encodeURIComponent(supportMessage)}`;
  }

  return (
    <div className="py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">My AI Hub</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your personal dashboard to track progress, save favorites, and get support.
        </p>
      </header>

      {/* User's Personal Stats Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-8">Your Stats At a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Reports Submitted</CardTitle><BarChart className="h-6 w-6 text-blue-500" /></CardHeader>
            <CardContent><div className="text-2xl font-bold">{userStats.reportsSubmitted}</div></CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Hours Saved</CardTitle><Clock className="h-6 w-6 text-green-500" /></CardHeader>
            <CardContent><div className="text-2xl font-bold">{userStats.totalHoursSaved}</div></CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Most Recent Win</CardTitle><Award className="h-6 w-6 text-yellow-500" /></CardHeader>
            <CardContent><p className="text-sm truncate">{userStats.mostRecentWin}</p></CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Open Challenges</CardTitle><MessageSquareWarning className="h-6 w-6 text-red-500" /></CardHeader>
            <CardContent><div className="text-2xl font-bold">{userStats.openChallenges}</div></CardContent>
          </Card>
        </div>
      </section>

      {/* Badges Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-8">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUserProfile?.earnedBadges.length === 0 ? (
            <p className="text-center text-muted-foreground lg:col-span-3">No badges earned yet. Keep exploring and submitting reports!</p>
          ) : (
            currentUserProfile?.earnedBadges.map(badgeId => {
              const badge = getBadgeById(badgeId);
              if (!badge) return null;
              const IconComponent = ({
                FileText,
                BrainCircuit,
                Award,
                Lightbulb,
                Wrench,
                BookOpen,
                Users,
              } as any)[badge.icon]; // Dynamically get icon component

              return (
                <Card key={badge.id} className="flex items-center p-4 gap-4">
                  {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                  <div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    <CardDescription>{badge.description}</CardDescription>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </section>

      {/* Main Content Area with Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <Tabs defaultValue="report">
                <TabsList className="grid h-auto w-full grid-cols-4 rounded-lg bg-lime-300 p-1">
                    <TabsTrigger value="report" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Submit Report</TabsTrigger>
                    <TabsTrigger value="prompts" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">My Prompts</TabsTrigger>
                    <TabsTrigger value="tools" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">My Tools</TabsTrigger>
                    <TabsTrigger value="notes" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">My Notes</TabsTrigger>
                </TabsList>
                
                {/* Submit Report Tab */}
                <TabsContent value="report">
                    <Card className="mt-4">
                        <CardHeader><CardTitle>Submit Your Monthly Feedback</CardTitle><CardDescription>This report will be sent to your line manager and/or Carey Burt.</CardDescription></CardHeader>
                        <CardContent>
                          {submissionSuccess ? (
                              <div className="text-center py-10"><CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" /><h3 className="text-2xl font-semibold">Report Submitted!</h3><p className="text-muted-foreground">Thank you for your valuable feedback.</p></div>
                          ) : (
                            <form onSubmit={handleReportSubmit} className="space-y-6">
                                <div className="space-y-2"><Label htmlFor="ai-win">Biggest AI win this month?</Label><Textarea id="ai-win" value={win} onChange={(e) => setWin(e.target.value)} placeholder="e.g., Used an AI to write a sales proposal..." required /></div>
                                <div className="space-y-2"><Label htmlFor="ai-challenge">Biggest AI challenge this month?</Label><Textarea id="ai-challenge" value={challenge} onChange={(e) => setChallenge(e.target.value)} placeholder="e.g., The AI tool gave me incorrect information..." required /></div>
                                <div className="space-y-2"><Label htmlFor="hours-saved">Approximate hours saved this month using AI?</Label><Input id="hours-saved" value={hoursSaved} onChange={(e) => setHoursSaved(e.target.value === '' ? '' : Number(e.target.value))} type="number" placeholder="e.g., 8" required /></div>
                                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit Report'}</Button>
                            </form>
                          )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* My Prompts Tab */}
                <TabsContent value="prompts">
                     <Card className="mt-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>My Favorite Prompts</CardTitle>
                                <CardDescription>Your personal collection of effective prompts.</CardDescription>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm"><PlusCircle className="h-4 w-4 mr-2"/>Add New</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add a New Prompt</DialogTitle>
                                        <DialogDescription>Save a new prompt to your personal library.</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <Input placeholder="Prompt Title" />
                                        <Textarea placeholder="Paste your prompt here..." />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Save Prompt</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {userFavoritePrompts.map(p => (
                                <div key={p.id} className="p-4 border rounded-lg flex justify-between items-center"><p className="font-semibold truncate pr-4">{p.title}</p><Button variant="ghost" size="sm"><Clipboard className="h-4 w-4 mr-2"/>Copy</Button></div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                
                {/* My Tools Tab */}
                <TabsContent value="tools">
                     <Card className="mt-4">
                        <CardHeader><CardTitle>My Go-To Tools</CardTitle><CardDescription>A quick-access list of your most used AI tools.</CardDescription></CardHeader>
                        <CardContent className="space-y-4">
                            {userFavoriteTools.map(t => (
                                <div key={t.id}>{t.name}</div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                
                {/* My Notes Tab */}
                 <TabsContent value="notes">
                     <Card className="mt-4">
                        <CardHeader><CardTitle>My AI Knowledge Base</CardTitle><CardDescription>Your personal notepad for AI tips, tricks, and learnings.</CardDescription></CardHeader>
                        <CardContent>
                            <Textarea placeholder="Start typing your notes here..." rows={12} />
                        </CardContent>
                        <CardFooter><Button>Save Notes</Button></CardFooter>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
        
        {/* Side Column for Support */}
        <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary"/>Need Help?</CardTitle><CardDescription>Get technical support or ask a question.</CardDescription></CardHeader>
                <CardContent>
                    <form onSubmit={handleSupportSubmit} className="space-y-4">
                        <div className="space-y-2"><Label htmlFor="support-subject">Subject</Label><Input id="support-subject" value={supportSubject} onChange={e => setSupportSubject(e.target.value)} placeholder="e.g., Trouble with Zoom AI Companion" required/></div>
                        <div className="space-y-2"><Label htmlFor="support-message">Message</Label><Textarea id="support-message" value={supportMessage} onChange={e => setSupportMessage(e.target.value)} placeholder="Please describe your issue..." required/></div>
                        <Button type="submit" className="w-full">Email Joe Ward</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>

      {/* Share a Use Case Section */}
      <section className="mt-12">
        <Card className="text-center p-8 bg-muted/50">
          <CardHeader className="p-0">
            <FileSignature className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Share Your Success</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">Have you found a great way to use AI? Share it with the organization by creating a use case. Your findings will appear on the Use Cases page.</p>
            <CreateUseCaseForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}