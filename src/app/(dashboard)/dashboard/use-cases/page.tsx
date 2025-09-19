import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenSquare, BarChart, MessageSquare } from "lucide-react";

const useCases = [
  {
    title: "Streamlining Marketing Content Creation",
    department: "Marketing",
    description: "The marketing team used ChatGPT to generate initial drafts for blog posts and social media campaigns, reducing content creation time by 30% and allowing them to focus on strategy and refinement.",
    icon: <PenSquare className="h-8 w-8 text-pink-500" />,
  },
  {
    title: "Optimizing Sales Outreach",
    department: "Sales",
    description: "By using an AI-powered email assistant, the sales team was able to personalize outreach emails at scale, resulting in a 15% increase in response rates from prospective clients.",
    icon: <BarChart className="h-8 w-8 text-red-500" />,
  },
  {
    title: "Enhancing Customer Support Responses",
    department: "Customer Support",
    description: "The support team implemented a system to categorize incoming tickets and provide agents with AI-suggested answers for common questions, improving first-response time by 50%.",
    icon: <MessageSquare className="h-8 w-8 text-cyan-500" />,
  },
];

export default function UseCasesPage() {
  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">Use Cases</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover how teams at d3 are leveraging AI for success.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {useCases.map((useCase) => (
          <Card key={useCase.title} className="flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center gap-4">
                {useCase.icon}
                <CardTitle className="text-2xl">{useCase.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{useCase.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
