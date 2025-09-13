-- =================================================================
-- SUPABASE SETUP SCRIPT FOR WIZARDFOLIO
-- =================================================================
--
-- Instructions:
-- 1. Create a new project in your Supabase dashboard.
-- 2. Go to the "SQL Editor" section.
-- 3. Copy the entire content of this file.
-- 4. Paste it into the SQL editor.
-- 5. Run the query.
--
-- This script will:
--   - Create all necessary tables for the application.
--   - Set up Row Level Security (RLS) for data protection.
--   - Define policies for public read access and admin-only write access.
--   - Pre-populate tables with the content currently in your project.
--   - Provide instructions for creating necessary storage buckets.
--
-- After running this script, you will need to:
-- 1. Create a .env.local file in your project with the following:
--    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
--
-- 2. Manually create storage buckets in the Supabase Dashboard as instructed
--    in the "STORAGE" section of this script.

-- =================================================================
-- 1. HELPER FUNCTIONS
-- =================================================================

-- Function to automatically update `updated_at` timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =================================================================
-- 2. TABLE CREATION
-- =================================================================

-- -----------------------------------------------------------------
-- BLOG_POSTS TABLE
-- Stores all content for the blog.
-- -----------------------------------------------------------------
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    image_url TEXT,
    category TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW(),
    reading_time INT,
    meta_description TEXT,
    meta_keywords TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.blog_posts IS 'Stores all blog posts and their content.';

-- Trigger to update `updated_at` on blog_posts table
CREATE TRIGGER on_blog_posts_update
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- -----------------------------------------------------------------
-- PORTFOLIO_PROJECTS TABLE
-- Stores information about portfolio projects.
-- -----------------------------------------------------------------
CREATE TABLE public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    tags TEXT[],
    project_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.portfolio_projects IS 'Stores portfolio project details.';

-- Trigger to update `updated_at` on portfolio_projects table
CREATE TRIGGER on_portfolio_projects_update
BEFORE UPDATE ON public.portfolio_projects
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- -----------------------------------------------------------------
-- QUIZ_RESPONSES TABLE
-- Stores user submissions from the quiz.
-- -----------------------------------------------------------------
CREATE TABLE public.quiz_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    personal_preferences_score INT,
    web_development_score INT,
    business_understanding_score INT,
    web3_knowledge_score INT,
    total_score INT,
    tier TEXT,
    ai_explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.quiz_responses IS 'Stores individual responses and results from the quiz.';

-- -----------------------------------------------------------------
-- CONTACT_SUBMISSIONS TABLE
-- Stores submissions from the contact form.
-- -----------------------------------------------------------------
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    ai_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.contact_submissions IS 'Stores submissions from the contact form.';


-- =================================================================
-- 3. STORAGE BUCKETS (MANUAL SETUP REQUIRED)
-- =================================================================
--
-- Instructions for Storage:
-- 1. Navigate to the "Storage" section in your Supabase dashboard.
-- 2. Create a new bucket with the following details:
--    - Bucket name: `blog_images`
--    - Public bucket: Yes (toggle it on)
-- 3. Create another new bucket with the following details:
--    - Bucket name: `portfolio_images`
--    - Public bucket: Yes (toggle it on)
--
-- The policies for these buckets are created in the next section.
--
-- =================================================================


-- =================================================================
-- 4. ROW LEVEL SECURITY (RLS) & POLICIES
-- =================================================================

-- Enable RLS for all tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------
-- RLS POLICIES: blog_posts
-- -----------------------------------------------------------------
CREATE POLICY "Allow public read access to blog posts"
ON public.blog_posts FOR SELECT
USING (true);

CREATE POLICY "Allow admin full access to blog posts"
ON public.blog_posts FOR ALL
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated') -- Adjust if you have a specific admin role
WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- -----------------------------------------------------------------
-- RLS POLICIES: portfolio_projects
-- -----------------------------------------------------------------
CREATE POLICY "Allow public read access to projects"
ON public.portfolio_projects FOR SELECT
USING (true);

CREATE POLICY "Allow admin full access to projects"
ON public.portfolio_projects FOR ALL
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- -----------------------------------------------------------------
-- RLS POLICIES: quiz_responses
-- -----------------------------------------------------------------
CREATE POLICY "Allow admin read access to quiz responses"
ON public.quiz_responses FOR SELECT
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "Allow anonymous insert access for quiz responses"
ON public.quiz_responses FOR INSERT
WITH CHECK (true);

-- -----------------------------------------------------------------
-- RLS POLICIES: contact_submissions
-- -----------------------------------------------------------------
CREATE POLICY "Allow admin read access to contact submissions"
ON public.contact_submissions FOR SELECT
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "Allow anonymous insert access for contact submissions"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

-- -----------------------------------------------------------------
-- STORAGE POLICIES
-- -----------------------------------------------------------------
-- These policies assume you have created the buckets as per the instructions above.
CREATE POLICY "Allow public read access to blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog_images');

CREATE POLICY "Allow admin access to blog images"
ON storage.objects FOR INSERT, UPDATE, DELETE
USING (bucket_id = 'blog_images' AND (auth.role() = 'service_role' OR auth.role() = 'authenticated'))
WITH CHECK (bucket_id = 'blog_images' AND (auth.role() = 'service_role' OR auth.role() = 'authenticated'));

CREATE POLICY "Allow public read access to portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio_images');

CREATE POLICY "Allow admin access to portfolio images"
ON storage.objects FOR INSERT, UPDATE, DELETE
USING (bucket_id = 'portfolio_images' AND (auth.role() = 'service_role' OR auth.role() = 'authenticated'))
WITH CHECK (bucket_id = 'portfolio_images' AND (auth.role() = 'service_role' OR auth.role() = 'authenticated'));


-- =================================================================
-- 5. INITIAL DATA MIGRATION
-- =================================================================

-- -----------------------------------------------------------------
-- DATA: blog_posts
-- Note: You'll need to upload images to the 'blog_images' bucket
-- and update the image_url paths accordingly.
-- -----------------------------------------------------------------
INSERT INTO public.blog_posts (slug, title, description, content, image_url, category, date, reading_time, meta_description, meta_keywords) VALUES
('introvert-developer-communication-guide', 'The Introvert Developer''s Guide to Effective Communication', 'How to thrive in a team environment by leveraging your strengths as an introvert. Strategies for meetings, feedback, and collaboration.', '
As an introverted developer, the open-office plans and constant collaboration of the modern tech world can feel like a performance stage we never signed up for. But our quiet nature isn''t a weakness; it''s a superpower in disguise. This guide will help you harness it.

### The Power of Written Communication
Introverts often excel at expressing complex ideas through writing. Use this to your advantage.

- **Prepare for Meetings:** Before a meeting, send out a concise agenda or a document outlining your thoughts. This allows you to shape the conversation before it even begins.
- **Master the Pull Request:** A well-documented pull request is a form of asynchronous communication where you can shine. Clearly explain the "what" and the "why" of your changes.
- **Follow-Up Emails:** Summarize key decisions and action items in a follow-up email after a call. This clarifies your understanding and provides a written record.

### Navigating Synchronous Communication
While writing is our strong suit, real-time interaction is unavoidable. Here''s how to manage it:

1.  **Listen First:** Use your natural tendency to listen and observe. You''ll often pick up on details others miss.
2.  **The Power of the Pause:** Don''t feel pressured to respond immediately. It''s okay to say, "Let me think about that for a moment." A thoughtful answer is always better than a rushed one.
3.  **One-on-One Connections:** Build strong relationships with colleagues in smaller settings. This makes larger group interactions less daunting.

By embracing your introverted qualities and adopting these strategies, you can become a highly effective and respected communicator on any development team.
', 'blog-introvert-1.png', 'Introvert Chronicles', '2024-07-20', 5, 'Discover strategies for introverted developers to communicate effectively in a team, from mastering written docs to navigating meetings.', ARRAY['introvert developer', 'communication', 'tech team', 'collaboration']),
('why-i-chose-nextjs-for-my-portfolio', 'Why I Chose Next.js for My Mystical Portfolio', 'A deep dive into the technical decisions behind Wizardfolio, exploring the benefits of Next.js, Server Components, and Vercel.', '
Building Wizardfolio required a tech stack as versatile and powerful as a wizard''s grimoire. The choice was clear: Next.js. Here''s a look into the magic behind that decision.

### The Spell of Server Components
Next.js''s App Router and the concept of React Server Components (RSCs) were the primary draw. 

- **Performance:** By rendering components on the server by default, we send less JavaScript to the client. This means faster load times and a better user experience, which is crucial for making a great first impression.
- **Direct Data Fetching:** Server Components allow for direct, asynchronous data fetching without needing to create separate API endpoints. This simplified the architecture for features like the blog and portfolio.

### The Potion of a Rich Ecosystem
Next.js is more than just a framework; it''s a thriving ecosystem.

- **Vercel Integration:** The seamless deployment experience with Vercel is unparalleled. Git push, and the site is live with optimized performance.
- **ShadCN UI and Tailwind CSS:** For styling, the combination of Tailwind''s utility-first approach and ShadCN''s beautifully crafted, accessible components allowed for rapid development of a professional and unique UI.
- **Genkit for AI:** With AI being a core part of the "wizard" persona, integrating AI features needed to be straightforward. Genkit''s server-side flows for Gemini were easy to implement within the Next.js architecture.

Next.js provided the perfect blend of developer experience, performance, and scalability to bring the mystical vision of Wizardfolio to life.
', 'blog-tech-1.png', 'Tech Insights', '2024-07-18', 7, 'An exploration of why Next.js was the perfect framework for building a high-performance portfolio, focusing on Server Components, Vercel, and the ecosystem.', ARRAY['Next.js', 'React Server Components', 'Vercel', 'web development', 'portfolio']),
('demystifying-smart-contracts-beginners-grimoire', 'Demystifying Smart Contracts: A Beginner''s Grimoire', 'Unlock the magic of blockchain. This guide breaks down what smart contracts are, how they work, and why they matter for the future of the web.', '
Smart contracts are one of the most enchanting concepts in the Web3 universe. But they aren''t as complex as they sound. Think of them as magical, self-executing agreements written in code.

### What is a Smart Contract?
At its core, a smart contract is a program that runs on a blockchain. It''s a set of promises, defined in code, including how those promises will be fulfilled.

- **If-Then Logic:** They work on simple "if this, then that" logic. For example, *if* a user sends 1 ETH to the contract, *then* the contract sends them a specific NFT.
- **Immutable & Transparent:** Once a smart contract is deployed on the blockchain, it cannot be changed. Its code is visible to everyone, creating a system of trust without a middleman.

### Why Do They Matter?
Smart contracts remove the need for intermediaries, making transactions more efficient and secure.

- **Decentralized Finance (DeFi):** They power lending, borrowing, and trading platforms without a bank.
- **NFTs:** They manage the ownership and transfer of non-fungible tokens.
- **Supply Chain:** They can automatically track and verify the journey of goods from origin to consumer.

Understanding smart contracts is the first step to truly grasping the power of blockchain. They are the building blocks of a more decentralized and automated future.
', 'blog-web3-1.png', 'Web3 Wizardry', '2024-07-15', 8, 'A beginner-friendly introduction to smart contracts. Learn what they are, how they work on the blockchain, and their real-world applications in DeFi and NFTs.', ARRAY['smart contracts', 'blockchain', 'web3', 'ethereum', 'NFT']),
('conjuring-with-code-generative-ai-and-development', 'Conjuring with Code: How Generative AI is Changing Development', 'Explore the new frontier of software development where AI assists in writing, debugging, and even designing applications. Is it magic?', '
For developers, generative AI is more than just a chatbot. It''s a powerful apprentice, a tireless collaborator that is fundamentally changing how we build software.

### From Code Completion to Code Generation
Tools like GitHub Copilot have moved beyond simple suggestions. They can now:

- **Scaffold Entire Components:** Give it a prompt like "create a React login form with email and password fields," and it will generate the complete component, including state management and basic styling.
- **Write Tests:** AI can generate unit tests, integration tests, and end-to-end tests, freeing up developers to focus on more complex logic.
- **Translate Languages:** Need to convert a Python script to JavaScript? AI can do that, dramatically reducing the time for cross-language projects.

### The AI-Augmented Workflow
The modern developer workflow is becoming a conversation with an AI.

- **Debugging Partner:** Instead of just staring at an error message, you can paste it into an AI chat and ask for explanations and potential solutions.
- **Architectural Brainstorming:** You can describe a system you want to build and ask the AI to suggest different architectural patterns, their pros, and cons.

Generative AI is not here to replace developers. It''s here to augment our abilities, automate the mundane, and allow us to focus on the creative, problem-solving aspects of our craft. It''s like having a magical grimoire that always has the right spell for the job.
', 'blog-ai-1.png', 'AI & Innovation', '2024-07-12', 6, 'Learn how generative AI is transforming software development, from advanced code completion and test generation to being a partner in debugging and design.', ARRAY['generative ai', 'software development', 'ai in coding', 'github copilot']);

-- -----------------------------------------------------------------
-- DATA: portfolio_projects
-- Note: You'll need to upload images to the 'portfolio_images' bucket
-- and update the image_url paths accordingly.
-- -----------------------------------------------------------------
INSERT INTO public.portfolio_projects (title, description, image_url, tags, project_url) VALUES
('DeFi Dashboard', 'A comprehensive dashboard for tracking and managing assets across multiple decentralized finance protocols. Real-time data and intuitive visualizations.', 'portfolio-dapp-1.png', ARRAY['Web3', 'Next.js', 'Ethers.js'], 'https://github.com/firebase/studio'),
('Artisan Goods Marketplace', 'An elegant e-commerce platform for artisans to sell their creations. Features a custom checkout flow and vendor management system.', 'portfolio-ecommerce-1.png', ARRAY['Web Dev', 'React', 'Node.js'], NULL),
('AI Content Generator', 'A SaaS tool that uses generative AI to help writers overcome creative blocks and produce content briefs. Integrated with the latest language models.', 'portfolio-ai-tool-1.png', ARRAY['AI', 'Next.js', 'SaaS'], 'https://github.com/firebase/studio'),
('Generative Art NFT Marketplace', 'A platform for minting and trading generative art NFTs. Features a unique auction system and artist-centric royalty structures.', 'portfolio-nft-market-1.png', ARRAY['Web3', 'NFT', 'Solidity'], NULL);


-- =================================================================
-- SCRIPT COMPLETE
-- =================================================================
--
-- You should now have a fully configured database schema.
-- Remember to create the storage buckets and your .env.local file.
--

