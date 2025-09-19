
# AI Intelligence Hub - Technical README

This document serves as a technical blueprint for the AI Intelligence Hub application. It is designed to be used by developers or other AI agents to understand, maintain, and replicate the project for new clients with different branding and content.

## 1. Project Overview

The AI Intelligence Hub is a comprehensive web portal designed to help a company's employees integrate Artificial Intelligence into their daily workflows. It provides resources, training, company-specific guidelines, and a system for employees to report on their AI usage and get support. The portal also includes an administrative backend to analyze employee submissions.

**Core User-Facing Features:**

-**Home Dashboard:** A central landing page with quick links to all major sections.

-**AI Audit:** An in-depth questionnaire to map employee processes and identify automation opportunities.

-**Resource Hub:** A collection of pages including AI Guidelines, a Tool Directory, a Prompt Library, and training materials.

-**Personal Hub ("My AI"):** A user-specific area to track AI wins, challenges, and save favorite prompts/tools.

-**Admin Dashboard:** A view for administrators to see and analyze employee questionnaire submissions.

## 2. Tech Stack

-**Framework:** [Next.js](https://nextjs.org/) with App Router

-**Language:** [TypeScript](https://www.typescriptlang.org/)

-**UI Components:** [ShadCN/UI](https://ui.shadcn.com/)

-**Styling:** [Tailwind CSS](https://tailwindcss.com/)

-**Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) (for connecting to Google's Gemini models)

-**Database & Auth:** [Firebase](https://firebase.google.com/) (specifically Firestore for data)

-**Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.

## 3. Project Structure

```

.

├── src

│   ├── app

│   │   ├── (dashboard)               # Groups all authenticated routes

│   │   │   ├── dashboard

│   │   │   │   ├── home/             # The main landing page after login

│   │   │   │   ├── ai-playbook/

│   │   │   │   ├── ai-strategy/

│   │   │   │   ├── prompt-library/

│   │   │   │   ├── tool-directory/

│   │   │   │   ├── training/

│   │   │   │   ├── use-cases/

│   │   │   │   ├── your-ai-report/   # "My AI" page

│   │   │   │   └── page.tsx          # AI Audit questionnaire page

│   │   │   └── layout.tsx            # Main layout with sidebar and header

│   │   ├── admin/                    # Admin dashboard routes

│   │   ├── login/                    # Login page

│   │   ├── globals.css               # Global styles and ShadCN theme variables

│   │   ├── layout.tsx                # Root layout

│   │   └── page.tsx                  # Public landing page

│   ├── ai

│   │   ├── flows/                    # Genkit flows for AI logic

│   │   │   ├── identify-process-bottlenecks.ts

│   │   │   └── summarize-pain-points.ts

│   │   └── genkit.ts                 # Genkit initialization

│   ├── components

│   │   ├── layout/                   # Core layout components (header, sidebar)

│   │   ├── ui/                       # ShadCN UI components

│   │   ├── joes-signoff.tsx

│   │   ├── logo.tsx

│   │   └── questionnaire-form.tsx    # The main form component

│   ├── hooks/                        # Custom React hooks

│   ├── lib

│   │   ├── actions.ts                # Server-side actions (e.g., form submission)

│   │   ├── firebase.ts               # Firebase initialization

│   │   ├── types.ts                  # Zod schemas and TypeScript types

│   │   └── utils.ts                  # Utility functions (e.g., `cn` for classnames)

├── next.config.ts                    # Next.js configuration

└── tailwind.config.ts                # Tailwind CSS configuration

```

## 4. Key Systems & Customization Guide

This section outlines how to rebrand and customize the application for a new client.

### Step 1: Client Name & Branding

1.**Component: `logo.tsx` (`src/components/logo.tsx`)**

- Replace the `src` of the `<Image>` component with the new client's logo URL. Adjust width/height as needed.

2.**Layout: `layout.tsx` (`src/app/layout.tsx`)**

- Update the `metadata` object's `title` and `description` to reflect the new client's name (e.g., "ClientName AI Hub").

3.**Pages: Update text references**

-`src/app/page.tsx`: Change the main H1 title on the public landing page.

-`src/app/login/page.tsx`: Update the `CardDescription`.

-`src/app/dashboard/home/page.tsx`: Update the welcome `h1` to include the user's name (e.g., "Welcome, [Client Employee]!").

-`src/components/layout/app-layout.tsx`: Update the text in the `SidebarHeader`.

### Step 2: Color Scheme & Styling

1.**Global CSS: `globals.css` (`src/app/globals.css`)**

- The primary color scheme is controlled by HSL CSS variables in the `:root` block.

-`--primary`: The main brand color (e.g., buttons, titles).

-`--background`: The main page background color.

-`--accent`: Accent colors used for highlights and secondary elements.

- Modify these HSL values to match the new client's brand palette.

2.**Font: `tailwind.config.ts` & `layout.tsx`**

- The 'Inter' font is currently used. To change it, update the `fontFamily` in `tailwind.config.ts` and replace the Google Fonts `<link>` in `src/app/layout.tsx`.

### Step 3: Content Customization

The content for most pages is hard-coded directly within the respective `page.tsx` file.

-**AI Guidelines (`/dashboard/ai-playbook/page.tsx`):** Modify the principles and role-specific guidance.

-**Use Cases (`/dashboard/use-cases/page.tsx`):** Update the `useCases` array with client-specific success stories.

-**Tool Directory (`/dashboard/tool-directory/page.tsx`):** Modify the `toolData` array to add, remove, or update approved AI tools.

-**Prompt Library (`/dashboard/prompt-library/page.tsx`):** Update the `promptLibrary` object with prompts tailored to the new client's business functions (e.g., sales, marketing).

-**Training (`/dashboard/training/...`):** All training pages are static content that can be edited directly.

### Step 4: AI Flow Customization

The core AI logic resides in Genkit flows.

-**Location:**`src/ai/flows/`

-**Functionality:**

-`identify-process-bottlenecks.ts`: This flow takes the questionnaire data and identifies inefficiencies. The core logic is in the Handlebars prompt string. This can be fine-tuned to better suit the new client's industry.

-`summarize-pain-points.ts`: This flow creates a summary for the admin dashboard. The prompt is generic and should work for most clients but can be adjusted for a different tone or focus.

### Step 5: Form & Data Handling

-**Questionnaire:** The form fields and structure are defined in `src/components/questionnaire-form.tsx`. The validation logic is in `src/lib/types.ts` within `QuestionnaireSchema`.

-**Form Submission:** The `processQuestionnaire` function in `src/lib/actions.ts` handles saving the form data to the `submissions` collection in Firestore. This is robust and likely does not need changing.

### Step 6: Sign-off & Contact Details

-**Component: `joes-signoff.tsx` (`src/components/joes-signoff.tsx`)**

- Update the image, name, title, and contact details to reflect the new primary contact for the project.

By following these steps, the application can be efficiently rebranded and customized for a new client while retaining its core structure and functionality.
