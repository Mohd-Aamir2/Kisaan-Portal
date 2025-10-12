import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import CropRecommendation from "@/components/recommendations/recommendation-card";

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Crop Recommendation Engine"
        subtitle="Generate AI-powered recommendations for your next planting season."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <CropRecommendation />
      </main>
    </div>
  );
}
