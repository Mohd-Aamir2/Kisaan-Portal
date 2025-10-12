import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-lg font-bold text-primary", className)}>
      <div className="bg-primary p-1.5 rounded-md">
        <Leaf className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-headline text-foreground">Kisaan</span>
    </div>
  );
}
