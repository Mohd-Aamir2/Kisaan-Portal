import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SchemesList } from "@/components/schemes/schemes-list";

export default function SchemesPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Government Schemes"
        subtitle="Explore schemes and benefits available for farmers."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <SchemesList />
      </main>
    </div>
  );
}
