"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  QuestionnaireSchema,
  type QuestionnaireData,
} from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function QuestionnaireForm() {
  const { toast } = useToast();

  const form = useForm<QuestionnaireData>({
    resolver: zodResolver(QuestionnaireSchema),
    defaultValues: {
      role: "",
      department: "",
      tasks: "",
      painPoints: "",
      aiExperience: "None",
    },
  });

  function formatQuestionnaireDataForEmail(data: QuestionnaireData): string {
    let body = "New Questionnaire Submission:\n\n";

    body += `Role: ${data.role}\n`;
    body += `Department: ${data.department}\n`;
    body += `Main Tasks and Responsibilities: ${data.tasks}\n`;
    body += `Biggest Pain Points or Bottlenecks: ${data.painPoints}\n`;
    body += `Experience with AI Tools: ${data.aiExperience}\n`;

    return body;
  }

  function onSubmit(data: QuestionnaireData) {
    const subject = `Questionnaire Submission from ${data.role} (${data.department})`;
    const body = formatQuestionnaireDataForEmail(data);
    
    const mailtoLink = `mailto:joe@tradieai.co.nz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    toast({
      title: "Redirecting to Email Client",
      description: "Please send the generated email to complete your submission.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your role?</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Marketing Manager" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your department?</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Sales" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tasks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe your main tasks and responsibilities.</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what you do on a day-to-day basis."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="painPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are your biggest pain points or bottlenecks?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What are the most time-consuming or frustrating parts of your job?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aiExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your experience with AI tools?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
