import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Chatbot } from "@/components/chatbot/chatbot";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="AI Chatbot"
        subtitle="Ask me anything about your farm in English, Hindi, Tamil, Marathi, or Telugu."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
        <Chatbot />
      </main>
    </div>
  );
}
