"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dummySchemes } from "@/lib/dummy-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SchemesList() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {dummySchemes.map((scheme) => (
        <Card key={scheme.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{scheme.title}</CardTitle>
            <CardDescription>{scheme.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <h4 className="font-semibold mb-2">Eligibility</h4>
            <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href={scheme.link} target="_blank" rel="noopener noreferrer">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
