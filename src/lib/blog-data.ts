import type { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: 'introvert-chronicles-1',
    title: 'The Introvert Developer\'s Guide to Effective Communication',
    description: 'How to thrive in a team environment by leveraging your strengths as an introvert. Strategies for meetings, feedback, and collaboration.',
    image: 'blog-introvert-1',
    category: 'Introvert Chronicles',
    date: '2024-07-20',
    readingTime: 5,
  },
  {
    id: 'tech-insights-1',
    title: 'Why I Chose Next.js for My Mystical Portfolio',
    description: 'A deep dive into the technical decisions behind Wizardfolio, exploring the benefits of Next.js, Server Components, and Vercel.',
    image: 'blog-tech-1',
    category: 'Tech Insights',
    date: '2024-07-18',
    readingTime: 7,
  },
  {
    id: 'web3-wizardry-1',
    title: 'Demystifying Smart Contracts: A Beginner\'s Grimoire',
    description: 'Unlock the magic of blockchain. This guide breaks down what smart contracts are, how they work, and why they matter for the future of the web.',
    image: 'blog-web3-1',
    category: 'Web3 Wizardry',
    date: '2024-07-15',
    readingTime: 8,
  },
  {
    id: 'ai-innovation-1',
    title: 'Conjuring with Code: How Generative AI is Changing Development',
    description: 'Explore the new frontier of software development where AI assists in writing, debugging, and even designing applications. Is it magic?',
    image: 'blog-ai-1',
    category: 'AI & Innovation',
    date: '2024-07-12',
    readingTime: 6,
  },
];
