import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSelector } from "@/components/language-selector";

type DashboardHeaderProps = {
  title: string;
  subtitle?: string;
};

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="flex items-center gap-4 p-4 border-b">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl font-bold font-headline">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <LanguageSelector />
    </header>
  );
}
