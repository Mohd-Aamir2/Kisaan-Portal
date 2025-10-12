"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
});

const farmSchema = z.object({
  farmSize: z.coerce.number().min(0.1, "Farm size must be positive."),
  soilType: z.enum(["sandy", "loamy", "clay", "silty", "peaty"]),
  location: z.string().min(2, "Location is required."),
  cropPreference: z.string().min(2, "Crop preference is required."),
});

const settingsSchema = profileSchema.merge(farmSchema);

export function EditProfileForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    // In a real app, you'd fetch and populate this from your backend
    defaultValues: {
      name: "John Farmer",
      email: "john.farmer@example.com",
      farmSize: 50,
      soilType: "loamy",
      location: "Central Valley, California",
      cropPreference: "High-yield cash crop",
    },
  });

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    // In a real app, you'd send this to your backend to save the user's settings.
    console.log(values);
    toast({
      title: "Profile Saved",
      description: "Your changes have been successfully saved.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="John Farmer" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input placeholder="farmer@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Farm Details</CardTitle>
            <CardDescription>Update information about your farm.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <FormField control={form.control} name="farmSize" render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Size (in acres)</FormLabel>
                <FormControl><Input type="number" placeholder="50" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="soilType" render={({ field }) => (
              <FormItem>
                <FormLabel>Predominant Soil Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a soil type" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="silty">Silty</SelectItem>
                    <SelectItem value="peaty">Peaty</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Location (City/Region)</FormLabel>
                <FormControl><Input placeholder="Central Valley, California" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="cropPreference" render={({ field }) => (
                <FormItem>
                    <FormLabel>Preferred Crop</FormLabel>
                    <FormControl><Input placeholder="e.g., Corn, Wheat, Soybeans" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
             )} />
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
