'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export default function IntermediatePromptingPage() {
  return (
    <div className="py-8">
      <section className="mb-12">
        <Image
          src="https://stellarlibrary.com/wp-content/uploads/Success-Story-FMCG-Wilsons-1024x341.jpg"
          alt="Wilson Consumer Products promotional banner"
          width={1024}
          height={341}
          className="w-full h-auto rounded-lg object-cover"
        />
      </section>
      
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">Intermediate Prompting Tutorial</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Refining your requests for more nuanced outputs.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Intermediate Prompting</CardTitle>
          <CardDescription>
            Tutorial content coming soon...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page will contain the tutorial, examples, and use cases for intermediate prompt engineering.</p>
        </CardContent>
      </Card>
    </div>
  );
}
