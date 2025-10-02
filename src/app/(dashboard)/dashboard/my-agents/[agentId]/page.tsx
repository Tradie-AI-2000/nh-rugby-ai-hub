'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, PenSquare, BarChart, FileText, Calendar, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const agentDetails: Record<string, { title: string; description: string; icon: React.ReactNode, placeholder: string }> = {
  'marketing-agent': {
    title: 'Marketing Agent',
    description: 'This agent is your creative partner for all things marketing. Provide it with a task, context, and a clear goal, and it will help you generate high-quality marketing materials. You can ask it to brainstorm campaign ideas, write social media posts, draft email newsletters, or create ad copy. For best results, give it specific information like your target audience, brand voice, and the product you\'re promoting.',
    icon: <PenSquare className="h-8 w-8 text-pink-500" />,
    placeholder: "e.g., Write 3 Facebook posts for our new snack bar..."
  },
  'report-summarizer': {
    title: 'Weekly Sales Report Summarizer',
    description: 'This agent is currently under development. Soon, you will be able to upload your weekly sales CSV, and this agent will generate a concise, bullet-pointed summary highlighting key trends, top performers, and areas for concern.',
    icon: <BarChart className="h-8 w-8 text-blue-500" />,
    placeholder: "Report Summarizer is not yet active."
  },
   'meeting-preparer': {
    title: 'Client Meeting Prep Agent',
    description: 'This agent is currently under development. Soon, you will be able to provide a client\'s name, and this agent will scour internal documents and the web to create a one-page briefing document for your next meeting.',
    icon: <FileText className="h-8 w-8 text-green-500" />,
     placeholder: "Meeting Prep Agent is not yet active."
  },
  'calendar-optimizer': {
    title: 'Calendar Scheduling Assistant',
    description: 'This agent is currently under development. Soon, this agent will help you find the optimal time for a meeting with multiple internal and external stakeholders, avoiding endless email chains.',
    icon: <Calendar className="h-8 w-8 text-purple-500" />,
    placeholder: "Calendar Optimizer is not yet active."
  },
  'vertex-ai-agent': {
    title: 'Vertex AI Agent',
    description: 'This agent is connected to a custom-built system on Vertex AI. You can ask it questions about internal processes, product information, or any other topic it has been trained on.',
    icon: <Bot className="h-8 w-8 text-teal-500" />,
    placeholder: "Ask a question to the Vertex AI agent..."
  },
  'echo-agent': {
    title: 'Echo Agent (Test)',
    description: 'A simple agent for testing the A2A connection. It will echo back whatever you type.',
    icon: <Bot className="h-8 w-8 text-gray-500" />,
    placeholder: "Type anything to get an echo..."
  },
};

interface Message {
  text: string;
  sender: 'user' | 'agent';
}

export default function AgentChatPage() {
  const params = useParams();
  const agentId = params.agentId as string;
  const agent = agentDetails[agentId] || { title: 'Unknown Agent', description: 'Agent not found.', icon: <Bot />, placeholder: 'Enter your message...' };
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Generate a unique session ID when the component mounts
    setSessionId(uuidv4());
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // STUB: Temporarily disabled to prevent build errors.
      // Returns a placeholder message instead of calling the AI flow.
      const isAgentActive = agentId === 'marketing-agent' || agentId === 'vertex-ai-agent' || agentId === 'echo-agent';
      let agentMessage: Message;

      if (isAgentActive) {
        agentMessage = { text: `This is a placeholder response from ${agent.title}. AI functionality is currently disabled.`, sender: 'agent' };
      } else {
        agentMessage = { text: 'This agent is not active yet.', sender: 'agent' };
      }
      
      // Simulate a network delay
      setTimeout(() => {
        setMessages(prev => [...prev, agentMessage]);
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error(`Error calling ${agentId}:`, error);
      const errorMessage: Message = { text: 'Sorry, I encountered an error. Please try again.', sender: 'agent' };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const isAgentActive = agentId === 'marketing-agent' || agentId === 'vertex-ai-agent' || agentId === 'echo-agent';

  return (
    <div className="py-8 flex flex-col h-[calc(100vh_-_theme(spacing.16))]">
      <Card className="flex-grow flex flex-col">
        <CardHeader className="flex flex-row items-start gap-4 p-4 border-b">
          {agent.icon}
          <div>
            <CardTitle className="text-2xl">{agent.title}</CardTitle>
            <CardDescription className="mt-1">{agent.description}</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Sparkles className="h-16 w-16 mb-4"/>
                <h3 className="text-xl font-semibold">Start the Conversation</h3>
                <p>This is the beginning of your chat with the {agent.title}.</p>
             </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={cn("flex items-start gap-4", message.sender === 'user' ? 'justify-end' : '')}>
                {message.sender === 'agent' && (
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  "max-w-md p-3 rounded-lg whitespace-pre-wrap",
                  message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border">
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                 <div className="max-w-md p-3 rounded-lg bg-muted flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Thinking...</span>
                </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={agent.placeholder}
              disabled={isLoading || !isAgentActive}
            />
            <Button type="submit" disabled={isLoading || !input.trim() || !isAgentActive}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
