"use client"
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {WeatherWidget} from "@/components/dashboard/weather-widget"
import { SoilHealthWidget } from "@/components/dashboard/soil-health-widget";
import { useContext } from "react";
import { HistoricalDataWidget } from "@/components/dashboard/historical-data-widget";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppContext } from "../context/appcontext";

export default function DashboardPage() {
   const context = useContext(AppContext);
  
    if (!context) {
      throw new Error("AppContext must be used within AppContextProvider");
    }
  const {name,setName,setToken,setEmail,setDistrict,setMobilenumber,setSoiltype,setState}=context;
  
  return (
    <div className="flex flex-col h-full">
     <DashboardHeader 
        title={`Welcome, ${name || "Farmer"}`}   // fallback agar name null/undefined hai
       subtitle="Here's a summary of your farm's status."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <Card className="bg-accent/50 border-accent">
              <CardHeader>
                <CardTitle>Get Your Recommendation based on Soil Type</CardTitle>
                <CardDescription>
                  Let analyze  your farm data to suggest the best crops for the upcoming season.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/dashboard/recommendations">
                    Get Recommendation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
             <WeatherWidget />
          </div>
          <div className="lg:col-span-2 grid gap-6">
            <SoilHealthWidget />
            <HistoricalDataWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
