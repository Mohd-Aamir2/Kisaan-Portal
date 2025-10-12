"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Chatbot } from "@/components/chatbot/chatbot";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="fixed top-24 right-12 z-40 flex flex-col items-center gap-2">
          {/* Chatbot button */}
          <Button
            variant="secondary"
            className="h-20 w-20 shadow-lg p-0 overflow-hidden 
                       bg-amber-500 border 2px rounded-[50%] 
                       drop-shadow-[0_0px_50px_rgba(255,191,0,1)]"
            aria-label="Toggle Chatbot"
          >
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                >
                  <X className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                >
                  <Image
                    src="https://thumbs.dreamstime.com/b/old-indian-farmer-sows-rice-field-vector-illustration-flat-cartoon-style-239898621.jpg"
                    alt="AI Chatbot"
                    data-ai-hint="robot face"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Title below circle */}
          <span className="text font-bold text-amber-700">
            AI KAKA
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        className="w-[calc(100vw-2rem)] sm:w-[400px] h-[70vh] max-h-[570px] p-0 mr-2 mb-2 z-50 rounded-xl"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <div className="h-full flex flex-col">
          <Chatbot />
        </div>
      </PopoverContent>
    </Popover>
  );
}
