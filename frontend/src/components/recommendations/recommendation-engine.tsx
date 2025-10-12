"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CropRecommendation from "./recommendation-card";
import { getRecommendation } from "@/app/actions/recommendations";
import type { GenerateCropRecommendationOutput } from "@/ai/flows/generate-crop-recommendation";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2 } from "lucide-react";

export function RecommendationEngine() {
  const [recommendation, setRecommendation] = useState<GenerateCropRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getRecommendation();
      setRecommendation(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate recommendation. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 text-center">
          <p className="mb-4 text-muted-foreground">
            Click the button below to use our AI to analyze your farm's profile, local weather, and historical data to provide a tailored crop recommendation.
          </p>
          <Button onClick={handleGenerate} disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Generate AI Recommendation
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {recommendation && <CropRecommendation/>}
    </div>
  );
}
