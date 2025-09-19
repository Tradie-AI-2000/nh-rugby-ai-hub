import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenSquare, BarChart, MessageSquare } from "lucide-react";

const promptLibrary = {
  "Marketing": {
    icon: <PenSquare className="h-8 w-8 text-pink-500" />,
    prompts: [
      {
        title: "Generate Product Descriptions",
        prompt: "Write a compelling product description for a new line of high-adhesion sports tape designed for professional athletes. Highlight its durability, water-resistance, and flexibility.",
      },
      {
        title: "Create Social Media Posts",
        prompt: "Generate 5 engaging social media posts for Instagram and Twitter announcing our new eco-friendly packaging for d3 tapes. Include relevant hashtags.",
      },
    ],
  },
  "Sales": {
    icon: <BarChart className="h-8 w-8 text-red-500" />,
    prompts: [
      {
        title: "Draft a Follow-Up Email",
        prompt: "Write a follow-up email to a potential B2B client who requested a sample of our kinesiology tape. The email should be friendly, informative, and aim to schedule a call.",
      },
    ],
  },
  "Customer Support": {
    icon: <MessageSquare className="h-8 w-8 text-cyan-500" />,
    prompts: [
      {
        title: "Respond to a Customer Inquiry",
        prompt: "A customer is asking about the best way to apply our rigid strapping tape for ankle support. Provide clear, step-by-step instructions.",
      },
    ],
  },
};

export default function PromptLibraryPage() {
  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">Prompt Library</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A curated collection of effective prompts to get the most out of AI.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(promptLibrary).map(([category, data]) => (
          <Card key={category} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                {data.icon}
                <CardTitle className="text-2xl">{category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              {data.prompts.map((prompt) => (
                <div key={prompt.title} className="rounded-md border p-4">
                  <h4 className="font-semibold">{prompt.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{prompt.prompt}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
