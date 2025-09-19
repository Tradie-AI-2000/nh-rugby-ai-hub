"use client";

import { Chatbot } from "@/components/chatbot";
import React from "react";

export default function ChatbotPage() {
  return (
    <div className="py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">AI Chat Assistant</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your personal AI companion for quick answers and assistance.
        </p>
      </header>
      <div className="flex justify-center">
        <Chatbot />
      </div>
    </div>
  );
}
