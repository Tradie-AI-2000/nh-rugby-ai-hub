import { type Badge } from "./types";
import { FileText, BrainCircuit, Award, Lightbulb, Wrench, BookOpen, Users } from "lucide-react";

export const allBadges: Badge[] = [
  {
    id: "first-ai-report",
    name: "First AI Report",
    description: "Submitted your first AI Audit report.",
    icon: "FileText",
  },
  {
    id: "ai-explorer",
    name: "AI Explorer",
    description: "Visited all main sections of the AI Hub.",
    icon: "BrainCircuit",
  },
  {
    id: "efficiency-champion",
    name: "Efficiency Champion",
    description: "Logged 50+ hours saved with AI.",
    icon: "Award",
  },
  {
    id: "prompt-master",
    name: "Prompt Master",
    description: "Submitted 10 unique prompts to the library.",
    icon: "Lightbulb",
  },
  {
    id: "tool-tester",
    name: "Tool Tester",
    description: "Tried out 3 different AI tools from the directory.",
    icon: "Wrench",
  },
  {
    id: "training-graduate",
    name: "Training Graduate",
    description: "Completed all AI training modules.",
    icon: "BookOpen",
  },
  {
    id: "community-contributor",
    name: "Community Contributor",
    description: "Shared a successful AI use case.",
    icon: "Users",
  },
];

export function getBadgeById(id: string): Badge | undefined {
  return allBadges.find((badge) => badge.id === id);
}
