import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EditProfileForm } from "@/components/settings/edit-profile-form";

export default function EditProfilePage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Edit Profile"
        subtitle="Manage your account and application preferences."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
            <EditProfileForm />
        </div>
      </main>
    </div>
  );
}
