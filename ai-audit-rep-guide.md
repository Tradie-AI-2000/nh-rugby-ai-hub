# Technical Guide: Replicating the AI Audit Page

This document provides instructions for an AI agent to understand and replicate the self-contained "AI Audit" page from the TradieAI Process Automator project.

## 1. Overview & Purpose

The `ai-audit` page is a comprehensive, single-page questionnaire designed to gather detailed information about an employee's role, processes, and pain points. It is built as a self-contained Next.js page component, making it highly portable.

**File Location:**`/src/app/dashboard/ai-audit/page.tsx`

## 2. Core Dependencies

To replicate this component, ensure the target project has the following npm packages installed:

-**Framework:**`next` (with App Router), `react`

-**UI Components (ShadCN/UI):**`button`, `form`, `input`, `textarea`, `card`, `separator`, `accordion`, `checkbox`, `avatar`, `toast`. These are located in `/src/components/ui/`.

-**Icons:**`lucide-react`

-**Form Management:**`react-hook-form`

-**Schema Validation:**`zod`

-**Form Resolver:**`@hookform/resolvers`

-**Styling:**`tailwindcss`

-**Server Actions:** This is a core Next.js feature.

## 3. Data Structure & Validation

The form's structure, validation rules, and data types are defined in `/src/lib/types.ts` using Zod. This is a critical dependency.

**File:**`/src/lib/types.ts`

```typescript

import { z } from'zod';


exportconstProcessStepSchema= z.object({

  description: z.string().min(1, 'Step description is required.'),

});


exportconstDrillDownProcessSchema= z.object({

  processName: z.string().min(1, 'Process name is required.'),

  steps: z.array(ProcessStepSchema).min(1, 'At least one step is required.'),

});


exportconstQuestionnaireSchema= z.object({

  name: z.string().min(1, 'Name is required.'),

  role: z.string().min(1, 'Role is required.'),

  roleAndTeam: z.string().min(1, 'Role and team overview is required.'),

  teamGoals: z.string().min(1, 'Team goals are required.'),

  teamStructure: z.string().min(1, 'Team structure is required.'),

  criticalProcesses: z.string().min(1, 'Critical processes are required.'),

  bottlenecks: z.string().min(1, 'Bottlenecks are required.'),

  hourConsumingTasks: z.string().min(1, 'Hour-consuming tasks are required.'),


  dailyTasks: z.array(z.object({ description: z.string().min(1, 'Task description is required.') })).min(1, 'At least one daily task is required.'),

  taskTimeSplit: z.string().min(1, 'Time split is required.'),

  dailySoftware: z.string().min(1, 'Daily software is required.'),

  aiAssistants: z.object({

    chatgpt: z.boolean(),

    gemini: z.boolean(),

    perplexity: z.boolean(),

    claude: z.boolean(),

    grok: z.boolean(),

    other: z.boolean(),

  }).partial().refine(data=> Object.values(data).some(v=> v), {

    message: "At least one AI assistant must be selected if the section is used.",

  }).optional(),

  otherAiAssistant: z.string().optional(),

  otherAiTools: z.string().optional(),

  toolFrustrations: z.string().min(1, 'Tool frustrations are required.'),

  dataEntry: z.string().min(1, 'Data entry details are required.'),

  biggestChallenges: z.string().min(1, 'Biggest challenges are required.'),

  boringTasks: z.string().min(1, 'Boring tasks are required.'),

  assistantTasks: z.string().min(1, 'Assistant tasks are required.'),

  magicWand: z.string().min(1, 'Magic wand solution is required.'),

  inefficiencyCause: z.string().min(1, 'Inefficiency cause is required.'),

  workTracking: z.string().min(1, 'Work tracking method is required.'),

  aiTraining: z.string().min(1, 'AI training preference is required.'),


  drillDownProcesses: z.array(DrillDownProcessSchema),


  futureVision: z.string().min(1, 'Future vision is required.'),

  techAdoption: z.string().min(1, 'Tech adoption question is required.'),

  freeText: z.string().optional(),

});


exporttypeQuestionnaireData=z.infer<typeof QuestionnaireSchema>;

```

## 4. Form Submission (Server Action)

Form submission is handled by a Next.js Server Action defined in `/src/lib/actions.ts`. This function validates the incoming data against the `QuestionnaireSchema` and saves it to a Firestore database.

**File:**`/src/lib/actions.ts`

```typescript

'use server';


import { QuestionnaireSchema, type QuestionnaireData } from'@/lib/types';

import { db } from'@/lib/firebase'; // Assumes Firebase is initialized

import { collection, addDoc, serverTimestamp } from'firebase/firestore';


typeActionResult= {

success:boolean;

error?:string;

};


exportasyncfunctionprocessQuestionnaire(formData:QuestionnaireData):Promise<ActionResult> {

constvalidationResult= QuestionnaireSchema.safeParse(formData);

if (!validationResult.success) {

return { success: false, error: 'Invalid form data. Please check all fields.' };

  }


try {

constdocRef=awaitaddDoc(collection(db, "submissions"), {

...validationResult.data,

      createdAt: serverTimestamp(),

      status: 'New'

    });

return { success: true };

  } catch (e) {

    console.error("Error adding document: ", e);

return { success: false, error: 'Failed to save submission.' };

  }

}

```

## 5. Main Component Code

The page is constructed from several nested functional components, all within the same file.

**File:**`/src/app/dashboard/ai-audit/page.tsx`

```typescript

'use client';


import { zodResolver } from'@hookform/resolvers/zod';

import { useFieldArray, useForm, useFormContext } from'react-hook-form';

import { Button } from'@/components/ui/button';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from'@/components/ui/form';

import { Input } from'@/components/ui/input';

import { Textarea } from'@/components/ui/textarea';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from'@/components/ui/card';

import { Separator } from'@/components/ui/separator';

import { PlusCircle, Trash2 } from'lucide-react';

import { useState } from'react';

import { QuestionnaireSchema, type QuestionnaireData } from'@/lib/types';

import { useToast } from'@/hooks/use-toast';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from'@/components/ui/accordion';

import { Checkbox } from"@/components/ui/checkbox";

import { processQuestionnaire } from'@/lib/actions';

import Image from'next/image';

import { Avatar, AvatarFallback, AvatarImage } from'@/components/ui/avatar';

import { Logo } from'@/components/logo';


functionJoesSignoff() {

return (

<section className="text-center">

<Card className="max-w-2xl mx-auto overflow-hidden">

<CardHeader className="flex flex-row items-center justify-between">

           <CardTitle>A message from Wilson Consumer</CardTitle>

<Logo />

</CardHeader>

<CardContent className="p-6 text-left space-y-4">

<div className="flex items-start gap-4">

<Avatar className="w-20 h-20 border">

<AvatarImage src="https://static.wixstatic.com/media/7b20bf_d3848bcfab464ba89477260bf5186b39~mv2.png" data-ai-hint="man portrait"/>

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

              <p>Ph:021993285</p>

              <p>Email:joe@tradieai.co.nz</p>

              <p>Web:www.tradieai.co.nz</p>

</div>

</CardContent>

</Card>

</section>

  );

}



functionQuestionnaireForm() {

const [isLoading, setIsLoading] =useState(false);

const { toast } =useToast();


constform=useForm<QuestionnaireData>({

    resolver: zodResolver(QuestionnaireSchema),

    defaultValues: {

      name: 'John Doe',

      role: 'Project Manager',

      roleAndTeam: 'I am a Project Manager leading a team of 5 developers. We are responsible for delivering web applications for our clients.',

      teamGoals: 'Our main goal this quarter is to improve project delivery time by 15% and reduce bugs reported by clients by 20%.',

      teamStructure: 'I report to the Head of Engineering. The development team reports to me.',

      criticalProcesses: 'The most critical processes are project planning, client communication, and final delivery.',

      bottlenecks: 'The biggest bottleneck is the manual testing process and coordinating feedback from multiple stakeholders.',

      hourConsumingTasks: 'Manual testing and report generation consume the most hours.',

      dailyTasks: [

        { description: 'Daily stand-up meetings' },

        { description: 'Reviewing project progress' },

        { description: 'Client communication' }

      ],

      taskTimeSplit: '60% on core responsibilities, 40% on administrative tasks.',

      dailySoftware: 'Jira, Slack, Google Suite, and VS Code.',

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


const { fields: dailyTaskFields, append: appendDailyTask, remove: removeDailyTask } =useFieldArray({

    control: form.control,

    name: 'dailyTasks',

  });


const { fields: drillDownProcessFields, append: appendDrillDownProcess, remove: removeDrillDownProcess } =useFieldArray({

    control: form.control,

    name: 'drillDownProcesses',

  });


asyncfunctiononSubmit(data:QuestionnaireData) {

setIsLoading(true);


constresult=awaitprocessQuestionnaire(data);


if (result.success) {

toast({

        title: "Submission Received!",

        description: "Thank you for completing the questionnaire.",

      });

      form.reset();

    } else {

toast({

        title: "Submission Failed",

        description: result.error ||"An unknown error occurred.",

        variant: "destructive",

      });

    }


setIsLoading(false);

  }


constaiAssistantOptions= [

    { id: 'chatgpt', label: 'ChatGPT' },

    { id: 'gemini', label: 'Gemini' },

    { id: 'perplexity', label: 'Perplexity' },

    { id: 'claude', label: 'Claude' },

    { id: 'grok', label: 'Grok' },

    { id: 'other', label: 'Other' },

  ] asconst;


functionProcessStepsArray({ index }: { index:number }) {

const { control } =useFormContext<QuestionnaireData>();

const { fields, append, remove } =useFieldArray({

      control,

      name: `drillDownProcesses.${index}.steps`,

    });


constplaceholders= [

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

<PlusCircle className="mr-2 h-4 w-4"/>

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


          {/* ... Other FormField sections omitted for brevity ... */}


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


export default functionAiAuditPage() {

return (

<div className="py-8">

<section className="relative w-full h-80 rounded-lg overflow-hidden mb-8">

<Image

          src="https://static.wixstatic.com/media/7b20bf_ddf0a62d1a224ea587d9f897d22c0bc4~mv2.png"

          alt="AI Audit"

fill

          objectFit="cover"

          className="absolute inset-0"

          data-ai-hint="abstract shapes"

/>

<div className="absolute inset-0 bg-black/50"/>

</section>


<header className="text-center mb-8">

<h1 className="text-5xl md:text-4xl font-extrabold tracking-tight text-primary">Unlock Your Productivity with AI.</h1>

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


<div className="pt-8">

<QuestionnaireForm />

</div>

<div className="pb-8">

<Separator className="my-8"/>

        <section>

<JoesSignoff />

</section>

</div>

</div>

  );

}

```

***Note:****The full code for all form fields in `QuestionnaireForm` has been omitted from this guide for brevity, but the structure is demonstrated. The full implementation can be found in the original file.*
