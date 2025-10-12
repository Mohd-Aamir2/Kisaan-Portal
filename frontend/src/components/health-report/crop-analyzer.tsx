"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { getHealthReport } from "@/app/actions/health-report";
import type { AnalyzeCropHealthOutput } from "@/ai/flows/analyze-crop-health";
import { Loader2, Camera, Upload, Sparkles, CheckCircle, XCircle, Leaf, HeartPulse } from "lucide-react";

const ReportDisplay = ({ report }: { report: AnalyzeCropHealthOutput }) => (
    <Card className="bg-accent/50 border-accent animate-in fade-in-50">
        <CardHeader>
            <CardTitle>AI Health Report</CardTitle>
            <CardDescription>
                {report.identification.isPlant 
                    ? `Analysis for ${report.identification.commonName} (${report.identification.latinName})`
                    : "Analysis result"
                }
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {!report.identification.isPlant ? (
                <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-destructive" />
                    <p>This does not appear to be a plant.</p>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        {report.diagnosis.isHealthy ? (
                             <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                             <XCircle className="w-5 h-5 text-destructive" />
                        )}
                       <p className="font-semibold">
                           Health Status: {report.diagnosis.isHealthy ? "Healthy" : "Unhealthy"}
                       </p>
                    </div>
                    <div>
                        <h3 className="font-semibold flex items-center gap-2"><Leaf className="w-4 h-4"/>Diagnosis</h3>
                        <p className="text-muted-foreground">{report.diagnosis.diagnosis}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold flex items-center gap-2"><HeartPulse className="w-4 h-4"/>Treatment</h3>
                        <p className="text-muted-foreground">{report.diagnosis.treatment}</p>
                    </div>
                </>
            )}
        </CardContent>
    </Card>
);


export function CropAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [report, setReport] = useState<AnalyzeCropHealthOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setReport(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        // Ensure video is playing before capturing
        if (video.readyState < video.HAVE_CURRENT_DATA) {
            toast({
                variant: "destructive",
                title: "Camera Not Ready",
                description: "The camera is still initializing. Please try again in a moment.",
            });
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUrl = canvas.toDataURL('image/png');
            setImage(dataUrl);
            setReport(null);
        }
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setIsLoading(true);
    setReport(null);
    try {
      const result = await getHealthReport(image);
      setReport(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardContent className="p-4 md:p-6">
          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera">Use Camera</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
            </TabsList>
            <TabsContent value="camera" className="mt-4">
              <div className="space-y-4">
                <div className="relative aspect-video w-full bg-secondary rounded-md overflow-hidden flex items-center justify-center">
                    <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                    <canvas ref={canvasRef} className="hidden" />
                    {hasCameraPermission === false && (
                         <div className="absolute inset-0 flex items-center justify-center p-4">
                            <Alert variant="destructive">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access in your browser to use this feature.
                                </AlertDescription>
                            </Alert>
                         </div>
                    )}
                </div>
                <Button onClick={takePicture} disabled={!hasCameraPermission || isLoading} className="w-full">
                  <Camera className="mr-2" />
                  Take Picture
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="upload" className="mt-4">
              <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed rounded-md">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p>Click the button to upload an image of your crop.</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <Button onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                  Select Image
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {image && (
        <Card>
            <CardHeader>
                <CardTitle>Image Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Image src={image} alt="Crop for analysis" width={600} height={400} className="rounded-md w-full object-contain max-h-96"/>
                <Button onClick={analyzeImage} disabled={isLoading} className="w-full" size="lg">
                    {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                    Analyze Crop Health
                </Button>
            </CardContent>
        </Card>
      )}

      {report && <ReportDisplay report={report} />}
    </div>
  );
}
