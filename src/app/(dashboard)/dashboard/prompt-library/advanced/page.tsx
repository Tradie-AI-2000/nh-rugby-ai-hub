'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AdvancedPromptingPage() {
  return (
    <div className="py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">Advanced Prompting Tutorial</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Context engineering and grounding the AI.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Prompting</CardTitle>
          <CardDescription>
            Tutorial content coming soon...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page will contain the tutorial, examples, and use cases for advanced prompt engineering.</p>
        </CardContent>
      </Card>
    </div>
  );
}