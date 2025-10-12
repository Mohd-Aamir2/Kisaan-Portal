import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AlertsList } from "@/components/alerts/alerts-list";

export default function AlertsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Alerts & Notifications"
        subtitle="Stay updated with the latest information relevant to your farm."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <AlertsList />
      </main>
    </div>
  );
}
