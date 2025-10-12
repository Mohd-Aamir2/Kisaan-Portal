import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { CheckCircle2, Lightbulb, Bell, BarChart2 } from 'lucide-react';
import { Copyright } from '@/components/copyright';
import { LanguageSelector } from '@/components/language-selector';
import { FloatingChatbot } from '@/components/chatbot/floating-chatbot';

export default function Home() {
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'AI Recommendations',
      description: 'Get personalized crop suggestions based on your farm\'s data and local conditions.',
    },
    {
      icon: <Bell className="h-8 w-8 text-primary" />,
      title: 'Real-time Alerts',
      description: 'Receive timely notifications for weather changes, pest threats, and farming tasks.',
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: 'Data-driven Insights',
      description: 'Analyze soil health, weather patterns, and historical data to make informed decisions.',
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: 'Feedback Loop',
      description: 'Help improve our AI by providing feedback on your crop outcomes.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className=" mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center fixed top-0 w-full bg-grey/80 backdrop-blur-md z-50 border-b">
        <Logo />
        <nav className="flex items-center gap-2">
          <LanguageSelector />
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-green-300 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-gray-900 dark:text-white gradient-title">
                AI-Powered Smart Crop Advisory for Modern Farmers
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                Kisaan leverages artificial intelligence to provide you with actionable insights, helping you increase yield, reduce risk, and grow smarter.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/register">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mt-16 relative">
              <Image
                src="https://media.istockphoto.com/id/806276128/photo/farmer-ploughing-rice-field-at-sunrise.jpg?s=612x612&w=0&k=20&c=t5IUOH9GWrI1lAz4gXPJnwjR9WUxQxdmSnIJxk_XDiQ="
                alt="Farmer ploughing a rice field with two cattle at sunrise."
                data-ai-hint="farmer ploughing"
                width={1400}
                height={600}
                className="rounded-xl shadow-2xl mx-auto object-cover h-[600px]"
              />
              <div className="absolute inset-0 bg-black/30 rounded-xl flex items-end p-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="font-bold">Primary Livelihood</p>
                        <p className="text-sm">Over 55% of India’s population depends on agriculture.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="font-bold">GDP Contribution</p>
                        <p className="text-sm">Around 17–20% of India’s GDP comes from agriculture and allied sectors.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="font-bold">Global Rank</p>
                        <p className="text-sm">India is second worldwide in farm output and first in net cropped area.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">The Future of Farming is Here</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Our platform utilizes cutting-edge AI and data analytics to provide you with the most advanced farming advice. We analyze data from various sources to give you a competitive edge.
                        </p>
                         <Button size="lg" className="mt-6" asChild>
                            <Link href="#features">Explore Features</Link>
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Image 
                            src="https://thumbs.dreamstime.com/b/futuristic-robot-farmer-harvesting-potato-agriculture-futuristic-concept-android-robot-basket-potatoes-ai-generated-image-318485954.jpg"
                            alt="Futuristic robot farmer harvesting potatoes"
                            data-ai-hint="robot farmer"
                            width={400}
                            height={400}
                            className="rounded-full aspect-square object-cover shadow-2xl border-8 border-white"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Features to Help You Thrive</h2>
              <p className="mt-4 text-lg text-gray-600">Everything you need for a successful harvest.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/50">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center">
          <Logo />
          <Copyright />
        </div>
      </footer> 
      <FloatingChatbot />
    </div>
  );
}
