export const quizQuestions = [
  {
    category: 'personalPreferencesScore',
    question: "How do you prefer to communicate with your development team?",
    options: [
      { text: "Detailed written briefs", points: 2 },
      { text: "Quick video calls", points: 1 },
      { text: "In-person meetings", points: 1 },
      { text: "Collaborative documents", points: 2 },
    ],
  },
  {
    category: 'personalPreferencesScore',
    question: "What's your ideal project timeline approach?",
    options: [
      { text: "Detailed planning upfront", points: 2 },
      { text: "Agile sprints with flexibility", points: 2 },
      { text: "Quick iterations and feedback", points: 1 },
      { text: "Milestone-based delivery", points: 2 },
    ],
  },
  {
    category: 'webDevelopmentScore',
    question: "Which best describes your current website needs?",
    options: [
      { text: "Simple informational site", points: 1 },
      { text: "E-commerce functionality", points: 3 },
      { text: "Complex web application", points: 3 },
      { text: "Portfolio/blog platform", points: 2 },
    ],
  },
  {
    category: 'webDevelopmentScore',
    question: "How important is mobile optimization to you?",
    options: [
      { text: "Critical - most traffic is mobile", points: 3 },
      { text: "Important - need responsive design", points: 2 },
      { text: "Somewhat - nice to have", points: 1 },
      { text: "Not sure what this means", points: 1 },
    ],
  },
  {
    category: 'businessUnderstandingScore',
    question: "What's your primary business goal for the website?",
    options: [
      { text: "Generate leads", points: 2 },
      { text: "Sell products online", points: 3 },
      { text: "Build brand awareness", points: 2 },
      { text: "Educate customers", points: 2 },
    ],
  },
  {
    category: 'businessUnderstandingScore',
    question: "How do you currently handle customer inquiries?",
    options: [
      { text: "Email only", points: 1 },
      { text: "Phone and email", points: 2 },
      { text: "Multiple channels + social media", points: 3 },
      { text: "Have a CRM system", points: 3 },
    ],
  },
  {
    category: 'web3KnowledgeScore',
    question: "How familiar are you with blockchain technology?",
    options: [
      { text: "Expert - I develop dApps", points: 5 },
      { text: "Familiar - I understand the concepts", points: 3 },
      { text: "Beginner - I've heard of Bitcoin", points: 2 },
      { text: "New - Please explain!", points: 1 },
    ],
  },
  {
    category: 'web3KnowledgeScore',
    question: "Are you interested in integrating Web3 features?",
    options: [
      { text: "Yes - cryptocurrency payments", points: 5 },
      { text: "Maybe - NFT collections", points: 4 },
      { text: "Curious - want to learn more", points: 3 },
      { text: "Not relevant to my business", points: 1 },
    ],
  },
];

export const MAX_SCORE = quizQuestions.reduce((total, q) => {
    const maxPoints = Math.max(...q.options.map(o => o.points));
    return total + maxPoints;
}, 0); // Total is 30
