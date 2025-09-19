import React from 'react';
import Link from 'next/link';
import { Home, Book, Bot, Lightbulb, Library, HardHat, Briefcase, FileText, BarChart, MessageSquare } from 'lucide-react';
import { Logo } from '@/components/logo';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/your-ai-report', icon: FileText, label: 'My AI' },
  { href: '/dashboard/my-agents', icon: Bot, label: 'My Agents' },
  { href: '/dashboard/my-automations', icon: Bot, label: 'My Automations' },
  { href: '/dashboard/ai-playbook', icon: Book, label: 'AI Guidelines' },
  { href: '/dashboard/training', icon: Lightbulb, label: 'Training' },
  { href: '/dashboard/prompt-library', icon: Library, label: 'Prompt Library' },
  { href: '/dashboard/use-cases', icon: Briefcase, label: 'Use Cases' },
  { href: '/dashboard/tool-directory', icon: HardHat, label: 'Tool Directory' },
  { href: '/dashboard/ai-strategy', icon: Bot, label: 'AI Strategy' },
  { href: '/dashboard/process-analyser', icon: BarChart, label: 'Process Analyser' },
  { href: '/dashboard/chatbot', icon: MessageSquare, label: 'Chatbot' },
  
  
  
  
];

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r bg-black p-6 h-full overflow-y-auto fixed inset-y-0">
      <div className="flex items-center">
        <Logo />
      </div>
      <nav className="mt-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center rounded-md px-3 py-2 text-white font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
