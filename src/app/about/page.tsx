import Image from 'next/image';
import Link from 'next/link';
import {
  BrainCircuit,
  Code,
  Feather,
  GitBranch,
  Laptop,
  Layers,
  Lightbulb,
  MousePointerClick,
  Sparkles,
  Swords,
  Coffee,
  Clock,
  BookOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Particles from '@/components/layout/particles';

const skills = [
  { name: 'React & Next.js', level: 95, icon: <Laptop /> },
  { name: 'Web3 & Blockchain', level: 90, icon: <Layers /> },
  { name: 'AI Integration', level: 85, icon: <BrainCircuit /> },
  { name: 'TypeScript', level: 95, icon: <Code /> },
  { name: 'Introvert-Friendly Communication', level: 100, icon: <Feather /> },
];

const funFacts = [
    { icon: <GitBranch className="h-8 w-8 text-accent"/>, text: "Favorite tool is VS Code with a mystical dark theme." },
    { icon: <Swords className="h-8 w-8 text-accent"/>, text: "Contributes to open-source Web3 projects on weekends." },
    { icon: <Coffee className="h-8 w-8 text-accent"/>, text: "Prefers a quiet cup of green tea over coffee." },
    { icon: <Clock className="h-8 w-8 text-accent"/>, text: "Most productive hours are late at night, in true wizard fashion." },
    { icon: <BookOpen className="h-8 w-8 text-accent"/>, text: "Loves reading fantasy novels to fuel creativity." },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center space-y-20 overflow-hidden">
      <div className="relative w-full flex flex-col items-center text-center">
        <Particles className="absolute inset-0 -z-10" quantity={100} />
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg shadow-primary/20 mb-6">
          <Image
            src="https://picsum.photos/seed/wizard/200/200"
            alt="The Web3 Wizard by Khalid"
            data-ai-hint="mystical developer"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          The Wizard's Journey
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          How an introverted developer found power in the quiet art of code and became The Web3 Wizard.
        </p>
      </div>

      <section className="w-full max-w-4xl space-y-8">
        <h2 className="text-3xl font-headline font-bold text-center">My Story</h2>
        <div className="text-muted-foreground space-y-4 text-lg text-left md:text-center">
          <p>
            My journey began not in a bustling tech hub, but in quiet observation. As an introvert, I always found my strength in deep focus and thoughtful analysis rather than loud brainstorming sessions. Code became my native language—a place where logic, creativity, and structure converged to build worlds.
          </p>
          <p>
            The path led me through traditional web development, but my curiosity was sparked by the decentralized frontier of Web3. Here was a realm built on transparency, individual empowerment, and cryptographic truth—principles that resonated with my nature. I dove headfirst into blockchain, smart contracts, and the potential of a truly user-owned internet.
          </p>
          <p>
            Blogging became my bridge. It allowed me to share my discoveries and connect with others in a measured, deliberate way. My mission is to use my unique perspective to help businesses and fellow introverts navigate the digital world and build a powerful, authentic online presence.
          </p>
        </div>
      </section>

      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.slice(0, 3).map(skill => (
            <Card key={skill.name} className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {skill.icon && React.cloneElement(skill.icon, { className: "h-8 w-8 text-accent" })}
                </div>
                <CardTitle className="font-headline">{skill.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 md:w-2/3 mx-auto">
             {skills.slice(3).map(skill => (
            <Card key={skill.name} className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {skill.icon && React.cloneElement(skill.icon, { className: "h-8 w-8 text-accent" })}
                </div>
                <CardTitle className="font-headline">{skill.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full max-w-4xl text-center p-8 bg-card/50 backdrop-blur-sm border-primary/20 rounded-lg">
        <Lightbulb className="mx-auto h-12 w-12 text-accent mb-4" />
        <h2 className="text-3xl font-headline font-bold">My Philosophy</h2>
        <p className="mt-4 text-xl font-headline text-muted-foreground">"Thoughtful code, meaningful connections."</p>
        <p className="mt-4 text-lg text-muted-foreground/80">
          I believe the best digital experiences are built with intention and empathy. My approach is rooted in understanding your vision deeply and translating it into clean, robust, and beautiful code. I see introversion as a developer's superpower: it fosters the focus needed for complex problem-solving and a preference for clear, written communication, which leads to better-documented and more maintainable projects.
        </p>
        <div className="mt-6">
            <Button asChild variant="link" className="text-accent">
                <Link href="/blog/introvert-developer-communication-guide">
                    Want to know more? Check out my thoughts on the Introvert Chronicles
                </Link>
            </Button>
        </div>
      </section>

       <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Fun Facts About the Wizard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {funFacts.map((fact, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-card/50 rounded-lg">
                    {fact.icon}
                    <p className="text-muted-foreground mt-2 text-sm">{fact.text}</p>
                </div>
            ))}
        </div>
       </section>

      <section className="w-full max-w-4xl text-center">
        <h2 className="text-3xl font-headline font-bold">Ready to Create Magic?</h2>
        <p className="mt-4 text-lg text-muted-foreground">Let's build something extraordinary together.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/quiz">Discover Your Magic Level</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/blog">Read My Scrolls</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Contact the Wizard</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
