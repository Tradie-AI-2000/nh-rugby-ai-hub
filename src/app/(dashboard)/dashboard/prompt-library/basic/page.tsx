'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function BasicPromptingPage() {
  return (
    <div className="py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">Basic Prompting Tutorial</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The essentials for giving clear instructions to an AI.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Basic Prompting</CardTitle>
          <CardDescription>
            Tutorial content coming soon...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page will contain the tutorial, examples, and use cases for basic prompt engineering.</p>
        </CardContent>
      </Card>
    </div>
  );
}