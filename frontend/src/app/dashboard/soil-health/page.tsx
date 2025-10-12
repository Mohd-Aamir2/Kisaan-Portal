import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SoilAnalyzer } from "@/components/soil-health/soil-analyzer";

export default function SoilHealthPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Soil Health Analysis"
        subtitle="Upload a soil health report to get AI-powered analysis and recommendations."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <SoilAnalyzer />
      </main>
    </div>
  );
}
