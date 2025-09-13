import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Code, Lightbulb, PenTool } from "lucide-react";
import Link from "next/link";
import Particles from "@/components/layout/particles";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-20 overflow-hidden">
      <div className="relative w-full flex flex-col items-center text-center">
        <Particles
          className="absolute inset-0 -z-10"
          quantity={100}
        />
        <h1 className="text-4xl md:text-6xl font-headline font-bold mt-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          The Web3 Wizard
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          Conjuring digital experiences with code and creativity. I blend web development, AI, and Web3 to craft powerful online presences.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/quiz">
              Discover Your Magic Level <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">
              View My Grimoire
            </Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-5xl space-y-8">
        <h2 className="text-3xl font-headline font-bold">What I Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <PenTool className="h-10 w-10 text-accent mb-4" />
              <CardTitle className="font-headline">Web Development</CardTitle>
              <CardDescription>
                Crafting bespoke websites and applications that are fast, responsive, and enchanting to use. From simple portfolios to complex platforms.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <Bot className="h-10 w-10 text-accent mb-4" />
              <CardTitle className="font-headline">AI Integration</CardTitle>
              <CardDescription>
                Infusing your projects with intelligence. I leverage AI to create personalized experiences, automate tasks, and unlock new possibilities.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <Code className="h-10 w-10 text-accent mb-4" />
              <CardTitle className="font-headline">Web3 Wizardry</CardTitle>
              <CardDescription>
                Navigating the decentralized frontier. I build with blockchain technology, creating dApps, smart contracts, and NFT experiences.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      
      <div className="w-full max-w-3xl flex flex-col items-center">
        <Lightbulb className="h-12 w-12 text-accent" />
        <h2 className="text-3xl font-headline font-bold mt-4">Ready to Build Your Digital Legacy?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Your digital presence is a reflection of your vision. Let's collaborate to build something extraordinary that stands the test of time.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">
              Contact the Wizard
            </Link>
          </Button>
      </div>

    </div>
  );
}
