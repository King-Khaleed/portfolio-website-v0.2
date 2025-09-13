'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import type { QuizTier } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '../ui/card';

const certificates: Record<QuizTier, React.FC<{ className?: string }>> = {
  'Apprentice Wizard': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="apprentice-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.2 }} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="5" fill="url(#apprentice-bg)" />
      <rect x="2" y="2" width="96" height="96" rx="4" fill="transparent" stroke="#3B82F6" strokeWidth="0.5" />
      <path d="M50 20 L52 48 L50 78 L48 48 Z" fill="#F59E0B" opacity="0.5" />
      <path d="M50 15 L50 85" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="50" cy="15" r="3" fill="#F59E0B" />
    </svg>
  ),
  'Digital Sorcerer': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sorcerer-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#6B46C1', stopOpacity: 0.3 }} />
        </linearGradient>
        <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
      </defs>
      <rect width="100" height="100" rx="5" fill="url(#sorcerer-bg)" />
      <rect x="2" y="2" width="96" height="96" rx="4" fill="transparent" stroke="#8B5CF6" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="25" fill="none" stroke="#F59E0B" strokeWidth="1" filter="url(#glow)" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="#F59E0B" strokeWidth="0.5" opacity="0.7" />
      <text x="50" y="52" textAnchor="middle" fill="#F8FAFC" fontSize="5" fontFamily="monospace">01101</text>
    </svg>
  ),
  'Web3 Archmage': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="archmage-bg">
          <stop offset="0%" stopColor="#6B46C1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1E293B" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" rx="5" fill="url(#archmage-bg)" />
      <rect x="2" y="2" width="96" height="96" rx="4" fill="transparent" stroke="#F59E0B" strokeWidth="0.5" />
      <path d="M50,30 a20,20 0 1,1 0,40 a20,20 0 1,1 0,-40" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
      </path>
      <path d="M30 50 L 70 50 M50 30 L 50 70" stroke="#8B5CF6" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="5" fill="#F59E0B" />
      <path d="M45 50 V 60 H 55 V 50 Z" fill="#1E293B" />
      <path d="M48 45 L 52 45 L 50 40 Z" fill="#F59E0B" />
    </svg>
  ),
  'Legendary Tech Wizard': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="legendary-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6B46C1" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="5" fill="url(#legendary-bg)" />
      <rect x="2" y="2" width="96" height="96" rx="4" fill="transparent" stroke="#F59E0B" strokeWidth="1" />
       <g transform="translate(50,50)">
          <circle r="30" fill="none" stroke="#8B5CF6" strokeWidth="0.2" />
          <circle r="20" fill="none" stroke="#8B5CF6" strokeWidth="0.3" />
          <circle r="10" fill="none" stroke="#8B5CF6" strokeWidth="0.4" />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
      </g>
      <path d="M50 20 L 65 70 L 35 70 Z" fill="#F59E0B" opacity="0.8">
         <animateTransform attributeName="transform" type="rotate" from="0 50 55" to="360 50 55" dur="30s" repeatCount="indefinite" />
      </path>
      <path d="M50 10 L50 90" stroke="white" strokeWidth="1" strokeLinecap="round" filter="url(#glow)"/>
    </svg>
  ),
};


export function NftCertificate({ tier, className, certificateRef }: { tier: QuizTier, className?: string, certificateRef?: React.Ref<HTMLDivElement> }) {
  const CertificateComponent = certificates[tier];

  return (
    <div ref={certificateRef} className={cn("aspect-square w-full rounded-lg overflow-hidden shadow-lg shadow-primary/20", className)}>
        <CertificateComponent className="w-full h-full" />
    </div>
  )
}


export function NftCertificateCard({ tier }: { tier: QuizTier }) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: null, // Transparent background
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${tier.toLowerCase().replace(/ /g, '-')}-certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download Started",
        description: "Your certificate is downloading.",
      });
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast({
        title: "Download Failed",
        description: "Could not download the certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center p-6 bg-card/50 backdrop-blur-sm border-primary/20">
      <h2 className="text-2xl font-headline mb-4">Your Certificate</h2>
      <div className="w-full max-w-sm">
        <NftCertificate tier={tier} certificateRef={certificateRef} />
      </div>
      <Button variant="outline" className="mt-6" onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        {isDownloading ? 'Downloading...' : 'Download'}
      </Button>
    </Card>
  );
}
