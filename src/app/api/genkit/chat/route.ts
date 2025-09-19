import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    // Forward the request to the Genkit flow endpoint
    // Genkit runs on port 4000 by default
    const genkitResponse = await fetch('http://localhost:4000/api/v1/flow/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: prompt }),
    });

    if (!genkitResponse.ok) {
      const errorText = await genkitResponse.text();
      console.error("Error from Genkit:", errorText);
      return NextResponse.json({ error: "Failed to get response from AI assistant." }, { status: genkitResponse.status });
    }

    const genkitData = await genkitResponse.json();
    
    // Assuming the Genkit flow returns an object with a 'response' field
    // Adjust this based on the actual Genkit flow output structure
    return NextResponse.json({ response: genkitData.result });

  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
