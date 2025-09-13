import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import type { ServicePackage } from '@/lib/types';

export function PricingCard({ service }: { service: ServicePackage }) {
  return (
    <Card className="flex flex-col bg-card/50 backdrop-blur-sm border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl text-accent">{service.title}</CardTitle>
        <CardDescription className="text-muted-foreground">{service.target}</CardDescription>
        <p className="text-4xl font-bold text-foreground pt-4">{service.price}</p>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-accent mr-2 mt-1 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="text-sm text-muted-foreground">
            <p><span className="font-bold text-foreground">Timeline:</span> {service.timeline}</p>
            <p><span className="font-bold text-foreground">Support:</span> {service.support}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/contact?package=${encodeURIComponent(service.title)}`}>
            Select Package
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
