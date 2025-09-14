# Wizardfolio - The Web3 Wizard

This is a Next.js project bootstrapped with Firebase Studio, showcasing the portfolio and services of "The Web3 Wizard by Khalid." It features a blog, a portfolio, an interactive quiz, and an admin dashboard for content management, all integrated with Supabase for the backend.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and add your Supabase credentials. You can use the `.env.example` file as a template:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deploying to Netlify

This project is configured for easy deployment to Netlify.

### 1. Push to GitHub

Push your project to a new repository on your GitHub account.

### 2. Connect to Netlify

1.  Log in to your Netlify account and click "Add new site" -> "Import an existing project."
2.  Connect to your GitHub account and select the repository you just created.
3.  Netlify will automatically detect the settings from the `netlify.toml` file. The build command (`next build`) and publish directory (`.next`) are pre-configured.

### 3. Add Environment Variables

This is the most important step for the deployed site to work.

1.  In your Netlify site's dashboard, go to **Site settings > Build & deploy > Environment**.
2.  Click **"Edit variables"** and add the following two variables, using the same values from your `.env.local` file:
    *   `NEXT_PUBLIC_SUPABASE_URL`: `your_supabase_url`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `your_supabase_anon_key`

### 4. Deploy

Click the **"Deploy site"** button. Netlify will start the build process and deploy your website. Any future pushes to your main branch on GitHub will automatically trigger a new deployment.
