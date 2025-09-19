import { z } from'zod';


export const ProcessStepSchema= z.object({

  description: z.string().min(1, 'Step description is required.'),

});


export const DrillDownProcessSchema= z.object({

  processName: z.string().min(1, 'Process name is required.'),

  steps: z.array(ProcessStepSchema).min(1, 'At least one step is required.'),

});


export const QuestionnaireSchema= z.object({

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


export type QuestionnaireData=z.infer<typeof QuestionnaireSchema>;

// Badge Data Structure
export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string; // e.g., path to SVG or Lucide icon name
};

// User Profile Data Structure
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  questionnaireData?: QuestionnaireData; // Optional, as it might not be filled yet
  earnedBadges: string[]; // Array of badge IDs
  totalHoursSaved: number;
  reportsSubmitted: number;
  // Add other progress tracking fields here
};
