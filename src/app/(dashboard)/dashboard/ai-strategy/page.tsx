import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, Heart, Rocket } from "lucide-react";

const strategyPillars = [
  {
    title: "Enhance Operational Efficiency",
    description: "We will leverage AI to automate repetitive tasks, optimize workflows, and improve data analysis across all departments. This will free up our employees to focus on high-value activities that require human creativity and critical thinking.",
    icon: <Zap className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Elevate Customer Experience",
    description: "AI will help us better understand and serve our customers. We will use AI to personalize marketing messages, provide faster and more accurate customer support, and gather insights from customer feedback to improve our products.",
    icon: <Heart className="h-8 w-8 text-red-500" />,
  },
  {
    title: "Foster a Culture of Innovation",
    description: "We will provide our employees with the tools and training they need to experiment with AI and discover new applications. By fostering a culture of learning and innovation, we will stay at the forefront of our industry and unlock new opportunities for growth.",
    icon: <Rocket className="h-8 w-8 text-green-500" />,
  },
];

export default function AiStrategyPage() {
  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">AI Strategy</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our vision for Artificial Intelligence at d3.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {strategyPillars.map((pillar) => (
          <Card key={pillar.title} className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                {pillar.icon}
              </div>
              <CardTitle>{pillar.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{pillar.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
