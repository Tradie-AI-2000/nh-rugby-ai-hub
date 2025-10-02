# AI Intelligence Hub - Technical README

This document serves as a technical blueprint for the AI Intelligence Hub application. It is designed to be used by developers or other AI agents to understand, maintain, and replicate the project for new clients with different branding and content.

## 1. Project Overview

The AI Intelligence Hub is a comprehensive web portal designed to help a company's employees integrate Artificial Intelligence into their daily workflows. It provides resources, training, company-specific guidelines, and a system for employees to report on their AI usage and get support. The portal also includes an administrative backend to analyze employee submissions.

**Core User-Facing Features:**

- **Home Dashboard:** A central landing page with quick links to all major sections.
- **AI Audit:** An in-depth questionnaire to map employee processes and identify automation opportunities.
- **Resource Hub:** A collection of pages including AI Guidelines, a Tool Directory, a Prompt Library, and training materials.
- **Personal Hub ("My AI"):** A user-specific area to track AI wins, challenges, and save favorite prompts/tools.
- **Admin Dashboard:** A view for administrators to see and analyze employee questionnaire submissions.

## 2. Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) (for connecting to Google's Gemini models)
- **Database & Auth:** [Firebase](https://firebase.google.com/) (specifically Firestore for data)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.

## 3. Project Structure

```
.
├── src
│   ├── app
│   │   ├── (dashboard)               # Groups all authenticated routes
│   │   │   ├── dashboard
│   │   │   │   ├── ai-playbook/
│   │   │   │   ├── ai-strategy/
│   │   │   │   ├── process-analyser/ # AI Audit questionnaire page
│   │   │   │   ├── prompt-library/
│   │   │   │   ├── tool-directory/
│   │   │   │   ├── training/
│   │   │   │   ├── use-cases/
│   │   │   │   ├── your-ai-report/   # "My AI" page
│   │   │   │   └── page.tsx          # The main landing page after login
│   │   │   └── layout.tsx            # Main layout with sidebar and header
│   │   ├── admin/                    # Admin dashboard routes
│   │   ├── login/
│   │   │   └── email-password/       # Email/Password login page
│   │   ├── globals.css               # Global styles and ShadCN theme variables
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Public landing page (redirects to /login)
│   ├── ai
│   │   └── flows/                    # Genkit flows for AI logic
│   ├── components
│   │   ├── layout/                   # Core layout components (header, sidebar)
│   │   ├── ui/                       # ShadCN UI components
│   │   ├── logo.tsx
│   │   └── questionnaire-form.tsx    # The main form component
│   ├── hooks/                        # Custom React hooks
│   ├── lib
│   │   ├── actions.ts                # Server-side actions (e.g., form submission)
│   │   ├── firebase.ts               # Firebase initialization
│   │   ├── types.ts                  # Zod schemas and TypeScript types
│   │   └── utils.ts                  # Utility functions
├── next.config.ts                    # Next.js configuration
└── tailwind.config.ts                # Tailwind CSS configuration
```

## 4. Key Systems & Customization Guide

This section outlines how to rebrand and customize the application for a new client.

### Step 1: Global Search & Replace

To quickly update the most common branding elements, perform a global, case-sensitive search and replace across the entire project for the following placeholders.

1.  **Previous Client Name:** Search for the old client's name (e.g., `d3`) and replace it with the new client's name.
2.  **Previous Client Name (Possessive):** Search for the possessive form (e.g., `d3's`) and replace it with the new client's possessive name.
3.  **Previous Contact Person:** Search for the old contact person's name (e.g., `Carey Burt`) and replace it with the new contact's name.

This will automatically update most of the text content within the application.

### Step 2: Branding and Metadata

1.  **Component: `logo.tsx` (`src/components/logo.tsx`)**
    -   Replace the `src` of the `<Image>` component with the new client's logo URL. Do the same for the `LargeLogo` component inside `src/app/login/page.tsx`.

2.  **Layout: `layout.tsx` (`src/app/layout.tsx`)**
    -   Update the `metadata` object's `title` and `description` to reflect the new client's name (e.g., "ClientName AI Hub").

3.  **Dashboard Welcome Message: `page.tsx` (`src/app/(dashboard)/dashboard/page.tsx`)**
    -   Update the placeholder `userName` constant with a relevant name for the new client.

### Step 3: Color Scheme & Styling

1.  **Global CSS: `globals.css` (`src/app/globals.css`)**
    -   The primary color scheme is controlled by HSL CSS variables in the `:root` block.
    -   `--primary`: The main brand color (e.g., buttons, titles).
    -   Modify these HSL values to match the new client's brand palette.

2.  **Font: `tailwind.config.ts` & `layout.tsx`**
    -   The 'Inter' font is currently used. To change it, update the `fontFamily` in `tailwind.config.ts` and replace the Google Fonts `<link>` in `src/app/layout.tsx`.

### Step 4: Content Customization

The content for most pages is hard-coded directly within the respective `page.tsx` file. The global search-and-replace should handle most name changes, but you may need to tailor the content further.

-   **AI Guidelines (`/dashboard/ai-playbook/page.tsx`):** Modify the principles and role-specific guidance.
-   **Use Cases (`/dashboard/use-cases/page.tsx`):** The `mockUseCases` array contains fallback examples. These should be updated with client-specific success stories.
-   **Prompt Library (`/dashboard/prompt-library/page.tsx`):** Update the `promptLibrary` object with prompts tailored to the new client's business functions.
-   **Training Pages (`/dashboard/training/...`):** All training pages contain static content that can be edited directly.

### Step 5: Form & Data Handling

-   **Questionnaire Defaults: `process-analyser/page.tsx` (`src/app/(dashboard)/dashboard/process-analyser/page.tsx`)**
    -   The `QuestionnaireForm` component contains default values for the form fields. Update the `defaultValues` object inside the `useForm` hook to provide relevant examples for the new client.
-   **Form Submission:** The `processQuestionnaire` function in `src/lib/actions.ts` handles saving form data to Firestore. This is robust and likely does not need changing.

### Step 6: Sign-off & Contact Details

-   **Component: `JoesSignoff` (within `src/app/(dashboard)/dashboard/process-analyser/page.tsx`)**
    -   This component is displayed at the bottom of the AI Audit page.
    -   Update the image, name, title, and contact details to reflect the new primary contact for the project.

## 7. Development & Troubleshooting

### Running the Development Server

To run the application locally, you need to run both the Next.js frontend server and the Genkit AI flow server.

1.  **Install Dependencies:** If you haven't already, install the project dependencies.
    ```bash
    npm install
    ```

2.  **Run Servers:** Open two terminal tabs or run the processes in the background.
    ```bash
    # Run the Next.js frontend (usually on http://localhost:3000 or a specified port)
    npm run dev

    # In a separate terminal, run the Genkit flows
    npm run genkit:dev
    ```

### Common Build Errors & Fixes

If you encounter build errors after cloning or modifying the project, here are some common solutions:

-   **`Module not found: Can't resolve '[some-package]'`**:
    -   This indicates a missing dependency. The `react-email` suite, in particular, may require specific packages. Install the missing package directly.
    -   Example: `npm install @react-email/components @react-email/render`

-   **`Parsing ecmascript source code failed ... Expected '>'` in a `.ts` file**:
    -   This happens when a TypeScript file (`.ts`) contains JSX syntax (e.g., `<MyComponent />`).
    -   **Fix:** Rename the file to have a `.tsx` extension (e.g., `my-file.ts` -> `my-file.tsx`).

-   **`EADDRINUSE: address already in use`**:
    -   This means another process is already running on the required port (e.g., 3000, 9003).
    -   **Fix:** Find and stop the existing process. On macOS/Linux, you can use: `lsof -t -i:[PORT] | xargs kill -9` (replace `[PORT]` with the port number).

-   **General Build Failures or "Module not found" for core packages:**
    -   Your `node_modules` directory may be out of sync or corrupted.
    -   **Fix:** Perform a clean re-installation of all dependencies:
        ```bash
        rm -rf node_modules package-lock.json
        npm install
        ```

### Git Remote Management

When cloning a project that was previously linked to a remote repository, ensure your local Git remote is correctly configured for the *new* repository.

-   **Check Current Remote:** Use `git remote -v` to see where your local repository is currently configured to push and fetch from.
-   **Update Remote:** If the remote points to an old or incorrect repository:
    1.  Remove the old remote: `git remote remove origin`
    2.  Add the new remote: `git remote add origin [NEW_REPOSITORY_URL]` (e.g., `https://github.com/your-org/your-new-project.git`)
    3.  Push your changes, setting the upstream: `git push -u origin main` (or your primary branch name).

## 8. Deployment

This project is designed for deployment on [Vercel](https://vercel.com/), which offers excellent native support for Next.js applications and provides a seamless continuous deployment experience.

### Initial Deployment Setup (New Project)

If this is a new project being deployed for the first time:

1.  **Create a Git Repository:** Ensure your project is pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket).
2.  **Import to Vercel:**
    *   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click "Add New..." -> "Project".
    *   Select the Git repository where this project is hosted. Vercel will automatically detect it as a Next.js application.
3.  **Configure Environment Variables:**
    *   Navigate to your Vercel project settings ("Settings" -> "Environment Variables").
    *   Add any necessary environment variables for your application (e.g., Firebase API keys, Google Cloud Project IDs, Genkit-related secrets). These are crucial for the application to function correctly in a production environment.
4.  **Build & Deploy:** Vercel will automatically build and deploy your application. Subsequent pushes to your linked Git branch will trigger automatic redeployments.

### Environment Variables for Production

Ensure the following (or similar) environment variables are configured in your Vercel project settings:

*   `NEXT_PUBLIC_FIREBASE_API_KEY`
*   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
*   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
*   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
*   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
*   `NEXT_PUBLIC_FIREBASE_APP_ID`
*   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
*   `GENKIT_GOOGLE_CLOUD_PROJECT` (Your Google Cloud Project ID for Genkit)
*   `GENKIT_GOOGLE_CLOUD_LOCATION` (e.g., `us-central1`)
*   `GENKIT_API_KEY` (If using a specific API key for Genkit, though often handled by service accounts)
*   Any other secrets or API keys your application requires.

### Firebase Hosting (Optional)

If you plan to use Firebase Hosting in conjunction with Vercel (e.g., for specific static assets or redirects), ensure your `firebase.json` and `apphosting.yaml` (if applicable) are correctly configured.
