import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the d3 AI Hub</h1>
      <Link href="/login" className="mt-8 text-lg text-primary underline">
        Login
      </Link>
    </div>
  );
}
