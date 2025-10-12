"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSoilHealthReport } from "@/app/actions/soil-health";
import type { AnalyzeSoilHealthOutput } from "@/ai/flows/analyze-soil-health";
import { Loader2, Upload, Sparkles, TestTube2, ChevronsRight } from "lucide-react";

const ReportDisplay = ({ report }: { report: AnalyzeSoilHealthOutput }) => (
    <Card className="bg-accent/50 border-accent animate-in fade-in-50">
        <CardHeader>
            <CardTitle>AI Soil Health Analysis</CardTitle>
            <CardDescription>
                Here is a summary of your soil health report.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="font-semibold flex items-center gap-2"><TestTube2 className="w-4 h-4"/>Nutrient Levels</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-center">
                    <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">pH Level</p>
                        <p className="text-xl font-bold">{report.nutrients.ph.toFixed(1)}</p>
                    </div>
                     <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Nitrogen (N)</p>
                        <p className="text-xl font-bold">{report.nutrients.nitrogen} ppm</p>
                    </div>
                     <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Phosphorus (P)</p>
                        <p className="text-xl font-bold">{report.nutrients.phosphorus} ppm</p>
                    </div>
                     <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Potassium (K)</p>
                        <p className="text-xl font-bold">{report.nutrients.potassium} ppm</p>
                    </div>
                </div>
            </div>
             <div>
                <h3 className="font-semibold">Summary</h3>
                <p className="text-muted-foreground">{report.summary}</p>
            </div>
            <div>
                <h3 className="font-semibold">Recommendations</h3>
                <ul className="list-none space-y-2 mt-2">
                    {report.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <ChevronsRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">{rec}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </CardContent>
    </Card>
);

export function SoilAnalyzer() {
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [reportDataUri, setReportDataUri] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeSoilHealthOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 4MB.",
        });
        return;
      }
      setReportFile(file);
      setAnalysis(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setReportDataUri(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeReport = async () => {
    if (!reportDataUri) return;
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await getSoilHealthReport(reportDataUri);
      setAnalysis(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the report. Please ensure it's a valid soil health report file.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Soil Report</CardTitle>
          <CardDescription>Select a PDF or image file of your soil analysis report.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed rounded-md">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-center">
                    {reportFile ? `Selected file: ${reportFile.name}` : "Click the button to upload your report."}
                </p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,application/pdf"
                />
                <Button onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                    Select File
                </Button>
            </div>
            {reportFile && (
                <Button onClick={analyzeReport} disabled={isLoading || !reportFile} className="w-full" size="lg">
                    {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                    Analyze Soil Report
                </Button>
            )}
        </CardContent>
      </Card>
      
      {analysis && <ReportDisplay report={analysis} />}
    </div>
  );
}
