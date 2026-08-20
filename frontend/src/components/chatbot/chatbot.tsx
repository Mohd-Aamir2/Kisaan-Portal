// File: Chatbot.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { getAudioForText } from "@/app/actions/chatbot";

// --- UI Imports ---
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2, Volume2, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// ------------------

const chatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  audio?: string;
  voice?: string;
  isSpeaking?: boolean; // 👈 TTS Playback Status
};

// Add this interface to handle vendor prefixes for SpeechRecognition
interface CustomWindow extends Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}
declare const window: CustomWindow;

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

  // --- TTS and Speaking Logic ---

  // TTS playback और isSpeaking status को मैनेज करने का मुख्य फ़ंक्शन
  const playBotAudio = (audioData: string, messageId: string) => {
    if (!audioData || !audioRef.current) return;

    // isSpeaking को True करें
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isSpeaking: true } : m))
    );

    audioRef.current.src = audioData;

    // जब ऑडियो खत्म हो जाए
    audioRef.current.onended = () => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, isSpeaking: false } : m))
      );
    };

    // जब ऑडियो प्ले न हो पाए
    audioRef.current.onerror = () => {
      console.error("Audio playback error.");
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, isSpeaking: false } : m))
      );
    };

    // Auto-play शुरू करें
    audioRef.current.play().catch((e) => {
      console.error("Auto-play failed:", e);
      // अगर auto-play fail हो जाए तो isSpeaking बंद कर दें
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, isSpeaking: false } : m))
      );
    });
  };

  // TTS Replay बटन पर क्लिक होने पर
  const handleReplayAudio = (message: Message) => {
    if (message.audio) {
        // अगर पहले से कोई ऑडियो चल रहा है तो उसे बंद कर दें
        audioRef.current?.pause();
        // नया ऑडियो प्ले करें
        playBotAudio(message.audio, message.id);
    }
  };


  // --- Hooks and Initial Setup ---

  useEffect(() => {
    // Initial message
    setMessages([
      {
        id: "1",
        text: "नमस्ते! मैं आपका AI किसान सहायक हूँ। मैं हिंदी, तमिल, तेलुगु और अंग्रेजी में मदद कर सकता हूँ।",
        sender: "bot",
      },
    ]);

    // Speech Recognition Setup (जैसा आपने दिया था)
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      // Note: हिंदी और अन्य भाषाओं के लिए आपको `lang` को बदलना होगा
      recognitionRef.current.lang = "hi-IN"; // उदाहरण के लिए हिंदी

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        form.setValue("message", transcript);
        setIsListening(false);
        // Automatically submit the form after transcription
        form.handleSubmit(onSubmit)();
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        toast({
          variant: "destructive",
          title: "Voice Recognition Error",
          description:
            "There was an error with speech recognition. Please try again.",
        });
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  // --- Main Submit Function ---

  async function onSubmit(values: z.infer<typeof chatSchema>) {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: values.message,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    const botMessageId = (Date.now() + 1).toString();
    // Khaali bot message pehle hi daal do — usi ko stream se bharenge
    setMessages((prev) => [...prev, { id: botMessageId, text: "", sender: "bot" }]);

    try {
      const history = messages.map((m) => ({
        // Genkit history format
        role: m.sender === "bot" ? "assistant" : "user", // 👈 IMPORTANT: 'model' की जगह 'assistant' उपयोग करें
        content: m.text,
      }));

      // 🚀 Streaming API route ko call karo
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: values.message, history }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Received empty response from server.");
      }

      const voice = res.headers.get("X-Bot-Voice") || "Algenib";
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      setIsLoading(false); // pehla chunk aate hi "सोच रहा हूँ" hata do

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === botMessageId ? { ...m, text: fullText } : m))
        );
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === botMessageId ? { ...m, voice } : m))
      );

      // 🔊 Audio background mein banta hai — text ko wait nahi karana padta
      getAudioForText(fullText, voice).then(({ audio }) => {
        if (audio) {
          setMessages((prev) =>
            prev.map((m) => (m.id === botMessageId ? { ...m, audio } : m))
          );
          playBotAudio(audio, botMessageId);
        }
      });

    } catch (error) {
      console.error("Chat submission error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? { ...m, text: "क्षमा करें, सर्वर से कनेक्ट करने में समस्या हुई। कृपया पुनः प्रयास करें।" }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Voice Search Handler (जैसा आपने दिया था)
  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      toast({
        variant: "destructive",
        title: "Browser Not Supported",
        description: "Your browser does not support voice recognition.",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // अगर कोई ऑडियो चल रहा है तो उसे रोक दें
      audioRef.current?.pause();
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col h-full shadow-none border-0 rounded-b-none">
        <CardHeader className="rounded-t-xl bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Bot /> Kisaan AI Assistant
          </CardTitle>
          <CardDescription>Your smart farming assistant.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap flex items-center gap-2",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary",
                      message.isSpeaking ? "border-2 border-yellow-400 shadow-lg" : "" // 👈 Speaking Highlight
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    {/* TTS Replay Button */}
                    {message.sender === "bot" && message.audio && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleReplayAudio(message)}
                        disabled={message.isSpeaking} // जब बोल रहा हो तो डिसेबल
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-secondary flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <p className="text-sm">सोच रहा हूँ...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-muted/50 rounded-b-xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-2"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder={
                              isListening
                                ? "सुन रहा हूँ..."
                                : "कुछ टाइप करें या बोलें..."
                            }
                            {...field}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className={cn(
                              "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8",
                              isListening ? "text-primary" : ""
                            )}
                            onClick={handleVoiceSearch}
                            disabled={isLoading}
                          >
                            {isListening ? (
                              <MicOff className="h-4 w-4" />
                            ) : (
                              <Mic className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">भेजें</span>
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      {/* Audio Element: पूरे ऐप में सिर्फ़ एक audio element का उपयोग करें */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}