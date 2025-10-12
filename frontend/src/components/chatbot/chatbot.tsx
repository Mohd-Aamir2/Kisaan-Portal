"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { sendMessage } from "@/app/actions/chatbot";

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

const chatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  audio?: string;
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

  useEffect(() => {
    setMessages([
      { id: "1", text: "Hello! How can I help you today?", sender: "bot" },
    ]);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

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

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

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

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.sender === "bot" &&
      lastMessage.audio &&
      audioRef.current
    ) {
      audioRef.current.src = lastMessage.audio;
      audioRef.current
        .play()
        .catch((e) => console.error("Audio playback failed:", e));
    }
  }, [messages]);

  async function onSubmit(values: z.infer<typeof chatSchema>) {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: values.message,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    try {
      const history = messages.map((m) => ({
        role: m.sender === "bot" ? "model" : "user",
        content: m.text,
      }));

      const botResponse = await sendMessage(values.message, history);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: "bot",
        audio: botResponse.audio,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const playAudio = (audioData: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioData;
      audioRef.current
        .play()
        .catch((e) => console.error("Audio playback failed:", e));
    }
  };

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
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col h-full shadow-none border-0 rounded-b-none">
        <CardHeader className="rounded-t-xl bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Bot /> AI Assistant
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
                        : "bg-secondary"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.sender === "bot" && message.audio && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => playAudio(message.audio!)}
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
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <Loader2 className="w-5 h-5 animate-spin" />
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
                                ? "Listening..."
                                : "Type or say something..."
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
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
