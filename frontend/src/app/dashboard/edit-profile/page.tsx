import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Profile} from "@/components/edit-profile/edit-profile-form";

export default function EditProfilePage() {
  return (
    <div className="flex flex-col h-full z-0">
      <DashboardHeader 
        title="Your Profile"
        subtitle="Manage your account and application preferences."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
            <Profile />
        </div>
      </main>
    </div>
  );
}
