import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Brain, PenSquare, ShieldCheck } from "lucide-react";

const trainingCourses = [
  {
    title: "Introduction to AI",
    description: "A beginner-friendly overview of Artificial Intelligence and its potential applications at d3.",
    duration: "1 hour",
    icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Prompt Engineering Fundamentals",
    description: "Learn how to write effective prompts to get the best results from large language models like ChatGPT.",
    duration: "2 hours",
    icon: <Brain className="h-8 w-8 text-purple-500" />,
  },
  {
    title: "AI for Marketing Professionals",
    description: "Discover how to use AI for content creation, market research, and campaign optimization.",
    duration: "1.5 hours",
    icon: <PenSquare className="h-8 w-8 text-pink-500" />,
  },
  {
    title: "Responsible AI Usage",
    description: "Understand the ethical considerations and security best practices for using AI at work.",
    duration: "45 minutes",
    icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
  },
];

export default function TrainingPage() {
  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">Training</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Develop your AI skills with these courses.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trainingCourses.map((course) => (
          <Card key={course.title} className="flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
                <div className="flex items-center gap-4">
                    {course.icon}
                    <CardTitle>{course.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{course.description}</p>
            </CardContent>
            <CardDescription className="p-6 pt-0">
                {course.duration}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
