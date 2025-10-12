import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import MarketPrice  from "@/components/market-price/market-price-list";

export default function MarketPricePage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Market Prices"
        subtitle="View real-time market prices for various crops across different locations."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <MarketPrice />
      </main>
    </div>
  );
}
