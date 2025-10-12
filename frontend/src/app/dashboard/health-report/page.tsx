import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CropAnalyzer } from "@/components/health-report/crop-analyzer";

export default function HealthReportPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Crop Health Analysis"
        subtitle="Upload or take a picture of a crop to get an AI-powered health report."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <CropAnalyzer />
      </main>
    </div>
  );
}
