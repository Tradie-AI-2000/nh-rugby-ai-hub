'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { QuestionnaireSchema, type QuestionnaireData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from "@/components/ui/checkbox";
import { processQuestionnaire } from '@/lib/actions';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';

function JoesSignoff() {
  return (
    <section className="text-center">
      <Card className="max-w-2xl mx-auto overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
           <CardTitle>A message from TradieAI</CardTitle>
           <Image src="https://static.wixstatic.com/media/7b20bf_0dbf2020f3f74eebbaa018bcbec2bddf~mv2.png" alt="New Logo" width={100} height={100} />
        </CardHeader>
        <CardContent className="p-6 text-left space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20 border">
                <AvatarImage src="https://static.wixstatic.com/media/7b20bf_d3848bcfab464ba89477260bf5186b39~mv2.png" data-ai-hint="man portrait" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground italic pt-2">
                "Thanks so much for taking the time to fill out this AI questionnaire, your feedback is invaluable in helping us find the best ways to supercharge your workday."
              </p>
            </div>
            <div className="pl-24">
              <p className="font-bold">Joe Ward</p>
              <p className="text-sm text-primary">Owner | TradieAI</p>
            </div>
            <div className="text-sm text-muted-foreground pl-24">
              <p>Ph: 021 993 285</p>
              <p>Email: joe@tradieai.co.nz</p>
              <p>Web: www.tradieai.co.nz</p>
            </div>
        </CardContent>
      </Card>
    </section>
  );
}


function QuestionnaireForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuestionnaireData>({
    resolver: zodResolver(QuestionnaireSchema),
    defaultValues: {
      name: 'Carey Burt',
      role: 'Owner',
      roleAndTeam: 'I am an Operations Manager for d3 tape leading a team of 10 employees.',
      teamGoals: 'Our main goal this quarter is to improve project delivery time by 15% and reduce bugs reported by clients by 20%.',
      teamStructure: 'I dont report to anyone but i have 2 other owners that I liase with. The marketing team reports to me.',
      criticalProcesses: 'The most critical processes are project planning, client communication, and final delivery.',
      bottlenecks: 'The biggest bottleneck is juggling suppliers, product logistics process and coordinating feedback from multiple stakeholders.',
      hourConsumingTasks: 'Manual logistics planning, keeping track of marketing and clients.',
      dailyTasks: [
        { description: 'Daily stand-up meetings' },
        { description: 'Reviewing project progress' },
        { description: 'Client communication' }
      ],
      taskTimeSplit: '60% on core responsibilities, 40% on administrative tasks.',
      dailySoftware: 'Microsoft suite (xcel, docs etc), Jira, Slack.',
      aiAssistants: {
        chatgpt: true,
        gemini: false,
        perplexity: false,
        claude: false,
        grok: false,
        other: false,
      },
      otherAiAssistant: '',
      otherAiTools: 'I use GitHub Copilot for coding assistance.',
      toolFrustrations: 'Jira can be slow and clunky. Switching between different tools for communication is inefficient.',
      dataEntry: 'Yes, we copy-paste a lot of information from Slack into Jira tickets.',
      biggestChallenges: 'Managing client expectations and keeping the team motivated on long projects.',
      boringTasks: 'Manually creating weekly progress reports.',
      assistantTasks: 'I would give them the task of creating reports, scheduling meetings, and following up on action items.',
      magicWand: 'I would want a tool that automatically generates project reports and highlights potential risks.',
      inefficiencyCause: 'Lack of integration between tools and too many manual processes.',
      workTracking: 'We use Jira for task tracking and a custom spreadsheet for progress reporting.',
      aiTraining: 'I would prefer in-person workshops and online documentation.',
      drillDownProcesses: [
        {
          processName: 'Weekly Report Generation',
          steps: [
            { description: 'Gather data from Jira' },
            { description: 'Compile data into a spreadsheet' },
            { description: 'Create charts and graphs' },
            { description: 'Write a summary and email it to stakeholders' }
          ]
        }
      ],
      futureVision: 'I see a future where AI handles most of the administrative tasks, allowing my team to focus on creative and complex problem-solving.',
      techAdoption: 'My team is generally open to new technology, but a successful tool needs to be intuitive and solve a real problem.',
      freeText: 'I am excited about the potential of AI to transform our workflows.',
    },
  });
  
  const { fields: dailyTaskFields, append: appendDailyTask, remove: removeDailyTask } = useFieldArray({
    control: form.control,
    name: 'dailyTasks',
  });

  const { fields: drillDownProcessFields, append: appendDrillDownProcess, remove: removeDrillDownProcess } = useFieldArray({
    control: form.control,
    name: 'drillDownProcesses',
  });

  async function onSubmit(data: QuestionnaireData) {
    setIsLoading(true);
    
    const result = await processQuestionnaire(data);

    if (result.success) {
      toast({
        title: "Submission Received!",
        description: "Thank you for completing the questionnaire.",
      });
      form.reset();
    } else {
       toast({
        title: "Submission Failed",
        description: result.error || "An unknown error occurred.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  const aiAssistantOptions = [
    { id: 'chatgpt', label: 'ChatGPT' },
    { id: 'gemini', label: 'Gemini' },
    { id: 'perplexity', label: 'Perplexity' },
    { id: 'claude', label: 'Claude' },
    { id: 'grok', label: 'Grok' },
    { id: 'other', label: 'Other' },
  ] as const;

  // This component now lives inside QuestionnaireForm to have access to its context.
  function ProcessStepsArray({ index }: { index: number }) {
    const { control } = useFormContext<QuestionnaireData>();
    const { fields, append, remove } = useFieldArray({
      control,
      name: `drillDownProcesses.${index}.steps`,
    });
  
    const placeholders = [
        "e.g., Step 1: Open email inbox and search for client correspondence",
        "e.g., Step 2: Open accounting software and find matching client invoice",
        "e.g., Step 3: Copy invoice details into a new spreadsheet",
        "e.g., Step 4: Email the spreadsheet to the finance department",
      ];
  
    return (
      <div>
        <h4 className="text-md font-semibold">Steps</h4>
        <FormDescription className="mb-4">
          List the individual steps required to complete this process.
        </FormDescription>
        <div className="space-y-2">
          {fields.map((field, stepIndex) => (
            <FormField
              control={control}
              key={field.id}
              name={`drillDownProcesses.${index}.steps.${stepIndex}.description`}
              render={({ field: stepField }) => (
                <FormItem>
                  <FormLabel className={stepIndex !== 0 ? "sr-only" : ""}>Step {stepIndex + 1}</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder={placeholders[stepIndex] || `Describe step ${stepIndex + 1}`} {...stepField} />
                    </FormControl>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(stepIndex)} disabled={fields.length <= 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => append({ description: '' })} className="mt-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Step
        </Button>
      </div>
    );
  }


  return (
    <div className="py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader className="bg-muted">
              <CardTitle>AI Process Analysis Questionnaire</CardTitle>
              <CardDescription>
                Tell us about yourself. This information will help us to contextualize your processes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormDescription>Please enter your full name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Senior Accountant at a mid-sized firm" {...field} />
                    </FormControl>
                    <FormDescription>Briefly describe your current role.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted">
              <CardTitle>Role & Team Overview</CardTitle>
              <CardDescription>
                Help us understand your role and team dynamics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={form.control}
                name="roleAndTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Can you describe your role and your team's primary responsibilities?</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are the main goals or KPIs your team is responsible for this quarter/year?</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamStructure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Could you walk me through your team's structure? Who reports to whom?</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

           <Card>
            <CardHeader className="bg-muted">
              <CardTitle>Core Processes & Workflow</CardTitle>
              <CardDescription>
                A high-level look at what your team does.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={form.control}
                name="criticalProcesses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From a high level, what are the most critical processes your team manages?</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bottlenecks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where do you see the biggest bottlenecks or delays in your team's workflow?</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hourConsumingTasks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which tasks seem to consume the most man-hours or resources?</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-muted">
              <CardTitle>My Business Processes</CardTitle>
              <CardDescription>
                Describe the nuts and bolts of your workflows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Daily Role & Responsibilities */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold">Daily Role & Responsibilities</h4>
                 <div className="space-y-2">
                    <FormLabel>What are the most common tasks you perform every day?</FormLabel>
                    {dailyTaskFields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`dailyTasks.${index}.description`}
                        render={({ field: dailyTaskField }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{index + 1}.</span>
                              <FormControl>
                                <Input placeholder={`e.g., Task ${index + 1}`} {...dailyTaskField} />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeDailyTask(index)}
                                disabled={dailyTaskFields.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                     <Button type="button" variant="outline" size="sm" onClick={() => appendDailyTask({ description: '' })} className="mt-2">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add More
                    </Button>
                </div>
                <FormField control={form.control} name="taskTimeSplit" render={({ field }) => (
                  <FormItem><FormLabel>How much of your day is spent on your core responsibilities versus administrative or repetitive tasks?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Separator/>

              {/* Tools & Technology */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold">Tools & Technology</h4>
                <FormField control={form.control} name="dailySoftware" render={({ field }) => (
                  <FormItem><FormLabel>What software do you spend most of your day working in?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField
                  control={form.control}
                  name="aiAssistants"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>What AI Assistant do you currently use? (Choose all that apply)</FormLabel>
                      </div>
                      <div className="space-y-2">
                      {aiAssistantOptions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name={`aiAssistants.${item.id}`}
                          render={({ field }) => (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {form.watch('aiAssistants.other') && (
                  <FormField
                    control={form.control}
                    name="otherAiAssistant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify other AI assistant</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Custom Assistant" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="otherAiTools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What other AI Tools do you currently use in your work?</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField control={form.control} name="toolFrustrations" render={({ field }) => (
                  <FormItem><FormLabel>What do you find most frustrating about the tools you have to use?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                  <FormField control={form.control} name="dataEntry" render={({ field }) => (
                  <FormItem><FormLabel>Is there any double-entry of data or copying-and-pasting you have to do between different systems?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Separator/>
              
              {/* Pain Points & Strategic Challenges */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold">Pain Points & Strategic Challenges</h4>
                <FormField control={form.control} name="biggestChallenges" render={({ field }) => (
                  <FormItem><FormLabel>What are the biggest challenges you or your team is facing right now?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="boringTasks" render={({ field }) => (
                  <FormItem><FormLabel>What is the most boring or repetitive part of your job?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="assistantTasks" render={({ field }) => (
                  <FormItem><FormLabel>If you had an assistant, what tasks would you give them immediately?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                  <FormField control={form.control} name="magicWand" render={({ field }) => (
                  <FormItem><FormLabel>If you had a magic wand, what is the one problem you would solve for your team overnight?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                  <FormField control={form.control} name="inefficiencyCause" render={({ field }) => (
                  <FormItem><FormLabel>What do you feel is preventing your team from being more efficient or effective?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                  <FormField control={form.control} name="workTracking" render={({ field }) => (
                  <FormItem><FormLabel>How do you currently track your work or report on your progress?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Separator/>

              {/* Training */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold">Training</h4>
                <FormField control={form.control} name="aiTraining" render={({ field }) => (
                    <FormItem><FormLabel>What type of AI training would you like e.g. in person tutorials, documentation, online etc.</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted">
                <CardTitle>Process Step Drill-Down</CardTitle>
                <CardDescription>
                    Optionally, detail one or more specific, repetitive tasks from the section above. We'll analyze them for automation potential.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <Accordion type="multiple" defaultValue={["process-0"]} className="w-full space-y-4">
                {drillDownProcessFields.map((field, index) => (
                    <AccordionItem key={field.id} value={`process-${index}`} className="border-0">
                        <Card>
                        <div className="flex items-center p-6">
                            <AccordionTrigger className="hover:no-underline p-0 flex-1">
                                <h3 className="text-lg font-medium text-left">Business Process {index + 1}</h3>
                            </AccordionTrigger>
                            <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDrillDownProcess(index)}
                            disabled={drillDownProcessFields.length <= 1}
                            >
                            <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <AccordionContent>
                            <CardContent className="space-y-6 pt-0">
                            <FormField
                                control={form.control}
                                name={`drillDownProcesses.${index}.processName`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Process Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Monthly Client Invoicing" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Separator/>
                            <ProcessStepsArray index={index} />
                            </CardContent>
                        </AccordionContent>
                        </Card>
                    </AccordionItem>
                ))}
                </Accordion>
                <Button type="button" variant="outline" size="sm" onClick={() => appendDrillDownProcess({ processName: '', steps: [{ description: '' }]})} className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Process
                </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted">
                <CardTitle>Future Vision & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <FormField
                    control={form.control}
                    name="futureVision"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Where do you see the biggest opportunities for improvement for yourself and/or in your department?</FormLabel>
                        <FormControl>
                        <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="techAdoption"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>How does your team generally respond to new technology? What would make a new AI tool successful?</FormLabel>
                        <FormControl>
                        <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="freeText"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                        <Textarea rows={3} placeholder="Anything else you'd like to share?" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Questionnaire'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

    
export default function AiAuditPage() {
  return (
    <div className="py-8">
      <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-gradient">Unlock Your Productivity with AI.</h1>
      </header>

      <section className="text-center mb-8">
        <div className="max-w-4xl mx-auto">
            <p className="mt-2 text-muted-foreground">
             Welcome to our AI Audit & Process Mapping questionnaire. The foundation of any successful AI strategy is a deep understanding of your business's day-to-day operations. Our primary goal is to identify the friction points, hidden inefficiencies, and repetitive tasks that are costing you time and resources.
            </p>
            <p className="mt-2 text-muted-foreground">
             By completing this, you’re helping us lay the groundwork for a tailored automation strategy that will deliver real, measurable value. Your participation is a vital step toward creating a more streamlined and profitable business.
            </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <Card className="w-full md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle>1. What Do You Do?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100">
                First, we get a clear picture of your daily operations and the key processes that drive your business.
              </p>
            </CardContent>
          </Card>
          <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90 md:rotate-0" />
          <Card className="w-full md:w-1/3 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle>2. What Are Your Pain Points?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-100">
                Next, we pinpoint the bottlenecks, repetitive tasks, and areas where you feel the most friction.
              </p>
            </CardContent>
          </Card>
          <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90 md:rotate-0" />
          <Card className="w-full md:w-1/3 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <CardHeader>
              <CardTitle>3. Let's Start Building</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-teal-100">
                Finally, we use this insight to design and build tailored AI solutions that directly address your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <div className="pt-8">
        <QuestionnaireForm />
      </div>
      <div className="pb-8">
        <Separator className="my-8" />
        <section>
          <JoesSignoff />
        </section>
      </div>
    </div>
  );
}